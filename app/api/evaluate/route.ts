import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { quizQuestions } from '@/lib/data/questions';
import {
  CAREER_EVALUATION_SYSTEM_PROMPT,
  CAREER_EVALUATION_USER_PROMPT,
  formatResponsesForPrompt,
} from '@/lib/ai/prompts';
import { EvaluationResultSchema, type EvaluationResult } from '@/lib/types/evaluation';

async function callGeminiAPI(systemPrompt: string, userPrompt: string, apiKey: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4000,
          responseMimeType: 'application/json',
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${errorText}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!content) {
    throw new Error('No content in Gemini response');
  }

  return content;
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId, customApiKey } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const supabase = createServerClient();

    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .select('id, status')
      .eq('id', sessionId)
      .maybeSingle();

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const { data: existingEval } = await supabase
      .from('ai_evaluations')
      .select('output_json')
      .eq('session_id', sessionId)
      .maybeSingle();

    if (existingEval?.output_json) {
      return NextResponse.json({ result: existingEval.output_json, cached: true });
    }

    const { data: answers, error: answersError } = await supabase
      .from('quiz_answers')
      .select('question_id, question_type, answer_json')
      .eq('session_id', sessionId);

    if (answersError || !answers || answers.length === 0) {
      return NextResponse.json({ error: 'No answers found' }, { status: 404 });
    }

    const formattedAnswers = answers.map((a) => {
      const question = quizQuestions.find((q) => q.id === a.question_id);
      return {
        questionId: a.question_id,
        questionText: question?.text || 'Unknown question',
        questionType: a.question_type,
        answer: (a.answer_json as { value: string | string[] }).value,
      };
    });

    const responsesText = formatResponsesForPrompt(formattedAnswers);
    const userPrompt = CAREER_EVALUATION_USER_PROMPT.replace('{responses}', responsesText);
    const jsonInstructions = `\n\nRESPOND WITH A VALID JSON OBJECT containing these exact fields:
{
  "perRoleFit": [{ "role": string, "roleKey": string, "score": number (0-100), "why": string[] }],
  "traitSignals": {
    "problemSolving": { "score": number (0-5), "evidence": string[] },
    "creativity": { "score": number (0-5), "evidence": string[] },
    "communication": { "score": number (0-5), "evidence": string[] },
    "attentionToDetail": { "score": number (0-5), "evidence": string[] },
    "curiosity": { "score": number (0-5), "evidence": string[] },
    "persistence": { "score": number (0-5), "evidence": string[] }
  },
  "strengths": string[],
  "growthAreas": string[],
  "recommendedRoles": [{ "roleKey": string, "role": string, "rationale": string }],
  "suggestedLearningPlan": {
    "targetRole": string,
    "duration": string,
    "weeks": [{ "week": number, "focus": string, "goals": string[], "resources": [{ "title": string, "type": string, "description": string, "isFree": boolean }] }]
  },
  "responseQuality": { "hasSubstantiveResponses": boolean, "lowConfidenceFlags": string[], "overallConfidence": number (0-1) },
  "safetyDisclaimer": string
}`;

    const apiKey = customApiKey || process.env.GEMINI_API_KEY || process.env.AI_GATEWAY_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'AI service not configured' }, { status: 500 });
    }

    let content: string;
    try {
      content = await callGeminiAPI(
        CAREER_EVALUATION_SYSTEM_PROMPT,
        userPrompt + jsonInstructions,
        apiKey
      );
    } catch (error) {
      console.error('Gemini API error:', error);
      return NextResponse.json({ error: 'AI evaluation failed' }, { status: 500 });
    }

    let parsedResult;
    try {
      parsedResult = JSON.parse(content);
    } catch {
      console.error('Failed to parse AI response:', content);
      return NextResponse.json({ error: 'Invalid AI response format' }, { status: 500 });
    }

    const validationResult = EvaluationResultSchema.safeParse(parsedResult);

    let finalResult: EvaluationResult;
    if (!validationResult.success) {
      console.warn('AI response validation failed, using fallback structure');
      finalResult = createFallbackResult(parsedResult);
    } else {
      finalResult = validationResult.data;
    }

    const inputHash = Buffer.from(JSON.stringify(formattedAnswers)).toString('base64').slice(0, 64);
    const confidence = finalResult.responseQuality?.overallConfidence ?? 0.7;

    await supabase.from('ai_evaluations').insert({
      session_id: sessionId,
      model: 'gemini-1.5-flash',
      input_hash: inputHash,
      output_json: finalResult,
      confidence,
    });

    return NextResponse.json({ result: finalResult, cached: false });
  } catch (error) {
    console.error('Evaluation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function createFallbackResult(partial: Record<string, unknown>): EvaluationResult {
  const defaultTraitScore = { score: 3 as const, evidence: ['Based on quiz responses'] };

  return {
    perRoleFit: (partial.perRoleFit as EvaluationResult['perRoleFit']) || [
      { role: 'Software Developer', roleKey: 'software_developer', score: 70, why: ['Shows analytical thinking'] },
      { role: 'Data Analyst', roleKey: 'data_analyst', score: 65, why: ['Demonstrates attention to detail'] },
      { role: 'Web Designer', roleKey: 'web_designer', score: 60, why: ['Shows creative potential'] },
    ],
    traitSignals: (partial.traitSignals as EvaluationResult['traitSignals']) || {
      problemSolving: defaultTraitScore,
      creativity: defaultTraitScore,
      communication: defaultTraitScore,
      attentionToDetail: defaultTraitScore,
      curiosity: defaultTraitScore,
      persistence: defaultTraitScore,
    },
    strengths: (partial.strengths as string[]) || ['Analytical approach', 'Willingness to learn', 'Clear communication'],
    growthAreas: (partial.growthAreas as string[]) || ['Technical depth', 'Domain expertise'],
    recommendedRoles: (partial.recommendedRoles as EvaluationResult['recommendedRoles']) || [
      { roleKey: 'software_developer', role: 'Software Developer', rationale: 'Shows problem-solving aptitude' },
      { roleKey: 'data_analyst', role: 'Data Analyst', rationale: 'Demonstrates analytical thinking' },
      { roleKey: 'web_designer', role: 'Web Designer', rationale: 'Shows creative interests' },
    ],
    suggestedLearningPlan: (partial.suggestedLearningPlan as EvaluationResult['suggestedLearningPlan']) || {
      targetRole: 'Software Developer',
      duration: '4 weeks',
      weeks: [
        {
          week: 1,
          focus: 'Programming Fundamentals',
          goals: ['Learn basic syntax', 'Complete introductory exercises'],
          resources: [
            { title: 'freeCodeCamp', type: 'course', description: 'Free coding bootcamp', isFree: true },
          ],
        },
        {
          week: 2,
          focus: 'Building Projects',
          goals: ['Create a simple project', 'Practice problem-solving'],
          resources: [
            { title: 'The Odin Project', type: 'course', description: 'Full-stack curriculum', isFree: true },
          ],
        },
      ],
    },
    responseQuality: (partial.responseQuality as EvaluationResult['responseQuality']) || {
      hasSubstantiveResponses: true,
      lowConfidenceFlags: [],
      overallConfidence: 0.7,
    },
    safetyDisclaimer:
      'This assessment provides guidance based on your quiz responses and should not be considered professional career advice, a hiring decision, or a psychological evaluation. Results suggest roles you may be well-suited for. We recommend consulting with career professionals for comprehensive planning.',
  };
}

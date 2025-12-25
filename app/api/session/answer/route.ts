import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerClient } from '@/lib/supabase/server';
import { getSessionToken } from '@/lib/session';

const answerSchema = z.object({
  questionId: z.string(),
  questionType: z.enum(['multiple_choice', 'scenario', 'open_ended']),
  value: z.union([z.string(), z.array(z.string())]),
  currentIndex: z.number(),
});

export async function POST(request: NextRequest) {
  try {
    const sessionToken = await getSessionToken();

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'No active session' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = answerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { questionId, questionType, value, currentIndex } = parsed.data;
    const supabase = createServerClient();

    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .select('id, status')
      .eq('session_token', sessionToken)
      .maybeSingle();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    if (session.status === 'completed') {
      return NextResponse.json(
        { error: 'Session already completed' },
        { status: 400 }
      );
    }

    const { error: upsertError } = await supabase
      .from('quiz_answers')
      .upsert(
        {
          session_id: session.id,
          question_id: questionId,
          question_type: questionType,
          answer_json: { value, timestamp: new Date().toISOString() },
        },
        { onConflict: 'session_id,question_id' }
      );

    if (upsertError) {
      console.error('Failed to save answer:', upsertError);
      return NextResponse.json(
        { error: 'Failed to save answer' },
        { status: 500 }
      );
    }

    await supabase
      .from('quiz_sessions')
      .update({ current_question_index: currentIndex })
      .eq('id', session.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Answer submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

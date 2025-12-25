import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { getSessionToken } from '@/lib/session';

export async function GET() {
  try {
    const sessionToken = await getSessionToken();

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'No active session' },
        { status: 401 }
      );
    }

    const supabase = createServerClient();

    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .select('id')
      .eq('session_token', sessionToken)
      .maybeSingle();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    const { data: answers, error: answersError } = await supabase
      .from('quiz_answers')
      .select('question_id, question_type, answer_json')
      .eq('session_id', session.id);

    if (answersError) {
      console.error('Failed to fetch answers:', answersError);
      return NextResponse.json(
        { error: 'Failed to fetch answers' },
        { status: 500 }
      );
    }

    const answersMap: Record<string, { questionType: string; value: unknown }> = {};
    for (const answer of answers || []) {
      answersMap[answer.question_id] = {
        questionType: answer.question_type,
        value: (answer.answer_json as { value: unknown }).value,
      };
    }

    return NextResponse.json({ answers: answersMap });
  } catch (error) {
    console.error('Fetch answers error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

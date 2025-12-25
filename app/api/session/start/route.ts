import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { generateSessionToken, setSessionCookie, getSessionToken } from '@/lib/session';

export async function POST() {
  try {
    const supabase = createServerClient();

    const existingToken = await getSessionToken();

    if (existingToken) {
      const { data: existingSession } = await supabase
        .from('quiz_sessions')
        .select('id, status, current_question_index')
        .eq('session_token', existingToken)
        .eq('status', 'in_progress')
        .maybeSingle();

      if (existingSession) {
        return NextResponse.json({
          sessionId: existingSession.id,
          sessionToken: existingToken,
          currentIndex: existingSession.current_question_index,
          resumed: true,
        });
      }
    }

    const sessionToken = generateSessionToken();

    const { data: session, error } = await supabase
      .from('quiz_sessions')
      .insert({
        session_token: sessionToken,
        status: 'in_progress',
        current_question_index: 0,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Failed to create session:', error);
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      );
    }

    await setSessionCookie(sessionToken);

    return NextResponse.json({
      sessionId: session.id,
      sessionToken,
      currentIndex: 0,
      resumed: false,
    });
  } catch (error) {
    console.error('Session start error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

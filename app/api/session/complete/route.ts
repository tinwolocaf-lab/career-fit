import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { getSessionToken } from '@/lib/session';

export async function POST() {
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
      return NextResponse.json({
        sessionId: session.id,
        alreadyCompleted: true,
      });
    }

    const { error: updateError } = await supabase
      .from('quiz_sessions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', session.id);

    if (updateError) {
      console.error('Failed to complete session:', updateError);
      return NextResponse.json(
        { error: 'Failed to complete session' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      sessionId: session.id,
      alreadyCompleted: false,
    });
  } catch (error) {
    console.error('Session complete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { QuizProgress } from '@/components/quiz/quiz-progress';
import { QuestionCard } from '@/components/quiz/question-card';
import { QuizNavigation } from '@/components/quiz/quiz-navigation';
import { quizQuestions, TOTAL_QUESTIONS } from '@/lib/data/questions';
import type { QuizAnswer } from '@/lib/types/quiz';
import { useI18n } from '@/lib/i18n/context';
import { toast } from 'sonner';

export default function QuizPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = quizQuestions[currentIndex];
  const isLastQuestion = currentIndex === TOTAL_QUESTIONS - 1;

  useEffect(() => {
    initializeSession();
  }, []);

  async function initializeSession() {
    try {
      const response = await fetch('/api/session/start', { method: 'POST' });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start session');
      }

      setSessionId(data.sessionId);
      setCurrentIndex(data.currentIndex || 0);

      if (data.resumed) {
        const answersRes = await fetch('/api/session/answers');
        const answersData = await answersRes.json();
        if (answersData.answers) {
          const loadedAnswers: Record<string, QuizAnswer> = {};
          for (const [questionId, answer] of Object.entries(answersData.answers)) {
            const ans = answer as { questionType: string; value: string | string[] };
            loadedAnswers[questionId] = {
              questionId,
              questionType: ans.questionType as QuizAnswer['questionType'],
              value: ans.value,
              timestamp: new Date().toISOString(),
            };
          }
          setAnswers(loadedAnswers);
        }
        toast.success(t.quiz.resumedProgress);
      }
    } catch (error) {
      console.error('Session initialization error:', error);
      toast.error(t.quiz.failedToStart);
    } finally {
      setIsLoading(false);
    }
  }

  const saveAnswer = useCallback(
    async (answer: QuizAnswer) => {
      if (!sessionId) return;

      setIsSaving(true);
      try {
        const response = await fetch('/api/session/answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionId: answer.questionId,
            questionType: answer.questionType,
            value: answer.value,
            currentIndex,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save answer');
        }
      } catch (error) {
        console.error('Save answer error:', error);
        toast.error(t.quiz.failedToSave);
      } finally {
        setIsSaving(false);
      }
    },
    [sessionId, currentIndex, t]
  );

  function handleAnswer(value: string | string[]) {
    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      questionType: currentQuestion.type,
      value,
      timestamp: new Date().toISOString(),
    };

    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
    saveAnswer(answer);
  }

  function handleNext() {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  async function handleSubmit() {
    const unanswered = quizQuestions.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      toast.error(t.quiz.answerAllQuestions.replace('{count}', String(unanswered.length)));
      const firstUnansweredIndex = quizQuestions.findIndex(
        (q) => q.id === unanswered[0].id
      );
      setCurrentIndex(firstUnansweredIndex);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/session/complete', { method: 'POST' });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete quiz');
      }

      router.push(`/results/${data.sessionId}`);
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(t.quiz.failedToSubmit);
      setIsSubmitting(false);
    }
  }

  const currentAnswer = answers[currentQuestion?.id];

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-gradient-to-b from-background to-muted/30">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
              <p className="mt-4 text-muted-foreground">{t.common.loading}</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <QuizProgress
            currentIndex={currentIndex}
            totalQuestions={TOTAL_QUESTIONS}
            answeredCount={Object.keys(answers).length}
          />

          <div className="mt-8">
            <QuestionCard
              question={currentQuestion}
              answer={currentAnswer}
              onAnswer={handleAnswer}
              questionNumber={currentIndex + 1}
            />
          </div>

          <QuizNavigation
            currentIndex={currentIndex}
            totalQuestions={TOTAL_QUESTIONS}
            canGoNext={!!currentAnswer}
            isLastQuestion={isLastQuestion}
            isSaving={isSaving}
            isSubmitting={isSubmitting}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

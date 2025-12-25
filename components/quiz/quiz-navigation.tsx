'use client';

import { ChevronLeft, ChevronRight, Loader2, Send } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';

interface QuizNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  canGoNext: boolean;
  isLastQuestion: boolean;
  isSaving: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function QuizNavigation({
  currentIndex,
  canGoNext,
  isLastQuestion,
  isSaving,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit,
}: QuizNavigationProps) {
  const { t } = useI18n();

  return (
    <div className="mt-8 flex items-center justify-between">
      <Button
        variant="ghost"
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        {t.common.previous}
      </Button>

      <div className="flex items-center gap-3">
        {isSaving && (
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t.quiz.saving}
          </span>
        )}

        {isLastQuestion ? (
          <Button
            onClick={onSubmit}
            disabled={!canGoNext || isSubmitting}
            className="gap-2 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t.quiz.submitting}
              </>
            ) : (
              <>
                {t.quiz.submitQuiz}
                <Send className="h-4 w-4" />
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="gap-2 shadow-lg shadow-primary/25"
          >
            {t.common.next}
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

'use client';

import { CheckCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface QuizProgressProps {
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
}

export function QuizProgress({
  currentIndex,
  totalQuestions,
  answeredCount,
}: QuizProgressProps) {
  const { t } = useI18n();
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;
  const completionPercent = (answeredCount / totalQuestions) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">
          {t.quiz.question} {currentIndex + 1} {t.quiz.of} {totalQuestions}
        </span>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>{answeredCount} {t.quiz.answered}</span>
        </div>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="absolute inset-y-0 left-0 bg-muted-foreground/30 transition-all duration-300"
          style={{ width: `${completionPercent}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 bg-primary transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex gap-1">
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <button
            key={i}
            onClick={() => {}}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i === currentIndex
                ? 'bg-primary'
                : i < currentIndex
                  ? 'bg-primary/60'
                  : 'bg-muted'
            }`}
            aria-label={`Go to question ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

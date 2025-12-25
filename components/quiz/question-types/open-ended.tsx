'use client';

import { useState, useEffect } from 'react';
import type { QuizQuestion } from '@/lib/types/quiz';
import { useI18n } from '@/lib/i18n/context';

interface OpenEndedQuestionProps {
  question: QuizQuestion;
  value: string;
  onChange: (value: string) => void;
}

export function OpenEndedQuestion({
  question,
  value,
  onChange,
}: OpenEndedQuestionProps) {
  const { t } = useI18n();
  const [localValue, setLocalValue] = useState(value);
  const minLength = question.minLength || 50;
  const maxLength = question.maxLength || 1000;
  const charCount = localValue.length;
  const isValid = charCount >= minLength;

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localValue, value, onChange]);

  return (
    <div className="space-y-3">
      <textarea
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={question.placeholder}
        maxLength={maxLength}
        rows={6}
        className="w-full rounded-xl border-2 border-border bg-background p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
        aria-describedby={`${question.id}-hint`}
      />

      <div
        id={`${question.id}-hint`}
        className="flex items-center justify-between text-sm"
      >
        <div className="flex items-center gap-2">
          {!isValid && charCount > 0 && (
            <span className="text-warning">
              {minLength - charCount} {t.quiz.moreCharsNeeded}
            </span>
          )}
          {isValid && (
            <span className="text-green-600 dark:text-green-500">
              {t.quiz.lookingGood}
            </span>
          )}
          {charCount === 0 && (
            <span className="text-muted-foreground">
              {t.quiz.minChars.replace('{min}', String(minLength))}
            </span>
          )}
        </div>
        <span
          className={`font-medium ${
            charCount > maxLength * 0.9
              ? 'text-warning'
              : 'text-muted-foreground'
          }`}
        >
          {charCount}/{maxLength}
        </span>
      </div>

      <div className="rounded-lg bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">{t.quiz.tipTitle}</strong> {t.quiz.tipText}
        </p>
      </div>
    </div>
  );
}

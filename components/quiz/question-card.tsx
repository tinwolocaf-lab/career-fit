'use client';

import { useState, useEffect } from 'react';
import type { QuizQuestion, QuizAnswer } from '@/lib/types/quiz';
import { MultipleChoiceQuestion } from './question-types/multiple-choice';
import { OpenEndedQuestion } from './question-types/open-ended';
import { useI18n } from '@/lib/i18n/context';

interface QuestionCardProps {
  question: QuizQuestion;
  answer?: QuizAnswer;
  onAnswer: (value: string | string[]) => void;
  questionNumber: number;
}

export function QuestionCard({
  question,
  answer,
  onAnswer,
  questionNumber,
}: QuestionCardProps) {
  const { t } = useI18n();
  const [localValue, setLocalValue] = useState<string | string[]>(
    answer?.value ?? ''
  );

  useEffect(() => {
    setLocalValue(answer?.value ?? '');
  }, [question.id, answer?.value]);

  function handleChange(value: string | string[]) {
    setLocalValue(value);
    onAnswer(value);
  }

  const categoryLabels = t.quiz.categories;

  return (
    <div
      className="rounded-2xl bg-card p-6 sm:p-8 shadow-sm border border-border animate-fade-in"
      role="region"
      aria-labelledby={`question-${question.id}`}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {categoryLabels[question.category as keyof typeof categoryLabels] || question.category}
        </span>
        {question.type === 'open_ended' && (
          <span className="inline-flex items-center rounded-full bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
            {t.quiz.writtenResponse}
          </span>
        )}
      </div>

      <h2
        id={`question-${question.id}`}
        className="text-xl sm:text-2xl font-semibold text-foreground leading-tight"
      >
        {questionNumber}. {question.text}
      </h2>

      {question.description && (
        <p className="mt-2 text-muted-foreground">{question.description}</p>
      )}

      <div className="mt-6">
        {(question.type === 'multiple_choice' || question.type === 'scenario') && (
          <MultipleChoiceQuestion
            question={question}
            value={localValue as string}
            onChange={handleChange}
          />
        )}

        {question.type === 'open_ended' && (
          <OpenEndedQuestion
            question={question}
            value={localValue as string}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}

'use client';

import { Check } from 'lucide-react';
import type { QuizQuestion } from '@/lib/types/quiz';

interface MultipleChoiceQuestionProps {
  question: QuizQuestion;
  value: string;
  onChange: (value: string) => void;
}

export function MultipleChoiceQuestion({
  question,
  value,
  onChange,
}: MultipleChoiceQuestionProps) {
  return (
    <div className="space-y-3" role="radiogroup" aria-labelledby={`question-${question.id}`}>
      {question.options?.map((option, index) => {
        const isSelected = value === option.id;
        const optionLetter = String.fromCharCode(65 + index);

        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`w-full text-left rounded-xl p-4 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              isSelected
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-border/80 hover:bg-muted/50'
            }`}
            role="radio"
            aria-checked={isSelected}
            aria-label={`Option ${optionLetter}: ${option.text}`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors ${
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground/30 text-muted-foreground'
                }`}
              >
                {isSelected ? <Check className="h-4 w-4" /> : optionLetter}
              </div>
              <span
                className={`text-base leading-relaxed ${
                  isSelected ? 'text-foreground font-medium' : 'text-foreground/80'
                }`}
              >
                {option.text}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

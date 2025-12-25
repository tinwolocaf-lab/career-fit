'use client';

import { useState } from 'react';
import { BookOpen, ExternalLink, CheckCircle, Clock } from 'lucide-react';
import type { EvaluationResult } from '@/lib/types/evaluation';

interface LearningPlanProps {
  plan: EvaluationResult['suggestedLearningPlan'];
}

export function LearningPlan({ plan }: LearningPlanProps) {
  const [activeWeek, setActiveWeek] = useState(1);

  const typeIcons: Record<string, string> = {
    course: 'graduation-cap',
    book: 'book',
    article: 'file-text',
    video: 'play-circle',
    project: 'code',
    community: 'users',
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100">
          <BookOpen className="h-5 w-5 text-cyan-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Learning Plan: {plan.targetRole}
          </h2>
          <p className="text-sm text-slate-500">{plan.duration} curriculum</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {plan.weeks.map((week) => (
          <button
            key={week.week}
            onClick={() => setActiveWeek(week.week)}
            className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeWeek === week.week
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Week {week.week}
          </button>
        ))}
      </div>

      {plan.weeks
        .filter((week) => week.week === activeWeek)
        .map((week) => (
          <div key={week.week} className="animate-fade-in">
            <h3 className="font-semibold text-slate-900 mb-2">{week.focus}</h3>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-slate-700 mb-2">Goals:</h4>
              <ul className="space-y-2">
                {week.goals.map((goal, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-slate-400 flex-shrink-0" />
                    {goal}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-3">Resources:</h4>
              <div className="space-y-3">
                {week.resources.map((resource, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-slate-200 p-4 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium text-slate-900">
                            {resource.title}
                          </h5>
                          {resource.isFree && (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                              Free
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-slate-600">
                          {resource.description}
                        </p>
                        {resource.timeEstimate && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                            <Clock className="h-3 w-3" />
                            {resource.timeEstimate}
                          </div>
                        )}
                      </div>
                      {resource.url && (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 transition-colors"
                          aria-label={`Open ${resource.title}`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

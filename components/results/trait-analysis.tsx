'use client';

import type { TraitScore } from '@/lib/types/evaluation';

interface TraitAnalysisProps {
  traits: {
    problemSolving: TraitScore;
    creativity: TraitScore;
    communication: TraitScore;
    attentionToDetail: TraitScore;
    curiosity: TraitScore;
    persistence: TraitScore;
  };
}

const traitLabels: Record<string, { label: string; description: string }> = {
  problemSolving: {
    label: 'Problem Solving',
    description: 'Analytical approach to challenges',
  },
  creativity: {
    label: 'Creativity',
    description: 'Innovative and original thinking',
  },
  communication: {
    label: 'Communication',
    description: 'Clear expression and interpersonal skills',
  },
  attentionToDetail: {
    label: 'Attention to Detail',
    description: 'Precision and thoroughness',
  },
  curiosity: {
    label: 'Curiosity',
    description: 'Interest in learning and exploring',
  },
  persistence: {
    label: 'Persistence',
    description: 'Determination and follow-through',
  },
};

export function TraitAnalysis({ traits }: TraitAnalysisProps) {
  const traitEntries = Object.entries(traits).sort(
    ([, a], [, b]) => b.score - a.score
  );

  function getScoreColor(score: number): string {
    if (score >= 4) return 'bg-emerald-500';
    if (score >= 3) return 'bg-cyan-500';
    if (score >= 2) return 'bg-amber-500';
    return 'bg-slate-400';
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">
        Trait Signals
      </h2>

      <div className="space-y-5">
        {traitEntries.map(([key, trait]) => {
          const info = traitLabels[key];
          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-medium text-slate-900">
                    {info?.label || key}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {info?.description}
                  </p>
                </div>
                <span className="text-lg font-semibold text-slate-900">
                  {trait.score}
                  <span className="text-sm text-slate-400">/5</span>
                </span>
              </div>

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      level <= trait.score
                        ? getScoreColor(trait.score)
                        : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>

              {trait.evidence.length > 0 && (
                <p className="mt-2 text-xs text-slate-500 italic">
                  &ldquo;{trait.evidence[0]}&rdquo;
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

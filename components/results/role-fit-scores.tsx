'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import type { RoleFit } from '@/lib/types/evaluation';

interface RoleFitScoresProps {
  roleFits: RoleFit[];
}

export function RoleFitScores({ roleFits }: RoleFitScoresProps) {
  const [expandedRole, setExpandedRole] = useState<string | null>(
    roleFits[0]?.roleKey || null
  );

  const sortedRoles = [...roleFits].sort((a, b) => b.score - a.score);
  const topRoles = sortedRoles.slice(0, 6);

  function getScoreColor(score: number): string {
    if (score >= 75) return 'bg-emerald-500';
    if (score >= 60) return 'bg-cyan-500';
    if (score >= 45) return 'bg-amber-500';
    return 'bg-slate-400';
  }

  function getScoreLabel(score: number): string {
    if (score >= 75) return 'Strong Fit';
    if (score >= 60) return 'Good Fit';
    if (score >= 45) return 'Moderate Fit';
    return 'Developing';
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">
        Role Fit Scores
      </h2>

      <div className="space-y-4">
        {topRoles.map((role, index) => {
          const isExpanded = expandedRole === role.roleKey;
          const isTop3 = index < 3;

          return (
            <div
              key={role.roleKey}
              className={`rounded-xl border transition-all ${
                isExpanded ? 'border-cyan-200 bg-cyan-50/50' : 'border-slate-200'
              }`}
            >
              <button
                onClick={() => setExpandedRole(isExpanded ? null : role.roleKey)}
                className="w-full p-4 text-left"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isTop3 && (
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${
                          index === 0
                            ? 'bg-amber-500'
                            : index === 1
                              ? 'bg-slate-400'
                              : 'bg-amber-700'
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                    <div>
                      <h3 className="font-medium text-slate-900">{role.role}</h3>
                      <span
                        className={`text-xs font-medium ${
                          role.score >= 75
                            ? 'text-emerald-600'
                            : role.score >= 60
                              ? 'text-cyan-600'
                              : 'text-slate-500'
                        }`}
                      >
                        {getScoreLabel(role.score)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-2xl font-bold text-slate-900">
                        {role.score}
                      </span>
                      <span className="text-sm text-slate-500">/100</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                </div>

                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full transition-all duration-500 ${getScoreColor(role.score)}`}
                    style={{ width: `${role.score}%` }}
                  />
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-slate-200 p-4 bg-white/50">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">
                    Why this role may fit you:
                  </h4>
                  <ul className="space-y-2">
                    {role.why.map((reason, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500" />
                        {reason}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`https://www.onetonline.org/find/descriptor/result/15-1252.00`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-700"
                  >
                    Learn more about this role
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

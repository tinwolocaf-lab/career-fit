'use client';

import { Trophy, AlertCircle } from 'lucide-react';

interface ResultsHeaderProps {
  topRole: {
    role: string;
    rationale: string;
  };
  confidence: number;
}

export function ResultsHeader({ topRole, confidence }: ResultsHeaderProps) {
  const confidenceLevel = confidence >= 0.7 ? 'high' : confidence >= 0.5 ? 'medium' : 'low';
  const confidenceLabels = {
    high: 'High Confidence',
    medium: 'Moderate Confidence',
    low: 'Limited Confidence',
  };

  return (
    <div className="text-center animate-fade-in">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 mb-6">
        <Trophy className="h-8 w-8 text-white" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
        Your Career Fit Results
      </h1>

      <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
        Based on your responses, you may be well-suited for roles like{' '}
        <span className="font-semibold text-cyan-700">{topRole.role}</span>
      </p>

      <p className="mt-2 text-slate-500">{topRole.rationale}</p>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm">
        {confidenceLevel === 'low' ? (
          <AlertCircle className="h-4 w-4 text-amber-500" />
        ) : (
          <div
            className={`h-2 w-2 rounded-full ${
              confidenceLevel === 'high' ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
          />
        )}
        <span className="text-slate-600">
          {confidenceLabels[confidenceLevel]} Assessment
        </span>
      </div>
    </div>
  );
}

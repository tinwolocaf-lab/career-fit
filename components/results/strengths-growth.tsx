'use client';

import { CheckCircle, TrendingUp } from 'lucide-react';

interface StrengthsGrowthProps {
  strengths: string[];
  growthAreas: string[];
}

export function StrengthsGrowth({ strengths, growthAreas }: StrengthsGrowthProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Your Strengths</h2>
        </div>

        <ul className="space-y-3">
          {strengths.map((strength, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              <span className="text-slate-700">{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
            <TrendingUp className="h-5 w-5 text-amber-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Growth Areas</h2>
        </div>

        <ul className="space-y-3">
          {growthAreas.map((area, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
              <span className="text-slate-700">{area}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

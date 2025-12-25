'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, RefreshCw, Download } from 'lucide-react';
import type { EvaluationResult } from '@/lib/types/evaluation';
import { toast } from 'sonner';

interface ResultsActionsProps {
  sessionId: string;
  result: EvaluationResult;
}

export function ResultsActions({ sessionId, result }: ResultsActionsProps) {
  const [copied, setCopied] = useState(false);

  async function copyReport() {
    const reportText = generateReportText(result);

    try {
      await navigator.clipboard.writeText(reportText);
      setCopied(true);
      toast.success('Report copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy report');
    }
  }

  function generateReportText(result: EvaluationResult): string {
    const lines: string[] = [
      '=== CareerFit Quiz Results ===',
      '',
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      '--- Top Recommended Roles ---',
    ];

    result.recommendedRoles.forEach((role, i) => {
      lines.push(`${i + 1}. ${role.role}`);
      lines.push(`   ${role.rationale}`);
    });

    lines.push('', '--- Role Fit Scores ---');
    const sortedRoles = [...result.perRoleFit].sort((a, b) => b.score - a.score);
    sortedRoles.slice(0, 6).forEach((role) => {
      lines.push(`${role.role}: ${role.score}/100`);
    });

    lines.push('', '--- Your Strengths ---');
    result.strengths.forEach((s) => lines.push(`- ${s}`));

    lines.push('', '--- Growth Areas ---');
    result.growthAreas.forEach((g) => lines.push(`- ${g}`));

    lines.push('', '--- Trait Signals ---');
    Object.entries(result.traitSignals).forEach(([trait, data]) => {
      lines.push(`${trait}: ${data.score}/5`);
    });

    lines.push('', '--- Learning Plan ---');
    lines.push(`Target Role: ${result.suggestedLearningPlan.targetRole}`);
    lines.push(`Duration: ${result.suggestedLearningPlan.duration}`);

    result.suggestedLearningPlan.weeks.forEach((week) => {
      lines.push(`\nWeek ${week.week}: ${week.focus}`);
      week.goals.forEach((g) => lines.push(`  - ${g}`));
    });

    lines.push('', '--- Disclaimer ---');
    lines.push(result.safetyDisclaimer);

    return lines.join('\n');
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Actions</h2>

      <div className="space-y-3">
        <button
          onClick={copyReport}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Report
            </>
          )}
        </button>

        <Link
          href="/quiz"
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Retake Quiz
        </Link>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-200">
        <h3 className="text-sm font-medium text-slate-900 mb-2">Share Results</h3>
        <p className="text-xs text-slate-500">
          Use the copy button above to share your results with a career counselor
          or mentor.
        </p>
      </div>
    </div>
  );
}

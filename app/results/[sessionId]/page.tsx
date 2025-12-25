'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { ResultsHeader } from '@/components/results/results-header';
import { RoleFitScores } from '@/components/results/role-fit-scores';
import { TraitAnalysis } from '@/components/results/trait-analysis';
import { StrengthsGrowth } from '@/components/results/strengths-growth';
import { LearningPlan } from '@/components/results/learning-plan';
import { ResultsActions } from '@/components/results/results-actions';
import type { EvaluationResult } from '@/lib/types/evaluation';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ sessionId: string }>;
}

export default function ResultsPage({ params }: PageProps) {
  const { sessionId } = use(params);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResults();
  }, [sessionId]);

  async function fetchResults() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch results');
      }

      setResult(data.result);
    } catch (err) {
      console.error('Failed to fetch results:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-cyan-600 border-r-transparent" />
            <h2 className="mt-6 text-xl font-semibold text-slate-900">
              Analyzing Your Responses
            </h2>
            <p className="mt-2 text-slate-600">
              Our AI is evaluating your answers to provide personalized career insights...
            </p>
            <div className="mt-6 flex justify-center gap-2">
              {['Evaluating skills', 'Matching roles', 'Generating plan'].map((step, i) => (
                <span
                  key={step}
                  className="animate-pulse-soft rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-600"
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  {step}
                </span>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="mt-6 text-xl font-semibold text-slate-900">
              Unable to Generate Results
            </h2>
            <p className="mt-2 text-slate-600">{error}</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={fetchResults}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-cyan-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <ResultsHeader
          topRole={result.recommendedRoles[0]}
          confidence={result.responseQuality.overallConfidence}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <RoleFitScores roleFits={result.perRoleFit} />
            <StrengthsGrowth
              strengths={result.strengths}
              growthAreas={result.growthAreas}
            />
            <LearningPlan plan={result.suggestedLearningPlan} />
          </div>

          <div className="space-y-8">
            <TraitAnalysis traits={result.traitSignals} />
            <ResultsActions sessionId={sessionId} result={result} />
          </div>
        </div>

        <div className="mt-12 rounded-xl bg-amber-50 border border-amber-200 p-6">
          <h3 className="font-semibold text-amber-900">Important Disclaimer</h3>
          <p className="mt-2 text-sm text-amber-800">{result.safetyDisclaimer}</p>
        </div>
      </div>
    </>
  );
}

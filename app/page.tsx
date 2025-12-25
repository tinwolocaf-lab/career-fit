'use client';

import Link from 'next/link';
import {
  Compass,
  Clock,
  Target,
  BookOpen,
  ChevronRight,
  Sparkles,
  BarChart3,
  Users,
  Code,
  Palette,
  TrendingUp,
  GraduationCap,
  AlertTriangle,
} from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ESTIMATED_TIME_MINUTES } from '@/lib/data/questions';
import { useI18n } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';

const roles = [
  { key: 'software_developer', icon: Code },
  { key: 'web_designer', icon: Palette },
  { key: 'data_analyst', icon: BarChart3 },
  { key: 'teacher', icon: GraduationCap },
  { key: 'marketing_specialist', icon: TrendingUp },
  { key: 'product_manager', icon: Users },
];

export default function HomePage() {
  const { t } = useI18n();

  const steps = [
    {
      title: t.home.step1Title,
      description: t.home.step1Desc,
      icon: Target,
    },
    {
      title: t.home.step2Title,
      description: t.home.step2Desc,
      icon: Sparkles,
    },
    {
      title: t.home.step3Title,
      description: t.home.step3Desc,
      icon: BookOpen,
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-gradient-to-b from-background via-background to-muted/30">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Clock className="h-4 w-4" />
              <span>{t.home.badge}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {t.home.title}{' '}
              <span className="gradient-text">{t.home.titleHighlight}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {t.home.subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/quiz">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 shadow-lg shadow-primary/25">
                  {t.home.startQuiz}
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  {t.home.howItWorks}
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              {t.home.disclaimer}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-center text-lg font-medium text-muted-foreground mb-8">
            {t.home.rolesTitle}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {roles.map((role) => (
              <div
                key={role.key}
                className="feature-card flex flex-col items-center gap-3 p-6"
              >
                <div className="rounded-lg p-3 bg-primary/10">
                  <role.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground text-center">
                  {t.roles[role.key as keyof typeof t.roles]}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          id="how-it-works"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">{t.home.howItWorksTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t.home.howItWorksSubtitle}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative feature-card p-8"
              >
                <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <div className="mb-4 mt-2 inline-flex rounded-lg bg-muted p-3">
                  <step.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-teal-500 p-8 sm:p-12 text-center">
            <Compass className="mx-auto h-12 w-12 text-primary-foreground/80 mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
              {t.home.ctaTitle}
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              {t.home.ctaSubtitle}
            </p>
            <Link href="/quiz">
              <Button
                size="lg"
                variant="secondary"
                className="mt-8 gap-2 text-lg px-8 py-6 bg-white text-primary hover:bg-white/90"
              >
                {t.home.ctaButton}
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-warning/10 border border-warning/20 p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground">{t.home.importantNote}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t.home.importantNoteText}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

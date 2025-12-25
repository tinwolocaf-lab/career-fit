'use client';

import { useState } from 'react';
import { Check, Minus, Plus, Sparkles, Building2, Mail } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n/context';
import Link from 'next/link';

const PRICE_PER_SEAT_MONTHLY = 12;
const ANNUAL_DISCOUNT = 0.2;

export default function PricingPage() {
  const { t } = useI18n();
  const [seats, setSeats] = useState(5);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const monthlyPrice = seats * PRICE_PER_SEAT_MONTHLY;
  const annualPrice = monthlyPrice * 12 * (1 - ANNUAL_DISCOUNT);
  const displayPrice = billingCycle === 'monthly' ? monthlyPrice : annualPrice / 12;

  const adjustSeats = (delta: number) => {
    setSeats(Math.max(1, Math.min(100, seats + delta)));
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t.pricing.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t.pricing.subtitle}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <Card className="relative overflow-hidden border-2 border-primary/20 bg-card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{t.pricing.individual}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {t.pricing.individualDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-foreground">{t.pricing.free}</span>
                  <span className="text-muted-foreground ml-2">{t.pricing.forever}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {t.pricing.individualFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/quiz">
                  <Button className="w-full" size="lg">
                    {t.pricing.getStartedFree}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-border bg-card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-muted/50 rounded-bl-full" />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-muted">
                    <Building2 className="h-5 w-5 text-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{t.pricing.team}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {t.pricing.teamDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-foreground">
                    ${Math.round(displayPrice)}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    {t.pricing.perMonth}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 mb-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {t.pricing.seats}
                    </span>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => adjustSeats(-1)}
                        disabled={seats <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold text-lg">{seats}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => adjustSeats(1)}
                        disabled={seats >= 100}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={billingCycle === 'monthly' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => setBillingCycle('monthly')}
                    >
                      {t.pricing.monthly}
                    </Button>
                    <Button
                      variant={billingCycle === 'annual' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => setBillingCycle('annual')}
                    >
                      {t.pricing.annual}
                    </Button>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{t.pricing.estimatedCost}</span>
                      <span className="font-semibold text-foreground">
                        ${billingCycle === 'monthly' ? monthlyPrice : Math.round(annualPrice)}{billingCycle === 'annual' ? t.pricing.perYear : t.pricing.perMonth}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {billingCycle === 'monthly' ? t.pricing.billedMonthly : t.pricing.billedAnnually}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {t.pricing.teamFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="w-full gap-2" size="lg">
                  <Mail className="h-4 w-4" />
                  {t.pricing.contactSales}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">
              {t.pricing.faq}
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {t.pricing.faqItems.map((item, i) => (
                <Card key={i} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                    <p className="text-muted-foreground">{item.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

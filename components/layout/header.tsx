'use client';

import Link from 'next/link';
import { Compass, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useI18n();

  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/30 transition-colors" />
              <Compass className="relative h-8 w-8 text-primary" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              CareerFit
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/pricing"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
            >
              {t.common.pricing}
            </Link>
            <Link
              href="/settings"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
            >
              {t.common.settings}
            </Link>
            <div className="w-px h-6 bg-border mx-2" />
            <LanguageSwitcher />
            <ThemeToggle />
            <div className="w-px h-6 bg-border mx-2" />
            <Link href="/quiz">
              <Button size="sm" className="font-medium">
                {t.home.startQuiz}
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="w-9 px-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-2">
            <Link
              href="/pricing"
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.common.pricing}
            </Link>
            <Link
              href="/settings"
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.common.settings}
            </Link>
            <div className="pt-2">
              <Link href="/quiz" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full font-medium">
                  {t.home.startQuiz}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

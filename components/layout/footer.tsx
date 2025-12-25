'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              {t.common.appName} - {t.footer.tagline}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              {t.footer.disclaimer}
            </p>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.common.privacy}
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.common.terms}
            </Link>
          </nav>
        </div>
        <div className="mt-6 border-t border-border/50 pt-6">
          <p className="text-xs text-muted-foreground/70 text-center">
            {t.footer.attribution}{' '}
            <a
              href="https://www.onetonline.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              {t.footer.onetAttribution}
            </a>
            . {t.footer.onetTrademark}{' '}
            {t.footer.ccLicense}{' '}
            {t.footer.blsAttribution}
          </p>
        </div>
      </div>
    </footer>
  );
}

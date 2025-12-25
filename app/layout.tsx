import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { I18nProvider } from '@/lib/i18n/context';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'CareerFit Quiz - Discover Your Ideal Tech Role',
  description:
    'Take an 8-12 minute quiz to discover which tech roles may be a great fit for you. Get personalized role-fit scores, strengths analysis, and a learning plan.',
  openGraph: {
    title: 'CareerFit Quiz - Discover Your Ideal Tech Role',
    description:
      'Take an 8-12 minute quiz to discover which tech roles may be a great fit for you.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerFit Quiz - Discover Your Ideal Tech Role',
    description:
      'Take an 8-12 minute quiz to discover which tech roles may be a great fit for you.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <I18nProvider>
            <div className="min-h-screen flex flex-col">
              {children}
            </div>
            <Toaster position="top-center" richColors />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import '@/styles/globals.css';

import { baseMetadata } from '@/app/metadata';
import { Space_Grotesk, Inter } from 'next/font/google';
import { A11yProvider } from '@/components/A11yProvider';
import { DevAxeAudit } from '@/lib/a11y/DevAxeAudit';
import { FpsHud } from '@/lib/perf/FpsHud';
import { PersonStructuredData } from '@/components/seo/StructuredData';
import { AnalyticsProvider } from '@/lib/analytics/AnalyticsProvider';
import { PerformanceProvider } from '@/lib/perf/PerformanceProvider';
import { ThemeManager } from '@/components/os/ThemeManager';
import { EnhancedEffects } from '@/components/effects/EnhancedEffects';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata = baseMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <PersonStructuredData />
      </head>
      <body>
        <PerformanceProvider>
          <AnalyticsProvider>
            <A11yProvider>
              <ThemeManager />
              {children}
              <EnhancedEffects />
            </A11yProvider>
          </AnalyticsProvider>
        </PerformanceProvider>
        {process.env.NODE_ENV === 'development' && (
          <>
            <DevAxeAudit />
            <FpsHud />
          </>
        )}
      </body>
    </html>
  );
}

import '@/styles/globals.css';
import '@/styles/motion.css';
import '@/styles/tokens.css';
import { baseMetadata } from '@/app/metadata';
import { Space_Grotesk, Inter } from 'next/font/google';
import { A11yProvider } from '@/components/A11yProvider';
import { DevAxeAudit } from '@/lib/a11y/DevAxeAudit';
import { FpsHud } from '@/lib/perf/FpsHud';
import { PersonStructuredData } from '@/components/seo/StructuredData';
import { AnalyticsProvider } from '@/lib/analytics/AnalyticsProvider';
import { PerformanceProvider } from '@/lib/perf/PerformanceProvider';
import { ThemeManager } from '@/components/os/ThemeManager';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

// Export the metadata object
export const metadata = baseMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <PersonStructuredData />
      </head>
      <body>
        <A11yProvider>
          {children}
        </A11yProvider>
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

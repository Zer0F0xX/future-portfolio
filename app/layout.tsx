import { baseMetadata } from '@/app/metadata'; // Import base metadata
import { Space_Grotesk, Inter } from 'next/font/google';
import { A11yProvider } from '@/lib/a11y/A11yProvider';
import { DevAxeAudit } from '@/lib/a11y/DevAxeAudit';
import { FpsHud } from '@/lib/perf/FpsHud';
import { PersonStructuredData } from '@/components/seo/StructuredData';

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

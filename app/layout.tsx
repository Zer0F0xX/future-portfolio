import '@/styles/globals.css';

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

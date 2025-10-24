import './globals.css';
import type { Metadata } from 'next';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { A11yProvider } from '@/components/A11yProvider';
import { Header } from '@/components/layout/Header';
import { JsonLd } from '@/components/layout/JsonLd';
import { Space_Grotesk, Inter } from 'next/font/google';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Anna Tennyson',
  url: 'https://paid.ca', // Replace with the actual production URL
  jobTitle: 'Futurist Web Architect',
  sameAs: [
    'https://github.com/foxctrl', // Replace with actual links
    'https://www.linkedin.com/in/annatennyson',
  ],
};

export const metadata: Metadata = {
  title: 'PAID.ca — Dimensional Archive',
  description: 'Anna Tennyson · Futurist Web Architect. Building futures disguised as interfaces.',
  openGraph: {
    title: 'PAID.ca — Dimensional Archive',
    description: 'Anna Tennyson · Futurist Web Architect. Building futures disguised as interfaces.',
    url: 'https://paid.ca', // Replace with the actual production URL
    siteName: 'PAID.ca',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-gradient-to-b from-[#03050d] via-[#060a18] to-[#0b1026] text-slate-100">
        <Header />
        <JsonLd data={personSchema} />
        <div id="page-content">
          <A11yProvider>
            <ErrorBoundary>{children}</ErrorBoundary>
          </A11yProvider>
        </div>
      </body>
    </html>
  );
}

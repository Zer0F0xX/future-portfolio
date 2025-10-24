import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'PAID.ca — Dimensional Archive',
  description: 'Anna Tennyson · Futurist Web Architect'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-gradient-to-b from-[#03050d] via-[#060a18] to-[#0b1026] text-slate-100">
        {children}
      </body>
    </html>
  );
}

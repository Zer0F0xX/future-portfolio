// File: components/ui/SkipLink.tsx
import Link from 'next/link';

export const SkipLink = ({ href }: { href: string }) => (
  <a
    href={href}
    className="absolute left-1/2 top-4 -translate-x-1/2 -translate-y-20 rounded-full border border-neonCyan/50 bg-void/80 px-4 py-2 text-sm uppercase tracking-widest text-neonCyan transition-transform focus:translate-y-0"
  >
    Skip to content
  </a>
);

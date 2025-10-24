'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';

type NavLink = {
  href: Route;
  label: string;
};

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-auto fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-full border border-cyan-200/20 bg-[rgba(9,18,34,0.72)] px-6 py-3 backdrop-blur-2xl">
      <nav className="flex items-center gap-8 text-sm uppercase tracking-[0.2em] text-cyan-100/80">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors hover:text-cyan-50 ${
              pathname === link.href ? 'text-cyan-100' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

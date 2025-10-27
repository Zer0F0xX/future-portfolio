/**
 * RichMDX Component
 * Safe MDX renderer with custom components
 * Renders markdown/MDX content with styling and interactive elements
 */

'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

// ==================== Custom MDX Components ====================

/**
 * Custom heading with anchor links
 */
function Heading({ level, children }: { level: 1 | 2 | 3 | 4 | 5 | 6; children: ReactNode }) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const id = typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : undefined;

  const classes = {
    1: 'text-4xl md:text-5xl font-display uppercase tracking-wider text-neonCyan mt-12 mb-6',
    2: 'text-3xl md:text-4xl font-display uppercase tracking-wide text-neonCyan mt-10 mb-5',
    3: 'text-2xl md:text-3xl font-display text-irisMagenta mt-8 mb-4',
    4: 'text-xl md:text-2xl font-display text-white mt-6 mb-3',
    5: 'text-lg md:text-xl font-body font-bold text-white/90 mt-4 mb-2',
    6: 'text-base md:text-lg font-body font-bold text-white/80 mt-3 mb-2',
  };

  return (
    <Tag id={id} className={classes[level]}>
      {children}
    </Tag>
  );
}

/**
 * Custom paragraph with spacing
 */
function Paragraph({ children }: { children: ReactNode }) {
  return <p className="mb-6 leading-relaxed text-slate-200/90">{children}</p>;
}

/**
 * Custom link with external indicator
 */
function CustomLink({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return <>{children}</>;

  const isExternal = href.startsWith('http');
  const isAnchor = href.startsWith('#');

  if (isAnchor) {
    return (
      <a href={href} className="text-neonCyan hover:text-irisMagenta transition-colors underline">
        {children}
      </a>
    );
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neonCyan hover:text-irisMagenta transition-colors underline inline-flex items-center gap-1"
      >
        {children}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    );
  }

  return (
    <Link href={href} className="text-neonCyan hover:text-irisMagenta transition-colors underline">
      {children}
    </Link>
  );
}

/**
 * Custom list items
 */
function ListItem({ children }: { children: ReactNode }) {
  return <li className="mb-2 text-slate-200/90">{children}</li>;
}

function UnorderedList({ children }: { children: ReactNode }) {
  return <ul className="mb-6 ml-6 list-disc space-y-2">{children}</ul>;
}

function OrderedList({ children }: { children: ReactNode }) {
  return <ol className="mb-6 ml-6 list-decimal space-y-2">{children}</ol>;
}

/**
 * Custom code blocks
 */
function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="px-2 py-1 bg-slate-800/50 text-neonCyan rounded font-mono text-sm">
      {children}
    </code>
  );
}

function CodeBlock({ children, className }: { children: ReactNode; className?: string }) {
  const language = className?.replace('language-', '');

  return (
    <div className="mb-6 rounded-lg overflow-hidden border border-slate-700/50">
      {language && (
        <div className="px-4 py-2 bg-slate-800/80 text-xs font-mono text-slate-400 uppercase tracking-wider">
          {language}
        </div>
      )}
      <pre className="p-4 bg-slate-900/50 overflow-x-auto">
        <code className="text-sm font-mono text-slate-200">{children}</code>
      </pre>
    </div>
  );
}

/**
 * Custom blockquote
 */
function Blockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="mb-6 pl-6 border-l-4 border-irisMagenta italic text-slate-300">
      {children}
    </blockquote>
  );
}

/**
 * Custom horizontal rule
 */
function HorizontalRule() {
  return <hr className="my-12 border-t border-neonCyan/20" />;
}

/**
 * Custom image with Next.js optimization
 */
function CustomImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;

  return (
    <figure className="mb-8">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-700/50">
        <Image
          src={src}
          alt={alt || ''}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-slate-400">{alt}</figcaption>
      )}
    </figure>
  );
}

/**
 * Custom table
 */
function Table({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 overflow-x-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

function TableHead({ children }: { children: ReactNode }) {
  return <thead className="bg-slate-800/50">{children}</thead>;
}

function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }: { children: ReactNode }) {
  return <tr className="border-b border-slate-700/30">{children}</tr>;
}

function TableHeader({ children }: { children: ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-sm font-display uppercase tracking-wider text-neonCyan">
      {children}
    </th>
  );
}

function TableCell({ children }: { children: ReactNode }) {
  return <td className="px-4 py-3 text-sm text-slate-200">{children}</td>;
}

// ==================== MDX Components Map ====================

const components = {
  h1: (props: any) => <Heading level={1} {...props} />,
  h2: (props: any) => <Heading level={2} {...props} />,
  h3: (props: any) => <Heading level={3} {...props} />,
  h4: (props: any) => <Heading level={4} {...props} />,
  h5: (props: any) => <Heading level={5} {...props} />,
  h6: (props: any) => <Heading level={6} {...props} />,
  p: Paragraph,
  a: CustomLink,
  li: ListItem,
  ul: UnorderedList,
  ol: OrderedList,
  code: InlineCode,
  pre: CodeBlock,
  blockquote: Blockquote,
  hr: HorizontalRule,
  img: CustomImage,
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
};

// ==================== Main Component ====================

interface RichMDXProps {
  source: string | MDXRemoteSerializeResult;
  className?: string;
}

/**
 * RichMDX Component
 * Renders MDX content with custom styling
 */
export async function RichMDX({ source, className = '' }: RichMDXProps) {
  // Serialize if raw string provided
  const mdxSource = typeof source === 'string' ? await serialize(source) : source;

  return (
    <article className={`prose prose-invert max-w-none ${className}`}>
      <MDXRemote {...mdxSource} components={components} />
    </article>
  );
}

/**
 * Helper function to serialize MDX on server
 */
export async function serializeMDX(content: string): Promise<MDXRemoteSerializeResult> {
  return serialize(content, {
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
    },
  });
}

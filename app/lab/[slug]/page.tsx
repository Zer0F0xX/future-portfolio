/**
 * Experiment Log Detail Page
 * Renders MDX experiment logs with RichMDX component
 * Static generation at build time
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLogBySlug, getLogs } from '@/lib/content/fs';
import { RichMDX } from '@/components/content/RichMDX';
import { JsonLd } from '@/components/layout/JsonLd';

type Props = {
  params: { slug: string };
};

// Generate static pages at build time
export async function generateStaticParams() {
  const logs = await getLogs();
  return logs.map((log) => ({
    slug: log.slug,
  }));
}

// Generate dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const log = await getLogBySlug(params.slug);

  if (!log) {
    return {};
  }

  return {
    title: `${log.title} | Lab | PAID.ca`,
    description: log.excerpt || `Experiment log #${log.id}: ${log.title}`,
    openGraph: {
      title: `${log.title} | Lab | PAID.ca`,
      description: log.excerpt || `Experiment log #${log.id}: ${log.title}`,
      url: `https://paid.ca/lab/${log.slug}`,
    },
    keywords: log.tags,
  };
}

export default async function LogPage({ params }: Props) {
  const log = await getLogBySlug(params.slug);

  if (!log) {
    notFound();
  }

  // Format date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(log.date);

  // JSON-LD schema
  const logSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: log.title,
    datePublished: log.date.toISOString(),
    author: {
      '@type': 'Person',
      name: 'PAID',
    },
    keywords: log.tags.join(', '),
  };

  return (
    <>
      <JsonLd data={logSchema} />

      <article className="mx-auto max-w-4xl px-6 py-20 md:py-32">
        {/* Header */}
        <header className="border-b border-irisMagenta/20 pb-12">
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
            <span className="font-display uppercase tracking-wider text-irisMagenta/70">
              Experiment #{log.id}
            </span>
            <span className="text-slate-600">·</span>
            <time
              dateTime={log.date.toISOString()}
              className="text-slate-400"
            >
              {formattedDate}
            </time>
            {log.readingTime && (
              <>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">{log.readingTime} min read</span>
              </>
            )}
            {log.featured && (
              <>
                <span className="text-slate-600">·</span>
                <span className="rounded-full bg-irisMagenta/20 px-3 py-1 text-xs uppercase tracking-wider text-irisMagenta">
                  Featured
                </span>
              </>
            )}
          </div>

          <h1 className="font-display text-4xl uppercase tracking-wider text-irisMagenta md:text-5xl lg:text-6xl">
            {log.title}
          </h1>

          {/* Tags */}
          {log.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {log.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/lab?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-neonCyan/30 px-4 py-1.5 text-sm text-neonCyan/80 transition-colors hover:border-neonCyan hover:text-neonCyan"
                >
                  {tag}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* MDX Content */}
        <div className="mt-12">
          <RichMDX source={log.content} />
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-irisMagenta/20 pt-12">
          <div className="flex items-center justify-between">
            <a
              href="/lab"
              className="group inline-flex items-center gap-2 text-sm text-irisMagenta transition-colors hover:text-neonCyan"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Lab
            </a>

            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>Experiment #{log.id}</span>
            </div>
          </div>
        </footer>
      </article>
    </>
  );
}

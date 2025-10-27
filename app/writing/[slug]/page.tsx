/**
 * Essay Detail Page
 * Renders MDX essays with RichMDX component
 * Static generation at build time
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getEssayBySlug, getEssaySlugs } from '@/lib/content/fs';
import { RichMDX } from '@/components/content/RichMDX';
import { JsonLd } from '@/components/layout/JsonLd';
import Image from 'next/image';

type Props = {
  params: { slug: string };
};

// Generate static pages at build time
export async function generateStaticParams() {
  const slugs = await getEssaySlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const essay = await getEssayBySlug(params.slug);

  if (!essay) {
    return {};
  }

  return {
    title: `${essay.title} | PAID.ca`,
    description: essay.synopsis,
    openGraph: {
      title: `${essay.title} | PAID.ca`,
      description: essay.synopsis,
      url: `https://paid.ca/writing/${essay.slug}`,
      images: essay.cover ? [{ url: essay.cover }] : [],
    },
    keywords: essay.keywords,
  };
}

export default async function EssayPage({ params }: Props) {
  const essay = await getEssayBySlug(params.slug);

  if (!essay) {
    notFound();
  }

  // Format date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(essay.date);

  // JSON-LD schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: essay.title,
    description: essay.synopsis,
    datePublished: essay.date.toISOString(),
    author: {
      '@type': 'Person',
      name: 'PAID',
    },
    keywords: essay.keywords.join(', '),
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      <article className="mx-auto max-w-4xl px-6 py-20 md:py-32">
        {/* Header */}
        <header className="border-b border-neonCyan/20 pb-12">
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
            <time
              dateTime={essay.date.toISOString()}
              className="font-display uppercase tracking-wider text-neonCyan/70"
            >
              {formattedDate}
            </time>
            {essay.readingTime && (
              <>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">{essay.readingTime} min read</span>
              </>
            )}
          </div>

          <h1 className="font-display text-4xl uppercase tracking-wider text-neonCyan md:text-5xl lg:text-6xl">
            {essay.title}
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-slate-300">{essay.synopsis}</p>

          {/* Keywords */}
          {essay.keywords.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {essay.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-irisMagenta/30 px-4 py-1.5 text-sm text-irisMagenta/80"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Cover Image */}
        {essay.cover && (
          <div className="my-12 overflow-hidden rounded-lg border border-slate-700/50">
            <div className="relative aspect-[21/9] w-full">
              <Image
                src={essay.cover}
                alt={essay.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
              />
            </div>
          </div>
        )}

        {/* MDX Content */}
        <div className="mt-12">
          <RichMDX source={essay.content} />
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-neonCyan/20 pt-12">
          <div className="flex items-center justify-between">
            <a
              href="/writing"
              className="group inline-flex items-center gap-2 text-sm text-neonCyan transition-colors hover:text-irisMagenta"
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
              Back to Essays
            </a>

            {essay.excerpt && (
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: essay.title,
                      text: essay.synopsis,
                      url: window.location.href,
                    });
                  }
                }}
                className="text-sm text-slate-400 transition-colors hover:text-neonCyan"
                aria-label="Share this essay"
              >
                Share
              </button>
            )}
          </div>
        </footer>
      </article>
    </>
  );
}

/**
 * Project Detail Page
 * Renders MDX projects with RichMDX component
 * Static generation at build time
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectBySlug, getProjectSlugs } from '@/lib/content/fs';
import { RichMDX } from '@/components/content/RichMDX';
import { JsonLd } from '@/components/layout/JsonLd';
import Image from 'next/image';

type Props = {
  params: { slug: string };
};

// Generate static pages at build time
export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | PAID.ca`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | PAID.ca`,
      description: project.summary,
      url: `https://paid.ca/work/${project.slug}`,
      images: project.media && project.media.length > 0 ? [{ url: project.media[0] }] : [],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Format dates
  const startDate = new Date(project.dates.start + '-01');
  const endDate = new Date(project.dates.end + '-01');
  const dateRange = `${startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} – ${endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;

  // JSON-LD schema
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    author: {
      '@type': 'Person',
      name: 'PAID',
    },
  };

  return (
    <>
      <JsonLd data={projectSchema} />

      <article className="mx-auto max-w-4xl px-6 py-20 md:py-32">
        {/* Header */}
        <header className="border-b border-neonCyan/20 pb-12">
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
            <span className="font-display uppercase tracking-wider text-neonCyan/70">
              {project.role}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">{dateRange}</span>
            {project.featured && (
              <>
                <span className="text-slate-600">·</span>
                <span className="rounded-full bg-neonCyan/20 px-3 py-1 text-xs uppercase tracking-wider text-neonCyan">
                  Featured
                </span>
              </>
            )}
          </div>

          <h1 className="font-display text-4xl uppercase tracking-wider text-neonCyan md:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-slate-300">{project.summary}</p>

          {/* Tech Stack */}
          {project.stack.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-irisMagenta/30 px-4 py-1.5 text-sm text-irisMagenta/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Media Gallery */}
        {project.media && project.media.length > 0 && (
          <div className="my-12 grid gap-4 md:grid-cols-2">
            {project.media.slice(0, 2).map((url, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-lg border border-slate-700/50"
              >
                <div className="relative aspect-video w-full">
                  <Image
                    src={url}
                    alt={`${project.title} - Image ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="my-16 grid gap-8 sm:grid-cols-3">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="border-l-2 border-neonCyan pl-6"
              >
                <div className="font-display text-3xl text-neonCyan">
                  {metric.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-300">
                  {metric.label}
                </div>
                {metric.description && (
                  <div className="mt-1 text-xs text-slate-500">
                    {metric.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* MDX Content */}
        <div className="mt-12">
          <RichMDX source={project.content} />
        </div>

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <div className="mt-16 flex flex-wrap gap-4">
            {project.links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-neonCyan/30 px-6 py-3 text-sm font-semibold text-neonCyan transition-all hover:border-neonCyan hover:bg-neonCyan/10"
              >
                {link.label}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 border-t border-neonCyan/20 pt-12">
          <div className="flex items-center justify-between">
            <a
              href="/work"
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
              Back to Projects
            </a>

            <span className="text-sm text-slate-500">{dateRange}</span>
          </div>
        </footer>
      </article>
    </>
  );
}

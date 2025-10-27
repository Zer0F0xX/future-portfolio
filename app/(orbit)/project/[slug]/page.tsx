import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectBySlug, projects } from '@/content/projects';
import { JsonLd } from '@/components/layout/JsonLd';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

// Generate static pages at build time
export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

// Generate dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | PAID.ca`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | PAID.ca`,
      description: project.summary,
      url: `https://paid.ca/project/${project.slug}`,
    },
  };
}

export default function OrbitProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

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
    <div className="flex h-screen w-screen items-start justify-center overflow-y-auto px-6 py-32">
      <div className="mx-auto max-w-4xl bg-deepVoid/80 backdrop-blur-sm rounded-lg border border-neonCyan/20 p-8 md:p-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-neonCyan/70 hover:text-neonCyan transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </div>

        {/* Header */}
        <header className="text-center mb-16">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-irisMagenta/70">
            {project.industry} · {project.year}
          </p>
          <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.3em] text-neonCyan md:text-5xl">
            {project.title}
          </h1>
          <JsonLd data={projectSchema} />
          <p className="mt-6 text-lg leading-relaxed text-slate-200/80">{project.summary}</p>
        </header>

        {/* Case Study Sections */}
        <div className="space-y-16">
          <section>
            <h2 className="font-display text-2xl uppercase tracking-[0.2em] text-neonCyan mb-4">
              Problem
            </h2>
            <p className="leading-relaxed text-slate-300/90">{project.problem}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-[0.2em] text-neonCyan mb-4">
              Approach
            </h2>
            <p className="leading-relaxed text-slate-300/90">{project.approach}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-[0.2em] text-neonCyan mb-4">
              Outcome
            </h2>
            <p className="leading-relaxed text-slate-300/90">{project.outcome}</p>
          </section>
        </div>

        {/* Tags */}
        <div className="mt-16 border-t border-neonCyan/20 pt-10 text-center">
          <h3 className="font-display text-lg uppercase tracking-[0.2em] text-neonCyan">
            Tech & Methods
          </h3>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neonCyan/30 px-4 py-1.5 text-sm text-neonCyan/80 hover:border-neonCyan/50 hover:text-neonCyan transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-neonCyan/10 hover:bg-neonCyan/20 border-2 border-neonCyan/50 hover:border-neonCyan rounded-lg font-display uppercase tracking-wider text-neonCyan hover:text-white transition-all duration-300 hover:scale-105"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Placeholder for future 3D model integration */}
        <div className="mt-16 text-center">
          <p className="text-xs text-slate-500 italic">
            [3D model integration point - Project-specific visualization will be rendered here]
          </p>
        </div>
      </div>
    </div>
  );
}

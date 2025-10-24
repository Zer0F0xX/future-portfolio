import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectBySlug, projects } from '@/content/projects';
import { JsonLd } from '@/components/layout/JsonLd';

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
      url: `https://paid.ca/work/${project.slug}`, // Replace with production URL
    },
  };
}

export default function ProjectPage({ params }: Props) {
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
      name: 'Anna Tennyson',
    },
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-32">
      <div className="text-center">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-cyan-200/70">
          {project.industry} · {project.year}
        </p>
        <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.3em] text-cyan-100 md:text-5xl">
          {project.title}
        </h1>
        <JsonLd data={projectSchema} />
        <p className="mt-6 text-lg leading-relaxed text-slate-200/80">{project.summary}</p>
      </div>

      <div className="mt-20 grid gap-16">
        <section>
          <h2 className="font-display text-2xl uppercase tracking-[0.2em] text-cyan-100">Problem</h2>
          <p className="mt-4 leading-relaxed text-slate-300/90">{project.problem}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl uppercase tracking-[0.2em] text-cyan-100">Approach</h2>
          <p className="mt-4 leading-relaxed text-slate-300/90">{project.approach}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl uppercase tracking-[0.2em] text-cyan-100">Outcome</h2>
          <p className="mt-4 leading-relaxed text-slate-300/90">{project.outcome}</p>
        </section>
      </div>

      <div className="mt-20 border-t border-cyan-200/20 pt-10 text-center">
        <h3 className="font-display text-lg uppercase tracking-[0.2em] text-cyan-100">Tech & Methods</h3>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-cyan-200/30 px-4 py-1.5 text-sm text-cyan-100/80">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}

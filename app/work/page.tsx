import Link from 'next/link';
import { projects } from '@/content/projects';

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-32">
      <div className="text-center">
        <h1 className="font-display text-4xl uppercase tracking-[0.3em] text-cyan-100 md:text-5xl">
          Case Studies
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-200/80">
          A selection of projects demonstrating my work across various industries.
        </p>
      </div>

      <div className="mt-20 grid gap-8">
        {projects.map((project) => (
          <Link
            href={`/work/${project.slug}`}
            key={project.slug}
            className="block rounded-2xl border border-cyan-200/20 bg-black/30 p-8 transition-all hover:border-cyan-200/40 hover:bg-black/50"
          >
            <p className="font-display text-sm uppercase tracking-[0.2em] text-cyan-200/70">
              {project.industry}
            </p>
            <h2 className="mt-2 font-display text-2xl uppercase tracking-[0.2em] text-cyan-100">
              {project.title}
            </h2>
            <p className="mt-4 text-slate-300/90">{project.summary}</p>
            <span className="mt-6 inline-block font-display text-xs uppercase tracking-[0.2em] text-cyan-200">
              View Project &rarr;
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}

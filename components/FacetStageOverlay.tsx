'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useSceneStore } from '@/stores/sceneStore';
import { orbWorlds } from '@/data/portfolio';

type BaseSection = {
  title: string;
  subtitle: string;
  description: string;
  /** optional chips like “GLSL”, “WCAG 2.2”, etc. */
  metrics?: string[];
  /** optional tags like “Next.js”, “React”, etc. */
  tags?: string[];
};

export type FacetSection =
  | (BaseSection & { bullets: string[] })
  | (BaseSection & { link: string });

export default function FacetStageOverlay() {
  const activeOrb = useSceneStore((state) => state.activeOrb);
  const close = useSceneStore((state) => state.closeOrb);

  const orb = activeOrb ? orbWorlds.find((item) => item.id === activeOrb.id) : undefined;
  const sections: FacetSection[] = orb?.sections ?? [];

  return (
    <AnimatePresence>
      {orb && (
        <motion.section
          className="pointer-events-auto fixed inset-0 z-40 grid place-items-center bg-black/65 backdrop-blur-[50px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-[min(1100px,92vw)] overflow-hidden rounded-[32px] border border-cyan-200/25 bg-[rgba(8,18,34,0.78)] shadow-[0_55px_160px_-45px_rgba(0,0,0,0.9)]"
            initial={{ y: 50, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.82, 0.25, 1] }}
          >
            <header
              className="relative flex flex-col gap-3 bg-gradient-to-r from-black/40 via-black/10 to-transparent px-10 py-10 text-left md:flex-row md:items-end md:justify-between"
            >
              <div>
                <p className="font-display text-xs uppercase tracking-[0.36em] text-cyan-200/70">
                  {orb.title}
                </p>
                <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.4em] text-cyan-100">
                  {orb.headline}
                </h2>
                <p className="mt-4 max-w-2xl text-sm text-cyan-200/80">
                  {orb.body}
                </p>
              </div>
              {orb.highlights?.length ? (
                <ul className="flex max-w-sm flex-col gap-2 text-xs uppercase tracking-[0.24em] text-cyan-200/70">
                  {orb.highlights.map((item) => (
                    <li key={item} className="rounded-full border border-cyan-200/20 px-3 py-1 text-right">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </header>
            <div className="grid gap-6 px-10 pb-12 pt-6">
              <div className="rounded-2xl border border-cyan-200/15 bg-black/50 p-6 text-left">
                <h3 className="font-display text-sm uppercase tracking-[0.3em] text-cyan-100/80">Stage overview</h3>
                <p className="mt-3 text-sm text-cyan-100/70">{orb.voice ?? 'Exploring this facet of the archive.'}</p>
                <button
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/40 px-4 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-cyan-100 hover:bg-cyan-200/10"
                  onClick={close}
                >
                  Close stage
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {sections.map((section) => (
                  <div key={section.title} className="rounded-2xl border border-cyan-200/15 bg-black/40 p-6 text-left">
                    <div className="flex flex-col gap-1">
                      <p className="text-[0.6rem] uppercase tracking-[0.3em] text-cyan-200/60">{section.subtitle}</p>
                      <h3 className="font-display text-xl uppercase tracking-[0.3em] text-cyan-100">
                        {section.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm text-cyan-100/75">{section.description}</p>
                    {section.metrics?.length ? (
                      <ul className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                        {section.metrics.map((metric) => (
                          <li key={metric} className="rounded-full border border-cyan-200/30 px-3 py-1">
                            {metric}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {'bullets' in section && section.bullets?.length ? (
                      <ul className="mt-3 list-disc space-y-1 pl-4 text-[0.75rem] text-cyan-100/70">
                        {section.bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {section.tags?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2 text-[0.55rem] uppercase tracking-[0.24em] text-cyan-200/70">
                        {section.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-cyan-200/30 px-3 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    {'link' in section && section.link ? (
                      <a
                        href={section.link}
                        className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-cyan-200 hover:text-cyan-50"
                      >
                        View details →
                      </a>
                    ) : null}
                </div>
              ))}
            </div>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useSceneStore } from '@/stores/sceneStore';
import { contactCopy } from '@/data/portfolio';

export default function ContactOutro() {
  const prefersReducedMotion = useReducedMotion();
  const hasOrb = !!useSceneStore((state) => state.activeOrb);

  return (
    <motion.footer
      className="pointer-events-auto relative z-30 mx-auto mt-[40vh] flex w-full max-w-4xl flex-col items-center gap-6 px-6 pb-32 text-center"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{
        opacity: hasOrb ? 0 : 1,
        y: hasOrb ? 60 : 0,
        display: hasOrb ? 'none' : 'flex',
      }}
      transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      aria-label="Contact outro"
    >
      <motion.div
        className="rounded-3xl border border-cyan-300/20 bg-[rgba(9,18,34,0.72)] px-10 py-14 shadow-[0_45px_140px_-50px_rgba(0,0,0,0.88)] backdrop-blur-3xl"
        initial={{ scale: 0.96 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.82, 0.25, 1] }}
      >
        <p className="font-display text-sm uppercase tracking-[0.5em] text-cyan-200/70">Contact</p>
        <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.35em] text-cyan-100">
          {contactCopy.heading}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-slate-200/80">{contactCopy.body}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm uppercase tracking-[0.28em]">
          {contactCopy.cta.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              target={cta.external ? '_blank' : undefined}
              rel={cta.external ? 'noreferrer' : undefined}
              className="rounded-full border border-cyan-200 px-6 py-2 text-cyan-100 hover:bg-cyan-200/10"
            >
              {cta.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.footer>
  );
}

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { legacyPanels } from '@/data/portfolio';

export default function LegacyPanels() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const tilt = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 0.6]);

  return (
    <section ref={ref} className="pointer-events-auto relative z-20 mt-[70vh] flex flex-col items-center gap-10 px-6 pb-40">
      <motion.h2
        className="font-display text-[13vw] uppercase tracking-[0.45em] text-cyan-100/40 md:text-6xl"
        style={{ transform: tilt, opacity: glow }}
      >
        Legacy
      </motion.h2>
      <div className="grid w-full max-w-5xl gap-8 md:grid-cols-3">
        {legacyPanels.map((item, idx) => (
          <motion.article
            key={item.title}
            className="rounded-3xl border border-cyan-300/25 bg-[rgba(10,23,44,0.68)] p-6 text-left shadow-[0_35px_120px_-50px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: idx * 0.15, duration: 0.7, ease: [0.25, 0.82, 0.25, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.36em] text-cyan-300/60">{item.subtitle}</p>
            <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.3em] text-cyan-100">
              {item.title}
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-slate-200/80">{item.copy}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

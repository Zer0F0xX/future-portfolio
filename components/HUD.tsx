'use client';

import { motion } from 'framer-motion';
import { useSceneStore } from '@/stores/sceneStore';
import { timelinePhases } from '@/data/portfolio';

export default function HUD() {
  const activePhase = useSceneStore((state) => state.activePhase);

  const phase = timelinePhases.find((item) => item.id === activePhase) ?? timelinePhases[0];
  if (!phase) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-between px-6 py-6 text-[0.6rem] uppercase tracking-[0.28em] text-cyan-100/70 md:px-10 md:text-xs">
      <div className="pointer-events-auto flex flex-col gap-1">
        <span className="font-display text-sm tracking-[0.4em] text-cyan-100 md:text-base">PAID.ca</span>
        <span className="text-[0.55rem] md:text-[0.65rem]">Anna Tennyson — Futurist Web Architect</span>
      </div>
      <motion.div
        key={phase.id}
        className="pointer-events-auto max-w-sm text-right"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <p className="text-[0.55rem] md:text-[0.6rem] text-cyan-200/70">{phase.label} · {phase.range}</p>
        <p className="mt-1 text-[0.55rem] leading-relaxed text-cyan-100/70 md:text-[0.65rem]">
          {phase.description}
        </p>
      </motion.div>
    </div>
  );
}

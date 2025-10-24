// File: components/HUD.tsx
'use client';

import { useSceneStore } from '@/stores/sceneStore';
import { AnimatePresence, motion } from 'framer-motion';
import { ReduceMotionToggle } from './ui/ReduceMotionToggle';
import { orbWorlds } from '@/data/portfolio';
import { usePerformanceStore } from '@/lib/perf/performanceStore';

function PerformanceToggle() {
  const { tier, setTier, _hasHydrated } = usePerformanceStore();

  if (!_hasHydrated) return null;

  return (
    <button
      onClick={() => setTier(tier === 'High' ? 'Low' : 'High')}
      className="rounded-full border border-cyan-200/30 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-cyan-100/70 hover:bg-cyan-200/10"
      aria-pressed={tier === 'High'}
    >
      Quality: {tier}
    </button>
  );
}

export default function HUD() {
  const activeOrb = useSceneStore((state) => state.activeOrb);
  const orb = activeOrb ? orbWorlds.find((item) => item.id === activeOrb.id) : undefined;
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-between px-6 py-6 text-[0.6rem] uppercase tracking-[0.28em] text-cyan-100/70 md:px-10 md:text-xs">
      <div className="pointer-events-auto flex flex-col gap-1">
        <span className="font-display text-sm tracking-[0.4em] text-cyan-100 md:text-base">
          PAID.ca
        </span>
        <span className="text-[0.55rem] md:text-[0.65rem]">
          Anna Tennyson — Futurist Web Architect
        </span>
      </div>
      <div className="pointer-events-auto flex items-start gap-4">
        <PerformanceToggle />
        <ReduceMotionToggle />
        <AnimatePresence>
          {orb && (
            <motion.div
              className="max-w-sm text-right"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-[0.55rem] text-cyan-200/70 md:text-[0.6rem]">
                {orb.title}
              </p>
              <p className="mt-1 text-[0.55rem] leading-relaxed text-cyan-100/70 md:text-[0.65rem]">
                {orb.headline}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
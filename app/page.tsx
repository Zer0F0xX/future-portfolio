'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SkipLink } from '@/components/ui/SkipLink';
import { WebGLSupport } from '@/components/os/WebGLSupport';
import TimelineRail from '@/components/TimelineRail';
import { PerformanceToggle } from '@/components/ui/PerformanceToggle';
import { HeroHook } from '@/components/copy/HeroHook';
import { useBootSequence } from '@/lib/motion/sequence';

export default function HomePage() {
  const [booted, setBooted] = useState(false);
  const bootScope = useBootSequence(booted);

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SkipLink href="#main-content" />
      <WebGLSupport />

      <AnimatePresence>
        {!booted && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-void"
          >
            <p className="animate-pulse font-display text-lg uppercase tracking-[0.3em] text-neonCyan">
              Booting Dimensional Archive...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content" ref={bootScope} className="relative z-10 h-screen w-screen opacity-0">
        {booted && (
          <>
            <div data-boot-sequence="2">
              <TimelineRail />
            </div>
            <div className="fixed left-4 top-4 z-50">
              <PerformanceToggle />
            </div>
            
            <div data-boot-sequence="1" className="flex h-full items-center justify-center">
              <HeroHook />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="pointer-events-none fixed bottom-24 left-1/2 z-20 -translate-x-1/2 text-center"
            >
              <p className="mt-2 text-sm text-white/60">
                Use arrow keys to navigate. Press Enter to select.
              </p>
            </motion.div>
          </>
        )}
      </main>
    </>
  );
}

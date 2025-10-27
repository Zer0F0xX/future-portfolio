'use client';

import { WebGLSupport } from '@/components/os/WebGLSupport';
import { SkipLink } from '@/components/ui/SkipLink';
import { PerformanceToggle } from '@/components/ui/PerformanceToggle';
import TimelineRail from '@/components/TimelineRail';
import { motion } from 'framer-motion';

/**
 * Orbit Layout
 * Provides the shared 3D scene and UI shell for all era-based pages (Origins, Now, Vector)
 * The 3D Chamber/HoloAvatar scene is rendered as a persistent background
 */
export default function OrbitLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink href="#main-content" />

      {/* 3D Scene - Persistent across all orbit routes */}
      <WebGLSupport />

      {/* Timeline Rail - Always visible for era navigation */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <TimelineRail />
      </motion.div>

      {/* Performance Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="fixed left-4 top-4 z-50"
      >
        <PerformanceToggle />
      </motion.div>

      {/* Main Content - Era-specific pages render here */}
      <main id="main-content" className="relative z-10">
        {children}
      </main>

      {/* Instructions Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pointer-events-none fixed bottom-8 left-1/2 z-20 -translate-x-1/2 text-center"
      >
        <div className="space-y-2">
          <p className="text-sm text-white/60">
            Navigate eras with the timeline rail
          </p>
          <p className="text-xs text-white/40">
            Arrow keys to navigate • Enter to select
          </p>
        </div>
      </motion.div>
    </>
  );
}

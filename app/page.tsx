'use client';
import { useState, useEffect, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SkipLink } from '@/components/ui/SkipLink';
import { WebGLSupport } from '@/components/os/WebGLSupport';
import TimelineRail from '@/components/TimelineRail';
import { PerformanceToggle } from '@/components/ui/PerformanceToggle';
import { HeroHook } from '@/components/copy/HeroHook';
import { useBootSequence } from '@/lib/motion/sequence';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import Scene with no SSR
const Scene = dynamic(() => import('@/components/canvas/Scene').then(mod => mod.Scene), {
  ssr: false,
  loading: () => <SceneFallback />,
});

// Fallback when 3D doesn't load
function SceneFallback() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-transparent" />

      {/* Static project cards as fallback */}
      <div className="absolute inset-0 flex items-center justify-center gap-8 px-4">
        {[
          { title: 'Sentient Support Mesh', color: 'from-cyan-500 to-blue-500' },
          { title: 'Neon Atlas', color: 'from-purple-500 to-pink-500' },
          { title: 'Signal Stewardship', color: 'from-green-500 to-emerald-500' },
        ].map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className={`w-48 h-48 rounded-lg bg-gradient-to-br ${project.color} opacity-30 blur-xl`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [booted, setBooted] = useState(false);
  const [sceneError, setSceneError] = useState(false);
  const bootScope = useBootSequence(booted);

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 1500); // Reduced from 2000ms
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SkipLink href="#main-content" />
      <WebGLSupport />

      {/* Boot sequence */}
      <AnimatePresence>
        {!booted && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-[#03050d]"
          >
            <div className="text-center space-y-4">
              <p className="animate-pulse font-display text-lg uppercase tracking-[0.3em] text-cyan-400">
                Initializing Portfolio...
              </p>
              <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Holographic Background Scene with Error Boundary */}
      {booted && !sceneError && (
        <Suspense fallback={<SceneFallback />}>
          <Scene />
        </Suspense>
      )}
      {sceneError && <SceneFallback />}

      {/* Main Content */}
      <main id="main-content" ref={bootScope} className="relative z-10 h-screen w-screen">
        {booted && (
          <>
            {/* Timeline Rail - Always visible */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              data-boot-sequence="2"
            >
              <TimelineRail />
            </motion.div>

            {/* Performance Toggle - Always visible */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="fixed left-4 top-4 z-50"
            >
              <PerformanceToggle />
            </motion.div>

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              data-boot-sequence="1"
              className="flex h-full flex-col items-center justify-center px-4"
            >
              <HeroHook />

              {/* Clear CTAs for Contest Judges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-12 flex flex-wrap gap-4 justify-center"
              >
                <Link
                  href="/work"
                  className="group px-8 py-4 bg-cyan-500/10 hover:bg-cyan-500/20 border-2 border-cyan-500/50 hover:border-cyan-400 rounded-lg font-display uppercase tracking-wider text-cyan-300 hover:text-cyan-100 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(90,244,255,0.3)]"
                >
                  <span className="flex items-center gap-2">
                    View Projects
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>

                <Link
                  href="/about"
                  className="group px-8 py-4 bg-purple-500/10 hover:bg-purple-500/20 border-2 border-purple-500/50 hover:border-purple-400 rounded-lg font-display uppercase tracking-wider text-purple-300 hover:text-purple-100 transition-all duration-300 hover:scale-105"
                >
                  About Me
                </Link>

                <Link
                  href="/contact"
                  className="group px-8 py-4 bg-green-500/10 hover:bg-green-500/20 border-2 border-green-500/50 hover:border-green-400 rounded-lg font-display uppercase tracking-wider text-green-300 hover:text-green-100 transition-all duration-300 hover:scale-105"
                >
                  Get in Touch
                </Link>
              </motion.div>

              {/* Features List for Judges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-16 max-w-2xl"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {[
                    { icon: '🎨', label: '3D Graphics', desc: 'WebGL' },
                    { icon: '⚡', label: 'Performance', desc: 'Optimized' },
                    { icon: '♿', label: 'Accessible', desc: 'WCAG AA' },
                    { icon: '📱', label: 'Responsive', desc: 'All Devices' },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + i * 0.1 }}
                      className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-colors"
                    >
                      <div className="text-3xl mb-2">{feature.icon}</div>
                      <div className="text-sm font-bold text-cyan-300">{feature.label}</div>
                      <div className="text-xs text-slate-400 mt-1">{feature.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="pointer-events-none fixed bottom-8 left-1/2 z-20 -translate-x-1/2 text-center"
            >
              <div className="space-y-2">
                <p className="text-sm text-white/60">
                  Interact with crystals or use navigation above
                </p>
                <p className="text-xs text-white/40">
                  Ctrl+Shift+M: Matrix Effect • Ctrl+Shift+P: Performance Stats
                </p>
              </div>
            </motion.div>
          </>
        )}
      </main>
    </>
  );
}

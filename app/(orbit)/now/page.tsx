'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NowPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-center"
      >
        <h1 className="font-display text-5xl uppercase tracking-[0.3em] text-irisMagenta md:text-6xl">
          Pulse
        </h1>
        <p className="mt-6 font-body text-lg leading-relaxed text-slate-300/90">
          2047–2049
        </p>
        <p className="mt-4 font-body text-base leading-relaxed text-slate-400/80">
          The active era. Real-world deployments of multi-agent systems, holographic interfaces,
          and consent frameworks. Where theory became practice, and adaptive experiences
          scaled globally.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Link
            href="/work"
            className="inline-block px-8 py-4 bg-irisMagenta/10 hover:bg-irisMagenta/20 border-2 border-irisMagenta/50 hover:border-irisMagenta rounded-lg font-display uppercase tracking-wider text-irisMagenta hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,87,246,0.3)]"
          >
            Explore Pulse Projects
          </Link>
        </motion.div>

        {/* Placeholder for future R3F integration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-xs text-slate-500 italic"
        >
          [3D scene integration point - Pulse-era projects will be rendered here]
        </motion.div>
      </motion.div>
    </div>
  );
}

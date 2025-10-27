'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function VectorPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-center"
      >
        <h1 className="font-display text-5xl uppercase tracking-[0.3em] text-purple-400 md:text-6xl">
          Vectors
        </h1>
        <p className="mt-6 font-body text-lg leading-relaxed text-slate-300/90">
          2050+
        </p>
        <p className="mt-4 font-body text-base leading-relaxed text-slate-400/80">
          The future direction. Emergent patterns, open frameworks, and the evolution of
          adaptive systems into trusted partners. Where technology becomes truly symbiotic
          with human intention.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Link
            href="/work"
            className="inline-block px-8 py-4 bg-purple-500/10 hover:bg-purple-500/20 border-2 border-purple-500/50 hover:border-purple-400 rounded-lg font-display uppercase tracking-wider text-purple-300 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
          >
            Explore Vector Projects
          </Link>
        </motion.div>

        {/* Placeholder for future R3F integration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-xs text-slate-500 italic"
        >
          [3D scene integration point - Vector-era projects will be rendered here]
        </motion.div>
      </motion.div>
    </div>
  );
}

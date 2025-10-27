'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OriginsPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-center"
      >
        <h1 className="font-display text-5xl uppercase tracking-[0.3em] text-neonCyan md:text-6xl">
          Origins
        </h1>
        <p className="mt-6 font-body text-lg leading-relaxed text-slate-300/90">
          2038–2046
        </p>
        <p className="mt-4 font-body text-base leading-relaxed text-slate-400/80">
          The foundation era. Where adaptive systems were first architected, and the principles
          of ethical AI, consent design, and human-centered automation took shape.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Link
            href="/work"
            className="inline-block px-8 py-4 bg-neonCyan/10 hover:bg-neonCyan/20 border-2 border-neonCyan/50 hover:border-neonCyan rounded-lg font-display uppercase tracking-wider text-neonCyan hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(90,244,255,0.3)]"
          >
            Explore Origins Projects
          </Link>
        </motion.div>

        {/* Placeholder for future R3F integration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-xs text-slate-500 italic"
        >
          [3D scene integration point - Origins-era projects will be rendered here]
        </motion.div>
      </motion.div>
    </div>
  );
}

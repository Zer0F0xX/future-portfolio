'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { useSceneStore } from '@/stores/sceneStore';
import { bootSequence } from '@/data/portfolio';

export default function ArrivalOverlay() {
  const prefersReducedMotion = useReducedMotion();
  const overlayVisible = useSceneStore((state) => state.overlayVisible);
  const dismiss = useSceneStore((state) => state.dismissOverlay);

  useEffect(() => {
    if (!overlayVisible) return;
    if ('speechSynthesis' in window) {
      bootSequence.forEach((line, idx) => {
        const utter = new SpeechSynthesisUtterance(line);
        utter.pitch = 0.8;
        utter.rate = 0.92;
        setTimeout(() => window.speechSynthesis.speak(utter), idx * 900);
      });
    }
  }, [overlayVisible]);

  if (!overlayVisible) return null;

  return (
    <motion.section
      className="pointer-events-auto fixed inset-0 z-50 grid place-items-center bg-[#03050de0] backdrop-blur-3xl"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.3 : 1.2, ease: 'easeOut' }}
      role="status"
      aria-live="assertive"
    >
      <div className="flex flex-col gap-4 text-center tracking-[0.35em] uppercase text-slate-200">
        {bootSequence.map((line, idx) => (
          <motion.p
            key={line}
            className="text-xs md:text-sm text-slate-400"
            initial={{ opacity: 0, y: idx === 0 ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.5, duration: 0.6 }}
          >
            {line}
          </motion.p>
        ))}
        <motion.button
          className="mt-4 inline-flex items-center justify-center rounded-full border border-cyan-300 px-6 py-2 text-xs uppercase tracking-[0.4em] text-cyan-200 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
          whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
          onClick={dismiss}
        >
          Enter the archive
        </motion.button>
      </div>
    </motion.section>
  );
}

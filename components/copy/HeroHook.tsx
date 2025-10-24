'use client';
import { useBootSequence } from '@/lib/motion/sequence';
import { heroHookVariants, HeroHookVariant } from '@/lib/content/copy';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function HeroHook() {
  const [variant, setVariant] = useState<HeroHookVariant | null>(null);

  useEffect(() => {
    const randomVariant = heroHookVariants[Math.floor(Math.random() * heroHookVariants.length)];
    setVariant(randomVariant);
  }, []);

  if (!variant) {
    return <span>&nbsp;</span>;
  }

  return (
    <div className="pointer-events-none text-center">
      <motion.h1
        key={variant.heading}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-display text-4xl uppercase tracking-[0.2em] text-white sm:text-5xl"
      >
        {variant.heading}
      </motion.h1>
      <motion.p
        key={variant.subheading}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 max-w-md text-base text-white/60 sm:text-lg"
      >
        {variant.subheading}
      </motion.p>
    </div>
  );
}

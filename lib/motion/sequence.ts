'use client';
import { useAnimate } from 'framer-motion';
import { useEffect } from 'react';
import { useA11yStore } from '@/lib/a11y/a11yStore';

export function useBootSequence(isBooted: boolean) {
  const [scope, animate] = useAnimate();
  const prefersReducedMotion = useA11yStore((s) => s.prefersReducedMotion);

  useEffect(() => {
    const sequence = async () => {
      if (isBooted) {
        await animate(scope.current, { opacity: 1 });

        if (prefersReducedMotion) return;

        await animate(
          '[data-boot-sequence="1"]',
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.6, ease: 'easeOut', delay: 0.2 }
        );
        await animate(
          '[data-boot-sequence="2"]',
          { opacity: [0, 1] },
          { duration: 0.4, at: '-0.2' }
        );
      }
    };
    sequence();
  }, [isBooted, animate, scope, prefersReducedMotion]);

  return scope;
}

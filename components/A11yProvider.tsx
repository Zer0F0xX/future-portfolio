'use client';

import { useEffect } from 'react';
import { useA11yStore } from '@/stores/a11yStore';

export function A11yProvider({ children }: { children: React.ReactNode }) {
  const { setPrefersReducedMotion, setHasHydrated, prefersReducedMotion } = useA11yStore();

  // One-time effect to initialize the motion preference from the browser
  useEffect(() => {
    if (!useA11yStore.getState()._hasHydrated) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      // We honor the persisted value in localStorage first, then the media query
      setPrefersReducedMotion(useA11yStore.getState().prefersReducedMotion || mediaQuery.matches);
      setHasHydrated(true);

      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [setPrefersReducedMotion, setHasHydrated]);

  // Effect to update the body attribute whenever the state changes
  useEffect(() => {
    if (prefersReducedMotion) {
      document.body.setAttribute('data-reduced-motion', 'true');
    } else {
      document.body.removeAttribute('data-reduced-motion');
    }
  }, [prefersReducedMotion]);

  return <>{children}</>;
}

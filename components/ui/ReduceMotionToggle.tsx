'use client';

import { useA11yStore } from '@/stores/a11yStore';

export function ReduceMotionToggle() {
  const { prefersReducedMotion, setPrefersReducedMotion, hydrated } = useA11yStore();

  if (!hydrated) {
    return null; // Don't render on the server or before hydration
  }

  return (
    <button
      onClick={() => setPrefersReducedMotion(!prefersReducedMotion)}
      className="rounded-full border border-cyan-200/30 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-cyan-100/70 hover:bg-cyan-200/10"
      aria-pressed={prefersReducedMotion}
    >
      Motion: {prefersReducedMotion ? 'Off' : 'On'}
    </button>
  );
}

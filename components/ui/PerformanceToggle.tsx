'use client';
import { usePerformanceStore } from '@/lib/perf/performanceStore';

const tiers = ['Low', 'Medium', 'High'];

export function PerformanceToggle() {
  const { tier, setTier } = usePerformanceStore();

  const cycleTier = () => {
    const currentIndex = tiers.indexOf(tier);
    const nextIndex = (currentIndex + 1) % tiers.length;
    setTier(tiers[nextIndex] as any);
  };

  return (
    <button
      onClick={cycleTier}
      className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-white/70 backdrop-blur-sm"
    >
      Quality: {tier}
    </button>
  );
}

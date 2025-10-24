import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PerformanceTier = 'Low' | 'Medium' | 'High';

type PerformanceState = {
  tier: PerformanceTier;
  isGpuTierKnown: boolean;
  setTier: (tier: PerformanceTier) => void;
  detectGpuTier: () => void;
};

const getGpuTier = (): PerformanceTier => {
  if (typeof window === 'undefined') return 'Medium';
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (isMobile) return 'Medium';
  return 'High';
};

export const usePerformanceStore = create<PerformanceState>()(
  persist(
    (set, get) => ({
      tier: 'Medium',
      isGpuTierKnown: false,
      setTier: (tier) => set({ tier }),
      detectGpuTier: () => {
        if (get().isGpuTierKnown) return;
        const detectedTier = getGpuTier();
        set({ tier: detectedTier, isGpuTierKnown: true });
        console.log(`GPU Tier Detected: ${detectedTier}`);
      },
    }),
    {
      name: 'paid-performance-storage',
    }
  )
);

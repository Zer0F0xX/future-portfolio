// File: lib/performanceStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PerformanceTier = 'Low' | 'High';

type PerformanceState = {
  tier: PerformanceTier;
  setTier: (tier: PerformanceTier) => void;
  _hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
};

export const usePerformanceStore = create<PerformanceState>()(
  persist(
    (set) => ({
      tier: 'High', // Default to high quality
      setTier: (tier) => set({ tier }),
      _hasHydrated: false,
      setHasHydrated: (val) => set({ _hasHydrated: val }),
    }),
    {
      name: 'paid-performance-storage',
    }
  )
);

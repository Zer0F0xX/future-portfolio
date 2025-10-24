'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PerformanceTier = 'low' | 'medium' | 'high';

export interface PerformanceState {
  tier: PerformanceTier;
  setTier: (t: PerformanceTier) => void;
  hydrated: boolean;
}

export const usePerformanceStore = create<PerformanceState>()(
  persist(
    (set) => ({
      tier: 'medium',
      hydrated: false,
      setTier: (t) => set({ tier: t }),
    }),
    {
      name: 'performance',
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Failed to rehydrate performance store', error);
        }
        if (state) {
          state.hydrated = true;
        }
      },
    }
  )
);
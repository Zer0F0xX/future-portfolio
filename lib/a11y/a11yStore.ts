import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type A11yState = {
  prefersReducedMotion: boolean;
  setPrefersReducedMotion: (val: boolean) => void;
  _hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
};

export const useA11yStore = create<A11yState>()(
  persist(
    (set) => ({
      prefersReducedMotion: false,
      setPrefersReducedMotion: (val) => set({ prefersReducedMotion: val }),
      _hasHydrated: false,
      setHasHydrated: (val) => set({ _hasHydrated: val }),
    }),
    {
      name: 'paid-a11y-storage',
    }
  )
);

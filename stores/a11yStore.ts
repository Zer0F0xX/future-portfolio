import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type A11yState = {
  prefersReducedMotion: boolean;
  setPrefersReducedMotion: (val: boolean) => void;
  // This will be initialized on the client to check the media query and localStorage
  _hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
};

export const useA11yStore = create<A11yState>()(
  persist(
    (set) => ({
      prefersReducedMotion: false, // Default value, will be updated on hydration
      setPrefersReducedMotion: (val) => set({ prefersReducedMotion: val }),
      _hasHydrated: false,
      setHasHydrated: (val) => set({ _hasHydrated: val }),
    }),
    {
      name: 'paid-a11y-storage', // unique name for localStorage key
    }
  )
);

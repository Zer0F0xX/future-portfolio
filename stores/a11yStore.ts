import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type A11yState = {
  prefersReducedMotion: boolean;
  setPrefersReducedMotion: (val: boolean) => void;
  hydrated: boolean;
};

export const useA11yStore = create<A11yState>()(
  persist(
    (set) => ({
      prefersReducedMotion: false, // Default value, will be updated on hydration
      setPrefersReducedMotion: (val) => set({ prefersReducedMotion: val }),
      hydrated: false,
    }),
    {
      name: 'paid-a11y-storage', // unique name for localStorage key
      onRehydrateStorage: () => (state, error) => {
        if (state) {
          state.hydrated = true;
        }
      },
    }
  )
);

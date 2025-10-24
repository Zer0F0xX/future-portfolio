import { create } from 'zustand';
import { Vector3 } from 'three';
import { orbWorlds } from '@/data/portfolio';
import type { OrbSection } from '@/data/portfolio';

type OrbData = {
  id: string;
  title: string;
  accent: string;
  headline: string;
  body: string;
  highlights?: string[];
  voice?: string;
  sections?: OrbSection[];
};

interface SceneState {
  overlayVisible: boolean;
  prefersReducedMotion: boolean;
  cameraTarget: { position: Vector3; lookAt: Vector3 };
  activeOrb?: OrbData;
  activePhase: string;
  dismissOverlay(): void;
  focusOrb(orb: OrbData): void;
  openOrb(orb: OrbData): void;
  closeOrb(): void;
  setReducedMotion(val: boolean): void;
  setPhase(id: string): void;
}

export const useSceneStore = create<SceneState>((set, get) => ({
  overlayVisible: true,
  prefersReducedMotion:
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  cameraTarget: {
    position: new Vector3(0, 2.4, 9),
    lookAt: new Vector3(0, 1.6, 0)
  },
  activeOrb: undefined,
  activePhase: 'pulse',
  dismissOverlay: () =>
    set({
      overlayVisible: false,
      cameraTarget: {
        position: new Vector3(0, 2.4, 8.6),
        lookAt: new Vector3(0, 1.6, 0)
      }
    }),
  focusOrb: (orb) =>
    set({
      activeOrb: orb,
      cameraTarget: {
        position: new Vector3(0, 2.4, 7.6),
        lookAt: new Vector3(0, 1.6, 0)
      }
    }),
  openOrb: (orb) => {
    const current = get().activeOrb;
    if (current?.id === orb.id) {
      set({ activeOrb: orb });
      return;
    }
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = get().prefersReducedMotion;
      if (!prefersReducedMotion && orb.voice && 'speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(orb.voice);
        utter.pitch = 0.78;
        utter.rate = 0.92;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
      }
    }
    set({
      activeOrb: orb,
      cameraTarget: {
        position: new Vector3(0, 2.2, 6.4),
        lookAt: new Vector3(0, 1.6, 0)
      }
    });
  },
  closeOrb: () =>
    set({
      activeOrb: undefined,
      cameraTarget: {
        position: new Vector3(0, 2.4, 8.6),
        lookAt: new Vector3(0, 1.6, 0)
      }
    }),
  setReducedMotion: (val) => set({ prefersReducedMotion: val }),
  setPhase: (id) => set({ activePhase: id })
}));

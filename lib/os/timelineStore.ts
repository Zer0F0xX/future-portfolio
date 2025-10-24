import { create } from 'zustand';

export type TimelineEra = 'Origins' | 'Present' | 'Vector';

const eras: TimelineEra[] = ['Origins', 'Present', 'Vector'];

type TimelineState = {
  era: TimelineEra;
  eraIndex: number;
  setEra: (era: TimelineEra) => void;
  setEraByIndex: (index: number) => void;
};

export const useTimelineStore = create<TimelineState>((set) => ({
  era: 'Present',
  eraIndex: 1,
  setEra: (era) => set({ era, eraIndex: eras.indexOf(era) }),
  setEraByIndex: (index) => {
    const newEra = eras[index];
    if (newEra) {
      set({ era: newEra, eraIndex: index });
    }
  },
}));

'use client';

import { useSceneStore } from '@/stores/sceneStore';
import { timelinePhases } from '@/data/portfolio';

export default function TimelineRail() {
  const activePhase = useSceneStore((state) => state.activePhase);
  const setPhase = useSceneStore((state) => state.setPhase);

  return (
    <nav
      className="pointer-events-auto fixed bottom-10 left-1/2 z-40 w-[min(600px,90vw)] -translate-x-1/2 rounded-3xl border border-cyan-200/20 bg-[rgba(9,18,34,0.72)] px-6 py-5 backdrop-blur-2xl"
      aria-label="Temporal orbit timeline"
    >
      <label className="font-display text-xs uppercase tracking-[0.35em] text-cyan-200/70">Temporal Orbit</label>
      <div className="mt-4 flex items-center gap-3">
        <input
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-cyan-200/30"
          type="range"
          min={0}
          max={timelinePhases.length - 1}
          step={1}
          value={timelinePhases.findIndex((item) => item.id === activePhase)}
          onChange={(event) => {
            const idx = Number(event.target.value);
            const phase = timelinePhases[idx];
            if (phase) setPhase(phase.id);
          }}
          aria-valuetext={`${activePhase}`}
        />
      </div>
      <div className="mt-3 flex justify-between text-[0.55rem] uppercase tracking-[0.28em] text-cyan-100/50">
        {timelinePhases.map((phase) => (
          <button
            key={phase.id}
            className={`transition-colors ${phase.id === activePhase ? 'text-cyan-100' : ''}`}
            onClick={() => setPhase(phase.id)}
            type="button"
          >
            {phase.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

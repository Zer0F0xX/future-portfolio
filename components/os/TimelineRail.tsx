'use client';
import { useTimelineStore, TimelineEra } from '@/lib/os/timelineStore';
import { emitAnalyticsEvent } from '@/lib/analytics/events';

const eras: TimelineEra[] = ['Origins', 'Present', 'Vector'];

export function TimelineRail() {
  const { era, eraIndex, setEraByIndex } = useTimelineStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = parseInt(e.target.value, 10);
    setEraByIndex(newIndex);
    emitAnalyticsEvent('timeline_scrub', { era: eras[newIndex] });
  };

  return (
    <div className="pointer-events-auto fixed bottom-8 left-1/2 z-50 w-full max-w-xs -translate-x-1/2">
      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          background-color: var(--color-accent);
        }
        input[type='range']::-moz-range-thumb {
          background-color: var(--color-accent);
        }
      `}</style>
      <label
        htmlFor="timeline-slider"
        className="sr-only font-display text-sm uppercase tracking-[0.3em]"
      >
        Timeline: {era}
      </label>
      <input
        id="timeline-slider"
        type="range"
        min="0"
        max={eras.length - 1}
        step="1"
        value={eraIndex}
        onChange={handleChange}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 backdrop-blur-sm transition-all focus-visible:ring-2"
      />
      <div
        className="mt-2 flex justify-between font-display text-xs uppercase tracking-[0.2em] text-white/50"
        aria-hidden="true"
      >
        {eras.map((e, i) => (
          <span
            key={e}
            className={i === eraIndex ? 'text-white' : ''}
            style={{ color: i === eraIndex ? 'var(--color-accent)' : '' }}
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}

// File: lib/analytics/events.ts
export type AnalyticsEvent =
  | { name: 'shard_open'; params: { shard_label: string } }
  | { name: 'timeline_scrub'; params: { era: 'Origins' | 'Present' | 'Vector' } }
  | { name: 'portal_open'; params: { project_slug: string } }
  | { name: 'cta_click'; params: { cta_label: string } };

type EventName = AnalyticsEvent['name'];
type EventParams<T extends EventName> = Extract<AnalyticsEvent, { name: T }>['params'];

export function emitAnalyticsEvent<T extends EventName>(name: T, params: EventParams<T>) {
  if (typeof window === 'undefined') return;

  const event = new CustomEvent('analytics', {
    detail: {
      name,
      params,
    },
  });

  window.dispatchEvent(event);
}

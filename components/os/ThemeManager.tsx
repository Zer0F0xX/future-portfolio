'use client';
import { useEffect } from 'react';
import { useTimelineStore } from '@/lib/os/timelineStore';

export function ThemeManager() {
  const era = useTimelineStore((s) => s.era);

  useEffect(() => {
    document.body.setAttribute('data-era', era);
  }, [era]);

  return null;
}

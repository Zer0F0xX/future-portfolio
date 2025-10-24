'use client';
import { useEffect } from 'react';
import { usePerformanceStore } from './performanceStore';

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const detectGpuTier = usePerformanceStore((s) => s.detectGpuTier);

  useEffect(() => {
    detectGpuTier();
  }, [detectGpuTier]);

  return <>{children}</>;
}

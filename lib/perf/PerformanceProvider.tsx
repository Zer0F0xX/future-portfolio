'use client';
import { useEffect } from 'react';

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  // This provider's purpose is to ensure the performance store is available
  // for client components. The GPU detection logic has been removed.
  return <>{children}</>;
}

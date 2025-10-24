'use client';

import { useEffect } from 'react';
import { AnalyticsEvent } from './events';
import { AnalyticsProvider as IAnalyticsProvider, consoleLogProvider } from './provider';

const providers: Record<string, IAnalyticsProvider> = {
  console: consoleLogProvider,
};

const selectedProviderIdentifier = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || 'console';
const activeProvider = providers[selectedProviderIdentifier] || consoleLogProvider;

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log(`Analytics provider initialized: ${activeProvider.identifier}`);

    const handleEvent = (event: Event) => {
      const customEvent = event as CustomEvent<AnalyticsEvent>;
      const { name, params } = customEvent.detail;
      activeProvider.track(name, params);
    };

    window.addEventListener('analytics', handleEvent);
    return () => {
      window.removeEventListener('analytics', handleEvent);
    };
  }, []);

  return <>{children}</>;
}

import { AnalyticsEvent } from './events';

export interface AnalyticsProvider {
  track: (name: AnalyticsEvent['name'], params: AnalyticsEvent['params']) => void;
  identifier: string;
}

export const consoleLogProvider: AnalyticsProvider = {
  identifier: 'Console Logger',
  track: (name, params) => {
    console.log(`[Analytics Event]`, {
      name,
      params,
      timestamp: new Date().toISOString(),
    });
  },
};

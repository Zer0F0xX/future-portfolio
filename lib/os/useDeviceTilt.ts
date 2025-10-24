'use client';
import { useState, useEffect } from 'react';
import { useA11yStore } from '@/lib/a11y/a11yStore';
import { featureFlags } from '@/lib/config';

const TILT_RANGE = 15; // Max tilt in degrees

export function useDeviceTilt() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useA11yStore((s) => s.prefersReducedMotion);

  useEffect(() => {
    if (!featureFlags.tilt || prefersReducedMotion || typeof window.DeviceOrientationEvent === 'undefined') {
      return;
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { beta, gamma } = event; // beta: front-back tilt, gamma: left-right tilt
      if (beta === null || gamma === null) return;

      const clampedY = Math.max(-TILT_RANGE, Math.min(TILT_RANGE, beta - 45));
      const clampedX = Math.max(-TILT_RANGE, Math.min(TILT_RANGE, gamma));

      setTilt({
        x: clampedX / TILT_RANGE, // -1 to 1
        y: clampedY / TILT_RANGE, // -1 to 1
      });
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [prefersReducedMotion]);

  return tilt;
}

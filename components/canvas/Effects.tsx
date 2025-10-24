// File: components/canvas/Effects.tsx
'use client';

import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { usePerformanceStore } from '@/lib/performanceStore';

export function Effects() {
  const tier = usePerformanceStore((state) => state.tier);

  if (tier === 'Low') {
    return null;
  }

  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} />
      <DepthOfField focusDistance={0.025} focalLength={0.03} bokehScale={4} />
    </EffectComposer>
  );
}

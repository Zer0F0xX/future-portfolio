'use client';
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField } from '@react-three/postprocessing';
import { usePerformanceStore } from '@/lib/perf/performanceStore';
import { featureFlags } from '@/lib/config';
import { Vector2 } from 'three';
import { BlendFunction } from 'postprocessing';

export function Passes() {
  const tier = usePerformanceStore((s) => s.tier);

  if (tier === 'low') return null;

  return (
    <EffectComposer>
      {featureFlags.bloom && <Bloom luminanceThreshold={0.1} intensity={tier === 'high' ? 1.5 : 1.0} mipmapBlur />}
      {tier === 'high' && featureFlags.dof && <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={6} />}
      {tier === 'high' && featureFlags.chromaticAberration && <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new Vector2(0.001, 0.001)} />}
    </EffectComposer>
  );
}

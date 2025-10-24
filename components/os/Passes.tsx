'use client';
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField } from '@react-three/postprocessing';
import { usePerformanceStore } from '@/lib/perf/performanceStore';
import { featureFlags } from '@/lib/config';

export function Passes() {
  const tier = usePerformanceStore((s) => s.tier);

  if (tier === 'Low') return null;

  return (
    <EffectComposer>
      {featureFlags.bloom && <Bloom luminanceThreshold={0.1} intensity={tier === 'High' ? 1.5 : 1.0} mipmapBlur />}
      {tier === 'High' && featureFlags.dof && <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={6} />}
      {tier === 'High' && featureFlags.chromaticAberration && <ChromaticAberration offset={[0.001, 0.001]} />}
    </EffectComposer>
  );
}

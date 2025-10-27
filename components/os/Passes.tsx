// components/os/Passes.tsx
'use client';

import { EffectComposer, Bloom, DepthOfField, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

interface Props {
  tier: 'low' | 'medium' | 'high';
  featureFlags: {
    bloom: boolean;
    dof: boolean;
    chromaticAberration: boolean;
  };
}

export default function Passes({ tier, featureFlags }: Props) {
  const effects: JSX.Element[] = [];

  if (featureFlags.bloom) {
    effects.push(
      <Bloom
        key="bloom"
        luminanceThreshold={0.1}
        intensity={tier === 'high' ? 1.5 : 1.0}
        mipmapBlur
      />,
    );
  }

  if (tier === 'high' && featureFlags.dof) {
    effects.push(
      <DepthOfField
        key="dof"
        focusDistance={0.02}
        focalLength={0.05}
        bokehScale={6}
      />,
    );
  }

  if (tier === 'high' && featureFlags.chromaticAberration) {
    effects.push(
      <ChromaticAberration
        key="ca"
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.001, 0.001)}
        radialModulation={false}
        modulationOffset={0}
      />,
    );
  }

  return <EffectComposer>{effects}</EffectComposer>;
}

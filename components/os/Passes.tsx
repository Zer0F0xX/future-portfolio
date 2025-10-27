// components/os/Passes.tsx
'use client';

import {
  EffectComposer,
  Bloom,
  DepthOfField,
  ChromaticAberration,
  Vignette,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

interface Props {
  tier: 'low' | 'medium' | 'high';
  featureFlags: {
    bloom: boolean;
    dof: boolean;
    chromaticAberration: boolean;
  };
  reducedMotion?: boolean;
}

export default function Passes({ tier, featureFlags, reducedMotion = false }: Props) {
  const effects: JSX.Element[] = [];

  // Reduced motion: disable all heavy post-processing
  if (reducedMotion) {
    // Only add subtle vignette for depth
    effects.push(
      <Vignette
        key="vignette"
        offset={0.5}
        darkness={0.5}
        blendFunction={BlendFunction.NORMAL}
      />
    );
    return <EffectComposer>{effects}</EffectComposer>;
  }

  // Bloom - Selective based on tier
  if (featureFlags.bloom) {
    const bloomSettings = {
      high: { luminanceThreshold: 0.05, intensity: 2.0, radius: 0.8 },
      medium: { luminanceThreshold: 0.1, intensity: 1.3, radius: 0.6 },
      low: { luminanceThreshold: 0.15, intensity: 0.8, radius: 0.4 },
    };

    const settings = bloomSettings[tier];

    effects.push(
      <Bloom
        key="bloom"
        luminanceThreshold={settings.luminanceThreshold}
        intensity={settings.intensity}
        radius={settings.radius}
        mipmapBlur
      />
    );
  }

  // Depth of Field - High tier only
  if (tier === 'high' && featureFlags.dof) {
    effects.push(
      <DepthOfField
        key="dof"
        focusDistance={0.015}
        focalLength={0.04}
        bokehScale={4}
        height={480}
      />
    );
  }

  // Chromatic Aberration - High and Medium tiers
  if ((tier === 'high' || tier === 'medium') && featureFlags.chromaticAberration) {
    const offset = tier === 'high' ? 0.002 : 0.001;

    effects.push(
      <ChromaticAberration
        key="ca"
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(offset, offset)}
        radialModulation={tier === 'high'}
        modulationOffset={0.3}
      />
    );
  }

  // Subtle vignette for all tiers
  if (tier !== 'low') {
    effects.push(
      <Vignette
        key="vignette"
        offset={0.5}
        darkness={tier === 'high' ? 0.7 : 0.5}
        blendFunction={BlendFunction.NORMAL}
      />
    );
  }

  // Return empty composer if no effects (shouldn't happen, but safety)
  if (effects.length === 0) {
    return null;
  }

  return <EffectComposer multisampling={tier === 'high' ? 8 : 0}>{effects}</EffectComposer>;
}

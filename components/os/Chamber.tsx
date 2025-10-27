'use client';
import { Canvas } from '@react-three/fiber';
import { HoloAvatar } from '@/components/os/HoloAvatar';
import { ShardOrbit } from '@/components/os/ShardOrbit';
import { GridPlane } from '@/components/os/GridPlane';
import { DataShardOrbit } from '@/components/os/DataShard';
import Passes from '@/components/os/Passes';
import { CameraRig } from '@/components/os/CameraRig';

import { usePerformanceStore } from '@/lib/perf/performanceStore';
import { useA11yStore } from '@/lib/a11y/a11yStore';
import { featureFlags } from '@/lib/config';
import { useRouter } from 'next/navigation';

function SceneContent() {
  const router = useRouter();
  const tier = usePerformanceStore((s) => s.tier);

  // Data shards configuration (orbiting around the avatar)
  const dataShards = [
    { label: 'Work', color: '#5AF4FF', onClick: () => router.push('/work') },
    { label: 'About', color: '#FF57F6', onClick: () => router.push('/about') },
    { label: 'Contact', color: '#A855F7', onClick: () => router.push('/contact') },
  ];

  return (
    <>
      {/* Central holographic avatar */}
      <HoloAvatar position={[0, 1.5, 0]} scale={1} />

      {/* Navigation shards (fallback to ShardOrbit if preferred) */}
      {tier === 'high' && (
        <DataShardOrbit shards={dataShards} radius={4} height={1.5} />
      )}
      {tier !== 'high' && <ShardOrbit />}

      {/* Custom grid plane with emissive streaks */}
      <GridPlane
        position={[0, -1, 0]}
        size={100}
        cellSize={1.0}
        color="#5AF4FF"
        accentColor="#FF57F6"
      />
    </>
  );
}

export function Chamber() {
  const tier = usePerformanceStore((s) => s.tier);
  const reducedMotion = useA11yStore((s) => s.prefersReducedMotion);

  // Adjust DPR based on tier
  const dpr: [number, number] = tier === 'high' ? [1, 2] : [1, 1];

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }}
        dpr={dpr}
        gl={{
          antialias: tier !== 'low',
          powerPreference: tier === 'high' ? 'high-performance' : 'default',
        }}
      >
        <color attach="background" args={['#03050d']} />
        {/* Fog disabled in low tier for performance */}
        {tier !== 'low' && <fog attach="fog" args={['#03050d', 15, 30]} />}

        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 5, 0]} intensity={1} color="white" />
        {tier === 'high' && (
          <pointLight position={[5, 2, 5]} intensity={0.5} color="#5AF4FF" />
        )}

        <SceneContent />
        <Passes tier={tier} featureFlags={featureFlags} reducedMotion={reducedMotion} />
        <CameraRig />
      </Canvas>
    </div>
  );
}

'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { Stars } from '@react-three/drei';
import ArrivalOverlay from './ArrivalOverlay';
import { ArrivalParticles } from './ArrivalParticles';
import { HologramLoader } from './HologramLoader';
import { FacetAxis } from './FacetAxis';
import HologramHalo from './HologramHalo';
import { useSceneStore } from '@/stores/sceneStore';

function CameraRig() {
  const { camera } = useThree();
  const target = useSceneStore((state) => state.cameraTarget);
  useFrame((_, delta) => {
    camera.position.lerp(target.position, delta * 2.5);
    camera.lookAt(target.lookAt);
  });
  return null;
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={['#03050d']} />
      <fog attach="fog" args={['#050910', 6, 28]} />
      <ambientLight intensity={0.12} />
      <pointLight position={[2, 2.4, 3.6]} intensity={3} color="#5af4ff" />
      <pointLight position={[-3.2, 1.1, -4.6]} intensity={1.4} color="#ff57f6" />
      <ArrivalParticles />
      <HologramHalo />
      <HologramLoader />
      <FacetAxis />
      <Stars radius={60} depth={40} count={1200} factor={2} fade />
    </>
  );
}

export default function HeroScene() {
  const dismiss = useSceneStore((state) => state.dismissOverlay);

  useEffect(() => {
    const handler = () => dismiss();
    window.addEventListener('keydown', handler, { once: true });
    return () => window.removeEventListener('keydown', handler);
  }, [dismiss]);

  return (
    <div className="pointer-events-none fixed inset-0">
      <Canvas dpr={[1, 2]}>
        <Suspense fallback={null}>
          <SceneContent />
          <CameraRig />
        </Suspense>
      </Canvas>
      <ArrivalOverlay />
    </div>
  );
}

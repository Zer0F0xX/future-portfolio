'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function HologramHalo() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const pulse = 0.6 + Math.sin(clock.elapsedTime * 1.2) * 0.2;
    (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.18 + pulse * 0.12;
    ringRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 0.8) * 0.03);
  });

  return (
    <group position={[0, 0.1, 0]}>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 1.8, 64]} />
        <meshBasicMaterial color="#5af4ff" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 64]} />
        <meshBasicMaterial color="#03111d" transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

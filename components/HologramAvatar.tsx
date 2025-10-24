'use client';

import { useFrame } from '@react-three/fiber';
import { Html, MeshTransmissionMaterial, useCursor, useGLTF } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useA11yStore } from '@/stores/a11yStore';

const FALLBACK_GEOMETRY = new THREE.CapsuleGeometry(0.7, 1.2, 24, 48);

export function HologramAvatar() {
  const gltf = (() => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useGLTF('/models/hologram.glb') as any;
    } catch (e) {
      return null;
    }
  })();

  const bodyGeometry =
    (gltf?.nodes?.Body as THREE.Mesh)?.geometry ?? FALLBACK_GEOMETRY.clone();
  const headGeometry =
    (gltf?.nodes?.Head as THREE.Mesh)?.geometry ?? new THREE.SphereGeometry(0.6, 32, 32);
  const baseGeometry =
    (gltf?.nodes?.Base as THREE.Mesh)?.geometry ?? new THREE.CylinderGeometry(2, 2, 0.6, 48);

  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useA11yStore((state) => state.prefersReducedMotion);
  useCursor(hovered);

  useFrame(({ pointer }) => {
    if (!group.current) return;
    const wave = prefersReducedMotion ? 0 : Math.sin(performance.now() / 900) * 0.03;
    group.current.scale.setScalar(1 + wave);
    if (head.current && !prefersReducedMotion) {
      head.current.rotation.y = pointer.x * 0.3;
      head.current.rotation.x = pointer.y * 0.1;
    }
  });
  
  return (
    <group
      ref={group}
      position={[0, 1.6, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Html position={[0, -2.2, 0]} transform occlude={false}>
        <span className="sr-only">Placeholder holographic avatar representing Anna Tennyson</span>
      </Html>
      <mesh geometry={headGeometry} ref={head}>
        <MeshTransmissionMaterial
          thickness={1.4}
          anisotropy={0.4}
          chromaticAberration={0.5}
          distortion={0.42}
          distortionScale={0.3}
          ior={1.4}
          transmission={1}
          roughness={0.25}
          color="#5af4ff"
        />
      </mesh>
      <mesh geometry={bodyGeometry}>
        <MeshTransmissionMaterial
          thickness={2}
          anisotropy={0.6}
          chromaticAberration={0.45}
          distortion={0.36}
          ior={1.45}
          transmission={0.95}
          roughness={0.2}
          color="#5af4ff"
        />
      </mesh>
      <mesh geometry={baseGeometry} position={[0, -1.4, 0]}>
        <meshStandardMaterial color="#071628" metalness={0.7} roughness={0.22} />
      </mesh>
    </group>
  );
}

// useGLTF.preload('/models/hologram.glb');

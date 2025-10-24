'use client';

import { Html, useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { memo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useSceneStore } from '@/stores/sceneStore';
import { orbWorlds } from '@/data/portfolio';

const PANEL_WIDTH = 0.62;
const PANEL_HEIGHT = 1.35;
const RADIUS = 3.8;

const Panel = memo(function Panel({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered, 'pointer');
  const orbit = orbWorlds[index % orbWorlds.length];
  const focusOrb = useSceneStore((state) => state.focusOrb);
  const openOrb = useSceneStore((state) => state.openOrb);
  const activeOrb = useSceneStore((state) => state.activeOrb);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const angle = (index / orbWorlds.length) * Math.PI * 2;
    const verticalOffset = (index - (orbWorlds.length - 1) / 2) * 0.75;
    const oscillate = Math.sin(clock.elapsedTime * 0.45 + angle) * 0.1;
    const x = Math.cos(angle) * RADIUS;
    const z = Math.sin(angle) * RADIUS;
    ref.current.position.set(x, verticalOffset + oscillate, z);
    ref.current.lookAt(0, 1.6, 0);
  });

  return (
    <group
      onClick={() => openOrb(orbit)}
      onPointerEnter={() => {
        setHovered(true);
        focusOrb(orbit);
      }}
      onPointerLeave={() => setHovered(false)}
    >
      <mesh ref={ref}>
        <planeGeometry args={[PANEL_WIDTH, PANEL_HEIGHT, 1, 1]} />
        <meshBasicMaterial
          color={orbit.accent}
          transparent
          opacity={activeOrb?.id === orbit.id ? 0.55 : hovered ? 0.38 : 0.18}
        />
      </mesh>
      <Html
        position={[0, (index - (orbWorlds.length - 1) / 2) * 0.75 + 0.75, 0]}
        distanceFactor={6.5}
        center
        className="pointer-events-none"
      >
        <div className="rounded-full border border-cyan-200/30 bg-black/60 px-3 py-1 text-[0.55rem] uppercase tracking-[0.3em] text-cyan-100/80">
          {orbit.title}
        </div>
      </Html>
    </group>
  );
});

export function FacetAxis() {
  return (
    <group>
      {/* vertical spine */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 5, 32]} />
        <meshStandardMaterial color="#0c1d33" emissive="#0d4661" emissiveIntensity={0.6} />
      </mesh>
      {orbWorlds.map((_, index) => (
        <Panel key={index} index={index} />
      ))}
    </group>
  );
}

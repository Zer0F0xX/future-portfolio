// File: components/canvas/ProjectCrystal.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useFrame } from '@react-three/fiber';
import { A11y, useA11y } from '@react-three/drei';
import * as THREE from 'three';
import type { Project } from '@/content/projects';

type ProjectCrystalProps = {
  project: Project;
  position: [number, number, number];
};

export function ProjectCrystal({ project, position }: ProjectCrystalProps) {
  const router = useRouter();
  const ref = useRef<THREE.Mesh>(null!);
  const a11y = useA11y();

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((_, delta) => {
    // Constant, gentle rotation
    ref.current.rotation.y += delta * 0.1;
    // Scale up on hover/focus
    const targetScale = clicked ? 1.5 : hovered || a11y.focus ? 1.2 : 1;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
  });

  const handleClick = () => {
    setClicked(true);
    // Navigate after a short delay to allow the animation to play
    setTimeout(() => router.push(`/work/${project.slug}`), 300);
  };

  return (
    <A11y
      role="link"
      description={`Project: ${project.title}`}
      href={`/work/${project.slug}`}
      actionCall={handleClick}
    >
      <mesh
        ref={ref}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#5AF4FF"
          emissive="#5AF4FF"
          emissiveIntensity={hovered || a11y.focus ? 2.5 : 0.5}
          metalness={0.8}
          roughness={0.1}
          transparent
          opacity={0.8}
          toneMapped={false}
        />
      </mesh>
    </A11y>
  );
}

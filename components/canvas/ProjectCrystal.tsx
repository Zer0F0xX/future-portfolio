// File: components/canvas/ProjectCrystal.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Project } from '@/content/projects';

type ProjectCrystalProps = {
  project: Project;
  position: [number, number, number];
};

export function ProjectCrystal({ project, position }: ProjectCrystalProps) {
  const router = useRouter();
  const ref = useRef<THREE.Mesh>(null!);

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.1;
    const targetScale = clicked ? 1.5 : hovered ? 1.2 : 1;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
  });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => router.push(`/work/${project.slug}`), 300);
  };

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#5AF4FF"
        emissive="#5AF4FF"
        emissiveIntensity={hovered ? 2.5 : 0.5}
        metalness={0.8}
        roughness={0.1}
        transparent
        opacity={0.8}
        toneMapped={false}
      />
      <Html>
        <a
          href={`/work/${project.slug}`}
          className="sr-only"
          aria-label={`View project: ${project.title}`}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
          {project.title}
        </a>
      </Html>
    </mesh>
  );
}

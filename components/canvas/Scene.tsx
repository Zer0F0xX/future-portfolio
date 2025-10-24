// File: components/canvas/Scene.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { projects } from '@/content/projects';
import { ProjectCrystal } from './ProjectCrystal';
import { Effects } from './Effects';
import { CameraRig } from './CameraRig';

// Simple algorithm to position projects in a spiral
const getProjectPosition = (index: number): [number, number, number] => {
  const angle = index * 2.1;
  const radius = 2 + index * 0.8;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = Math.sin(index * 0.5) * 0.5;
  return [x, y, z];
};

export function Scene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 2.5, 10], fov: 50 }}
      className="!fixed inset-0 z-0"
    >
      <color attach="background" args={['#03050d']} />
      <fog attach="fog" args={['#03050d', 10, 25]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#5AF4FF" />

      {projects.map((project, index) => (
        <ProjectCrystal key={project.slug} project={project} position={getProjectPosition(index)} />
      ))}

      <Effects />
      <CameraRig />
    </Canvas>
  );
}

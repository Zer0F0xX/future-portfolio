'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceStore } from '@/lib/perf/performanceStore';
import { useA11yStore } from '@/lib/a11y/a11yStore';
import { gridVertex, gridFragment } from '@/shaders/grid.glsl';

interface GridPlaneProps {
  position?: [number, number, number];
  size?: number;
  cellSize?: number;
  color?: string;
  accentColor?: string;
}

export function GridPlane({
  position = [0, -1, 0],
  size = 100,
  cellSize = 1.0,
  color = '#5AF4FF',
  accentColor = '#FF57F6',
}: GridPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);

  const tier = usePerformanceStore((s) => s.tier);
  const reducedMotion = useA11yStore((s) => s.prefersReducedMotion);

  // Quality settings based on performance tier
  const qualitySettings = useMemo(() => {
    switch (tier) {
      case 'high':
        return {
          enableStreaks: true,
          streakSpeed: 2.0,
          fadeDistance: 50,
          lineWidth: 0.03,
        };
      case 'medium':
        return {
          enableStreaks: true,
          streakSpeed: 1.5,
          fadeDistance: 40,
          lineWidth: 0.04,
        };
      case 'low':
      default:
        return {
          enableStreaks: false,
          streakSpeed: 0.0,
          fadeDistance: 30,
          lineWidth: 0.05,
        };
    }
  }, [tier]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uAccentColor: { value: new THREE.Color(accentColor) },
      uCellSize: { value: cellSize },
      uLineWidth: { value: qualitySettings.lineWidth },
      uFadeDistance: { value: qualitySettings.fadeDistance },
      uStreakSpeed: { value: qualitySettings.streakSpeed },
      uEnableStreaks: { value: qualitySettings.enableStreaks && !reducedMotion },
    }),
    [color, accentColor, cellSize, qualitySettings, reducedMotion]
  );

  useFrame(({ clock }) => {
    if (!shaderRef.current) return;

    if (!reducedMotion) {
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[size, size, 1, 1]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={gridVertex}
        fragmentShader={gridFragment}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

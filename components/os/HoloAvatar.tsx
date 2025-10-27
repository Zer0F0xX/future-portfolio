'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceStore } from '@/lib/perf/performanceStore';
import { useA11yStore } from '@/lib/a11y/a11yStore';
import { holoAvatarVertex, holoAvatarFragment } from '@/shaders/holoAvatar.glsl';

interface HoloAvatarProps {
  position?: [number, number, number];
  scale?: number;
}

export function HoloAvatar({ position = [0, 1.5, 0], scale = 1 }: HoloAvatarProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);

  const tier = usePerformanceStore((s) => s.tier);
  const reducedMotion = useA11yStore((s) => s.prefersReducedMotion);

  // Quality settings based on performance tier
  const qualitySettings = useMemo(() => {
    switch (tier) {
      case 'high':
        return {
          subdivisions: 5,
          enableDisplacement: true,
          enableVoxelEffect: true,
          displacementScale: 0.15,
          scanlineSpeed: 8.0,
          scanlineIntensity: 0.15,
          fresnelPower: 2.5,
        };
      case 'medium':
        return {
          subdivisions: 4,
          enableDisplacement: true,
          enableVoxelEffect: false,
          displacementScale: 0.1,
          scanlineSpeed: 6.0,
          scanlineIntensity: 0.1,
          fresnelPower: 2.0,
        };
      case 'low':
      default:
        return {
          subdivisions: 2,
          enableDisplacement: false,
          enableVoxelEffect: false,
          displacementScale: 0.0,
          scanlineSpeed: 4.0,
          scanlineIntensity: 0.05,
          fresnelPower: 1.5,
        };
    }
  }, [tier]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#5AF4FF') },
      uAccentColor: { value: new THREE.Color('#FF57F6') },
      uDisplacementScale: { value: qualitySettings.displacementScale },
      uScanlineSpeed: { value: qualitySettings.scanlineSpeed },
      uScanlineIntensity: { value: qualitySettings.scanlineIntensity },
      uFresnelPower: { value: qualitySettings.fresnelPower },
      uEnableDisplacement: { value: qualitySettings.enableDisplacement },
      uEnableVoxelEffect: { value: qualitySettings.enableVoxelEffect },
    }),
    [qualitySettings]
  );

  useFrame(({ clock }) => {
    if (!shaderRef.current || !meshRef.current) return;

    const time = clock.getElapsedTime();
    shaderRef.current.uniforms.uTime.value = time;

    // Rotation
    if (reducedMotion) {
      // Static or minimal rotation for reduced motion
      meshRef.current.rotation.y = 0;
    } else {
      meshRef.current.rotation.y = time * 0.15;
      // Subtle bobbing animation
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, qualitySettings.subdivisions]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={holoAvatarVertex}
        fragmentShader={holoAvatarFragment}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

'use client';
import { useRef, useState, useMemo } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceStore } from '@/lib/perf/performanceStore';
import { useA11yStore } from '@/lib/a11y/a11yStore';
import { refractionVertex, refractionFragment } from '@/shaders/refraction.glsl';

interface DataShardProps {
  position: [number, number, number];
  color?: string;
  label?: string;
  onClick?: () => void;
  index?: number;
}

export function DataShard({
  position,
  color = '#5AF4FF',
  label,
  onClick,
  index = 0,
}: DataShardProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const [hovered, setHovered] = useState(false);

  const tier = usePerformanceStore((s) => s.tier);
  const reducedMotion = useA11yStore((s) => s.prefersReducedMotion);

  // Quality settings
  const qualitySettings = useMemo(() => {
    switch (tier) {
      case 'high':
        return {
          enableChromatic: true,
          chromaticAberration: 0.2,
          refractionStrength: 0.8,
          fresnelPower: 3.0,
        };
      case 'medium':
        return {
          enableChromatic: true,
          chromaticAberration: 0.1,
          refractionStrength: 0.5,
          fresnelPower: 2.5,
        };
      case 'low':
      default:
        return {
          enableChromatic: false,
          chromaticAberration: 0.0,
          refractionStrength: 0.3,
          fresnelPower: 2.0,
        };
    }
  }, [tier]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uRefractionStrength: { value: qualitySettings.refractionStrength },
      uChromaticAberration: { value: qualitySettings.chromaticAberration },
      uFresnelPower: { value: qualitySettings.fresnelPower },
      uEnableChromatic: { value: qualitySettings.enableChromatic },
    }),
    [color, qualitySettings]
  );

  useFrame(({ clock }) => {
    if (!shaderRef.current || !meshRef.current) return;

    const time = clock.getElapsedTime();
    shaderRef.current.uniforms.uTime.value = time;

    // Hover animation - "unfold" effect
    const targetScale = hovered ? 1.3 : 1.0;
    const targetRotationSpeed = hovered ? 0.5 : 0.2;

    if (reducedMotion) {
      // Instant transitions for reduced motion
      meshRef.current.scale.setScalar(targetScale);
      meshRef.current.rotation.y = time * 0.1;
    } else {
      // Smooth animations
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
      meshRef.current.rotation.y = time * targetRotationSpeed;
      meshRef.current.rotation.x = Math.sin(time * 0.3 + index) * 0.2;
    }
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <octahedronGeometry args={[0.5, 0]} />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={refractionVertex}
          fragmentShader={refractionFragment}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glow effect on hover */}
      {hovered && tier !== 'low' && (
        <pointLight
          color={color}
          intensity={1.5}
          distance={3}
          decay={2}
        />
      )}

      {/* Label (optional) */}
      {label && (
        <mesh position={[0, -0.8, 0]}>
          <planeGeometry args={[1.5, 0.3]} />
          <meshBasicMaterial
            color="#000000"
            transparent
            opacity={hovered ? 0.8 : 0.5}
          />
        </mesh>
      )}
    </group>
  );
}

/**
 * DataShardOrbit - Multiple shards orbiting around a center point
 */
interface DataShardOrbitProps {
  shards: Array<{
    label: string;
    color: string;
    onClick?: () => void;
  }>;
  radius?: number;
  height?: number;
}

export function DataShardOrbit({
  shards,
  radius = 4,
  height = 0,
}: DataShardOrbitProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const reducedMotion = useA11yStore((s) => s.prefersReducedMotion);

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={groupRef}>
      {shards.map((shard, index) => {
        const angle = (index / shards.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <DataShard
            key={index}
            position={[x, height, z]}
            color={shard.color}
            label={shard.label}
            onClick={shard.onClick}
            index={index}
          />
        );
      })}
    </group>
  );
}

'use client';
import { useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboardMap } from '@/lib/a11y/keyboardMap';
import { useViewStore } from '@/lib/os/viewStore';
import { Html } from '@react-three/drei';

const navItems = [
  { label: 'Projects', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

function Shard({ item, position, isFocused, onActivate }: any) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    const targetScale = isFocused || hovered ? 1.3 : 1;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onActivate}
    >
      <icosahedronGeometry args={[0.8, 1]} />
      <meshStandardMaterial
        color={isFocused || hovered ? '#5AF4FF' : '#ffffff'}
        emissive={isFocused || hovered ? '#5AF4FF' : '#ffffff'}
        emissiveIntensity={isFocused || hovered ? 1.5 : 0.3}
        metalness={0.8}
        roughness={0.2}
        toneMapped={false}
      />
      {/* Use Drei's Html for accessibility */}
      <Html>
        <a
          href={item.href}
          aria-label={item.label}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          className="sr-only" // Visually hide, but keep for screen readers and keyboard nav
        >
          {item.label}
        </a>
      </Html>
    </mesh>
  );
}

export function ShardOrbit() {
  const router = useRouter();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const groupRef = useRef<THREE.Group>(null!);
  const { enterProjectView } = useViewStore();

  const positions = useMemo(() => {
    const result = [];
    const count = navItems.length;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 4;
      result.push([Math.cos(angle) * radius, 1.5, Math.sin(angle) * radius]);
    }
    return result;
  }, []);

  const handleActivate = () => {
    const item = navItems[focusedIndex];
    const shardPosition = new THREE.Vector3().fromArray(positions[focusedIndex]);
    enterProjectView(shardPosition);
    setTimeout(() => router.push(item.href as any), 800);
  };

  useKeyboardMap({
    itemCount: navItems.length,
    active: true,
    onFocusChange: (direction) => {
      setFocusedIndex((prev) => (prev + direction + navItems.length) % navItems.length);
    },
    onActivate: handleActivate,
    onEscape: () => {},
  });

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={groupRef}>
      {navItems.map((item, i) => (
        <Shard
          key={item.label}
          item={item}
          position={positions[i] as [number, number, number]}
          isFocused={i === focusedIndex}
          onActivate={handleActivate}
        />
      ))}
    </group>
  );
}

'use client';
import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboardMap, getRovingTabIndex, focusRingClasses } from '@/lib/a11y/keyboardMap';
import { useViewStore } from '@/lib/os/viewStore';
import { useA11yStore } from '@/lib/a11y/a11yStore';
import { Html } from '@react-three/drei';

// Navigation items - Primary spatial nav
const navItems = [
  { label: 'Projects', href: '/work', color: '#5AF4FF', description: 'View case studies and shipped work' },
  { label: 'Essays', href: '/writing', color: '#FF57F6', description: 'Read thoughts on design and AI' },
  { label: 'Lab', href: '/lab', color: '#8C6DFF', description: 'Explore experiments and prototypes' },
  { label: 'About', href: '/about', color: '#7FFCEA', description: 'Learn about the architect' },
  { label: 'Contact', href: '/contact', color: '#F7C274', description: 'Get in touch for collaborations' },
];

interface ShardProps {
  item: typeof navItems[0];
  position: [number, number, number];
  index: number;
  isFocused: boolean;
  onActivate: () => void;
  onFocus: () => void;
}

function Shard({ item, position, index, isFocused, onActivate, onFocus }: ShardProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useA11yStore((s) => s.prefersReducedMotion);

  // Sync focus between DOM and 3D
  useEffect(() => {
    if (isFocused && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isFocused]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const targetScale = isFocused || hovered ? 1.3 : 1;

    if (reducedMotion) {
      meshRef.current.scale.setScalar(targetScale);
    } else {
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 6
      );
    }
  });

  const handleClick = useCallback(() => {
    onActivate();
  }, [onActivate]);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color={isFocused || hovered ? item.color : '#ffffff'}
          emissive={isFocused || hovered ? item.color : '#ffffff'}
          emissiveIntensity={isFocused || hovered ? 1.5 : 0.3}
          metalness={0.8}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>

      {/* Accessible HTML overlay with roving tabindex */}
      <Html center>
        <button
          ref={buttonRef}
          onClick={handleClick}
          onFocus={onFocus}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          tabIndex={getRovingTabIndex(index, isFocused ? index : -1)}
          aria-label={`${item.label}: ${item.description}`}
          aria-describedby={`shard-desc-${index}`}
          className={`
            absolute inset-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full
            bg-transparent
            ${isFocused ? focusRingClasses.primary : ''}
            hover:cursor-pointer
          `}
          style={{
            // Ensure button is accessible but invisible
            color: 'transparent',
            border: 'none',
            outline: isFocused ? undefined : 'none',
          }}
        >
          <span className="sr-only">{item.label}</span>
        </button>

        {/* Hidden description for screen readers */}
        <span id={`shard-desc-${index}`} className="sr-only">
          {item.description}
        </span>

        {/* Visible label on focus/hover */}
        {(isFocused || hovered) && (
          <div
            className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-deepVoid/90 px-4 py-2 font-display text-sm uppercase tracking-wider text-white backdrop-blur-sm"
            style={{ borderColor: item.color, borderWidth: 1 }}
          >
            {item.label}
          </div>
        )}
      </Html>
    </group>
  );
}

export function ShardOrbit() {
  const router = useRouter();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const groupRef = useRef<THREE.Group>(null!);
  const { enterProjectView } = useViewStore();
  const reducedMotion = useA11yStore((s) => s.prefersReducedMotion);

  // Calculate positions in a circle
  const positions = useMemo(() => {
    const result: [number, number, number][] = [];
    const count = navItems.length;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2; // Start at top
      const radius = 4;
      result.push([Math.cos(angle) * radius, 1.5, Math.sin(angle) * radius]);
    }
    return result;
  }, []);

  const handleActivate = useCallback(() => {
    const item = navItems[focusedIndex];
    const shardPosition = new THREE.Vector3().fromArray(positions[focusedIndex]);
    enterProjectView(shardPosition);
    setTimeout(() => router.push(item.href as any), 800);
  }, [focusedIndex, positions, enterProjectView, router]);

  const handleFocusChange = useCallback((direction: number) => {
    setFocusedIndex((prev) => {
      const newIndex = prev + direction;
      // Wrap around
      if (newIndex < 0) return navItems.length - 1;
      if (newIndex >= navItems.length) return 0;
      return newIndex;
    });
  }, []);

  useKeyboardMap({
    itemCount: navItems.length,
    active: true,
    onFocusChange: handleFocusChange,
    onActivate: handleActivate,
    onEscape: () => {
      // Return focus to first item
      setFocusedIndex(0);
    },
    enableHomeEnd: true,
    announceChanges: true,
  });

  useFrame((state) => {
    if (!groupRef.current) return;

    if (reducedMotion) {
      groupRef.current.rotation.y = 0;
    } else {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef} aria-label="Primary navigation">
      {navItems.map((item, i) => (
        <Shard
          key={item.label}
          item={item}
          position={positions[i]}
          index={i}
          isFocused={i === focusedIndex}
          onActivate={handleActivate}
          onFocus={() => setFocusedIndex(i)}
        />
      ))}
    </group>
  );
}

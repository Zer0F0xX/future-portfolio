/**
 * Chamber Controls
 * Unified input system for pointer, scroll, and device tilt
 * with damping and reduced-motion support
 */

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface ControlsState {
  pointer: { x: number; y: number };
  scroll: number;
  tilt: { x: number; y: number };
}

export interface ControlsConfig {
  pointerDamping?: number;
  scrollDamping?: number;
  tiltDamping?: number;
  pointerInfluence?: number;
  tiltInfluence?: number;
  enableTilt?: boolean;
  reducedMotion?: boolean;
}

const defaultConfig: Required<ControlsConfig> = {
  pointerDamping: 0.1,
  scrollDamping: 0.05,
  tiltDamping: 0.08,
  pointerInfluence: 1.0,
  tiltInfluence: 0.5,
  enableTilt: true,
  reducedMotion: false,
};

/**
 * Lerp utility
 */
function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Hook for pointer tracking with damping
 */
export function usePointer(config: ControlsConfig = {}) {
  const mergedConfig = { ...defaultConfig, ...config };
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame(() => {
    if (mergedConfig.reducedMotion) {
      // Instant movement for reduced motion
      currentRef.current = targetRef.current;
    } else {
      // Smooth damping
      currentRef.current.x = lerp(
        currentRef.current.x,
        targetRef.current.x,
        mergedConfig.pointerDamping
      );
      currentRef.current.y = lerp(
        currentRef.current.y,
        targetRef.current.y,
        mergedConfig.pointerDamping
      );
    }

    setPointer({ ...currentRef.current });
  });

  return {
    x: pointer.x * mergedConfig.pointerInfluence,
    y: pointer.y * mergedConfig.pointerInfluence,
  };
}

/**
 * Hook for scroll tracking with damping
 */
export function useScroll(config: ControlsConfig = {}) {
  const mergedConfig = { ...defaultConfig, ...config };
  const [scroll, setScroll] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      targetRef.current = window.scrollY / window.innerHeight;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (mergedConfig.reducedMotion) {
      currentRef.current = targetRef.current;
    } else {
      currentRef.current = lerp(
        currentRef.current,
        targetRef.current,
        mergedConfig.scrollDamping
      );
    }

    setScroll(currentRef.current);
  });

  return scroll;
}

/**
 * Hook for device tilt (gyroscope) with damping
 */
export function useTilt(config: ControlsConfig = {}) {
  const mergedConfig = { ...defaultConfig, ...config };
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (!mergedConfig.enableTilt) return;

    // Check for DeviceOrientationEvent support
    if (typeof DeviceOrientationEvent !== 'undefined') {
      setSupported(true);

      const handleOrientation = (e: DeviceOrientationEvent) => {
        if (e.beta !== null && e.gamma !== null) {
          // beta: front-back tilt (-180 to 180)
          // gamma: left-right tilt (-90 to 90)
          targetRef.current = {
            x: Math.max(-1, Math.min(1, (e.gamma / 45) * mergedConfig.tiltInfluence)),
            y: Math.max(-1, Math.min(1, (e.beta / 45) * mergedConfig.tiltInfluence)),
          };
        }
      };

      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, [mergedConfig.enableTilt, mergedConfig.tiltInfluence]);

  useFrame(() => {
    if (!supported || !mergedConfig.enableTilt) return;

    if (mergedConfig.reducedMotion) {
      currentRef.current = targetRef.current;
    } else {
      currentRef.current.x = lerp(
        currentRef.current.x,
        targetRef.current.x,
        mergedConfig.tiltDamping
      );
      currentRef.current.y = lerp(
        currentRef.current.y,
        targetRef.current.y,
        mergedConfig.tiltDamping
      );
    }

    setTilt({ ...currentRef.current });
  });

  return { tilt, supported };
}

/**
 * Combined controls hook
 */
export function useControls(config: ControlsConfig = {}) {
  const pointer = usePointer(config);
  const scroll = useScroll(config);
  const { tilt, supported: tiltSupported } = useTilt(config);

  return {
    pointer,
    scroll,
    tilt,
    tiltSupported,
  };
}

/**
 * Camera control hook using combined inputs
 */
export function useCameraControls(
  cameraRef: React.RefObject<THREE.Camera>,
  config: ControlsConfig = {}
) {
  const { pointer, tilt } = useControls(config);

  useFrame(() => {
    if (!cameraRef.current) return;

    const camera = cameraRef.current;
    const dampedX = (pointer.x + tilt.x) * 0.5;
    const dampedY = (pointer.y + tilt.y) * 0.5;

    if (config.reducedMotion) {
      camera.rotation.y = dampedX * Math.PI * 0.1;
      camera.rotation.x = dampedY * Math.PI * 0.05;
    } else {
      camera.rotation.y += (dampedX * Math.PI * 0.1 - camera.rotation.y) * 0.05;
      camera.rotation.x += (dampedY * Math.PI * 0.05 - camera.rotation.x) * 0.05;
    }
  });
}

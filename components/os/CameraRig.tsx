'use client';
import { useFrame } from '@react-three/fiber';
import { useViewStore } from '@/lib/os/viewStore';
import { useA11yStore } from '@/lib/a11y/a11yStore';
import * as THREE from 'three';
import { useDeviceTilt } from '@/lib/os/useDeviceTilt';
import { useEffect, useState } from 'react';

export function CameraRig() {
  const { cameraTarget, view } = useViewStore();
  const prefersReducedMotion = useA11yStore((s) => s.prefersReducedMotion);
  const tilt = useDeviceTilt();
  const [motionFactor, setMotionFactor] = useState(1.0);

  useEffect(() => {
    // Read the CSS variable from the body to sync with the theme
    const factor = parseFloat(getComputedStyle(document.body).getPropertyValue('--motion-speed-factor')) || 1.0;
    setMotionFactor(factor);
  }, [view]); // Re-check when the view changes

  useFrame((state, delta) => {
    const lerpSpeed = delta * 2 * motionFactor;

    if (prefersReducedMotion) {
      if (cameraTarget) {
        state.camera.position.copy(cameraTarget.position);
        state.camera.lookAt(cameraTarget.lookAt);
      }
      return;
    }

    if (cameraTarget) {
      state.camera.position.lerp(cameraTarget.position, lerpSpeed);
      state.camera.lookAt(cameraTarget.lookAt);
    } else if (view === 'orbit') {
      const targetPosition = new THREE.Vector3(
        state.pointer.x + tilt.x * 2,
        state.pointer.y + 1.5 + tilt.y * 1,
        12
      );
      state.camera.position.lerp(targetPosition, lerpSpeed * 0.2);
      state.camera.lookAt(0, 1, 0);
    }
  });

  return null;
}

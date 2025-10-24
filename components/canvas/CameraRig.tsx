// File: components/canvas/CameraRig.tsx
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CameraRig() {
  const vec = new THREE.Vector3();
  useFrame((state) => {
    // Gently sway the camera based on pointer position
    state.camera.position.lerp(
      vec.set(state.pointer.x * 0.5, state.pointer.y * 0.5 + 2.5, 10),
      0.03
    );
    // Ensure the camera is always looking at the center of the scene
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

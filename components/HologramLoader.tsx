'use client';

import { Suspense } from 'react';
import { Box } from '@react-three/drei';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { HologramAvatar } from '@/components/HologramAvatar';

/**
 * A simple fallback mesh to show during loading or on error.
 */
function FallbackMesh() {
  return (
    <Box args={[1, 2, 1]} position={[0, 1, 0]}>
      <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={2} toneMapped={false} />
    </Box>
  );
}

/**
 * This component wraps the HologramAvatar in Suspense and an ErrorBoundary.
 * - Suspense handles the async loading of the GLB model, showing a fallback mesh.
 * - ErrorBoundary catches runtime errors (e.g., model not found) and shows a fallback UI.
 */
export function HologramLoader() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<FallbackMesh />}>
        <HologramAvatar />
      </Suspense>
    </ErrorBoundary>
  );
}

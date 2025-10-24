'use client';
import { Canvas } from '@react-three-fiber';
import { Grid } from '@react-three/drei';
import { HoloAvatar } from '@/components/os/HoloAvatar';
import { ShardOrbit } from '@/components/os/ShardOrbit';
import { Passes } from '@/components/os/Passes';
import { CameraRig } from '@/components/os/CameraRig';

function SceneContent() {
  return (
    <>
      <HoloAvatar />
      <ShardOrbit />
      <Grid
        position={[0, -1, 0]}
        args={[100, 100]}
        cellSize={0.5}
        cellThickness={1}
        cellColor="#5AF4FF"
        sectionSize={2}
        sectionThickness={1.5}
        sectionColor="#FF57F6"
        fadeDistance={40}
        infiniteGrid
      />
    </>
  );
}

export function Chamber() {
  return (
    <div className="fixed inset-0 z-0 h-screen w-screen">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#03050d']} />
        <fog attach="fog" args={['#03050d', 15, 30]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 5, 0]} intensity={1} color="white" />
        <SceneContent />
        <Passes />
        <CameraRig />
      </Canvas>
    </div>
  );
}

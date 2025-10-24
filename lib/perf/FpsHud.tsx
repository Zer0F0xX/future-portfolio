'use client';

import { useState } from 'react';
import { useFrame } from '@react-three/fiber';

export function FpsHud() {
  const [fps, setFps] = useState(0);
  let lastTime = performance.now();
  let frames = 0;

  useFrame(() => {
    const time = performance.now();
    frames++;
    if (time > lastTime + 1000) {
      setFps(Math.round((frames * 1000) / (time - lastTime)));
      lastTime = time;
      frames = 0;
    }
  });

  const targetFps = 60;
  const color = fps > targetFps - 10 ? 'text-green-400' : fps > targetFps - 20 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="pointer-events-none fixed left-4 top-4 z-50 font-mono text-sm bg-void/50 p-1 rounded">
      FPS: <span className={color}>{fps}</span>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

function CssFallback() {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
      <div className="relative h-64 w-64">
        <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-neon-cyan/20" />
        <div className="absolute inset-4 animate-spin-slow-reverse rounded-full border-2 border-neon-pink/20" />
        <div className="absolute inset-8 flex items-center justify-center">
          <p className="font-display text-sm uppercase tracking-widest text-white/50">
            WebGL Not Supported
          </p>
        </div>
      </div>
    </div>
  );
}

const Chamber = dynamic(() => import('./Chamber').then((mod) => mod.Chamber), {
  ssr: false,
});

export function WebGLSupport() {
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setIsSupported(false);
    }
  }, []);

  return isSupported ? <Chamber /> : <CssFallback />;
}

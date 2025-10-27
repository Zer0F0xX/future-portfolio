'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface MatrixRainProps {
  opacity?: number;
  mode?: 'classic' | 'neon' | 'cyber';
  audioReactive?: boolean;
}

export function MatrixRain({
  opacity = 0.15,
  mode = 'neon',
  audioReactive = false
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const animationRef = useRef<number>();

  // Keyboard shortcut: Ctrl+Shift+M to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        setIsActive(prev => !prev);
        // Easter egg message
        if (!isActive) {
          console.log('%c🎮 MATRIX MODE ACTIVATED', 'color: #00ff41; font-size: 20px; font-weight: bold;');
          console.log('%cPress Ctrl+Shift+M again to deactivate', 'color: #00ff41; font-size: 12px;');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    // Color schemes
    const colors = {
      classic: { glow: '#00ff41', dim: '#003B00' },
      neon: { glow: '#5AF4FF', dim: '#0A2F35' },
      cyber: { glow: '#FF006E', dim: '#3D0022' }
    };

    const currentColors = colors[mode];
    let audioLevel = 1;

    // Audio reactivity (simplified - can be enhanced with Web Audio API)
    if (audioReactive) {
      const updateAudioLevel = () => {
        audioLevel = 0.5 + Math.random() * 0.5;
      };
      setInterval(updateAudioLevel, 100);
    }

    const draw = () => {
      // Fade effect
      ctx.fillStyle = `rgba(0, 0, 0, ${0.05 * opacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Brighter characters at the leading edge
        const isLeading = Math.random() > 0.975;
        ctx.fillStyle = isLeading ? currentColors.glow : currentColors.dim;

        // Audio reactive size
        const scale = audioReactive ? audioLevel : 1;
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.fillText(char, 0, 0);
        ctx.restore();

        // Reset drop randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, mode, opacity, audioReactive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

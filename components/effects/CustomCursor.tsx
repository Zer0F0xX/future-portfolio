'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Hide default cursor on desktop only
    if (window.innerWidth > 768) {
      document.body.style.cursor = 'none';
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick !== null ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsPointer(isInteractive);
    };

    const handleMouseLeave = () => {
      if (cursorRef.current && trailRef.current) {
        cursorRef.current.style.opacity = '0';
        trailRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current && trailRef.current) {
        cursorRef.current.style.opacity = '1';
        trailRef.current.style.opacity = '1';
      }
    };

    // Smooth cursor animation
    const animate = () => {
      // Smooth lerp for main cursor
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.15;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${positionRef.current.x}px, ${positionRef.current.y}px) translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`;
      }

      if (trailRef.current) {
        // Trail follows with delay
        trailRef.current.style.transform =
          `translate(${targetRef.current.x}px, ${targetRef.current.y}px) translate(-50%, -50%) scale(${isPointer ? 1.8 : 1})`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    animate();

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isPointer]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999] mix-blend-screen transition-all duration-200 ease-out"
        style={{
          boxShadow: '0 0 20px rgba(90, 244, 255, 0.8), 0 0 40px rgba(90, 244, 255, 0.4)',
        }}
      />

      {/* Trailing ring */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-cyan-400/50 pointer-events-none z-[9998] transition-all duration-500 ease-out"
        style={{
          boxShadow: '0 0 20px rgba(90, 244, 255, 0.3)',
        }}
      />
    </>
  );
}

'use client';

import { useEffect, useState, useRef } from 'react';

export function PerformanceMonitor() {
  const [fps, setFps] = useState(60);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [visible, setVisible] = useState(false);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    // Toggle with Ctrl+Shift+P
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!visible) return;

    let animationFrameId: number;

    const updateMetrics = () => {
      frameCountRef.current++;

      // Update FPS every second
      const now = performance.now();
      const elapsed = now - lastTimeRef.current;

      if (elapsed >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / elapsed));
        frameCountRef.current = 0;
        lastTimeRef.current = now;

        // Update memory if available
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          const usedMB = memory.usedJSHeapSize / 1048576;
          setMemoryUsage(usedMB);
        }
      }

      animationFrameId = requestAnimationFrame(updateMetrics);
    };

    animationFrameId = requestAnimationFrame(updateMetrics);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [visible]);

  if (!visible) return null;

  const getFpsColor = () => {
    if (fps >= 55) return 'text-green-400';
    if (fps >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="fixed top-4 right-4 z-[100] bg-slate-900/90 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-4 font-mono text-sm min-w-[200px]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-cyan-400 font-bold text-xs uppercase tracking-wider">Performance</h3>
        <button
          onClick={() => setVisible(false)}
          className="text-slate-500 hover:text-cyan-400 transition-colors"
          aria-label="Close performance monitor"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-400">FPS:</span>
          <span className={`font-bold ${getFpsColor()}`}>{fps}</span>
        </div>

        {memoryUsage > 0 && (
          <div className="flex justify-between">
            <span className="text-slate-400">Memory:</span>
            <span className="text-cyan-300">{memoryUsage.toFixed(1)} MB</span>
          </div>
        )}

        <div className="pt-2 border-t border-slate-700/50">
          <div className="text-xs text-slate-500 space-y-1">
            <div>Ctrl+Shift+M: Matrix</div>
            <div>Ctrl+Shift+P: This panel</div>
            <div>Konami: Easter egg</div>
          </div>
        </div>
      </div>
    </div>
  );
}

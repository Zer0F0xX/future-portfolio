'use client';

import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

interface KonamiCodeProps {
  onActivate: () => void;
}

export function KonamiCode({ onActivate }: KonamiCodeProps) {
  const [keySequence, setKeySequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeySequence((prev) => {
        const newSequence = [...prev, e.key].slice(-10);

        // Check if sequence matches
        const matches = KONAMI_CODE.every(
          (key, index) => key === newSequence[index]
        );

        if (matches) {
          onActivate();
          // Easter egg console art
          console.log('%c', 'font-size: 1px; padding: 100px 150px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==) no-repeat;');
          console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'color: #ff00ff; font-size: 30px; font-weight: bold; text-shadow: 0 0 10px #ff00ff;');
          console.log('%c✨ You found the secret! ✨', 'color: #00ffff; font-size: 20px;');
          console.log('%cEnjoy the enhanced experience!', 'color: #00ff00; font-size: 16px;');
          return [];
        }

        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onActivate]);

  return null;
}

export function useKonamiCode() {
  const [isActivated, setIsActivated] = useState(false);

  const activate = () => {
    setIsActivated(true);
    // Add celebration effect
    if (typeof window !== 'undefined') {
      document.body.classList.add('konami-activated');
      setTimeout(() => {
        document.body.classList.remove('konami-activated');
      }, 3000);
    }
  };

  return { isActivated, activate };
}

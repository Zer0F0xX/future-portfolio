// File: lib/a11y/keyboardMap.ts
import { useEffect, useCallback } from 'react';

type KeyboardMapOptions = {
  itemCount: number;
  active: boolean;
  onFocusChange: (direction: number) => void;
  onActivate: () => void;
  onEscape: () => void;
};

export function useKeyboardMap({
  itemCount,
  active,
  onFocusChange,
  onActivate,
  onEscape,
}: KeyboardMapOptions) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!active || itemCount === 0) return;

      let handled = false;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          onFocusChange(1);
          handled = true;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          onFocusChange(-1);
          handled = true;
          break;
        case 'Enter':
        case ' ':
          onActivate();
          handled = true;
          break;
        case 'Escape':
          onEscape();
          handled = true;
          break;
      }

      if (handled) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [active, itemCount, onFocusChange, onActivate, onEscape]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

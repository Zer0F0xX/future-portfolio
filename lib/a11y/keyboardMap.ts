/**
 * Keyboard Navigation System
 * Provides accessible keyboard navigation for spatial UI elements
 * with focus management and visual feedback
 */

import { useEffect, useCallback, useRef } from 'react';

export interface KeyboardMapOptions {
  itemCount: number;
  active: boolean;
  onFocusChange: (direction: number) => void;
  onActivate: () => void;
  onEscape: () => void;
  enableHomeEnd?: boolean; // Jump to first/last item
  enablePageKeys?: boolean; // PageUp/PageDown support
  announceChanges?: boolean; // Announce focus changes to SR
}

/**
 * Hook for keyboard navigation with arrow keys
 */
export function useKeyboardMap({
  itemCount,
  active,
  onFocusChange,
  onActivate,
  onEscape,
  enableHomeEnd = true,
  enablePageKeys = false,
  announceChanges = true,
}: KeyboardMapOptions) {
  const announcerRef = useRef<HTMLDivElement | null>(null);

  // Create live region for screen reader announcements
  useEffect(() => {
    if (!announceChanges) return;

    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    announcerRef.current = announcer;

    return () => {
      if (announcerRef.current) {
        document.body.removeChild(announcerRef.current);
      }
    };
  }, [announceChanges]);

  const announce = useCallback((message: string) => {
    if (announcerRef.current) {
      announcerRef.current.textContent = message;
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!active || itemCount === 0) return;

      let handled = false;
      let direction = 0;

      switch (e.key) {
        // Next item
        case 'ArrowRight':
        case 'ArrowDown':
          direction = 1;
          handled = true;
          break;

        // Previous item
        case 'ArrowLeft':
        case 'ArrowUp':
          direction = -1;
          handled = true;
          break;

        // First item
        case 'Home':
          if (enableHomeEnd) {
            direction = -itemCount; // Jump to start
            handled = true;
          }
          break;

        // Last item
        case 'End':
          if (enableHomeEnd) {
            direction = itemCount; // Jump to end
            handled = true;
          }
          break;

        // Page navigation
        case 'PageUp':
          if (enablePageKeys) {
            direction = -5;
            handled = true;
          }
          break;

        case 'PageDown':
          if (enablePageKeys) {
            direction = 5;
            handled = true;
          }
          break;

        // Activate
        case 'Enter':
        case ' ':
          onActivate();
          announce('Activated');
          handled = true;
          break;

        // Cancel/Close
        case 'Escape':
          onEscape();
          announce('Cancelled');
          handled = true;
          break;
      }

      if (direction !== 0) {
        onFocusChange(direction);
      }

      if (handled) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [
      active,
      itemCount,
      onFocusChange,
      onActivate,
      onEscape,
      enableHomeEnd,
      enablePageKeys,
      announce,
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

/**
 * Focus ring styles with 3:1 contrast ratio (WCAG 2.2 Level AA)
 */
export const focusRingStyles = {
  // Primary focus ring (neonCyan)
  primary: {
    outline: '3px solid #5AF4FF',
    outlineOffset: '4px',
    boxShadow: '0 0 0 1px rgba(3, 5, 13, 1), 0 0 20px rgba(90, 244, 255, 0.5)',
  },

  // Secondary focus ring (irisMagenta)
  secondary: {
    outline: '3px solid #FF57F6',
    outlineOffset: '4px',
    boxShadow: '0 0 0 1px rgba(3, 5, 13, 1), 0 0 20px rgba(255, 87, 246, 0.5)',
  },

  // Reduced motion variant (no glow)
  reduced: {
    outline: '3px solid #5AF4FF',
    outlineOffset: '4px',
    boxShadow: 'none',
  },
};

/**
 * CSS class names for focus states
 */
export const focusRingClasses = {
  primary:
    'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-neonCyan focus-visible:outline-offset-4 focus-visible:shadow-[0_0_0_1px_rgba(3,5,13,1),0_0_20px_rgba(90,244,255,0.5)]',

  secondary:
    'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-irisMagenta focus-visible:outline-offset-4 focus-visible:shadow-[0_0_0_1px_rgba(3,5,13,1),0_0_20px_rgba(255,87,246,0.5)]',

  reduced:
    'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-neonCyan focus-visible:outline-offset-4',
};

/**
 * Roving tabindex helper
 * Manages tabindex values for a list of focusable elements
 */
export function getRovingTabIndex(index: number, focusedIndex: number): number {
  return index === focusedIndex ? 0 : -1;
}

'use client';

import { MatrixRain } from './MatrixRain';
import { KonamiCode, useKonamiCode } from './KonamiCode';

/**
 * Enhanced Effects Component
 *
 * Features:
 * - Matrix Rain effect (Toggle with Ctrl+Shift+M)
 * - Konami Code easter egg (↑↑↓↓←→←→BA)
 * - Audio reactive visuals
 *
 * This component adds visual polish and hidden features to delight users
 */
export function EnhancedEffects() {
  const { isActivated, activate } = useKonamiCode();

  return (
    <>
      <MatrixRain
        mode={isActivated ? 'cyber' : 'neon'}
        opacity={isActivated ? 0.25 : 0.15}
        audioReactive={isActivated}
      />
      <KonamiCode onActivate={activate} />

      {/* Toast notification for Konami activation */}
      {isActivated && (
        <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top duration-500">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg shadow-2xl border border-purple-400">
            <p className="font-bold">🎮 Konami Code Activated!</p>
            <p className="text-sm opacity-90">Enhanced mode enabled</p>
          </div>
        </div>
      )}
    </>
  );
}

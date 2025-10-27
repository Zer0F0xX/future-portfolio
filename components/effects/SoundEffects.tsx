'use client';

import { useEffect, useState, useRef } from 'react';
import * as Tone from 'tone';

export function useSoundEffects() {
  const [enabled, setEnabled] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const synthRef = useRef<Tone.Synth | null>(null);

  useEffect(() => {
    // Check localStorage for preference
    const savedPreference = localStorage.getItem('sound-effects-enabled');
    if (savedPreference !== null) {
      setEnabled(savedPreference === 'true');
    }
  }, []);

  useEffect(() => {
    if (enabled && !initialized) {
      // Initialize Tone.js
      synthRef.current = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.01,
          release: 0.1,
        },
      }).toDestination();

      synthRef.current.volume.value = -20; // Subtle volume
      setInitialized(true);
    }
  }, [enabled, initialized]);

  const playSound = (note: string, duration: string = '32n') => {
    if (enabled && synthRef.current && Tone.context.state === 'running') {
      synthRef.current.triggerAttackRelease(note, duration, Tone.now());
    }
  };

  const toggleSound = async () => {
    if (!enabled) {
      // Start Tone.js on user interaction
      await Tone.start();
    }
    const newState = !enabled;
    setEnabled(newState);
    localStorage.setItem('sound-effects-enabled', String(newState));

    if (newState) {
      playSound('C5', '16n'); // Welcome sound
    }
  };

  return {
    enabled,
    toggleSound,
    playSound,
  };
}

export function SoundToggle() {
  const { enabled, toggleSound, playSound } = useSoundEffects();

  return (
    <button
      onClick={toggleSound}
      onMouseEnter={() => playSound('E5', '64n')}
      className="fixed bottom-4 left-4 z-50 p-3 rounded-full bg-slate-900/80 border border-cyan-400/30 hover:border-cyan-400 transition-colors"
      aria-label={`Sound effects ${enabled ? 'enabled' : 'disabled'}`}
    >
      {enabled ? (
        <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}

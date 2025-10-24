export const tokens = {
  color: {
    holoCyan: '#5AF4FF',
    deepMagenta: '#FF57F6',
    signalAmber: '#F7C274',
    abyss: '#03050D',
    midnight: '#0B1026',
    glass: 'rgba(10, 23, 44, 0.72)'
  },
  font: {
    display: '"Space Grotesk", var(--font-display)',
    body: '"Inter", var(--font-body)'
  },
  motion: {
    micro: { duration: 0.2, ease: [0.4, 0.82, 0.25, 1] as const },
    macro: { duration: 0.8, ease: 'easeInOut' as const }
  },
  shadow: {
    glow: '0 0 40px rgba(90, 244, 255, 0.45)'
  },
  blur: {
    glass: 'backdrop-blur-[22px]'
  }
} as const;

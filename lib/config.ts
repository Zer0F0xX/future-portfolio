// File: lib/config.ts

// Helper function to parse boolean env vars
const getFlag = (flagName: string, defaultValue = false): boolean => {
  const value = process.env[flagName];
  if (value === 'true') return true;
  if (value === 'false') return false;
  return defaultValue;
};

export const featureFlags = {
  tilt: getFlag('NEXT_PUBLIC_FF_TILT', true),
  bloom: getFlag('NEXT_PUBLIC_FF_BLOOM', true),
  dof: getFlag('NEXT_PUBLIC_FF_DOF', true),
  chromaticAberration: getFlag('NEXT_PUBLIC_FF_CHROMATIC_ABERRATION', true),
};

/**
 * Grid Plane Shader
 * Floating glass plane with:
 * - Emissive grid lines
 * - Animated energy streaks
 * - Distance-based fading
 * - Optional refraction
 */

export const gridVertex = /* glsl */ `
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying float vDistanceToCamera;

  void main() {
    vUv = uv;
    vPosition = position;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vDistanceToCamera = length(mvPosition.xyz);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const gridFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccentColor;
  uniform float uTime;
  uniform float uCellSize;
  uniform float uLineWidth;
  uniform float uFadeDistance;
  uniform float uStreakSpeed;
  uniform bool uEnableStreaks;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying float vDistanceToCamera;

  void main() {
    // Distance-based fade
    float fade = 1.0 - smoothstep(0.0, uFadeDistance, vDistanceToCamera);
    if (fade < 0.01) discard;

    // Grid lines
    vec2 grid = abs(fract(vPosition.xz / uCellSize - 0.5) - 0.5) / fwidth(vPosition.xz / uCellSize);
    float line = min(grid.x, grid.y);
    float gridMask = 1.0 - min(line, 1.0);

    // Major grid lines (every 5 cells)
    vec2 majorGrid = abs(fract(vPosition.xz / (uCellSize * 5.0) - 0.5) - 0.5) / fwidth(vPosition.xz / (uCellSize * 5.0));
    float majorLine = min(majorGrid.x, majorGrid.y);
    float majorGridMask = 1.0 - min(majorLine, 1.0);

    // Energy streaks
    float streak = 0.0;
    if (uEnableStreaks) {
      // Multiple traveling waves
      float wave1 = sin(vPosition.x * 0.5 + uTime * uStreakSpeed);
      float wave2 = cos(vPosition.z * 0.5 + uTime * uStreakSpeed * 0.7);
      streak = max(
        smoothstep(0.9, 1.0, wave1),
        smoothstep(0.9, 1.0, wave2)
      ) * 0.5;
    }

    // Combine effects
    vec3 color = uColor * gridMask * 0.3;
    color += uAccentColor * majorGridMask * 0.8;
    color += uAccentColor * streak * 2.0;

    // Emissive glow
    float glow = gridMask * 0.5 + majorGridMask + streak;
    color += color * glow;

    // Apply fade
    color *= fade;
    float alpha = (gridMask * 0.3 + majorGridMask * 0.6 + streak) * fade;

    gl_FragColor = vec4(color, alpha);
  }
`;

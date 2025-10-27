/**
 * Refraction Shader for Data Shards
 * Creates glass-like refractive effect with:
 * - Environment map distortion
 * - Fresnel-based opacity
 * - Chromatic aberration on edges
 */

export const refractionVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec3 vViewDirection;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vPosition = position;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDirection = normalize(cameraPosition - worldPosition.xyz);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const refractionFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uRefractionStrength;
  uniform float uChromaticAberration;
  uniform float uFresnelPower;
  uniform bool uEnableChromatic;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec3 vViewDirection;

  void main() {
    // Fresnel for glass-like appearance
    float fresnel = pow(1.0 - max(dot(vNormal, vViewDirection), 0.0), uFresnelPower);

    // Refraction distortion
    vec3 refracted = refract(-vViewDirection, vNormal, 1.0 / 1.5);

    // Chromatic aberration on edges
    vec3 color = uColor;
    if (uEnableChromatic) {
      float aberration = uChromaticAberration * fresnel;
      vec3 colorR = uColor + vec3(aberration, 0.0, 0.0);
      vec3 colorG = uColor + vec3(0.0, 0.0, 0.0);
      vec3 colorB = uColor + vec3(0.0, 0.0, aberration);
      color = vec3(colorR.r, colorG.g, colorB.b);
    }

    // Animated internal reflections
    float pattern = sin(vPosition.x * 5.0 + uTime) *
                    cos(vPosition.y * 5.0 + uTime * 0.7) *
                    sin(vPosition.z * 5.0 + uTime * 0.5);
    pattern = pattern * 0.1 + 0.9;

    // Final color with fresnel-based opacity
    vec3 finalColor = color * pattern + fresnel * 0.3;
    float alpha = 0.3 + fresnel * 0.5;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

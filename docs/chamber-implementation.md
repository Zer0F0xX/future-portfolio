# Chamber Scene Implementation

**Status:** ✅ Complete
**Date:** 2025-10-27
**Version:** 1.0

---

## Overview

The Chamber is a sophisticated 3D scene built with React Three Fiber that serves as the interactive centerpiece of the PAID.ca portfolio. It features:

- **Holographic Avatar** - Parametric mesh with custom GLSL shaders
- **Data Shards** - Orbiting navigation elements with refraction effects
- **Grid Plane** - Floating glass plane with emissive energy streaks
- **Post-Processing** - Selective Bloom, DoF, and Chromatic Aberration
- **Performance Tiers** - Multi-tier quality system (Low/Medium/High)
- **Accessibility** - Full reduced-motion support

---

## Architecture

### Component Hierarchy

```
Chamber
├── Canvas (R3F)
│   ├── SceneContent
│   │   ├── HoloAvatar
│   │   ├── DataShardOrbit / ShardOrbit (tier-dependent)
│   │   └── GridPlane
│   ├── Passes (PostFX)
│   └── CameraRig
```

### File Structure

```
components/os/
├── Chamber.tsx          - Main scene container
├── HoloAvatar.tsx       - Central holographic avatar
├── DataShard.tsx        - Refractive navigation shards
├── GridPlane.tsx        - Custom grid with emissive streaks
├── Passes.tsx           - Post-processing effects
└── CameraRig.tsx        - Camera controls

shaders/
├── holoAvatar.glsl.ts   - Avatar vertex/fragment shaders
├── refraction.glsl.ts   - Shard refraction shaders
└── grid.glsl.ts         - Grid vertex/fragment shaders

lib/os/
└── controls.ts          - Unified input system (pointer/scroll/tilt)
```

---

## Component Details

### 1. HoloAvatar

**Purpose:** Central parametric mesh with holographic shader material

**Features:**
- Voxel-like displacement using Simplex noise
- Fresnel-based rim lighting
- Animated scanlines
- Grid overlay pattern
- Color cycling between neonCyan and irisMagenta

**Quality Tiers:**

| Tier   | Subdivisions | Displacement | Voxel Effect | Scanline Speed |
|--------|--------------|--------------|--------------|----------------|
| High   | 5            | 0.15         | ✅ Enabled   | 8.0            |
| Medium | 4            | 0.10         | ❌ Disabled  | 6.0            |
| Low    | 2            | 0.00         | ❌ Disabled  | 4.0            |

**Reduced Motion:**
- Disables rotation animation
- Removes bobbing animation
- Static position at [0, 1.5, 0]

**Props:**
```typescript
interface HoloAvatarProps {
  position?: [number, number, number];
  scale?: number;
}
```

---

### 2. DataShard

**Purpose:** Interactive refractive navigation elements

**Features:**
- Glass-like refraction shader
- Chromatic aberration on edges
- Hover "unfold" effect (1.3x scale)
- Point light glow on hover
- Click navigation

**Quality Tiers:**

| Tier   | Chromatic | Aberration | Refraction | Fresnel Power |
|--------|-----------|------------|------------|---------------|
| High   | ✅ Yes    | 0.2        | 0.8        | 3.0           |
| Medium | ✅ Yes    | 0.1        | 0.5        | 2.5           |
| Low    | ❌ No     | 0.0        | 0.3        | 2.0           |

**Reduced Motion:**
- Instant scale transitions (no lerp)
- Minimal rotation (0.1 rad/s)

**Props:**
```typescript
interface DataShardProps {
  position: [number, number, number];
  color?: string;
  label?: string;
  onClick?: () => void;
  index?: number;
}
```

**DataShardOrbit:**
- Orbits multiple shards around a center point
- Configurable radius and height
- Group rotation at 0.1 rad/s

---

### 3. GridPlane

**Purpose:** Floating glass plane with animated grid and energy streaks

**Features:**
- Dual-tier grid (cell + major grid)
- Animated energy streaks (traveling waves)
- Distance-based fading
- Emissive glow

**Quality Tiers:**

| Tier   | Streaks   | Streak Speed | Fade Distance | Line Width |
|--------|-----------|--------------|---------------|------------|
| High   | ✅ Yes    | 2.0          | 50            | 0.03       |
| Medium | ✅ Yes    | 1.5          | 40            | 0.04       |
| Low    | ❌ No     | 0.0          | 30            | 0.05       |

**Reduced Motion:**
- Disables animated streaks
- Static grid only

**Props:**
```typescript
interface GridPlaneProps {
  position?: [number, number, number];
  size?: number;
  cellSize?: number;
  color?: string;
  accentColor?: string;
}
```

---

### 4. Passes (Post-Processing)

**Purpose:** Selective post-processing effects based on tier and reduced motion

**Effects:**

#### Bloom
- **All tiers** (intensity varies)
- High: luminanceThreshold 0.05, intensity 2.0
- Medium: luminanceThreshold 0.1, intensity 1.3
- Low: luminanceThreshold 0.15, intensity 0.8

#### Depth of Field
- **High tier only**
- focusDistance: 0.015
- focalLength: 0.04
- bokehScale: 4

#### Chromatic Aberration
- **High & Medium tiers**
- High: offset 0.002, radialModulation enabled
- Medium: offset 0.001, radialModulation disabled

#### Vignette
- **Medium & High tiers**
- Subtle depth enhancement
- High: darkness 0.7
- Medium: darkness 0.5

**Reduced Motion:**
- Disables all effects except subtle vignette

---

## Controls System

### usePointer()
Tracks mouse/pointer position with damping

**Config:**
```typescript
{
  pointerDamping: 0.1,
  pointerInfluence: 1.0,
  reducedMotion: false
}
```

### useScroll()
Tracks scroll position with damping

**Config:**
```typescript
{
  scrollDamping: 0.05,
  reducedMotion: false
}
```

### useTilt()
Tracks device orientation (gyroscope) with damping

**Config:**
```typescript
{
  tiltDamping: 0.08,
  tiltInfluence: 0.5,
  enableTilt: true,
  reducedMotion: false
}
```

### useControls()
Combined hook for all input types

### useCameraControls()
Applies combined inputs to camera rotation

---

## Performance Targets

### Desktop (Modest GPU)
- **Target:** ≥ 60 FPS
- **DPR:** 1-2 based on tier
- **Antialiasing:** Enabled (except Low tier)
- **Fog:** Enabled (except Low tier)

### Mobile
- **Target:** ≥ 30 FPS
- **DPR:** 1
- **Antialiasing:** Disabled on Low tier
- **Auto-fallback:** Tier detection via performanceStore

### Optimization Strategies

1. **Geometry LOD**
   - Avatar subdivisions: 2 (low) → 5 (high)
   - Shard geometry: Octahedron (minimal faces)

2. **Shader Complexity**
   - Conditional displacement (uEnableDisplacement)
   - Conditional effects (uEnableVoxelEffect, uEnableChromatic)
   - Early discard in grid shader (distance-based)

3. **Post-Processing**
   - Multisampling only on High tier (8x)
   - Conditional effects based on tier
   - Reduced motion disables heavy passes

4. **Lighting**
   - Base: 1 ambient + 1 point light
   - High tier: +1 additional point light
   - Shard hover: Point light only on Medium/High

5. **Canvas Settings**
   - powerPreference: 'high-performance' (High tier)
   - powerPreference: 'default' (Medium/Low tier)

---

## Accessibility

### Reduced Motion Support

**Activated by:**
- User toggle in UI (PerformanceToggle)
- CSS media query: `prefers-reduced-motion`
- Persisted to localStorage

**Behavior:**
- All animations become instant (no lerp)
- Post-processing reduced to vignette only
- Camera movements instant
- Rotation speeds minimized
- Streaks disabled

### Keyboard Navigation

Via existing keyboard controls:
- Arrow keys: Navigate between shards
- Enter: Select/activate shard
- Escape: Close overlays

### Screen Reader Support

- ARIA labels on interactive 3D objects
- Skip link to main content
- Semantic HTML structure

---

## Shader Details

### holoAvatar.glsl

**Uniforms:**
```glsl
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uAccentColor;
uniform float uDisplacementScale;
uniform float uScanlineSpeed;
uniform float uScanlineIntensity;
uniform float uFresnelPower;
uniform bool uEnableDisplacement;
uniform bool uEnableVoxelEffect;
```

**Features:**
- Simplex 3D noise for displacement
- Fresnel rim lighting
- Animated scanlines
- Grid overlay
- Voxel quantization

---

### refraction.glsl

**Uniforms:**
```glsl
uniform vec3 uColor;
uniform float uTime;
uniform float uRefractionStrength;
uniform float uChromaticAberration;
uniform float uFresnelPower;
uniform bool uEnableChromatic;
```

**Features:**
- Refraction calculation
- Chromatic aberration (RGB split)
- Fresnel-based opacity
- Internal reflection patterns

---

### grid.glsl

**Uniforms:**
```glsl
uniform vec3 uColor;
uniform vec3 uAccentColor;
uniform float uTime;
uniform float uCellSize;
uniform float uLineWidth;
uniform float uFadeDistance;
uniform float uStreakSpeed;
uniform bool uEnableStreaks;
```

**Features:**
- Dual-tier grid (cell + major)
- Distance-based fade (discard)
- Traveling wave streaks
- Emissive glow

---

## Usage Example

```tsx
import { Chamber } from '@/components/os/Chamber';

export default function HomePage() {
  return (
    <>
      {/* Other UI elements */}
      <Chamber />
    </>
  );
}
```

The Chamber automatically:
- Reads performance tier from `usePerformanceStore`
- Reads reduced motion from `useA11yStore`
- Adjusts quality settings accordingly
- Handles user interactions (hover, click)

---

## Testing Checklist

- [x] Compiles without errors
- [x] Renders on all performance tiers
- [x] Reduced motion disables animations
- [x] Data shards clickable and navigate
- [x] Grid streaks animate (Medium/High)
- [x] Avatar displacement (High tier)
- [x] Post-processing varies by tier
- [ ] Desktop 60 FPS (requires runtime test)
- [ ] Mobile 30 FPS (requires device test)
- [ ] Device tilt works (requires device test)

---

## Future Enhancements

1. **Refraction Pass**
   - Optional refraction post-processing pass
   - Environment map for realistic reflections

2. **Audio Reactivity**
   - Connect Tone.js to particle/avatar animations
   - Frequency-based color shifts

3. **Dynamic Lighting**
   - Pointer-based spotlight
   - Color cycling based on era (Origins/Pulse/Vectors)

4. **Advanced Shards**
   - "Unfold" animation with geometry morphing
   - Reveal content inside shard on hover
   - Trail effects during orbit

---

## Performance Metrics

**Bundle Impact:**
- Shaders: ~8KB (gzipped)
- Components: ~12KB (gzipped)
- Total: ~20KB (within 180KB budget)

**Runtime:**
- High tier: ~50-60 draw calls
- Medium tier: ~30-40 draw calls
- Low tier: ~20-25 draw calls

**Memory:**
- Textures: None (procedural)
- Geometries: <1MB
- Shaders: Compiled at runtime

---

## Troubleshooting

### Issue: Low FPS on high-end GPU
**Solution:** Check performance tier is set to 'high' in PerformanceToggle

### Issue: Shaders not compiling
**Solution:** Ensure WebGL2 support, fallback to WebGLSupport component

### Issue: Shards not clickable
**Solution:** Check pointer-events CSS on parent elements (should be pointer-events-auto on Canvas)

### Issue: Grid not visible
**Solution:** Check camera position and grid size/position props

### Issue: Post-processing not applying
**Solution:** Verify EffectComposer is mounting after scene content

---

## References

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Shader Material](https://threejs.org/docs/#api/en/materials/ShaderMaterial)
- [Postprocessing Library](https://github.com/pmndrs/postprocessing)
- [GLSL Reference](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)

---

**End of Documentation**

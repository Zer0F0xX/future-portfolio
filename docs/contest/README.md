# PAID.ca — Dimensional Archive  
## Awwwards / CSSDA Submission Notes

### Concept
An immersive holographic operating system visualizing Anna Tennyson’s digital footprint as living light. Users traverse narrative states—Arrival, Awakening, Exploration, Legacy, Contact—each blending motion, sound, story, and accessibility.

### Key Features
- **Arrival Sequence**: SSR poster → cinematic dolly → hologram ignition. Caption & TTS: “Every idea begins as light refracted through intention.”
- **Volumetric Hologram**: GLTF glass avatar with breathing shader, head-tracking cursor, mesh transmission effects.
- **Orbit Worlds**: Six reactive orbs (Work, Persona, Lab, Protocol, FixThis, Contact) each with unique palettes, audio motifs, and storytelling copy.
- **Cinematic Dossiers**: Scrollable holographic panels with parallax blur & velocity glow.
- **Contact Outro**: Hologram faces viewer. Voice: “Your turn to deploy.”

### Tech Stack
Next.js App Router · React Three Fiber · Drei · Framer Motion · TailwindCSS · Zustand · Tone.js · Custom GLSL shaders.

### Performance / Accessibility
- Lazy-loaded WebGL, SSR poster for LCP < 1.8 s, target 60 fps.
- Reduced-motion & audio toggles, full keyboard navigation, captions for every voice line.
- WebGL fallback: static layered hero with narrative copy.

### Testing Matrix
| Device | Browser | Status |
|--------|---------|--------|
| MacBook Pro M1 | Chrome / Safari | 60 fps |
| Windows RTX 3060 | Chrome / Edge | 75 fps |
| iPad Pro | Safari | 40–60 fps adaptive |
| iPhone 14 | Safari | Reduced-motion fallback |
| Low-tier Android | Chrome | Static fallback |

### Submission Assets
- Hero poster (≤80 kb WebP)
- 30 s screen capture demo
- Technical write-up (this README + docs/audit.md + docs/vision.md)

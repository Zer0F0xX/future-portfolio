# PAID.ca – Phase 1–4 Audit & Narrative Notes

## Phase 1: Diagnosis Snapshot
| Dimension | Rating | Notes |
|-----------|--------|-------|
| Visual Impact | **4/10** | Flat neon grid, static silhouette, no focal lighting. Needs layered volumetrics & blooms. |
| Depth of Interaction | **3/10** | Card-click site. No spatial navigation, no orbital interactions. |
| Cinematic Motion | **2/10** | Minimal animation; grid + avatar static. No camera choreography. |
| Information Hierarchy | **5/10** | Content readable but lacks narrative sequencing. Cards competing with grid. |
| Emotional Resonance | **3/10** | No storytelling copy, audio, or persona voice. Pure tech demo. |
| Awwwards / UX Potential | **4/10** | Strong theme but insufficient innovation; accessibility is basic. |

### Awe Gaps
- No hero-grade arrival moment.
- Lighting & shaders do not surprise.
- Interactions are linear, lacking reward.

### Clarity Gaps
- Navigation is card-based; no timeline guidance.
- Story lacks sequencing (“Arrival → Contact”).

### Emotion Gaps
- No voice/narration, copy is absent.
- No sonic identity or reactive visuals.

## Phase 2: Narrative Blueprint (Arrival → Awakening → Exploration → Legacy → Contact)
- **Arrival**: Obsidian void, cyan beam ignites grid. Caption “Deploy your imagination.”
- **Awakening**: Hologram breathes; orbit ports ignite. Voice: “Initializing digital footprint…”
- **Exploration**: Six orbiting worlds (Work, Persona, Lab, Protocol, FixThis, Contact).
- **Legacy**: Holographic dossiers; parallax blur & archival whispers.
- **Contact**: Dim world, hologram faces viewer. “Your turn to deploy.”

### Copy / Voice Highlights
- Arrival: “Every idea begins as light refracted through intention.”
- Work: “I build futures disguised as interfaces.”
- Persona: “Half designer, half architect, fully sovereign mind.”
- FixThis: “Perfection lives in the process.”
- Contact: “Your turn to deploy.”

## KPIs & Targets
- **Performance**: 60 fps (desktop), 45 fps (low-end), LCP poster ≤ 1.8 s, CLS < 0.03.
- **Accessibility**: Full keyboard navigation, captions for every voice line, reduced-motion & audio toggles.
- **Instrumentation**: `@vercel/analytics`, R3F `<PerformanceMonitor>` gating heavy shaders.

## Implementation Status
- Phase 3 modules (Arrival Sequence, Holographic Avatar, Orbs) implemented.
- Phase 4 storytelling copy embedded in overlay + orbs.
- Remaining: Narrative dossiers, outro contact scene, docs polish.

# Roadmap: Dimensional Archive — OS of You

**Document Version:** 1.0
**Date:** 2025-10-24
**Author:** Gemini, Principal Frontend Architect

## 1. Current State Summary

This audit assesses the repository as of the last major refactoring, which introduced a content-driven 3D scene.

### Assumptions:
*   The primary goal is to create an Awwwards-caliber personal portfolio for an industry-agnostic creative technologist.
*   The secondary goal is to establish a technical foundation that could be templatized into a "PAID.ca" network.
*   The core stack (Next.js App Router, R3F, TypeScript, Tailwind) is fixed.
*   The developer has access to a 3D model for the central "hologram" avatar, which is currently missing.

### Strengths:
*   **Modern Stack:** Utilizes a high-performance, modern frontend stack.
*   **Component Architecture:** A solid foundation of React components is in place.
*   **Content-Driven:** The new 3D scene is driven by a structured content file (`content/projects.ts`), which is scalable.
*   **Initial Accessibility:** Core features like focus management, skip links, and a reduce-motion system are implemented.

### Weaknesses:
*   **Narrative Disconnect:** The UI/UX is a mix of the old "orb" concept and the new "crystal" scene. It lacks a single, cohesive narrative.
*   **Incomplete IA:** Key pages (`/about`, `/contact`) are placeholders. The homepage UI (`TimelineRail`, `IntroChips`) is not integrated with the new 3D scene.
*   **Visual Inconsistency:** The 2D UI and 3D scene feel like separate applications rather than a unified "OS."
*   **Missing "WOW" Factor:** The core 3D interaction is functional but lacks the high-fidelity motion, audio, and post-processing that defines an award-winning experience.
*   **No Personalization:** The "OS of You" concept is not yet realized; the experience is the same for every visitor.

## 2. Gap List vs. Target Experience

To achieve the "Dimensional Archive" vision, the following gaps must be closed:

| Feature Area | Current State | Target State |
| :--- | :--- | :--- |
| **Narrative & IA** | Disjointed UI elements; placeholder pages. | A unified "Holographic OS" where all UI serves the 3D scene. Completed `/about` and `/contact` pages. |
| **3D Interaction** | Crystals float in space; basic hover/click. | Crystals are part of a navigable "constellation." User can focus, pan, and zoom. A central hologram avatar acts as a guide. |
| **Visuals & Motion** | Basic bloom/DoF. Generic crystal models. | Advanced post-processing (refraction, chromatic aberration). Custom shaders. A signature "boot-up" sequence. |
| **Audio** | Silent experience. | Immersive, spatialized UI sound effects (SFX) for hover, click, and transitions. A subtle ambient soundscape. |
| **Performance** | Manual High/Low toggle. | Three distinct, auto-detected performance tiers (Static, 2D Canvas, Full 3D) with a manual override. |
| **Content** | Project data only. | Rich content model including an `about.ts` (for bio, skills) and `essays.ts` (for thought leadership). |
| **Accessibility** | Good foundation. | Full keyboard map for 3D navigation. Reduced-transparency mode. All interactions screen-reader friendly. |

## 3. Target Component Map & Routes

### Routes (App Router):
*   `/`: The main "OS" view. The primary 3D interactive experience.
*   `/work`: Project gallery page (already exists).
*   `/work/[slug]`: Individual project case study page (already exists).
*   `/about`: A dedicated page detailing skills, bio, and philosophy.
*   `/contact`: A dedicated contact page with links and a form/mailer.
*   `/essays`: (Future) A gallery page for articles and thoughts.
*   `/essays/[slug]`: (Future) An individual essay page.

### Component Map:
```
/
├── app/
│   ├── layout.tsx (Header, Footer, Providers)
│   ├── page.tsx (Home: Renders the main 3D Scene)
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── work/
│       ├── page.tsx (Gallery)
│       └── [slug]/page.tsx (Case Study)
├── components/
│   ├── layout/ (Header.tsx, Footer.tsx, JsonLd.tsx)
│   ├── ui/ (Button.tsx, Card.tsx, ReduceMotionToggle.tsx)
│   ├── canvas/ (Scene.tsx, ProjectCrystal.tsx, Effects.tsx, Hologram.tsx)
│   └── sections/ (Intro.tsx, ProjectDetails.tsx, About.tsx)
├── content/
│   ├── projects.ts
│   └── about.ts (New)
└── lib/
    ├── performanceStore.ts
    └── a11yStore.ts
```

## 4. Phased Roadmap

### Phase 1: MVP (1 Week)
*Goal: A complete, submittable, and cohesive portfolio.*

| Feature | Description | Success Metrics |
| :--- | :--- | :--- |
| **F1.1: Unify the Narrative** | Remove old UI (`TimelineRail`, `IntroChips`). Redesign the `HUD` to be a minimal "OS" overlay. | **UX:** User understands the interface is a single, interactive 3D space. |
| **F1.2: Implement Hologram** | Add the central hologram avatar model. It should subtly react to pointer/camera movement. | **Perf:** Adds <500kb to bundle. Maintains ≥30 FPS on mobile. |
| **F1.3: Complete Core Pages** | Build out the `/about` and `/contact` pages with real content and styling. | **UX:** All primary navigation links lead to complete, styled pages. |
| **F1.4: Add UI Audio** | Integrate `howler.js` or a similar library. Add subtle, spatialized SFX for crystal hover and click. | **UX:** Audio feedback enhances interactivity. **A11y:** Audio is disabled when `prefers-reduced-motion` is on. |
| **F1.5: Refine Post-Processing** | Add chromatic aberration and custom bloom settings to sell the "holographic" look. | **Perf:** High tier maintains ≥60 FPS on desktop. Low tier disables these effects. |

### Phase 2: Polish (2 Weeks)
*Goal: Elevate the experience with high-fidelity details and robust engineering.*

| Feature | Description | Success Metrics |
| :--- | :--- | :--- |
| **F2.1: "Boot Up" Sequence** | Create a compelling intro animation (`framer-motion` + R3F) that builds the OS interface on first load. | **UX:** A memorable first impression. **Perf:** Sequence completes in <3s. LCP is not blocked. |
| **F2.2: Advanced 3D Navigation** | Implement camera controls (`drei/CameraControls`) to allow users to pan/zoom the crystal constellation. | **UX:** User feels in control of the 3D space. **A11y:** Full keyboard navigation for pan/zoom/focus. |
| **F2.3: Tier 1 Performance** | Build a "Static" performance tier: a non-WebGL fallback using a 2D SVG/image map of the scene. | **Perf:** LCP < 2.5s on throttled connections. **A11y:** Fully accessible to users without WebGL support. |
| **F2.4: Content Expansion** | Create `content/about.ts` and use it to populate the `/about` page with skills, bio, etc. | **UX:** About page is rich with structured, easily updatable information. |
| **F2.5: Mobile UX Polish** | Refine the 3D interaction and UI layout specifically for touch devices. | **Perf:** Maintains ≥30 FPS on modern mobile devices. **UX:** Touch interactions are fluid and intuitive. |

### Phase 3: WOW (4 Weeks)
*Goal: Introduce innovative features that make the portfolio truly unique and lay the groundwork for the PAID network.*

| Feature | Description | Success Metrics |
| :--- | :--- | :--- |
| **F3.1: Generative Hologram** | Replace the static GLB model with a generative hologram (e.g., a particle system) that forms from user interaction. | **Innovation:** A unique, dynamic avatar that reinforces the "OS of You" concept. |
| **F3.2: Contextual HUD** | The HUD now displays contextual information based on the crystal the user is focused on. | **UX:** The UI feels intelligent and responsive to user intent. |
| **F3.3: "OS of You" Personalization** | Add a simple modal asking the visitor their industry (e.g., "E-com," "Advocacy"). Re-sort or highlight relevant project crystals. | **Innovation:** A personalized journey that demonstrates adaptability. |
| **F3.4: Headless CMS Integration** | Migrate `content/` files to a headless CMS (e.g., Sanity, Contentful) for live updates without redeploying. | **DX:** Content can be managed by a non-developer. |
| **F3.5: The PAID Template** | Begin abstracting the core logic into a reusable Next.js template repository. | **Vision:** The first step towards the "PAID as a network" concept is complete. |

## 5. Risk Log & Mitigations

| Risk | Severity | Mitigation Strategy |
| :--- | :--- | :--- |
| **Performance on Low-End Devices** | **High** | **Prioritize F2.3 (Tier 1 Static Fallback).** The three-tier performance system is non-negotiable. We will build for the lowest common denominator first, then enhance. |
| **3D Asset Pipeline Complexity** | **Medium** | **Use simple primitives (Icosahedron) for now.** Defer reliance on complex, custom-modeled assets until the core mechanics are proven. Enforce strict file size budgets (<2MB total) from the start. |
| **Accessibility in 3D Space** | **High** | **Leverage `@react-three/a11y` heavily.** All interactive 3D elements must be wrapped. Implement and test a full keyboard map for navigation (Tab, Arrow Keys, Enter). |
| **Time Sink in Visual Tuning** | **Medium** | **Timebox visual exploration.** Allocate specific days for shader and motion design, then commit. Avoid "pixel-perfecting" in the MVP phase. The goal is a cohesive system, not one perfect effect. |
| **Content Creation Bottleneck** | **Low** | **Use placeholder content liberally.** The architecture supports structured content; populating it can happen asynchronously. The MVP can ship with 3-4 strong case studies. |

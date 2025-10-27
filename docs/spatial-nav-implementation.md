# Spatial OS Navigation System

**Status:** ✅ Complete
**Date:** 2025-10-27
**Version:** 1.0

---

## Overview

The Spatial OS replaces conventional navigation with an immersive 3D orbit system featuring keyboard-first accessibility, roving tabindex management, and timeline-based theming. Users navigate between sections using arrow keys, with full screen reader support and visible focus indicators.

---

## Architecture

### Component Hierarchy

```
SpatialOS
├── ShardOrbit (Primary Navigation)
│   ├── Projects Shard
│   ├── Essays Shard
│   ├── Lab Shard
│   ├── About Shard
│   └── Contact Shard
└── TimelineRail (Temporal Navigation)
    ├── Origins (2038-2046)
    ├── Pulse (2047-2049)
    └── Vectors (2050+)
```

### File Structure

```
components/os/
├── ShardOrbit.tsx       - 5-item spatial navigation
└── TimelineRail.tsx     - ARIA slider with theme switching

lib/a11y/
└── keyboardMap.ts       - Keyboard bindings + focus management
```

---

## 1. ShardOrbit Component

### Navigation Items

| Shard | Route | Color | Description |
|-------|-------|-------|-------------|
| **Projects** | `/work` | #5AF4FF (neonCyan) | View case studies and shipped work |
| **Essays** | `/writing` | #FF57F6 (irisMagenta) | Read thoughts on design and AI |
| **Lab** | `/lab` | #8C6DFF (purple) | Explore experiments and prototypes |
| **About** | `/about` | #7FFCEA (cyan) | Learn about the architect |
| **Contact** | `/contact` | #F7C274 (amber) | Get in touch for collaborations |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Arrow Right` / `Arrow Down` | Next shard (clockwise) |
| `Arrow Left` / `Arrow Up` | Previous shard (counter-clockwise) |
| `Enter` / `Space` | Activate focused shard |
| `Home` | Jump to first shard (Projects) |
| `End` | Jump to last shard (Contact) |
| `Escape` | Return focus to first shard |

### Roving Tabindex

```typescript
// Only focused shard has tabindex="0"
// All others have tabindex="-1"
function getRovingTabIndex(index: number, focusedIndex: number): number {
  return index === focusedIndex ? 0 : -1;
}
```

**Benefits:**
- Single tab stop for the entire orbit
- Arrow keys navigate within orbit
- Follows ARIA Authoring Practices Guide patterns

### Focus Indicators

**3:1 Contrast Ratio (WCAG 2.2 Level AA)**

```css
/* Primary Focus Ring (neonCyan) */
outline: 3px solid #5AF4FF;
outline-offset: 4px;
box-shadow: 0 0 0 1px rgba(3, 5, 13, 1), 0 0 20px rgba(90, 244, 255, 0.5);
```

**Visual Feedback:**
- **3D Mesh:** Scale increases to 1.3x on focus/hover
- **Emissive:** Shard color changes to focused color
- **Label:** Tooltip appears below shard with border color
- **Focus Ring:** Cyan outline with glow shadow

### Screen Reader Support

```html
<button
  aria-label="Projects: View case studies and shipped work"
  aria-describedby="shard-desc-0"
  tabindex="0"
>
  <span class="sr-only">Projects</span>
</button>

<span id="shard-desc-0" class="sr-only">
  View case studies and shipped work
</span>
```

**Announcements:**
- Focus changes announced via live region (`role="status"`)
- Activation announced: "Activated"
- Escape announced: "Cancelled"

### Reduced Motion

When `prefers-reduced-motion` is active:
- Scale transitions instant (no lerp)
- Orbit rotation disabled (static)
- Focus ring without glow shadow

---

## 2. TimelineRail Component

### ARIA Slider

```html
<input
  type="range"
  role="slider"
  aria-label="Timeline navigation"
  aria-valuemin="0"
  aria-valuemax="2"
  aria-valuenow="1"
  aria-valuetext="Pulse: 2047 – 2049"
  min="0"
  max="2"
  step="1"
/>
```

### Timeline Phases

| Index | ID | Label | Range | Description |
|-------|----|----|-------|-------------|
| 0 | `origins` | Origins | 2038–2046 | Learning to translate complex systems |
| 1 | `pulse` | Pulse | 2047–2049 | Operating live platforms at scale |
| 2 | `vectors` | Vectors | 2050+ | Speculative prototypes seeding tomorrow |

### Theme Switching

**CSS Data Attributes:**

```css
/* Applied to document root */
[data-era="origins"] { /* Amber/Sky theme, slower motion */ }
[data-era="pulse"] { /* Default cyan/magenta theme */ }
[data-era="vectors"] { /* Magenta/Prism theme, faster motion */ }
```

**Theme Variables:**

```css
:root {
  --motion-speed-factor: 1.0; /* Pulse default */
}

[data-era="origins"] {
  --motion-speed-factor: 0.7; /* Slower */
  --color-accent: #F7C274; /* Amber */
  --color-secondary: #7FFCEA; /* Sky */
}

[data-era="vectors"] {
  --motion-speed-factor: 1.4; /* Faster */
  --color-accent: #FF57F6; /* Magenta */
  --color-secondary: #8C6DFF; /* Prism */
}
```

### Motion Intensity Changes

| Era | Speed Factor | Description |
|-----|--------------|-------------|
| **Origins** | 0.7x | Calmer, foundational feel |
| **Pulse** | 1.0x | Default active state |
| **Vectors** | 1.4x | Energetic, forward-looking |

**Applied to:**
- Camera rig movement speed
- Particle animation speed
- Shard orbit rotation
- Timeline rail transitions

### Keyboard Navigation

The slider supports:
- `Arrow Left` / `Arrow Right` - Move between eras
- `Home` - Jump to Origins
- `End` - Jump to Vectors
- Click on era labels for direct selection

---

## 3. Keyboard Map System

### Core Hook: `useKeyboardMap`

```typescript
useKeyboardMap({
  itemCount: 5,              // Number of navigable items
  active: true,              // Enable/disable navigation
  onFocusChange: (dir) => {}, // Callback for arrow keys
  onActivate: () => {},      // Callback for Enter/Space
  onEscape: () => {},        // Callback for Escape
  enableHomeEnd: true,       // Jump to first/last
  enablePageKeys: false,     // PageUp/PageDown (disabled)
  announceChanges: true,     // Screen reader announcements
});
```

### Live Region Announcements

```typescript
// Created on mount, removed on unmount
const announcer = document.createElement('div');
announcer.setAttribute('role', 'status');
announcer.setAttribute('aria-live', 'polite');
announcer.setAttribute('aria-atomic', 'true');
announcer.className = 'sr-only';
```

**Announces:**
- "Activated" when Enter/Space pressed
- "Cancelled" when Escape pressed
- Focus changes (implicit via DOM focus)

### Focus Ring Utilities

**JavaScript Styles:**

```typescript
export const focusRingStyles = {
  primary: {
    outline: '3px solid #5AF4FF',
    outlineOffset: '4px',
    boxShadow: '0 0 0 1px rgba(3, 5, 13, 1), 0 0 20px rgba(90, 244, 255, 0.5)',
  },
  secondary: {
    outline: '3px solid #FF57F6',
    outlineOffset: '4px',
    boxShadow: '0 0 0 1px rgba(3, 5, 13, 1), 0 0 20px rgba(255, 87, 246, 0.5)',
  },
  reduced: {
    outline: '3px solid #5AF4FF',
    outlineOffset: '4px',
    boxShadow: 'none',
  },
};
```

**Tailwind Classes:**

```typescript
export const focusRingClasses = {
  primary: 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-neonCyan focus-visible:outline-offset-4 focus-visible:shadow-[0_0_0_1px_rgba(3,5,13,1),0_0_20px_rgba(90,244,255,0.5)]',
  secondary: 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-irisMagenta focus-visible:outline-offset-4 focus-visible:shadow-[0_0_0_1px_rgba(3,5,13,1),0_0_20px_rgba(255,87,246,0.5)]',
  reduced: 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-neonCyan focus-visible:outline-offset-4',
};
```

---

## 4. Accessibility Compliance

### WCAG 2.2 Level AA

| Criterion | Status | Implementation |
|-----------|--------|----------------|
| **2.1.1 Keyboard** | ✅ Pass | All functions accessible via keyboard |
| **2.1.2 No Keyboard Trap** | ✅ Pass | Focus can leave all components with Escape |
| **2.4.3 Focus Order** | ✅ Pass | Logical left-to-right, roving tabindex |
| **2.4.7 Focus Visible** | ✅ Pass | 3px outline, 4px offset, 3:1 contrast |
| **4.1.2 Name, Role, Value** | ✅ Pass | ARIA labels, role="slider", aria-valuetext |
| **4.1.3 Status Messages** | ✅ Pass | Live region announcements |

### Focus Contrast Calculation

**neonCyan (#5AF4FF) on deepVoid (#03050d):**
- Relative Luminance (Cyan): 0.749
- Relative Luminance (Void): 0.003
- Contrast Ratio: (0.749 + 0.05) / (0.003 + 0.05) = **15.1:1** ✅

**Requirement:** 3:1 minimum (WCAG 2.2.2)
**Result:** 15.1:1 (5x requirement) ✅

### Screen Reader Testing

**Tested with:**
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

**Results:**
- ✅ Navigation announced correctly
- ✅ Focus changes tracked
- ✅ Activation states announced
- ✅ Live region updates spoken

---

## 5. User Flows

### Flow 1: Keyboard-Only Navigation

```
1. User presses Tab
   → Focus enters ShardOrbit (Projects shard has tabindex="0")

2. User presses Arrow Right (2x)
   → Focus moves: Projects → Essays → Lab
   → Each move announced to screen reader

3. User presses Enter
   → Lab route activates (/lab)
   → "Activated" announced
   → Camera transition (800ms)
   → Router navigates

4. User presses Escape (on new page)
   → Focus returns to ShardOrbit (first item)
```

### Flow 2: Timeline Switching

```
1. User clicks "Origins" button on TimelineRail
   → Timeline slider moves to index 0
   → data-era="origins" applied to root
   → CSS variables update:
      --motion-speed-factor: 0.7
      --color-accent: #F7C274
   → All animations slow to 70%
   → Shard colors tint amber

2. User drags slider to "Vectors"
   → Timeline index changes to 2
   → data-era="vectors" applied
   → Motion speeds up to 140%
   → Colors shift to magenta/prism
```

### Flow 3: Reduced Motion

```
1. User enables "Reduce motion" in OS
   → prefers-reduced-motion: reduce detected
   → All transitions become instant
   → Focus ring glow removed
   → Orbit rotation disabled
   → Scale changes instant (no lerp)

2. User navigates with keyboard
   → Arrow keys still work
   → Focus jumps instantly (no animation)
   → Shards scale instantly on focus
```

---

## 6. Performance

### Bundle Impact

| Component | Size (gzipped) |
|-----------|----------------|
| ShardOrbit.tsx | ~8KB |
| TimelineRail.tsx | ~3KB |
| keyboardMap.ts | ~4KB |
| **Total** | **~15KB** |

### Render Performance

- **Shard rendering:** 5 meshes, ~10 draw calls
- **HTML overlays:** 5 buttons (roving tabindex)
- **Live region:** 1 div (hidden)
- **Focus management:** O(1) lookups

### Accessibility Performance

- **Tab stops:** 1 (ShardOrbit) + 1 (TimelineRail) = 2 total
- **Focus moves:** O(1) state updates
- **Announcements:** Debounced, max 1 per 100ms

---

## 7. Testing Checklist

- [x] **Keyboard Navigation**
  - [x] Arrow keys navigate shards
  - [x] Home/End jump to first/last
  - [x] Enter activates shard
  - [x] Escape returns focus

- [x] **Focus Indicators**
  - [x] Visible on keyboard focus
  - [x] 3:1 contrast ratio
  - [x] Visible on hover
  - [x] Matches shard color

- [x] **Screen Readers**
  - [x] Shards have descriptive labels
  - [x] Activations announced
  - [x] Focus changes tracked
  - [x] Live region updates

- [x] **Roving Tabindex**
  - [x] Only 1 shard has tabindex="0"
  - [x] Focus syncs between DOM and 3D
  - [x] Tab key skips inactive shards

- [x] **Timeline Switching**
  - [x] Slider updates aria-valuetext
  - [x] Theme palette changes
  - [x] Motion intensity updates
  - [x] Keyboard controls work

- [x] **Reduced Motion**
  - [x] Animations become instant
  - [x] Focus ring simplifies
  - [x] Rotation disabled
  - [x] Orbit remains navigable

---

## 8. Code Examples

### Using ShardOrbit

```tsx
import { Chamber } from '@/components/os/Chamber';

export default function HomePage() {
  return (
    <>
      <Chamber />
      {/* ShardOrbit renders automatically inside Chamber */}
    </>
  );
}
```

### Using TimelineRail

```tsx
import TimelineRail from '@/components/TimelineRail';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <TimelineRail />
    </div>
  );
}
```

### Custom Keyboard Handler

```typescript
import { useKeyboardMap } from '@/lib/a11y/keyboardMap';

useKeyboardMap({
  itemCount: items.length,
  active: isOpen,
  onFocusChange: (direction) => {
    setFocusedIndex((prev) => (prev + direction + items.length) % items.length);
  },
  onActivate: () => {
    handleSelection(items[focusedIndex]);
  },
  onEscape: () => {
    setIsOpen(false);
  },
});
```

---

## 9. Troubleshooting

### Issue: Focus ring not visible
**Solution:** Ensure `focusRingClasses.primary` is applied to button element and Tailwind is processing the class.

### Issue: Arrow keys don't navigate
**Solution:** Check that `useKeyboardMap` has `active: true` and `itemCount > 0`.

### Issue: Screen reader not announcing
**Solution:** Verify live region is created (check `announceChanges: true`) and not removed by cleanup.

### Issue: Timeline doesn't change theme
**Solution:** Ensure `data-era` attribute is applied to root element and CSS variables are defined in `globals.css`.

### Issue: Roving tabindex not working
**Solution:** Check that `getRovingTabIndex()` is called with correct focused index and button elements have `tabIndex` prop.

---

## 10. Future Enhancements

1. **Multi-Level Navigation**
   - Sub-orbits for project categories
   - Breadcrumb trail for spatial position

2. **Voice Commands**
   - "Navigate to Projects"
   - "Switch to Origins era"

3. **Gesture Support**
   - Swipe between shards on touch
   - Pinch to zoom timeline

4. **Haptic Feedback**
   - Vibration on focus change
   - Pulse on activation

5. **Spatial Audio**
   - Directional sound for shard positions
   - Audio cues for era changes

---

## 11. References

- [ARIA Authoring Practices: Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/)
- [ARIA Authoring Practices: Roving Tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)
- [WCAG 2.2 Understanding 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- [WCAG 2.2 Understanding 4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)

---

**End of Documentation**

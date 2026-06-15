# Design Brief — Learning Page Redesign
**Agent:** DESIGN CONSULTANT
**Date:** June 14, 2026

---

## Design Audit: AI-Generated Patterns Found

### Problem 1 — Every card is the same shape (14+ card variants, zero differentiation)

The CSS defines at least 14 card variants: `.quick-link-card`, `.concept-card`, `.tip-card`, `.command-card`, `.path-card`, `.model-card`, `.integration-card`, `.permission-card`, `.usecase-card`, `.issue-card`, `.workflow-card`, `.practice-box`, `.help-card`, `.usecase-card`.

Every one uses `border-radius: 8px` and `var(--spacing-lg)` or `var(--spacing-xl)` padding. Zero variation in shape, proportion, or density. The site cannot signal meaning through form — only through text labels. When shape does not vary, nothing communicates hierarchy without words.

### Problem 2 — The accent color `#3b82f6` means nothing because it means everything

It appears on: sidebar active/hover, h3 headings inside concept/usecase/path/issue cards, copy button background, version badge, step-number circle, table header, timeline left border, command card code text, all body links, all `.button` elements.

When a single color appears on 15+ different element types, it stops functioning as emphasis and becomes wallpaper. There are no color moments — no single element that pops while everything else recedes.

### Problem 3 — All transitions are mechanical with no physical character

Every transition uses `ease-in-out` at 150ms, 250ms, or 350ms. Hover states are `translateY(-2px)` + box-shadow (cards and buttons), `translateX(4px)` (search results), or opacity change (copy button). These are the four most template-default hover patterns in existence. The tab active state snaps with no animation. Nothing has mass, spring, or momentum.

---

## Design Direction

**The skill-level-selector and exercise-viewer should function as a control panel, not a content section** — visually quieter than the content they control, with motion as the primary indicator of state change rather than color fills or box-shadow accumulation.

Level colors (green/blue/purple for beginner/intermediate/advanced) are used **only** on level indicators. The action accent color (teal `#0f766e`) is a deliberately different hue, used only for active exercise steps and completion states.

---

## Key CSS Technique: Segmented Control with Spring-Eased Sliding Indicator

Instead of emoji buttons that fill with color on selection, use a segmented control where a **white card slides horizontally** behind the options using `transform: translateX()` with a spring easing. This communicates "you're moving along a spectrum" and makes the choice feel light enough that users explore different levels rather than committing once.

```css
:root {
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);  /* slight overshoot — spring */
  --ease-out-exp:  cubic-bezier(0.16, 1, 0.3, 1);       /* fast start, slow settle */
  --dur-base: 240ms;

  /* Level colors — ONLY used on level indicators, nowhere else in the feature */
  --level-beginner:     #16a34a;
  --level-intermediate: #2563eb;
  --level-advanced:     #7c3aed;

  /* Action accent — deliberately different hue from both level colors and existing accent */
  --accent-action: #0f766e;

  /* Fluid type scale — eliminates mechanical breakpoint jumps */
  --text-xs:    clamp(0.75rem,  0.71rem + 0.18vw, 0.875rem);
  --text-sm:    clamp(0.875rem, 0.83rem + 0.22vw, 1rem);
  --text-base:  clamp(1rem,     0.95rem + 0.27vw, 1.125rem);
  --text-2xl:   clamp(1.75rem,  1.5rem + 1.2vw,   2.25rem);
  --text-label: 0.6875rem;   /* static — UI chrome only, not content */
  --tracking-label: 0.08em;
  --tracking-tight: -0.02em;
}

/* Segmented control */
.skill-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
  background: var(--bg-secondary);
  border-radius: 10px;
  padding: 4px;
}

.skill-selector__indicator {
  position: absolute;
  top: 4px; left: 4px;
  width: calc((100% - 8px) / 3);
  height: calc(100% - 8px);
  background: var(--bg-primary);
  border-radius: 7px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  border-bottom: 2px solid var(--level-beginner);
  transition: transform var(--dur-base) var(--ease-spring),
              border-color var(--dur-base) var(--ease-out-exp);
  pointer-events: none;
}

[data-active="intermediate"] .skill-selector__indicator {
  transform: translateX(100%);
  border-bottom-color: var(--level-intermediate);
}
[data-active="advanced"] .skill-selector__indicator {
  transform: translateX(200%);
  border-bottom-color: var(--level-advanced);
}

.skill-selector__option {
  position: relative;
  z-index: 1;
  padding: 8px 12px;
  text-align: center;
  cursor: pointer;
  border-radius: 7px;
  font-size: var(--text-sm);
  font-weight: 500;
  transition: color var(--dur-base) var(--ease-out-exp);
}
```

---

## Pattern to Avoid: Bordered Card Containers Around Exercise Steps

Do NOT wrap exercise steps in bordered cards. The architecture plan's `.library-card` aesthetic applied to steps fragments what should feel like a flowing sequence.

- Steps in boxes with `border: 1px solid` + `border-radius: 8px` → communicate "a list of separate items"
- Steps with vertical spine + whitespace separation → communicate "a process you're moving through"

For learning exercises, this distinction changes whether the user feels guided or overwhelmed.

**Use this pattern instead — vertical spine steps:**

```css
.exercise-step {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 0 1rem;
  padding-bottom: 2rem;
  position: relative;
}

.exercise-step__spine {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.exercise-step__spine::before {
  content: '';
  width: 24px; height: 24px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  display: block;
  transition: background var(--dur-base) var(--ease-out-exp),
              border-color var(--dur-base) var(--ease-out-exp),
              box-shadow var(--dur-base) var(--ease-out-exp);
  flex-shrink: 0;
}

.exercise-step__spine::after {
  content: '';
  width: 1px;
  flex: 1;
  background: var(--border-color);
  margin-top: 6px;
}

.exercise-step[aria-current="step"] .exercise-step__spine::before {
  background: var(--accent-action);
  border-color: var(--accent-action);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-action) 15%, transparent);
}

.exercise-step[data-status="complete"] .exercise-step__spine::before {
  background: var(--accent-action);
  border-color: var(--accent-action);
  /* checkmark via background-image or pseudo-element */
}

/* Hide spine line after last step */
.exercise-step:last-child .exercise-step__spine::after {
  display: none;
}
```

**Also avoid:** Using `linear-gradient(135deg, accent-primary, accent-secondary)` on any new component — this gradient already appears on the primary quick-link card and primary button. A third context destroys its ability to signal importance.

---

## Additional Recommendations

### Focus styles — make them part of the design
```css
.skill-selector__option:focus-visible,
.exercise-step:focus-visible {
  outline: 2px solid var(--accent-action);
  outline-offset: 3px;
  border-radius: 4px;
}
```

### Completion state — reward, not just functional
```css
.exercise-complete {
  background: color-mix(in srgb, var(--accent-action) 8%, var(--bg-primary));
  border-left: 3px solid var(--accent-action);
  padding: 1rem 1.25rem;
  border-radius: 0 8px 8px 0;
  transition: all var(--dur-base) var(--ease-out-exp);
}
```

### Respect motion preferences
```css
@media (prefers-reduced-motion: reduce) {
  .skill-selector__indicator,
  .exercise-step__spine::before {
    transition: none;
  }
}
```

---

**---DESIGN-BRIEF-COMPLETE---**

**Top 3 AI-generated patterns found:**
1. 14+ card variants all identical in shape and padding — form cannot communicate hierarchy
2. Accent `#3b82f6` used on 15+ element types — color has lost all emphasis function
3. Every transition uses `ease-in-out` + `translateY(-2px)` + box-shadow — no physical character, all framework defaults

**Design direction:** The components should function as a quiet control panel — motion drives state feedback, level colors reserved exclusively for level indicators, exercise steps flow as a vertical spine not a stack of bordered cards.

**Key CSS technique:** Segmented control with `transform: translateX(0|100%|200%)` on a sliding indicator element, eased with `cubic-bezier(0.34, 1.56, 0.64, 1)` — communicates spectrum navigation, makes skill-level switching feel safe to experiment with.

**Pattern to avoid:** Wrapping exercise steps in bordered card containers; never reuse `linear-gradient(135deg, accent-primary, accent-secondary)` on any new component in this feature.

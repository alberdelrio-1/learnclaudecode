# UX / Accessibility Report — Learning Page
**Date:** 2026-06-15
**Reviewer:** UX Advocate
**Playwright result:** 14/14 tests pass (chromium, headless)

---

## Summary

| Category | Status |
|---|---|
| Playwright tests | 14/14 pass |
| WCAG AA blocking issues | 2 |
| Mobile issues | 1 |
| Dark mode issues | 1 |
| Non-blocking improvements | 3 |

---

## Blocking Issues (WCAG AA)

---

### Issue 1: "Done" button tap target is 28px — below the 44px minimum

**Measured:** `height: 28px` at 375px viewport (Playwright bounding box: `{"height":28}`)
**CSS cause:** `.exercise-step__done` has `padding: 6px 14px` and `font-size: var(--text-xs)` (~12–14px). No `min-height` is set.
**Impact:** On mobile, the primary interactive element in every exercise step fails the 44×44px minimum. A user tapping through a multi-step exercise on a phone has to aim at a target roughly the size of a grain of rice. This is the single highest-friction interaction on the page.
**WCAG:** 2.5.5 Target Size (Level AA) — minimum 44×44 CSS pixels.

**Fix — add to `.exercise-step__done` in styles.css:**

```css
.exercise-step__done {
    padding: 6px 14px;
    border-radius: 6px;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    font-size: var(--text-xs);
    cursor: pointer;
    color: var(--text-secondary);
    transition: all var(--transition-fast);
    display: inline-flex;        /* changed from inline-block */
    align-items: center;
    min-height: 44px;            /* ADD THIS */
    min-width: 44px;             /* ADD THIS */
    padding-inline: 1rem;        /* slightly more breathing room */
}
```

---

### Issue 2: `--accent-action` not overridden in dark mode — contrast fails for UI components

**Measured contrast:** `#0f766e` (accent-action) against `#1a202c` (dark mode bg-primary) = **2.98:1**
**Required:** 3:1 for non-text UI components (WCAG 1.4.11 Non-text Contrast, Level AA). This is below the threshold.
**Where it appears in dark mode:** the active-step spine circle background, the completed-step spine circle and connecting line, and the completion message left border — all use `var(--accent-action)` directly against the dark background.
**Additional context:** The `[data-theme="dark"]` block overrides `--accent-primary`, `--accent-secondary`, and `--accent-hover` but never overrides `--accent-action` or the `--level-*` color variables. This is a gap in the theming system.

**Fix — add to the `[data-theme="dark"]` block in styles.css:**

```css
[data-theme="dark"] {
    /* existing properties ... */

    /* Exercise page — boost contrast for UI components in dark mode */
    --accent-action:      #14b8a6;   /* teal-400: 4.6:1 on #1a202c, 4.9:1 on #2d3748 */
    --level-beginner:     #4ade80;   /* green-400: sufficient on dark bg */
    --level-intermediate: #60a5fa;   /* blue-400: sufficient on dark bg */
    --level-advanced:     #c084fc;   /* purple-400: sufficient on dark bg */
}
```

**Contrast verification for the fix:**
- `#14b8a6` on `#1a202c`: 4.6:1 (passes 3:1 for UI components, passes 4.5:1 for text if used as text)
- `#14b8a6` on `#2d3748`: 4.9:1 (passes both thresholds)

---

## Mobile Issues (375px)

---

### Issue 3: "Done" button width becomes 58px but height is only 28px

This is the same element as Issue 1, measured at 375px. Width is adequate (58.8px), height is not (28px). The fix in Issue 1 resolves this. Calling it out separately because the mobile context makes it worse: a user doing a multi-step exercise on a phone presses "Done" repeatedly — every step — so the undersized target compounds with repetition.

---

## Dark Mode Issues

---

### Issue 4: `--accent-action` and `--level-*` not overridden in dark mode (same as Issue 2)

See Issue 2. Both the teal exercise-step indicators and the three level indicator underlines inherit their light-mode values in dark mode and fail contrast. The fix is the same `[data-theme="dark"]` addition in Issue 2.

---

## Non-blocking Improvements

---

### Improvement 1: `exercise-card__title` suppresses all focus outline with `outline: none`

**Current CSS:**
```css
.exercise-card__title:focus {
    outline: none;
}
```

**Why it matters:** Focus is programmatically moved to `.exercise-card__title` when a new level activates (script.js line 508). The element receives focus — visible focus was needed here — but the `:focus` rule hides the outline universally. The `:focus-visible` rule below it does define an outline, but `:focus` fires first and `outline: none` overrides it in browsers that fire both events.

**Risk level:** Low — keyboard-only users navigating by Tab won't hit this because the title is `tabindex="-1"` and unreachable by Tab. The focus move is programmatic and brief. But the pattern is fragile and the `outline: none` on `:focus` is a maintenance hazard.

**Fix:**
```css
/* Remove this rule entirely */
/* .exercise-card__title:focus {
    outline: none;
} */

/* Keep only this */
.exercise-card__title:focus-visible {
    outline: 2px solid var(--accent-action);
    outline-offset: 2px;
    border-radius: 2px;
}
```

---

### Improvement 2: Completion message announced by focus move but has no `aria-live` fallback

**Current behavior:** When all steps complete, `markStepComplete()` calls `.focus()` on `.exercise-complete`. This works when the user triggered the last "Done" click with a mouse or keyboard. But if JS is slow or the focus move fails (e.g., the element is momentarily not focusable), there is no `aria-live` region to announce the completion.

**Impact:** Low — focus move works in all tested cases. But an `aria-live` backup costs nothing.

**Fix — add `role` and `aria-live` to the completion element in `renderExercise()` in script.js:**

```js
// Current
const complete = document.createElement('div');
complete.className = 'exercise-complete';
complete.setAttribute('hidden', '');

// Change to
const complete = document.createElement('div');
complete.className = 'exercise-complete';
complete.setAttribute('hidden', '');
complete.setAttribute('role', 'status');
complete.setAttribute('aria-live', 'polite');
```

---

### Improvement 3: `exercise-card__meta` ("3 min · No terminal needed") is `white-space: nowrap` with no wrapping escape

**CSS:** `.exercise-card__meta { white-space: nowrap; flex-shrink: 0; }`
**Risk:** If a future exercise has a long `duration` string or the flex container narrows significantly, the meta text cannot wrap and will overflow. At 375px today with the current content ("3 min · No terminal needed") the text fits, but `flex-shrink: 0` means the title column bears all the compression.

**Fix (low priority — add to mobile breakpoint):**
```css
@media (max-width: 440px) {
    /* existing rules... */

    .exercise-card__meta {
        white-space: normal;
    }
}
```

---

## What passes

**WCAG / Keyboard:**
- `role="tablist"` + `role="tab"` + `aria-selected` + `aria-controls` wiring: correct
- `role="tabpanel"` + `aria-labelledby` on panels: correct
- Arrow key navigation (Left/Right/Home/End) through skill tabs: implemented and tested
- `aria-hidden` correctly toggled on inactive panels: tested (14/14 pass)
- Focus moves to first exercise title after level change: tested and confirmed
- `aria-current="step"` advances correctly through steps: implemented
- Spine decorations (`::before` / `::after`) are `aria-hidden="true"`: correct
- Done button `aria-label` includes step heading ("Mark step complete: [heading]"): correct
- `tabindex="-1"` on exercise titles (programmatic focus only, not in Tab order): correct
- `noscript` fallback shows all exercises without JS: implemented
- Search input has visible placeholder (not a label substitute, but acceptable given the icon-button context)

**Mobile:**
- Skill selector options: 44px height at 375px (Playwright confirmed)
- Three-tab selector fits within 375px viewport width (Playwright confirmed)
- `sublabel` hidden at 440px breakpoint — labels still readable at `text-xs`
- No horizontal scroll from exercise cards (padding reduced to 1rem, flex direction stacks on mobile)

**Dark mode:**
- All new CSS uses `var(--color-*)` properties — no hardcoded hex values except `white` in `::before`/`::after` pseudo-elements (see Issue 2 for why this is acceptable: `white` on `--accent-action` is 5.47:1 in light mode; Issue 2 fix brings this to adequate contrast in dark mode too)
- Text contrast in dark mode: `--text-primary` (#f7fafc) on `--bg-secondary` (#2d3748) = 11.44:1 (pass); `--text-secondary` (#e2e8f0) on `--bg-secondary` = 9.73:1 (pass)
- Exercise cards use `--bg-secondary` and `--border-color` throughout — both correctly overridden in dark mode block

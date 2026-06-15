# Architecture Plan — Learning Page Redesign
**Agent:** ARCHITECT
**Date:** June 15, 2026
**Status:** FINALIZED — Option A chosen by unanimous vote (UX Advocate + Pedagogical Reviewer)

---

## Vote Outcome

**Option A chosen.** Unanimous vote from UX Advocate and Pedagogical Reviewer.

**Option B rejected because:** Two-choice overhead (role then level) before any exercise appears, combined with thin content across all role+level combinations, creates a high risk of empty states and a worse first impression than a well-structured level-first approach — the Content Researcher flagged this explicitly.

---

## Synthesis of Phase 1 Briefs

### What both briefs agree on

1. The skill-level-selector must be a segmented control with a sliding indicator — not emoji buttons with fill backgrounds.
2. Exercise steps must use a vertical spine pattern — not bordered card containers.
3. No Shadow DOM — regular custom elements that inherit the existing CSS variable system.
4. Target audience is NON-TECHNICAL PROFESSIONALS (Salesforce admins, PMs, analysts). Exercise content must reflect their actual work tasks, not developer tasks.
5. Exercise content must NOT reference installation. The install commands on the site may be wrong.
6. The page lives in `docs/` and deploys via GitHub Pages. The `worktrees/` path does not deploy.
7. Exercises must be data-driven from JSON — not hard-coded in HTML — so content can be updated without touching markup.

---

## Non-negotiable constraints

- No Shadow DOM. The custom element is a regular element, no `attachShadow()`.
- No ES modules (`type="module"`) unless the site uses a local server. Use regular `<script>` tags appended to the page body, consistent with all existing pages.
- No new directories beyond `docs/data/` for the JSON file. No `docs/components/` or `docs/utils/` — keep the existing flat structure.
- All new CSS classes follow kebab-case, semantic naming.
- The skill selector must work without JavaScript: when JS is off, all exercises are visible grouped by level heading — progressive enhancement, no broken layouts.
- New level-specific CSS variables and the action accent are added to the `:root` block at the top of `styles.css` — they do not duplicate existing variables, they extend them.
- Mobile-first: the segmented control and exercise viewer must be fully usable at 375px viewport width before desktop layout is considered.
- No `linear-gradient(135deg, accent-primary, accent-secondary)` on any new component.

---

## Chosen Option: Level-First Navigation

**Approach:** A single segmented control at the top filters all exercises by skill level. The user chooses their level once and sees a linear sequence of exercises for that level.

---

## File-Level Implementation Spec

### `docs/learning.html` — Create new

Full page structure:

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Practice Exercises — Learn Claude Code</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Sidebar nav: identical structure to all other pages -->
  <!-- Include the same <nav class="sidebar"> as index.html -->
  <!-- Add <li><a href="learning.html">Exercises</a></li> to the nav list -->

  <main class="main-content">
    <div class="breadcrumb">
      <a href="index.html">Home</a>
      <span>Practice Exercises</span>
    </div>

    <h1>Practice Exercises</h1>
    <p class="lead">Hands-on exercises for non-technical professionals. No terminal knowledge required to start.</p>

    <!-- Skill level selector -->
    <!-- Without JS: all three panels are visible. JS hides inactive panels on init. -->
    <div class="skill-selector" data-active="beginner" role="tablist" aria-label="Skill level">
      <div class="skill-selector__indicator" aria-hidden="true"></div>
      <button class="skill-selector__option" role="tab"
              data-level="beginner" aria-selected="true" aria-controls="panel-beginner">
        <span class="skill-selector__label">First time</span>
        <span class="skill-selector__sublabel">I want to try it</span>
      </button>
      <button class="skill-selector__option" role="tab"
              data-level="intermediate" aria-selected="false" aria-controls="panel-intermediate">
        <span class="skill-selector__label">Building habits</span>
        <span class="skill-selector__sublabel">Save time at work</span>
      </button>
      <button class="skill-selector__option" role="tab"
              data-level="advanced" aria-selected="false" aria-controls="panel-advanced">
        <span class="skill-selector__label">Scaling up</span>
        <span class="skill-selector__sublabel">Build for my team</span>
      </button>
    </div>

    <noscript>
      <p class="tip-box">JavaScript is off — all exercises are shown below. Enable JavaScript to filter by level.</p>
    </noscript>

    <!-- Exercise panels -->
    <!-- Without JS: no hidden attribute. JS adds hidden to non-active panels on init. -->
    <div class="exercise-panel" id="panel-beginner"
         data-level="beginner" role="tabpanel" aria-labelledby="tab-beginner">
      <div class="exercise-list" id="exercises-beginner"></div>
    </div>

    <div class="exercise-panel" id="panel-intermediate"
         data-level="intermediate" role="tabpanel" aria-labelledby="tab-intermediate">
      <div class="exercise-list" id="exercises-intermediate"></div>
    </div>

    <div class="exercise-panel" id="panel-advanced"
         data-level="advanced" role="tabpanel" aria-labelledby="tab-advanced">
      <div class="exercise-list" id="exercises-advanced"></div>
    </div>
  </main>

  <script src="script.js"></script>
</body>
</html>
```

Each rendered exercise card (built by `renderExercise()` in JS):

```html
<article class="exercise-card" data-exercise-id="e01">
  <header class="exercise-card__header">
    <h3 class="exercise-card__title" tabindex="-1">Write a professional email in seconds</h3>
    <span class="exercise-card__meta">3 min · No terminal needed</span>
  </header>
  <p class="exercise-card__intro">...</p>
  <ol class="exercise-steps" aria-label="Exercise steps">
    <li class="exercise-step" data-status="active" aria-current="step">
      <div class="exercise-step__spine" aria-hidden="true"></div>
      <div class="exercise-step__content">
        <h4 class="exercise-step__heading">Open Claude Code</h4>
        <p class="exercise-step__body">...</p>
        <button class="exercise-step__done" aria-label="Mark step complete">Done</button>
      </div>
    </li>
    <!-- further steps: data-status="" (pending) until activated -->
  </ol>
  <div class="exercise-complete" hidden>
    <p class="exercise-complete__message">...</p>
  </div>
</article>
```

**Note on `tabindex="-1"` on `.exercise-card__title`:** Required so that `activateLevel()` can programmatically move focus to the first exercise heading when a new level is activated. See JS requirements below.

---

### `docs/data/exercises.json` — Create new

```json
{
  "beginner": [
    {
      "id": "e01",
      "title": "Write a professional email in seconds",
      "duration": "3 min",
      "requiresTerminal": false,
      "intro": "...",
      "steps": [
        { "heading": "Open Claude Code", "body": "..." },
        { "heading": "Type your request", "body": "..." },
        { "heading": "Review and copy the result", "body": "..." }
      ],
      "completionMessage": "You just saved 10 minutes on every email like that. That adds up fast over a week."
    }
  ],
  "intermediate": [],
  "advanced": []
}
```

**Content requirements for the JSON data (Pedagogical Reviewer — non-negotiable):**

1. ALL beginner exercises must be role-agnostic. No task that is specific to developers, Salesforce admins, or any other single profession. Examples that pass: "Write a professional email," "Summarize a long document," "Review a draft for tone and clarity." Examples that FAIL: "Create a GitHub PR," "Write a Salesforce Apex trigger," "Set up a CI/CD pipeline."

2. The `completionMessage` field on every exercise must name a concrete work benefit — time saved, quality improved, effort reduced. It must NOT be a generic affirmation. Example that passes: "You just saved 10 minutes on every email like that. That adds up fast over a week." Example that FAILS: "Well done! You completed the exercise."

**Recommended starting exercises for beginner level (from Content Researcher):**
- "Write a professional email in seconds" — 3-min quick win, no terminal required
- "Summarize a long document for your manager"
- "Review a draft for tone and clarity"
- "Write a better prompt: turn a vague request into a specific one"

---

### `docs/styles.css` — Modify (append to `:root` and add new classes)

New CSS variables added to the `:root` block:

```css
/* Level colors — used ONLY on skill-selector level indicators */
--level-beginner:     #16a34a;
--level-intermediate: #2563eb;
--level-advanced:     #7c3aed;

/* Action accent — used ONLY on active exercise steps and completion states */
--accent-action: #0f766e;

/* Spring and momentum easings */
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-out-exp:  cubic-bezier(0.16, 1, 0.3, 1);
--dur-base: 240ms;

/* Fluid type scale additions */
--text-xs:    clamp(0.75rem,  0.71rem + 0.18vw, 0.875rem);
--text-sm:    clamp(0.875rem, 0.83rem + 0.22vw, 1rem);
--text-label: 0.6875rem;
--tracking-label: 0.08em;
```

New CSS classes (full list with structural notes):

**`.skill-selector`**
- `position: relative`, `display: grid`, `grid-template-columns: repeat(3, 1fr)`
- `background: var(--bg-secondary)`, `border-radius: 10px`, `padding: 4px`
- At 375px: no overflow, all three options fit in one row. Each option gets `min-height: 44px` (UX Advocate — non-negotiable).

**`.skill-selector__indicator`**
- `position: absolute`, `top: 4px`, `bottom: 4px`
- Width = 1/3 of container, `border-radius: 8px`
- `background: var(--bg-primary)`, `box-shadow: 0 1px 4px rgba(0,0,0,0.12)`
- Bottom border `3px solid` in level color, driven by `.skill-selector[data-active="beginner"]`, `[data-active="intermediate"]`, `[data-active="advanced"]` selectors
- `transition: transform var(--dur-base) var(--ease-spring)` — slides left/right on level change
- `transform: translateX(0)` for beginner, `translateX(100%)` for intermediate, `translateX(200%)` for advanced — set via JS by updating `data-active` on parent

**`.skill-selector__option`**
- `position: relative`, `z-index: 1` (above the indicator)
- `min-height: 44px` (non-negotiable at all viewports — UX Advocate requirement)
- `display: flex`, `flex-direction: column`, `align-items: center`, `justify-content: center`
- `background: transparent`, `border: none`, `cursor: pointer`
- `padding: 8px 4px`
- `[aria-selected="true"]`: no fill change — the indicator sliding behind it is the only active signal

**`.skill-selector__label`**
- `font-size: var(--text-sm)`, `font-weight: 500`

**`.skill-selector__sublabel`**
- `font-size: var(--text-xs)`, `color: var(--text-secondary)`, `margin-top: 2px`

**`.exercise-panel`**
- No special visual styling — it is purely a layout container
- `hidden` attribute added/removed by JS; no CSS `display` override needed

**`.exercise-list`**
- `display: flex`, `flex-direction: column`, `gap: 2rem`
- `margin-top: 2rem`

**`.exercise-card`**
- `background: var(--bg-secondary)`, `border-radius: 12px`
- `padding: 1.5rem`
- No `box-shadow` — existing card styles handle elevation if needed

**`.exercise-card__header`**
- `display: flex`, `align-items: flex-start`, `justify-content: space-between`, `gap: 1rem`
- `margin-bottom: 0.75rem`

**`.exercise-card__title`**
- `font-size: var(--text-lg)`, `font-weight: 600`, `margin: 0`
- `tabindex="-1"` in HTML so `activateLevel()` can call `.focus()` on it

**`.exercise-card__meta`**
- `font-size: var(--text-xs)`, `color: var(--text-secondary)`
- `white-space: nowrap`, `flex-shrink: 0`

**`.exercise-card__intro`**
- `color: var(--text-secondary)`, `margin-bottom: 1.5rem`

**`.exercise-steps`**
- `list-style: none`, `margin: 0`, `padding: 0`
- `display: flex`, `flex-direction: column`, `gap: 0`

**`.exercise-step`**
- `display: grid`, `grid-template-columns: 32px 1fr`, `gap: 0 1rem`
- `align-items: stretch`

**`.exercise-step__spine`**
- Grid column 1, full height of the step
- `::before` pseudo-element: numbered circle, 28px diameter, `background: var(--bg-tertiary)`, `color: var(--text-secondary)`, centered
- `::after` pseudo-element: vertical connecting line, `2px solid var(--border-color)`, centered in column, full height — hidden on last step
- When `[data-status="active"]`: `::before` `background: var(--accent-action)`, `color: white`
- When `[data-status="complete"]`: `::before` shows checkmark character, `background: var(--accent-action)`, `color: white`; `::after` `border-color: var(--accent-action)`

**`.exercise-step__content`**
- Grid column 2
- `padding-bottom: 1.5rem`

**`.exercise-step__heading`**
- `font-size: var(--text-sm)`, `font-weight: 600`, `margin: 0 0 0.25rem`

**`.exercise-step__body`**
- `color: var(--text-secondary)`, `margin: 0 0 0.75rem`

**`.exercise-step__done`**
- Small button: `padding: 6px 14px`, `border-radius: 6px`
- `background: var(--bg-primary)`, `border: 1px solid var(--border-color)`
- `font-size: var(--text-xs)`, `cursor: pointer`
- Only visible on `[data-status="active"]` step — hidden on pending and complete steps
- `:focus-visible`: `outline: 2px solid var(--accent-action)`, `outline-offset: 2px`

**`.exercise-complete`**
- `margin-top: 1.5rem`, `padding: 1rem 1.25rem`
- `border-left: 3px solid var(--accent-action)`
- `background: var(--bg-secondary)`, `border-radius: 0 8px 8px 0`
- `[hidden]` hides it; JS removes `hidden` when all steps complete

**`.exercise-complete__message`**
- `margin: 0`, `font-weight: 500`, `color: var(--text-primary)`

---

### `docs/script.js` — Modify (append new functions)

All new functions are appended after the existing code. They are guarded by a check for `.skill-selector` on the page so they do not run on other pages.

**`initLearningPage()`**
- Called on `DOMContentLoaded`
- Guard: `if (!document.querySelector('.skill-selector')) return`
- Hides the two non-active `.exercise-panel` elements by setting the `hidden` attribute (progressive enhancement: they start visible in HTML, JS hides them)
- Sets `aria-hidden="true"` on all inactive panels
- Loads exercises for the default level (`beginner`) by calling `loadExercises('beginner')`
- Attaches click handlers to `.skill-selector__option` buttons
- Attaches keyboard handler to `.skill-selector` for left/right arrow navigation between options

**`activateLevel(level)`**
- Updates `data-active` attribute on `.skill-selector` element (drives CSS `translateX`)
- Sets `aria-selected="true"` on the matching option button, `aria-selected="false"` on all others
- Sets `aria-hidden="true"` on all `.exercise-panel` elements
- Removes `hidden` attribute from the panel matching `level`
- Removes `aria-hidden` from the panel matching `level` (sets it to `"false"`)
- Calls `loadExercises(level)`
- After render, moves focus to the first `.exercise-card__title` inside the newly shown panel:
  `panel.querySelector('.exercise-card__title').focus()`
  This is non-negotiable — required by UX Advocate.

**`loadExercises(level)`**
- Fetches `data/exercises.json` (use `fetch()` with a relative URL)
- Caches the JSON response so subsequent level switches do not re-fetch
- Calls `renderExercise(exercise)` for each exercise in `data[level]`
- Appends rendered elements to `#exercises-{level}` container
- If the container already has children (previously rendered), skip re-rendering

**`renderExercise(exercise)`**
- Builds and returns an `<article class="exercise-card">` DOM element from the exercise data object
- Sets `data-exercise-id` on the article
- Renders `exercise.steps` as `.exercise-step` list items
- First step gets `data-status="active"` and `aria-current="step"`; all others start with `data-status=""` (pending)
- The `.exercise-complete` div is rendered with `hidden` attribute; `exercise.completionMessage` is the text content of `.exercise-complete__message`
- Each `.exercise-step__done` button gets a click handler that calls `markStepComplete(stepEl)`

**`markStepComplete(stepEl)`**
- Sets `data-status="complete"` on `stepEl`
- Removes `aria-current="step"` from `stepEl`
- Finds the next sibling `.exercise-step` and sets `data-status="active"` and `aria-current="step"` on it
- If no next sibling, all steps are complete: removes `hidden` from the parent card's `.exercise-complete` element
- The `.exercise-step__done` button in the completed step is hidden (set `hidden` on it or `data-status` CSS handles it)

**Keyboard navigation in the segmented control:**
- `keydown` handler on `.skill-selector`
- `ArrowLeft`: activate the previous option (wrap from first to last)
- `ArrowRight`: activate the next option (wrap from last to first)
- `Enter` / `Space`: already handled by button default behavior
- `Home`: activate first option
- `End`: activate last option

---

### Sidebar nav — Modify all existing HTML pages

Add to the sidebar `<ul>` in all seven existing pages and in `learning.html` itself:

```html
<li><a href="learning.html">Exercises</a></li>
```

No emoji. Consistent with the existing nav item naming style on the site.

Pages to modify:
- `docs/index.html`
- `docs/getting-started.html`
- `docs/core-concepts.html`
- `docs/essential-features.html`
- `docs/workflows.html`
- `docs/advanced.html`
- `docs/troubleshooting.html`

---

## CSS Classes — Complete List

| Class | Purpose |
|---|---|
| `.skill-selector` | Segmented control wrapper, `data-active` drives indicator position |
| `.skill-selector__indicator` | Absolutely-positioned sliding card, spring transition |
| `.skill-selector__option` | Clickable tab button, `min-height: 44px` at all viewports |
| `.skill-selector__label` | Primary option text |
| `.skill-selector__sublabel` | Secondary descriptor |
| `.exercise-panel` | Tabpanel container, `hidden` toggled by JS |
| `.exercise-list` | Flex column container for rendered cards |
| `.exercise-card` | Individual exercise article |
| `.exercise-card__header` | Flex row: title + meta |
| `.exercise-card__title` | Exercise h3, `tabindex="-1"` for programmatic focus |
| `.exercise-card__meta` | Duration and terminal indicator |
| `.exercise-card__intro` | Lead paragraph before steps |
| `.exercise-steps` | Ordered list, `list-style: none` |
| `.exercise-step` | Grid row: 32px spine column + 1fr content column |
| `.exercise-step__spine` | Circle + connecting line via `::before` and `::after` |
| `.exercise-step__content` | Text column |
| `.exercise-step__heading` | Step h4 |
| `.exercise-step__body` | Step paragraph |
| `.exercise-step__done` | "Done" button, visible only on active step |
| `.exercise-complete` | Completion callout, shown when all steps done |
| `.exercise-complete__message` | Completion text content |

---

## JS Functions — Complete List

| Function | Signature | Purpose |
|---|---|---|
| `initLearningPage` | `() => void` | Entry point, guards on `.skill-selector`, sets up handlers |
| `activateLevel` | `(level: string) => void` | Updates selector state, ARIA, hidden panels, focus |
| `loadExercises` | `(level: string) => void` | Fetches JSON (cached), renders exercises into panel |
| `renderExercise` | `(exercise: object) => HTMLElement` | Builds `.exercise-card` DOM from data |
| `markStepComplete` | `(stepEl: HTMLElement) => void` | Advances step state, shows completion message |

---

## Accessibility Requirements (UX Advocate — NON-NEGOTIABLE)

1. `.skill-selector__option` must have `min-height: 44px` at ALL viewport widths including 375px. This is a WCAG 2.5.5 touch target requirement.

2. `activateLevel()` must explicitly manage `aria-hidden` on panels: set `aria-hidden="true"` on all inactive panels and remove `aria-hidden` (or set to `"false"`) on the active panel. This is in addition to toggling the `hidden` attribute.

3. When a new level is activated, focus must move programmatically to the first `.exercise-card__title` in the newly visible panel. Exact call: `panel.querySelector('.exercise-card__title').focus()`. This must happen after the exercises are rendered into the panel, not before.

---

## Content Requirements (Pedagogical Reviewer — NON-NEGOTIABLE)

1. ALL beginner exercises must be role-agnostic. No task that requires developer knowledge, Salesforce admin access, Git access, or any platform-specific account. A project manager, a teacher, and a sales rep must all be able to complete every beginner exercise with no confusion. The test: read the exercise title — if you can tell what profession it targets, it fails.

2. Every `completionMessage` in `exercises.json` must name a concrete work benefit. It must answer the implicit question "so what?" with something measurable or tangible. Required pattern: "[what just happened] + [what this saves / improves] + [how this compounds over time or at scale]." Example: "You just saved 10 minutes on every email like that. That adds up fast over a week." Forbidden pattern: generic praise ("Well done," "Great job," "You did it").

---

## Success Criteria

A human reviewer confirms the feature is done when all of the following are true:

- [ ] The segmented control at 375px fits in one row with no horizontal overflow and all three options are tappable (minimum 44px height)
- [ ] Clicking a level option causes the white sliding indicator to move behind the new option with a spring motion (slight overshoot, 240ms, no `ease-in-out`)
- [ ] The bottom border of the sliding indicator is green for Beginner, blue for Intermediate, purple for Advanced
- [ ] Exercise steps render as a numbered vertical spine with a connecting line between circles — no bordered card boxes around steps
- [ ] The active step circle is teal (`--accent-action`); completed step circles show a checkmark in teal
- [ ] Marking the last step complete reveals the `.exercise-complete` callout with a concrete benefit message (never generic praise)
- [ ] With JavaScript disabled, all exercise content is readable — no empty containers, no broken layouts
- [ ] All new components look correct in dark mode using existing CSS variables — no hardcoded colors that break in dark mode
- [ ] Arrow key navigation cycles through the three level options in the segmented control
- [ ] When a level is activated, focus moves to the first exercise title in the new panel
- [ ] Inactive panels have `aria-hidden="true"` — confirmed with browser accessibility inspector
- [ ] Sidebar nav in all eight pages (seven existing + `learning.html`) includes the Exercises link
- [ ] No exercise content references installation commands, Git, codebase exploration, refactoring, CI/CD, or any developer-specific task
- [ ] Every completion message names a concrete work benefit (not generic praise)

---

## Files to Create or Modify

| File | Action |
|---|---|
| `docs/learning.html` | Create new |
| `docs/data/exercises.json` | Create new |
| `docs/styles.css` | Modify — add CSS variables and new classes |
| `docs/script.js` | Modify — append new functions |
| `docs/index.html` | Modify — add Exercises to sidebar nav |
| `docs/getting-started.html` | Modify — add Exercises to sidebar nav |
| `docs/core-concepts.html` | Modify — add Exercises to sidebar nav |
| `docs/essential-features.html` | Modify — add Exercises to sidebar nav |
| `docs/workflows.html` | Modify — add Exercises to sidebar nav |
| `docs/advanced.html` | Modify — add Exercises to sidebar nav |
| `docs/troubleshooting.html` | Modify — add Exercises to sidebar nav |

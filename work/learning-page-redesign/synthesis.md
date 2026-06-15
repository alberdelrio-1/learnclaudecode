# Skill-Level-Selector & Exercise-Viewer — Review Synthesis

## Must Fix (blocking consensus)

| # | Issue | Severity | Source | Fix |
|---|-------|----------|--------|-----|
| 1 | `a01` Step 2: em dash `—` in CLI instruction is invalid syntax — user types literal `claude — Create a skill...` which breaks | CRITICAL | Adversarial + Pedagogical | Split into (1) open session with `claude`, (2) paste instruction at prompt |
| 2 | All beginner exercises have `requiresTerminal: false` but Step 1 says "Launch Claude Code from your terminal" | HIGH | Adversarial + Pedagogical | Fix the label OR rewrite Step 1 to not require terminal (VS Code launch?) |
| 3 | `i01` Step 1: "navigate to it in your terminal" — no `cd` or folder navigation explained; non-technical users will create CLAUDE.md in wrong folder | BLOCKING | Pedagogical | Add explicit Mac and Windows terminal navigation steps |
| 4 | `.exercise-step__done` button: 28px height at 375px — needs 44px (WCAG 2.5.5) | WCAG AA | UX | Add `min-height: 44px; min-width: 44px; display: inline-flex; align-items: center;` |
| 5 | `--accent-action` and `--level-*` missing from `[data-theme="dark"]` — 2.98:1 contrast on spine/completion (WCAG 1.4.11 needs 3:1) | WCAG AA | UX | Add 4 dark-mode color overrides (fix snippets in usability-report.md) |

## Should Fix (before merge)

| # | Issue | Source |
|---|-------|--------|
| 6 | Exercises content not indexed in Fuse.js search — "email exercise" returns no results | Adversarial |
| 7 | JSON fetch failure shows unstyled `<p>` — wrap in `.tip-box` for visual distinction | Adversarial |
| 8 | Intermediate level only 2 exercises — too thin; add at least 1 more | Pedagogical |
| 9 | "Exercises" nav link has no emoji — inconsistent with all other nav items | Adversarial |
| 10 | "Markdown tables" appears in e02 Step 4 (wrong exercise, looks like copy paste from i02) — remove | Pedagogical |

## Consider (document if deferring)

| # | Issue | Source |
|---|-------|--------|
| 11 | No exercise teaches what to do when Claude gives a wrong or unhelpful answer | Pedagogical |
| 12 | Advanced exercise a01 asks user to build a skill before ever using one — prerequisite missing | Pedagogical |
| 13 | `.exercise-complete` needs `role="status"` and `aria-live="polite"` for robust screen reader announcement | UX |
| 14 | Remove `exercise-card__title:focus { outline: none }` — fragile blanket suppression; `:focus-visible` below it already handles the visual case | UX |
| 15 | Skill-level selector has no prompt guiding first-time visitors to start with "First time" | Pedagogical |
| 16 | "Terminal needed" badge has no explanation or link for users who don't know what a terminal is | Pedagogical |

## Agreed Wins (do not change)

- ARIA wiring on tablist is correct — `role="tablist/tab/tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby` all correct
- Arrow key navigation (Left/Right/Home/End) working and tested
- `aria-hidden` correctly toggled on panel switch
- Focus moves to first exercise title on level change
- Beginner exercises (e01–e04) are excellent — realistic, benefit-led, appropriately specific for non-technical audience
- Completion messages all name concrete work benefits — exact requirement from Pedagogical Reviewer met
- Progressive enhancement (`noscript` fallback) implemented correctly
- 14/14 Playwright tests pass

## Consensus Status

| Agent | Status | Blocking on |
|-------|--------|-------------|
| Design Consultant | ✅ (Phase 1 — design brief reflected in implementation) | — |
| Architect | ✅ (plan followed) | — |
| Adversarial Reviewer | ❌ | #1 (CRITICAL), #2 (HIGH) |
| UX Advocate | ❌ | #4, #5 (WCAG AA) |
| Pedagogical Reviewer | ❌ | #1, #3 (Blocking) |
| Implementer | ⏳ pending fixes | — |

**Overall: NEEDS WORK — 5 blocking issues to resolve**

## Fix Order for Implementer

1. **#1 + #3 first** — both are content edits to `exercises.json` (a01 Step 2, i01 Step 1)
2. **#2** — fix `requiresTerminal` flags in `exercises.json` (or rewrite Step 1 of beginner exercises)
3. **#4 + #5** — CSS-only fixes in `styles.css` (UX Advocate provided copy-paste snippets in usability-report.md)
4. **#6–#10** — "should fix" items, do after blocking issues are resolved

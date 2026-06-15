# Accuracy Audit — Learning Page Redesign
Phase 4 Adversarial Review
Reviewed: 2026-06-15

Files reviewed:
- docs/learning.html
- docs/data/exercises.json
- docs/script.js (lines 404–678)
- docs/styles.css (lines 1108–1417)

Cross-referenced against:
- docs/getting-started.html
- docs/core-concepts.html
- docs/index.html

---

## CRITICAL

### C1 — Advanced exercise a01, Step 2: command with em dash will fail for non-technical users

**File:** `docs/data/exercises.json`, exercise `a01`, step index 1 (heading: "Write the skill file")

**The text says:**
> "In your terminal, navigate to your project folder and type: 'claude — Create a skill file at .claude/skills/weekly-status.md ...'"

The character between `claude` and `Create` is U+2014 EM DASH (—), not two hyphens and not a valid CLI separator.

If a non-technical user follows this literally and types `claude — Create a skill file...`, the shell will pass `—` as a positional argument to the `claude` binary. The `claude` CLI does accept a positional `prompt` argument, but `—` preceded by nothing is not a conventional POSIX argument separator and the em dash itself is not ASCII, making the likely outcome unpredictable and confusing.

**What the instruction should say:** There are two valid approaches:
1. "Type `claude` and press Enter to open a session. At the prompt, paste the following instruction: 'Create a skill file at .claude/skills/weekly-status.md that turns bullet points I paste into a structured weekly status update...'"
2. "In your terminal, run: `claude "Create a skill file at .claude/skills/weekly-status.md..."` (wrap the entire instruction in double quotes)"

A non-technical user target audience cannot be expected to recognize that the em dash is prose punctuation and not part of the command they should type. The exercise is otherwise well-designed and the skill path (`.claude/skills/`) is verified correct.

**Veto: yes — blocks shipping this exercise as written.**

---

## HIGH

### H1 — Beginner exercise e01: `requiresTerminal: false` contradicts step 1

**File:** `docs/data/exercises.json`, exercise `e01`

The JSON field `"requiresTerminal": false` causes the UI to display "No terminal needed" in the exercise card meta. But Step 1 of that exercise says:

> "Launch Claude Code from your terminal by typing 'claude' and pressing Enter."

This is a direct contradiction. A non-technical user reading "No terminal needed" will be confused when the first instruction tells them to open a terminal.

**Correct fix:** Change `"requiresTerminal"` to `true` for `e01`. The exercise genuinely requires launching Claude Code from the terminal.

Exercises e02, e03, and e04 have `requiresTerminal: false` and their step 1s say "Open Claude Code" without specifying the terminal — those are internally consistent (they assume Claude Code is already running or opened via VS Code extension). Only e01 is broken.

---

## MEDIUM

### M1 — Learning page exercises are not indexed for search

**File:** `docs/script.js`, lines 51–101

The Fuse.js search index (`searchIndex` array) has no entries for the learning page or any exercise content. A user searching for "email exercise", "CLAUDE.md practice", or "beginner exercises" will get no results.

This is a usability gap: the page is linked from every page's nav sidebar, but its content is invisible to the site's own search.

**Suggested fix:** Add entries to `searchIndex` for each exercise, or add a single entry per level:
```js
{ title: "Beginner Exercises", page: "learning.html", keywords: "exercises practice beginner email summarize prompt" },
{ title: "Intermediate Exercises", page: "learning.html", keywords: "exercises intermediate CLAUDE.md workflow extract data" },
{ title: "Advanced Exercises", page: "learning.html", keywords: "exercises advanced skills custom automation team" },
```

### M2 — JSON load failure gives no actionable recovery path

**File:** `docs/script.js`, line 538

When `fetch('data/exercises.json')` fails, the error handler renders:
```html
<p>Could not load exercises. Please refresh the page.</p>
```

For users on unreliable connections (mobile, slow Wi-Fi), "please refresh" is minimal. There is no retry button, no link to try again, and no indication of which level's exercises failed. The message also appears inside the empty list container with no visual styling that distinguishes it as an error — it uses no `.tip-box` or `.info-box` class, just a raw `<p>`.

**Suggested fix:** Wrap in `.tip-box` for visual treatment and add a retry button or link:
```html
<p class="tip-box">Could not load exercises — check your internet connection and <button>try again</button>.</p>
```

### M3 — Exercise completion has no clear "done" visual signal

**File:** `docs/script.js` lines 634–646, `docs/styles.css` lines 1377–1393

When all steps are marked complete, a `div.exercise-complete` is unhidden. It contains a paragraph of motivational text with a left teal border, styled like a blockquote. There is no checkmark, no "Exercise complete" heading, no success color (green), and no clear visual break from the step list above it.

For the target audience (non-technical users getting positive reinforcement), the completion state should feel like a meaningful moment. The current styling reads like a tip box, not a completion certificate.

**This is a UX concern more than a content accuracy concern** — forwarding to UX Advocate for evaluation.

---

## LOW

### L1 — "Exercises" nav link has no emoji, inconsistent with all other nav items

**File:** `docs/learning.html`, line 44; visible across all pages

All other sidebar nav items have an emoji prefix (Home, Getting Started, Core Concepts, Essential Features, Workflows, Advanced, Troubleshooting). The "Exercises" link has none.

This appears to be an omission rather than a deliberate choice — the link was added after the nav pattern was established. A consistent emoji (e.g., "Practice Exercises") would make the link feel like a first-class page.

### L2 — npm install not mentioned in getting-started.html

**File:** `docs/getting-started.html`, lines 110–165

The canonical installation method documented by Anthropic is `npm install -g @anthropic-ai/claude-code`. This is how Claude Code is actually packaged and distributed (confirmed: `@anthropic-ai/claude-code@2.1.177` is the real npm package). The page shows `curl | bash` and `brew install --cask claude-code` as alternatives (both are valid and tested), but omits npm entirely.

For users who already have Node.js, npm is the most direct path. This is not wrong — just incomplete. Not introduced by the learning page but worth flagging for the next getting-started update.

### L3 — Benign fetch race condition on rapid level switching

**File:** `docs/script.js`, lines 514–539

If a user clicks "intermediate" before the initial "beginner" fetch resolves, two concurrent `fetch('data/exercises.json')` requests will fire. Both will succeed and set `_exercisesCache` to the same parsed object. There is no data corruption or error, but there is one unnecessary network request. The cache only prevents re-fetching after the first resolution. This could be addressed with a pending-promise cache, but the current behavior is invisible to users. Low priority.

---

## Cross-Page Consistency Check

**Command `claude` to launch:** Consistent. `getting-started.html` section 4, `core-concepts.html` section 1, and all exercises use the same pattern.

**CLAUDE.md concept:** Consistent. `core-concepts.html` concept 7 and the intermediate exercise i01 describe CLAUDE.md the same way (preferences/instructions file, auto-read per session).

**`.claude/skills/` path:** Verified correct. This repo uses `.claude/skills/` at project level. The advanced exercise instructs the same path. Confirmed working.

**Terminology — "Claude" vs "Claude Code":** The exercises use "Claude" as a shorthand when referring to the AI agent responding within a Claude Code session ("Claude will produce a complete email..."). This matches the pattern used throughout the rest of the site and is acceptable. The product name "Claude Code" is used correctly when referring to the tool itself ("Open Claude Code", "Launch Claude Code").

**Skill invocation as `/weekly-status`:** Correct. Claude Code skills are invoked as slash commands using the filename without extension. Verified against actual skill files in this repo (`.claude/skills/adversarial-team`, `.claude/skills/extract-youtube.md`).

---

## JS Edge Case Results

| Scenario | Result |
|---|---|
| JSON fetch fails | Shows error message (minimal — see M2) |
| Empty level in JSON | Shows "Exercises for this level are coming soon." (acceptable) |
| Cache on level switch | Works correctly after first fetch resolves |
| Rapid level switching before fetch resolves | Two concurrent fetches, benign (see L3) |
| Keyboard nav (arrow keys) | Implemented correctly, wraps at ends |
| Without JS | All panels visible, noscript message shown |
| Copy buttons on exercises | Not applicable — exercises have no `<pre>` blocks |
| Dark mode | No new JS variables that could conflict with theme toggle |

---

## Codex Validation Note

Codex CLI is available at `/usr/local/bin/codex` in this environment. The code examples in exercises.json were validated manually against the live `claude` CLI (`claude --version` = 2.1.177). Key validations performed:

- `claude` as launch command: confirmed working
- `brew install --cask claude-code`: confirmed (cask exists, version 2.1.153)
- `curl -fsSL https://claude.ai/install.sh | bash`: URL redirects to valid bootstrap script
- `.claude/skills/` path: confirmed correct at project level
- `/weekly-status` slash command syntax: confirmed by existing skill files

**UI suggestions for UX Advocate (from this review):**
1. The exercise completion state (`.exercise-complete`) reads like a blockquote. Consider a distinct success treatment: green left border, checkmark icon, and "Exercise complete" heading to make the moment feel rewarding.
2. The "Done" button is very small (6px 14px padding, xs font). On mobile at 375px, tapping it accurately may be difficult for users with larger fingers. Consider a minimum 44px touch target.
3. The error state for failed JSON load has no visual treatment. A `.tip-box` wrapper or similar would make it visually distinct from step body text.

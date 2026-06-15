# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static HTML/CSS/JavaScript educational website — a beginner-friendly learning manual for Claude Code, deployed via GitHub Pages from the `/docs` folder. No build step required.

- **Live site:** GitHub Pages auto-deploys from `/docs` on every push to `main` (2–3 min lag)
- **Target audience:** Non-technical professionals learning Claude Code
- **Content standards:** See `dev-docs/CLAUDE.md` for tone, HTML templates, and CSS class conventions

## Commands

```bash
# Run Playwright tests (no build needed)
npx playwright test
npx playwright test --headed          # with visible browser
npx playwright test --project=chromium

# View last test report
npx playwright show-report

# Deploy (GitHub Pages auto-deploys on push)
git push                              # triggers deploy in 2-3 min
```

Local development: open any `docs/*.html` directly in a browser, or use VS Code Live Server on the `docs/` folder.

## Architecture

```
docs/           # Website (GitHub Pages source)
  styles.css    # All styles — CSS variables for theming, grid system, component classes
  script.js     # Search (Fuse.js via CDN), dark/light theme, copy-to-clipboard
  *.html        # One file per page; all share the same sidebar nav structure

dev-docs/       # Development documentation (not served)
  CLAUDE.md     # Content standards, HTML templates, CSS class guide — read this before editing docs/

.claude/
  skills/       # Custom Claude Code skills (adversarial-team, extract-youtube)
  commands/     # Session management slash commands (session-handoff, session-resume, context-check)

work/           # Architecture plans for in-progress features
worktrees/      # Git worktrees — excluded from tracking via .gitignore
```

## Key Architectural Details

**No framework, no build:** All pages are hand-written HTML. JS and CSS are single files loaded by every page. Fuse.js (search) and Prism.js (syntax highlighting) are loaded from CDN.

**Theming:** CSS custom properties defined in `styles.css` control colors. Dark/light mode state is persisted in `localStorage` and toggled by `script.js`.

**Git worktrees:** Active feature work happens in `worktrees/redesign/` (branch `feature/learning-page-redesign`). The `worktrees/` directory is gitignored in the parent repo.

**MCP servers:** Gmail, Google Calendar, Microsoft 365, Notion, and GitHub are configured in `.mcp.json`. For GitHub and Playwright operations, prefer the `gh` CLI and `npx playwright` over their MCP equivalents — the CLIs are more stable.

## Adversarial Team Agents

Six persistent agents in `.claude/agents/` for feature development. Invoke the full workflow with `/adversarial-team "feature" [full|content|build|quick]`.

| Agent | `subagent_type` | Role | Runs when |
|---|---|---|---|
| Design Consultant | `design-consultant` | Audits site for AI-generated patterns, researches what makes design look crafted, produces CSS-specific brief | Phase 1 — parallel |
| Content Researcher | `content-researcher` | Verifies facts, audits existing content, finds gaps via WebSearch + NotebookLM | Phase 1 — parallel |
| Architect | `architect` | Reads both briefs, produces 2 design options, requests team vote before finalizing | Phase 2 — after both briefs |
| Implementer | `implementer` | Writes HTML/CSS/JS, runs Playwright headed at desktop + mobile 375px + dark mode | Phase 3 — after plan |
| Adversarial Reviewer | `adversarial-reviewer` | Content accuracy + Codex code validation + UI suggestions for UX Advocate | Phase 4 — parallel |
| UX Advocate | `ux-advocate` | WCAG AA with fix snippets, mobile, dark mode, evaluates Codex UI suggestions | Phase 4 — parallel |
| Pedagogical Reviewer | `pedagogical-reviewer` | Teaching quality for non-technical users, Codex second opinion on clarity | Phase 4 — parallel |

**Interaction model:** Parallel research (Design Consultant + Content Researcher) → Plan with vote → Build → Parallel review → Synthesis → Iteration until 6/6 consensus.

**Codex integration:** Adversarial Reviewer validates code examples and generates UI suggestions via Codex. Pedagogical Reviewer uses Codex for a second opinion on content clarity. Codex CLI at `/usr/local/bin/codex`; `OPENAI_API_KEY` forwarded via `.claude/settings.local.json`.

**Workspace:** Each feature gets `work/[feature-name]/` with `research.md`, `plan.md`, `synthesis.md`, `review/accuracy-audit.md`, `ux/usability-report.md`, `ux/pedagogical-review.md`.

## Active Work

The next priority is a learning page redesign. Plans are in `work/learning-page-redesign/plan/`. Implementation goes in `worktrees/redesign/`. See `dev-docs/START-HERE-NEXT-SESSION.md` for the detailed handoff context.

# Content Research Brief — Learning Page Redesign
**Agent:** CONTENT RESEARCHER
**Date:** June 14, 2026

---

## 1. Verified Facts

- **Claude Code is CLI + VS Code extension:** Site correctly covers both entry points.
- **Subscription plans:** Claude Pro ($20/month), Claude Max ($100–200/month) — accurate.
- **Model tiers:** Haiku / Sonnet / Opus descriptions are directionally accurate.
- **Slash commands:** `/compact`, `/clear`, `/model`, `/usage`, `/memory`, `/help`, `/insights`, `/btw`, `/loop`, `/doctor` are real commands.
- **CLAUDE.md:** Automatically read at session start — correctly described.
- **MCP Servers:** Protocol description and example apps (Google Drive, Slack, Airtable, Salesforce) are accurate.
- **Skills:** `.md` files in `.claude/skills/` — confirmed by project's own CLAUDE.md.

---

## 2. Outdated / Incorrect Content

### ⚠️ CRITICAL — Installation commands are wrong
`docs/getting-started.html` shows:
- macOS: `curl -fsSL https://claude.ai/install.sh | bash` and `brew install --cask claude-code`
- Windows: `irm https://claude.ai/install.ps1 | iex` and `winget install Anthropic.ClaudeCode`
- Linux: `curl -fsSL https://claude.ai/install.sh | bash`

**Actual installation is:** `npm install -g @anthropic-ai/claude-code`

These curl/brew/winget/PowerShell commands appear to be fabricated. Any beginner who follows these instructions will fail at step one. Exercises CANNOT include installation steps without verifying the current correct command at https://docs.anthropic.com/en/docs/claude-code/getting-started first.

**Other minor issues:**
- "Version 1.0" badge in navigation — site is on 1.2 per CLAUDE.md changelog
- Two nav items use the same emoji 🚀 (Getting Started and Advanced)

---

## 3. Gaps Found

| Gap | Description | Impact |
|-----|-------------|--------|
| **No exercise content** | `docs/data/exercises.json` does not exist. No exercises in any HTML. The plan is complete, the content is entirely missing. | Blocking |
| **No role-specific content** | Site says it targets non-technical professionals but all content is developer-oriented. `workflows.html` opens with "Code Exploration & Understanding" and asks "What's the main technology stack?" | High |
| **No terminal bridging** | `getting-started.html` jumps to terminal commands without explaining what the terminal is. Non-technical users need this bridge. | High |
| **No permission approval walkthrough** | Permission prompts alarming to non-technical users — mentioned briefly, never walked through as learning moment. | Medium |
| **No prompting guidance exercise** | One concept card on "How to Talk to Claude Code" but no exercise. Writing prompts IS the primary skill for non-technical users. Largest content gap. | High |
| **No "what not to ask" content** | Beginners try tasks Claude Code handles poorly. No expectation management. | Medium |
| **Intermediate boundary undefined** | Plan shows 10 beginner + 15 intermediate exercises but never defines the skill transition. What does a user know at exercise 10 vs exercise 1? | Medium |

---

## 4. Contradictions

1. **VS Code vs. terminal entry point:** Exercise #1 references "Open Claude Code in VS Code" but all command examples use the terminal `claude` command. Exercises must commit to one primary entry point for beginners.

2. **Stated audience vs. actual content:** Non-technical professionals are the stated audience. All workflows and exercises in the plan are developer-oriented (codebase exploration, refactoring, Git, CI/CD). Structural contradiction the exercise content must actively correct.

3. **Advanced exercises exclude the target audience:** Plan lists exercises #28 (adversarial code review), #29 (CI/CD integration), #30 (custom skill marketplace submission). Irrelevant to a Salesforce admin or project manager.

4. **`worktrees/redesign/` vs. `docs/`:** Plan documents reference implementing in `worktrees/redesign/`. GitHub Pages deploys from `docs/`. A worktree at `worktrees/redesign/` does not auto-deploy. The Implementer needs to resolve this.

---

## 5. Technical Notes for the Architect

### Shadow DOM decision — must decide before planning
The technical architecture uses `this.attachShadow({ mode: 'open' })` for the skill-level-selector Web Component. Shadow DOM encapsulates CSS — the existing CSS custom properties (`--accent-primary`, etc.) and class system will NOT penetrate into Shadow DOM.

**Options:**
- **Shadow DOM** — isolated, must duplicate all styles, higher maintenance burden
- **Regular custom elements without Shadow DOM** — inherits existing CSS variables and classes, simpler, recommended for this project's constraints

### ES modules require `type="module"` script tags
The technical architecture uses `export const appState = new StateManager()`. Without a build step (hard constraint), this requires `<script type="module">`. These fail when opening as `file://` locally — must use `python3 -m http.server` or VS Code Live Server.

### New directories need approval
`docs/data/`, `docs/components/`, `docs/utils/` do not exist. CLAUDE.md says not to change root structure. Creating subdirectories under `docs/` is probably fine, but CLAUDE.md should be updated.

---

## 6. Content Opportunities

1. **Job-role-based exercise tracks:** "I'm a project manager," "I'm a Salesforce admin," "I'm an analyst" — directly serves stated audience, differentiates the site from developer-focused alternatives.

2. **"5-minute quick win" as exercise #1:** Best candidate: "Ask Claude Code to write a short professional email for you." No terminal knowledge required, familiar task, immediate value.

3. **Prompt templates as library items:** "Summarize [document] for [audience] in [format]," "Review [document] for [tone/clarity]." Most practical take-away for non-technical users.

4. **Before/After exercises:** Mirror the comparison grid in index.html. Format: "Here's a task that normally takes 20 minutes. Use Claude Code to do it in 2."

5. **Reframe skill level labels:**
   - Beginner: "I want to try Claude Code for the first time"
   - Intermediate: "I've used it a few times, now I want to save real time at work"
   - Advanced: "I want to build tools and automations for my whole team"

---

## 7. Recommended Exercise Topics (non-technical audience)

1. "Write a professional email in seconds" — 3-min quick win, no terminal required
2. "Summarize a long document for your manager" — file access, practical output
3. "Find and fix formatting inconsistencies across multiple files" — demonstrates file editing value
4. "Create your first CLAUDE.md for a real work project" — teaches preferences and memory
5. "Review a document for tone and clarity" — non-technical quality check use case
6. "Write better prompts: turn a vague request into a specific one" — prompt fundamentals
7. "Connect Claude to Google Drive via MCP and access a file" — MCP for non-developers
8. "Automate a daily check with /loop" — scheduling and automation value

---

## 8. Sources to Verify Before Implementation

1. https://docs.anthropic.com/en/docs/claude-code/getting-started — verify actual install command
2. https://docs.anthropic.com/en/docs/claude-code/slash-commands — verify full slash command list
3. https://docs.anthropic.com/en/docs/claude-code/claude-md — verify CLAUDE.md best practices
4. https://docs.anthropic.com/en/docs/claude-code/mcp — verify MCP server options for exercises

---

**---RESEARCH-COMPLETE---**

**Key findings:**
1. Installation instructions on the site (curl/brew/winget) are almost certainly wrong — Claude Code installs via npm. Must verify before any exercise references installation.
2. The plan's exercise list is developer-oriented despite the audience being non-technical professionals. Exercises must be redesigned around professional work tasks, not developer tasks.
3. The Web Components plan uses Shadow DOM which will break the existing CSS variable/class system. Architect must choose: Shadow DOM (isolated, doubles CSS work) or regular custom elements (inherits all existing CSS, lower complexity — recommended).

**Recommended exercise topics:** Email writing, document summarization, formatting consistency, CLAUDE.md creation, tone/clarity review, prompt writing, MCP + Google Drive, /loop automation.

**Watch out for:** Advanced exercises #28–#30 (CI/CD, adversarial code review, skill marketplace) are irrelevant to the target audience and will make the Advanced track useless for non-technical professionals.

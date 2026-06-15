# Agent Team Development Workflow
**Multi-Agent Adversarial System — 7 Specialists, 6 Phases, 6/6 Consensus Required**

*Last updated: June 14, 2026*

---

## What This Is

A structured workflow where 7 specialized AI agents collaborate to build and review features. Each agent owns a distinct domain and has **veto power** within it. Nothing ships until all 6 reviewers sign off.

The key innovation: most teams put design and content review at the *end* as a coat of paint. Here, research and design investigation happen *before* any planning begins — so design direction is baked into the architecture, not retrofitted onto it.

---

## Part 1 — How to Start the Workflow

### Step 1: Open Claude Code in your project terminal

```bash
cd /Users/albertodelrio/Documents/vscodelocal/LearnClaudecode
claude   # opens Claude Code in this directory
```

### Step 2: Choose your scope

Ask yourself: how big is this change?

| If you're building... | Use this scope |
|-----------------------|----------------|
| A new page, major component, or anything touching content AND design | `full` |
| A UI or layout change, content is already solid | `design` |
| Updating facts or writing new content, no new UI | `content` |
| Implementing something already planned and designed | `build` |
| A small, bounded fix you just want a second pair of eyes on | `quick` |

### Step 3: Run the skill

```bash
/adversarial-team "what you want to build" [scope]
```

That's it. Claude Code launches the agents in the correct order automatically. You watch the conversation — agents hand off to each other and you're notified when a decision or vote needs your input.

### Step 4: What you'll see

The workflow surfaces decisions at two moments:

1. **After Phase 2 (Architecture):** The Architect produces two options. UX Advocate and Pedagogical Reviewer vote. You can override the vote if you disagree.
2. **After Phase 5 (Synthesis):** A prioritized table of issues is presented. You can defer MEDIUM/LOW items before the Implementer starts fixing.

Everything else runs without you needing to do anything.

### Step 5: When it's done

The workflow ends when all 6 reviewers mark ✅. At that point:

```bash
# In your git terminal (Terminal 3)
cd worktrees/redesign
git add .
git commit -m "your message"
git push origin feature/learning-page-redesign
```

GitHub Pages auto-deploys from `docs/` within 2–3 minutes of merging to `main`.

---

## Part 2 — Real Examples of What to Run

### Building something new
```bash
/adversarial-team "add a skill-level-selector and exercise-viewer to the learning page" full
/adversarial-team "create a new page for Salesforce integration examples" full
/adversarial-team "add a progress tracker that remembers which exercises the user completed" full
```

### Updating content
```bash
/adversarial-team "the installation instructions on getting-started.html are wrong — find the correct commands and update the page" content
/adversarial-team "the MCP servers section is outdated — research and rewrite it with current options" content
/adversarial-team "add 5 new exercises for intermediate users focused on professional work tasks" content
```

### Fixing design problems
```bash
/adversarial-team "the site looks generic — audit every page and apply the design brief recommendations" design
/adversarial-team "the mobile navigation is broken at 375px — fix it" build
/adversarial-team "dark mode has contrast issues throughout — find and fix them all" build
```

### Quick checks
```bash
/adversarial-team "I just added a new concept card to core-concepts.html — review it" quick
/adversarial-team "check the search results page for broken layouts" quick
```

---

## Part 3 — The 7 Agents

| # | Agent | Role | Veto Power |
|---|-------|------|------------|
| 1 | **Design Consultant** | Audits the current site for AI-generated patterns. Researches what the best sites in this category are doing. Produces concrete CSS techniques and a design direction — not vague advice. | Vetoes if implementation looks AI-generated or ignores the design brief |
| 2 | **Content Researcher** | Verifies facts, finds outdated information, identifies content gaps using web search and NotebookLM. Produces a research brief grounded in current, accurate sources. | — |
| 3 | **Architect** | Reads both research briefs. Produces **two meaningfully different design options** for the team to vote on. Never writes implementation code. | Vetoes if the Implementer deviates from the approved plan |
| 4 | **Implementer** | Builds the chosen option in HTML/CSS/JS. Runs visual tests at desktop and mobile (375px). Tests dark mode. Flags plan disagreements before deviating. | Vetoes if unresolved blockers prevent a working implementation |
| 5 | **Adversarial Reviewer** | Assumes something is wrong and tries to prove it. Validates every code example with Codex (second AI). Cross-references content across pages. | Vetoes on factually incorrect content or broken code examples |
| 6 | **UX Advocate** | Tests mobile and dark mode with Playwright. Checks WCAG AA accessibility. Writes actual HTML/CSS fix snippets — not prose descriptions. Evaluates Codex UI suggestions. | Vetoes on WCAG AA accessibility violations |
| 7 | **Pedagogical Reviewer** | Reviews content through the eyes of a non-technical adult learner. Checks for jargon, missing analogies, unclear progressions. Uses Codex for a second opinion on clarity. | Vetoes if content would confuse or exclude the target audience |

---

## Part 4 — Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         PHASE 1 — PARALLEL RESEARCH                             │
│                                                                                 │
│  ┌─────────────────────────────┐    ┌─────────────────────────────┐            │
│  │     Design Consultant       │    │      Content Researcher      │            │
│  │                             │    │                              │            │
│  │  • Audits current design    │    │  • Verifies facts in site    │            │
│  │  • Researches best-in-class │    │  • Finds outdated content    │            │
│  │  • Produces CSS techniques  │    │  • Identifies gaps           │            │
│  │                             │    │  • Checks contradictions     │            │
│  │  → design-brief.md          │    │  → research.md               │            │
│  └──────────────┬──────────────┘    └──────────────┬───────────────┘            │
│                 └────────────────┬─────────────────┘                            │
└──────────────────────────────────┼──────────────────────────────────────────────┘
                                   │ Both briefs ready
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      PHASE 2 — ARCHITECTURE + VOTE                              │
│                                                                                 │
│              ┌───────────────────────────────────┐                             │
│              │           Architect                │                             │
│              │  Reads both briefs                │                             │
│              │  Produces Option A and Option B   │                             │
│              └─────────────┬─────────────────────┘                             │
│              ┌─────────────┴──────────────────────────┐                        │
│    ┌─────────▼──────────┐              ┌──────────────▼──────────┐             │
│    │    UX Advocate     │              │  Pedagogical Reviewer   │             │
│    │  votes A or B      │              │  votes A or B           │             │
│    └─────────┬──────────┘              └──────────────┬──────────┘             │
│              └─────────────┬──────────────────────────┘                        │
│              ┌─────────────▼─────────────────────┐                             │
│              │  Architect finalizes → plan.md     │                             │
│              └─────────────┬─────────────────────┘                             │
└──────────────────────────────────────────────────────────────────────────────────┘
                             │ Plan approved
                             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         PHASE 3 — IMPLEMENTATION                                │
│              ┌───────────────────────────────────┐                             │
│              │           Implementer              │                             │
│              │  Builds HTML / CSS / JS            │                             │
│              │  Visual check: desktop + mobile    │                             │
│              │  Tests dark mode                   │                             │
│              └─────────────┬─────────────────────┘                             │
└──────────────────────────────────────────────────────────────────────────────────┘
                             │ Implementation complete
                             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      PHASE 4 — PARALLEL REVIEW                                  │
│                                                                                 │
│  ┌──────────────────────┐  ┌───────────────────────┐  ┌─────────────────────┐  │
│  │  Adversarial         │  │    UX Advocate        │  │  Pedagogical        │  │
│  │  Reviewer            │  │                       │  │  Reviewer           │  │
│  │  • Code validation   │  │  • Playwright tests   │  │  • Teaching quality │  │
│  │    with Codex        │  │  • WCAG AA checks     │  │  • Jargon audit     │  │
│  │  • Cross-reference   │  │  • Mobile + dark mode │  │  • Codex 2nd view   │  │
│  │  • Forwards UI tips  │  │  • Fix snippets       │  │                     │  │
│  └──────────┬───────────┘  └──────────┬────────────┘  └──────────┬──────────┘  │
│             └─────────────────────────┼──────────────────────────┘             │
└─────────────────────────────────────────────────────────────────────────────────┘
                             │ All reviews complete
                             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│              PHASE 5 — SYNTHESIS  →  PHASE 6 — ITERATION                        │
│                                                                                 │
│   All findings merged into one prioritized table → Implementer fixes in order  │
│   Each reviewer re-checks only their own items                                 │
│   Max 3 rounds → escalate to human if still unresolved                         │
│                                                                                 │
│              ✅ ✅ ✅ ✅ ✅ ✅  →  6/6 Consensus — ready to ship               │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## Part 5 — Phase Reference

| Phase | Who Leads | Parallel? | Output |
|-------|-----------|-----------|--------|
| 1 — Research | Design Consultant + Content Researcher | Yes | `design-brief.md` + `research.md` |
| 2 — Architecture | Architect (vote: UX + Pedagogical) | Vote runs in parallel | `plan.md` |
| 3 — Implementation | Implementer | No | Working HTML/CSS/JS |
| 4 — Review | Adversarial + UX + Pedagogical | Yes — all three simultaneously | 3 review reports |
| 5 — Synthesis | Orchestrator | No | `synthesis.md` |
| 6 — Iteration | Implementer + all reviewers | Re-checks in parallel | Consensus: 6/6 ✅ |

---

## Part 6 — Suggestions for Evolution

These are the next logical improvements, roughly in order of value vs. effort:

### Near term — make the existing agents smarter

| Idea | Which agent | What it adds |
|------|-------------|--------------|
| Role-based content tracks | Pedagogical Reviewer | Instead of Beginner/Intermediate/Advanced, generate exercises by job role (Salesforce admin, analyst, PM) |
| Performance audit | Adversarial Reviewer | Check page load size, image optimization, script load order — the site has no performance budget yet |
| Cross-page consistency check | Adversarial Reviewer | Automatically compare terminology across all 7 HTML pages, not just the changed one |
| Prompt template generation | Content Researcher | After verifying content, generate 3 reusable prompt templates users can copy for their work |
| Fix snippets in Playwright | UX Advocate | Generate a Playwright test alongside each fix snippet so the fix doesn't regress |

### Medium term — add new agents

| Agent idea | Role | When it would run |
|------------|------|-------------------|
| **Performance Engineer** | Audits page size, load time, script weight. Suggests lazy loading, image compression. | Phase 4 (parallel with reviewers) |
| **SEO Analyst** | Checks meta descriptions, heading hierarchy, semantic HTML for search discoverability. | Phase 4 (parallel) |
| **Localisation Reviewer** | Checks reading level (Flesch-Kincaid), flags idioms or cultural references that won't translate, identifies content that needs simplification for non-native English readers. | Phase 4 (parallel) |
| **Changelog Writer** | After consensus, automatically writes a changelog entry describing what changed and why, in plain English for non-technical stakeholders. | Phase 6 (after consensus) |

### Longer term — automation and integration

- **Auto-trigger on PR:** When a branch is pushed, automatically run `quick` scope on changed files. Only escalate to `full` if changes touch more than 3 files.
- **Metrics dashboard:** Track per-feature: issues found per phase, iterations to consensus, which agent vetoed most often. Helps identify where the process has friction.
- **Memory across features:** After each feature ships, the Design Consultant updates a "design decisions log" — so the next feature doesn't re-debate the same choices.
- **CI/CD integration:** Run the `content` scope on a schedule (weekly) to catch documentation drift as Claude Code updates its features.

---

## Part 7 — Transferring to Another Machine or Team

### Moving to a new machine (you, same project)

Everything the workflow needs is in the repository. Clone it and you're done:

```bash
git clone [your-repo-url]
cd LearnClaudecode

# Verify agents loaded correctly
# In Claude Code, run:
# /adversarial-team "test" quick
# You should see the 7-agent startup message
```

The only thing that doesn't transfer automatically is `OPENAI_API_KEY` (needed for Codex). Set it once on the new machine:

```bash
echo 'export OPENAI_API_KEY="sk-your-key-here"' >> ~/.zshrc
source ~/.zshrc
```

**What travels with the repo:**

| What | Where | Travels with git? |
|------|-------|-------------------|
| All 7 agent definitions | `.claude/agents/` | ✅ Yes |
| Adversarial team skill | `.claude/skills/adversarial-team/` | ✅ Yes |
| Project permissions + Codex wiring | `.claude/settings.local.json` | ✅ Yes |
| OPENAI_API_KEY value | Shell environment | ❌ No — set manually per machine |
| NotebookLM authentication | Local auth cache | ❌ No — run `notebooklm auth` on new machine |
| Agent teams feature flag | `~/.claude/settings.json` (global) | ❌ No — set once per machine (see below) |

**One-time setup on a new machine:**

```bash
# 1. Enable agent teams (global Claude Code setting)
# Add to ~/.claude/settings.json:
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}

# 2. Set OpenAI key
echo 'export OPENAI_API_KEY="sk-your-key"' >> ~/.zshrc && source ~/.zshrc

# 3. Authenticate NotebookLM
notebooklm auth

# 4. Playwright (if running UI tests)
npx playwright install
```

---

### Sharing with a team (other people using this workflow)

The workflow is designed to be portable. To bring a collaborator in:

**Step 1 — Share the repository.** All agent definitions, the skill, and the project settings travel with it.

**Step 2 — Share this document** (`dev-docs/AGENT-TEAM-WORKFLOW.md`) so they understand the workflow before touching it.

**Step 3 — Each person sets up once on their machine** (the 4 steps above).

**Step 4 — Agree on who runs the workflow.** For now this is single-player — one person runs `/adversarial-team` and watches the agents. In the future (see Evolution section), agents could be triggered automatically by CI/CD so the whole team benefits without any individual running it manually.

**What to customise for a different project:**

| File | What to change |
|------|---------------|
| `.claude/agents/architect.md` | Update the stack description (currently assumes static HTML/CSS/JS, no build step) |
| `.claude/agents/pedagogical-reviewer.md` | Update the target audience description (currently: non-technical professionals) |
| `.claude/agents/adversarial-reviewer.md` | Rebalance security vs. content focus (currently content-focused for a static site; a backend project needs STRIDE security analysis instead) |
| `.claude/skills/adversarial-team/SKILL.md` | Update the `When to Use` and project-specific constraints |
| `.mcp.json` | Update MCP servers for the new project's integrations |

The agent *roles* and *interaction model* are project-agnostic. The agent *instructions* are tuned for this specific site. Swap the instructions, keep the structure.

---

## Agent File Locations

| Agent | File |
|-------|------|
| Design Consultant | `.claude/agents/design-consultant.md` |
| Content Researcher | `.claude/agents/content-researcher.md` |
| Architect | `.claude/agents/architect.md` |
| Implementer | `.claude/agents/implementer.md` |
| Adversarial Reviewer | `.claude/agents/adversarial-reviewer.md` |
| UX Advocate | `.claude/agents/ux-advocate.md` |
| Pedagogical Reviewer | `.claude/agents/pedagogical-reviewer.md` |
| Workflow Skill | `.claude/skills/adversarial-team/SKILL.md` |

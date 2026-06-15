---
description: Multi-agent adversarial development workflow with 7 specialized agents: Design Consultant, Content Researcher, Architect, Implementer, Adversarial Reviewer, Pedagogical Reviewer, and UX Advocate. Designed for an educational static HTML/CSS/JS website targeting non-technical users. Agents interact across phases — parallel research → design-informed planning with vote → implementation → parallel review → synthesis → iteration.
disable-model-invocation: false
user-invocable: true
arguments: [feature_description, scope]
---

# Adversarial Team Development Workflow

7-agent team for the Claude Code Learning Manual. Built for content quality, teaching effectiveness, non-generic visual design, and usable UI — not just code correctness.

## When to Use

**Use for:**
- New pages or major sections
- Interactive components (skill-level-selector, exercise-viewer, search enhancements)
- Content rewrites (updating outdated sections)
- Any feature that changes what users learn, how they navigate, or how the site looks

**Skip for:**
- Typo fixes
- CSS color tweaks
- Single-line HTML corrections
- Obvious bug fixes with no design or content impact

## Arguments

- `feature_description` (required): What to build or change
- `scope`: `full` (all 7 agents, default), `design` (Design Consultant + Architect + Implementer + UX), `content` (Researcher + Reviewer + Pedagogical only), `build` (Architect + Implementer + UX only), `quick` (Implementer + Adversarial Reviewer only)

---

## The 7-Agent Team

```
Phase 1 (parallel)           Phase 2                    Phase 3         Phase 4 (parallel)
──────────────────────────   ─────────────────────────  ─────────────   ──────────────────────────────
Design Consultant        →   Architect                  Implementer     Adversarial Reviewer
Content Researcher       →   (reads both briefs)    →               →   UX Advocate
                             produces 2 options                         Pedagogical Reviewer
                             ↓                                                   ↓
                             UX Advocate vote                         Phase 5: Synthesis
                             Pedagogical Reviewer vote                           ↓
                             ↓                                         Phase 6: Iteration
                             Architect finalizes plan                            ↓
                                                                       6/6 consensus → done
```

---

## Phase 1: Parallel Research (Design Consultant + Content Researcher)

Both run simultaneously. Neither waits for the other. The Architect does not start until both hand off.

**Design Consultant:**
1. Audit `docs/styles.css` and relevant HTML for AI-generated design patterns
2. Research what the best documentation/educational sites are doing right now (WebSearch)
3. Form an opinionated design direction for this specific feature
4. Produce concrete CSS snippets and patterns — not prose direction
5. Produce `work/[feature-name]/design-brief.md`

**Handoff from Design Consultant:**
```
@Architect: Design brief ready at work/[feature-name]/design-brief.md
Current design problems: [top 3 AI-generated patterns found]
Design direction: [one opinionated sentence]
Key technique: [most important CSS recommendation]
Avoid: [most important pattern to reject]
```

**Content Researcher:**
1. Search official Claude Code docs for the topic
2. Audit existing `docs/*.html` for related content and outdated facts
3. Query NotebookLM for existing knowledge
4. Identify gaps and contradictions
5. Produce `work/[feature-name]/research.md`

**Handoff from Content Researcher:**
```
@Architect: Research brief ready at work/[feature-name]/research.md
Key findings: [summary]
Watch out for: [specific risk or outdated assumption]
```

---

## Phase 2: Architecture with Vote (Architect leads, UX Advocate + Pedagogical Reviewer vote)

**Architect reads BOTH briefs first:** `work/[feature-name]/design-brief.md` and `work/[feature-name]/research.md`. The design direction and content findings together shape the two options — not just one or the other.

**Architect then:**
1. Produce **two meaningfully different design options** in `work/[feature-name]/plan.md`
2. Each option must reflect the Design Consultant's direction — not ignore it
3. For each option: file changes, CSS classes needed, JS patterns, design approach, tradeoffs
4. Request a vote from UX Advocate and Pedagogical Reviewer

**Vote (UX Advocate + Pedagogical Reviewer, in parallel):**
- Each reviews both options in `plan.md`
- Each votes: Option A / Option B / Neither (with reason)
- Quick review — ~15 min, not a full audit

**Architect finalizes** based on vote, notes why the other option was rejected.

**Handoff to Implementer:**
```
@Implementer: Plan finalized at work/[feature-name]/plan.md
Option [A/B] chosen. Key files: [list]. Proceed.
```

---

## Phase 3: Implementation (Implementer leads)

**Implementer:**
1. Reads finalized plan
2. Implements changes in `docs/` files
3. Uses existing CSS class system — creates new classes only when necessary
4. Runs Playwright headed to visually verify at desktop and mobile (375px)
5. Tests dark mode
6. Completes self-review checklist

**Handoff:**
```
@Adversarial-Reviewer @UX-Advocate @Pedagogical-Reviewer: Implementation complete.
Files changed: [list]
Visual + mobile + dark mode checked: ✅
Ready for parallel review.
```

---

## Phase 4: Parallel Review (3 agents simultaneously)

All three run at the same time on the completed implementation. They do NOT wait for each other.

**Adversarial Reviewer:**
- Validates all code examples using Codex (`/codex:adversarial-review` or `codex review`)
- Cross-references content against other pages for consistency
- Checks JS edge cases
- Forwards Codex UI suggestions to UX Advocate
- Produces `work/[feature-name]/review/accuracy-audit.md`

**UX Advocate:**
- Tests mobile viewport (375px) and dark mode in Playwright
- Checks WCAG AA accessibility with fix snippets
- Evaluates Codex UI suggestions received from Adversarial Reviewer
- Produces `work/[feature-name]/ux/usability-report.md`

**Pedagogical Reviewer:**
- Reviews content for teaching quality, jargon, learning progression
- Gets second opinion from Codex on pedagogical clarity
- Checks that examples are realistic for non-technical users
- Produces `work/[feature-name]/ux/pedagogical-review.md`

---

## Phase 5: Synthesis

After all three review reports are complete, produce a combined synthesis in `work/[feature-name]/synthesis.md`:

**Synthesis format:**
```markdown
# [Feature Name] — Review Synthesis

## Must Fix (blocking consensus)
| # | Issue | Severity | Source | Assignee |
|---|-------|----------|--------|----------|
| 1 | [issue] | CRITICAL | Adversarial | Implementer |
| 2 | [issue] | WCAG | UX | Implementer |

## Should Fix (before merge)
[list]

## Consider (document if deferring)
[list]

## Agreed Wins (don't change these)
[what's working well across all reviews]

## Consensus Status
- Adversarial Reviewer: ❌ (blocking: #1, #2)
- UX Advocate: ❌ (blocking: #2, #3)
- Pedagogical Reviewer: ✅
- Implementer: (pending fixes)
- Architect: ✅
Overall: NEEDS WORK
```

**Handoff:**
```
@Implementer: Synthesis ready at work/[feature-name]/synthesis.md
Blocking issues: [count] — address these first.
Non-blocking: [count] — address before merge.
```

---

## Phase 6: Iteration (until consensus)

**Implementer addresses issues** in order: CRITICAL → HIGH → WCAG → MEDIUM

After each round of fixes:
- Adversarial Reviewer re-checks their CRITICAL/HIGH items
- UX Advocate re-checks their WCAG items
- Pedagogical Reviewer re-checks blocking pedagogical issues
- Update consensus status in synthesis.md

**Repeat until:** All 6 agents (Design Consultant, Adversarial Reviewer, UX Advocate, Pedagogical Reviewer, Implementer, Architect) mark ✅

Max 3 iteration rounds before escalating to user for tiebreaker.

---

## Consensus Criteria (6/6 required)

| Agent | Their veto condition |
|-------|---------------------|
| Design Consultant | Implemented design ignores the design brief / looks AI-generated |
| Architect | Plan not followed, architecture broken |
| Implementer | Tests not passing, unresolved blockers |
| Adversarial Reviewer | CRITICAL accuracy issue or broken code example |
| UX Advocate | WCAG AA violation (when compliance required) |
| Pedagogical Reviewer | Content that would confuse or exclude target audience |

---

## Workspace Structure

```
work/[feature-name]/
├── design-brief.md          ← Design Consultant
├── research.md              ← Content Researcher
├── plan.md                  ← Architect (2 options + vote result + final)
├── synthesis.md             ← Synthesis (updated each iteration)
├── implementation/
│   └── notes.md             ← Implementer deviation log
├── review/
│   └── accuracy-audit.md   ← Adversarial Reviewer
└── ux/
    ├── usability-report.md  ← UX Advocate (with fix snippets)
    └── pedagogical-review.md ← Pedagogical Reviewer
```

---

## Scope Shortcuts

| Scope | Agents | When to use |
|-------|--------|-------------|
| `full` | All 7 | New features, major content or design changes |
| `design` | Design Consultant + Architect + Implementer + UX | Design/layout changes with stable content |
| `content` | Content Researcher + Adversarial + Pedagogical | Content-only updates, no new UI |
| `build` | Architect + Implementer + UX | UI changes where design direction is already set |
| `quick` | Implementer + Adversarial | Small, bounded code changes |

---

## Startup Message

When this skill is invoked, confirm the team and kick off Phase 1:

```
Starting adversarial team workflow for: [feature_description]
Scope: [scope]

Team:
1. Design Consultant — auditing current design, researching what makes sites look non-generic
2. Content Researcher — verifying facts, finding gaps (runs in parallel with Design Consultant)
3. Architect — reads both briefs, produces 2 design options + team vote
4. Implementer — builds the chosen option
5. Adversarial Reviewer — content accuracy + Codex validation + UI suggestions
6. UX Advocate — accessibility + mobile + fix snippets + evaluates Codex UI ideas
7. Pedagogical Reviewer — teaching quality + Codex second opinion on clarity

Creating workspace: work/[feature-name]/

@Design-Consultant @Content-Researcher: Begin Phase 1 in parallel.
Design brief and research brief both due before the Architect starts.
```

---

## Codex Integration Points

| Phase | Agent | Codex use |
|-------|-------|-----------|
| Phase 1 | Design Consultant | Research non-generic CSS patterns and techniques |
| Phase 4 | Adversarial Reviewer | Validate all code examples in HTML are correct commands |
| Phase 4 | Adversarial Reviewer | Generate UI improvement suggestions → forwards to UX Advocate |
| Phase 4 | Pedagogical Reviewer | Second opinion on content clarity for non-technical users |

If Codex plugin is installed:
```bash
/codex:adversarial-review --scope=changed --depth=thorough "[specific focus]"
```

If using Codex CLI (`/usr/local/bin/codex`):
```bash
codex review --focus=accuracy   # for Adversarial Reviewer
codex review --focus=clarity    # for Pedagogical Reviewer
```

---

*This skill is designed for the Claude Code Learning Manual — a static HTML/CSS/JS educational site for non-technical professionals. Adjust agent focus for different project types.*

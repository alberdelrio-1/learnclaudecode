# Claude Code Toolbox Reference
**Quick reference for all available tools, plugins, and capabilities**

*Last Updated: June 13, 2026*
*Session Recovery Document - Read this at the start of each session*

---

## 🔧 MCP Servers (Model Context Protocol)

**Configuration File:** `.mcp.json` (root directory)

### Active MCP Servers

| Server | URL | Purpose | Auth Method |
|--------|-----|---------|-------------|
| **Gmail** | https://gmail.mcp.claude.com/mcp | Email access and management | OAuth |
| **Google Calendar** | https://gcal.mcp.claude.com/mcp | Calendar integration | OAuth |
| **Microsoft 365** | https://microsoft365.mcp.claude.com/mcp | Office suite (Outlook, Teams) | OAuth |
| **Notion** | https://mcp.notion.com/mcp | Workspace/documentation | OAuth |
| **GitHub** | https://github.mcp.claude.com/mcp | Repository & PR management | OAuth |

### MCP Tools Available

**IDE Integration:**
- `mcp__ide__getDiagnostics` - Get language diagnostics from VS Code
- `mcp__ide__executeCode` - Execute Python code in Jupyter kernel

**Notion Integration:**
- `mcp__notion__notion-search` - Search Notion workspace
- `mcp__notion__notion-fetch` - Fetch pages/databases
- `mcp__notion__notion-create-pages` - Create Notion pages
- `mcp__notion__notion-update-page` - Update page content
- `mcp__notion__notion-create-database` - Create databases
- `mcp__notion__notion-create-comment` - Add comments
- `mcp__notion__notion-get-users` - List workspace users

### How to Add New MCP Servers

```bash
# Edit .mcp.json
{
  "mcpServers": {
    "server-name": {
      "type": "http",
      "url": "https://server-url.mcp.claude.com/mcp"
    }
  }
}
```

**Available Official Servers:**
- Filesystem - File operations with access control
- Git - Repository operations
- Fetch - Web content retrieval
- Memory - Persistent knowledge graph
- Time - Timezone conversions

See: https://modelcontextprotocol.io

---

## 🎯 Claude Code Skills

**Location:** `.claude/skills/`
**Invocation:** `/skill-name` or auto-triggered

### Documentation & Writing Skills

| Skill | Command | Purpose |
|-------|---------|---------|
| Doc Co-authoring | `/doc-coauthoring` | Structured documentation workflow |
| Internal Comms | `/internal-comms` | Status reports, updates, FAQs |
| Extract YouTube | `/extract-youtube` | Extract & integrate YouTube content (custom) |
| **Adversarial Team** | `/adversarial-team` | Multi-agent workflow with specialized roles (custom) |

### Development Skills

| Skill | Command | Purpose |
|-------|---------|---------|
| Frontend Design | `/frontend-design` | UI design guidance |
| Web Artifacts Builder | `/web-artifacts-builder` | Complex HTML artifacts (React/Tailwind) |
| MCP Builder | `/mcp-builder` | Build MCP servers |
| Skill Creator | `/skill-creator` | Create/optimize custom skills |
| Webapp Testing | `/webapp-testing` | Playwright integration |

### Document Manipulation Skills

| Skill | Command | Purpose |
|-------|---------|---------|
| PDF | `/pdf` | Read, merge, split, watermark PDFs |
| DOCX | `/docx` | Create/edit Word documents |
| PPTX | `/pptx` | Create/edit PowerPoint presentations |
| XLSX | `/xlsx` | Create/edit Excel spreadsheets |

### Creative Skills

| Skill | Command | Purpose |
|-------|---------|---------|
| Algorithmic Art | `/algorithmic-art` | Generative art with p5.js |
| Canvas Design | `/canvas-design` | Visual design (PNG/PDF) |
| Slack GIF Creator | `/slack-gif-creator` | Animated GIFs for Slack |

### Utility Skills

| Skill | Command | Purpose |
|-------|---------|---------|
| Theme Factory | `/theme-factory` | Apply styling themes |
| Brand Guidelines | `/brand-guidelines` | Anthropic brand colors |

### Creating Custom Skills

**Location:** `.claude/skills/<name>/SKILL.md`

**Template:**
```yaml
---
description: Brief description
disable-model-invocation: false
user-invocable: true
arguments: [param1, param2]
---

# Skill Name

Detailed instructions...
```

---

## 🤖 OpenAI Codex Integration (NEW!)

**Released:** March 30, 2026
**Repository:** https://github.com/openai/codex-plugin-cc

### What is codex-plugin-cc?

OpenAI's official plugin that brings Codex CLI capabilities into Claude Code. Enables adversarial code review by having a second AI (Codex) challenge Claude's implementations.

### Installation

```bash
# Install the Codex plugin for Claude Code
npm install -g @openai/codex-plugin-cc

# Or via Claude Code
# Add to .mcp.json or install via Claude Code package manager
```

### Available Commands

**Primary Command:**
```bash
/codex:adversarial-review [--scope=changed|all] [--depth=quick|thorough] "focus area"
```

**What it does:**
- Questions whether your chosen approach is the right one
- Challenges assumptions and design choices
- Surfaces tradeoffs and examines failure modes
- Asks whether a different approach would be safer/simpler
- Assumes code is broken and hunts for problems

**Other Commands:**
```bash
/codex:review          # Standard code review
/codex:delegate        # Delegate tasks to Codex
```

### Example Usage

```bash
# Run adversarial review on changed files
/codex:adversarial-review --scope=changed "security vulnerabilities"

# Thorough review of entire codebase
/codex:adversarial-review --scope=all --depth=thorough

# Focus on specific concern
/codex:adversarial-review "authentication logic and session management"
```

### Adversarial Review Features

**Review Philosophy:**
- Claude writes/implements
- Codex tears it apart
- Iterative fix loop until consensus
- Multiple AI perspectives reduce blind spots

**Focus Areas:**
- Security vulnerabilities (XSS, SQLi, CSRF)
- Logic flaws and edge cases
- Performance bottlenecks
- Architecture weaknesses
- Error handling gaps
- Race conditions
- Dependency vulnerabilities

---

## 🧪 Testing Tools

### Playwright CLI

**Version:** @playwright/test@1.60.0
**Installation:** Already installed via npm

**Browsers Installed:**
- Chromium (Chrome for Testing 148.0.7778.96)
- Firefox (150.0.2)
- WebKit (26.4)
- FFmpeg (video recording)

**Commands:**

```bash
# Run all tests
npx playwright test

# Run in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Headed mode (see browser)
npx playwright test --headed

# Generate tests interactively
npx playwright codegen http://localhost:8000

# Debug mode
npx playwright test --debug

# View report
npx playwright show-report

# Update snapshots
npx playwright test --update-snapshots
```

**Skill Integration:**
Use `/webapp-testing` skill for guided Playwright workflows

---

## 📚 NotebookLM CLI

**Version:** 0.7.1
**Location:** `/Users/albertodelrio/.local/bin/notebooklm`
**Status:** ✅ Installed & Authenticated

### Active Notebooks

**1. Claude Code Learning Manual - R&D**
- **ID:** `cfc1fd34-1337-4985-a916-a9ad8e4363c0`
- **Sources:** 10 (documentation, guides, tutorials)

**2. Video Tutorials Database**
- **ID:** `dcdc7bc0-0f62-4973-a452-b31a3bc6c8e0`
- **Sources:** 44 (video tutorials, official docs, community resources)

### Commands

**Notebook Management:**
```bash
notebooklm list                    # List all notebooks
notebooklm create "Notebook Name"  # Create new
notebooklm use <id>                # Set current notebook
notebooklm summary                 # AI-generated summary
notebooklm delete <id>             # Delete notebook
```

**Adding Sources:**
```bash
# URLs
notebooklm source add "https://example.com"

# YouTube videos
notebooklm source add "https://youtube.com/watch?v=..."

# Web research (automated)
notebooklm source add-research "search query" --mode deep --import-all

# Files
notebooklm source add file.pdf
notebooklm source add document.docx

# List sources
notebooklm source list
```

**Querying:**
```bash
# Ask questions (citation-backed answers)
notebooklm ask "Your question here"

# Get conversation history
notebooklm history

# Save history to file
notebooklm history --save
```

**Content Generation:**
```bash
notebooklm generate quiz          # Create quiz
notebooklm generate flashcards    # Create flashcards
notebooklm generate audio         # Create podcast
notebooklm generate report        # Create report
notebooklm generate mind-map      # Create mind map
notebooklm generate infographic   # Create infographic
```

---

## 🔍 Built-in Capabilities

### Code Analysis & Review

**Security Scanning:**
- OWASP Top 10 vulnerabilities
- XSS, SQL injection, command injection
- Authentication/authorization bypass
- Insecure deserialization
- CSRF vulnerabilities

**Code Quality:**
- Anti-patterns identification
- Logic flaw detection
- Edge case analysis
- Error handling review
- Performance analysis

**Architecture Review:**
- Design weaknesses
- Scalability issues
- Dependency audit
- Test coverage gaps

### File Operations

**DO NOT use bash for these:**
- `Read` - Read files (NOT cat/head/tail)
- `Edit` - Edit files (NOT sed/awk)
- `Write` - Create files (NOT echo/cat)
- `Glob` - Find files (NOT find/ls)
- `Grep` - Search content (NOT grep/rg)

**Use bash ONLY for:**
- Git operations
- npm/package managers
- System commands
- Build tools

---

## 🚀 Agent Teams (Experimental)

**Status:** ✅ ENABLED in `~/.claude/settings.json`

**Requirements:** Claude Code v2.1.32+

### Configuration

**Current Setting:**
```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

### Usage

**Start a team:**
```
"Create a team of 3 agents: one for security review,
one for performance optimization, one for documentation"
```

**Control:**
- Shift+Down: Switch teammates (in-process mode)
- "End all teammates": Clean up team
- Name teammate: Shut down specific teammate

### When to Use

**Use Agent Teams:**
- Many parallel tasks with centralized monitoring
- Sustained coordination between workers
- Context window exceeded with subagent results
- Ongoing communication needed

**Use Subagents (Task tool):**
- Verbose output you won't reference
- Specific tool restrictions
- Self-contained work
- Quick focused delegation

**Best Practices:**
- Team size: 3-5 teammates optimal
- Task distribution: 5-6 tasks per teammate
- File management: Different files per teammate
- Pre-approve permissions to reduce interruptions

---

## 📦 Installed Packages

### npm Packages

```json
{
  "devDependencies": {
    "@playwright/test": "^1.60.0"
  }
}
```

### Python/uv Tools

```bash
# Package manager
uv 0.11.21

# NotebookLM
notebooklm-py 0.7.1 (with browser support)
```

---

## 🎨 Project-Specific Tools

### Custom Skills

**Extract YouTube:**
- Location: `.claude/skills/extract-youtube/`
- Purpose: Extract and integrate YouTube content
- Usage: `/extract-youtube <url>`

**Adversarial Team:**
- Location: `.claude/skills/adversarial-team/`
- Purpose: Multi-agent collaborative workflow with specialized roles
- Usage: `/adversarial-team "feature description" [critical|standard|quick]`
- **Agents:** Architect, Implementer, Adversarial Reviewer, UX Advocate
- **Best for:** Security-critical features, public APIs, compliance-required code

### Development Workflow

**Local Testing:**
```bash
# Serve website locally
cd docs
python3 -m http.server 8000

# Run Playwright tests
npx playwright test

# Visual regression
npx playwright test --headed
```

**Deployment:**
```bash
# GitHub Pages (automatic)
git add .
git commit -m "message"
git push

# Deploys from /docs folder automatically
```

---

## 🔗 Quick Links

### Documentation

- **Project Standards:** `dev-docs/CLAUDE.md` (auto-read by Claude Code)
- **Deployment Guide:** `dev-docs/DEPLOYMENT.md`
- **Organization:** `dev-docs/PROJECT-ORGANIZATION.md`
- **Latest Session:** `dev-docs/SESSION-2026-06-13.md`

### External Resources

- **MCP Servers:** https://modelcontextprotocol.io
- **Codex Plugin:** https://github.com/openai/codex-plugin-cc
- **Playwright Docs:** https://playwright.dev
- **NotebookLM:** https://notebooklm.google.com

---

## 🚨 Common Issues & Solutions

### NotebookLM Not in PATH

```bash
# Add to ~/.zshrc or ~/.bash_profile:
export PATH="$HOME/.local/bin:$PATH"

# Then reload:
source ~/.zshrc
```

### MCP Server Not Connecting

1. Check `.mcp.json` syntax (valid JSON)
2. Restart Claude Code
3. Check OAuth authorization in browser
4. Verify server URL is correct

### Playwright Browsers Not Installed

```bash
npx playwright install
```

### Agent Teams Not Working

1. Check Claude Code version: `claude --version` (need v2.1.32+)
2. Verify `~/.claude/settings.json` has experimental flag
3. Restart Claude Code session

---

## 🎯 Recommended Workflows

### Adversarial Code Review Workflow

1. **Write/modify code** with Claude Code
2. **Run adversarial review** with `/codex:adversarial-review`
3. **Review Codex feedback** and challenges
4. **Implement fixes** addressing concerns
5. **Re-run review** until both AIs agree
6. **Run tests** with Playwright (if UI changes)
7. **Commit** with confidence

### Research & Documentation Workflow

1. **Research topic** using NotebookLM
   ```bash
   notebooklm use <notebook-id>
   notebooklm source add-research "topic" --mode deep
   notebooklm ask "specific question"
   ```
2. **Generate content** (quiz, flashcards, report)
3. **Extract content** using `/doc-coauthoring`
4. **Integrate into website** (docs/*.html)
5. **Test locally** with Playwright
6. **Deploy** to GitHub Pages

### Multi-Agent Development Workflow

1. **Start agent team** for complex feature
   - Agent 1: Implementation
   - Agent 2: Tests
   - Agent 3: Documentation
2. **Monitor progress** across teammates
3. **Run adversarial review** on implemented code
4. **Consolidate results**
5. **Deploy**

---

## 📊 Capability Matrix

| Capability | Tool/Method | Status |
|------------|-------------|--------|
| Code Review | Built-in + `/codex:adversarial-review` | ✅ Ready |
| Security Analysis | Built-in OWASP scanning | ✅ Ready |
| UI Testing | Playwright + `/webapp-testing` | ✅ Installed |
| Research | NotebookLM CLI | ✅ Authenticated |
| Documentation | `/doc-coauthoring` skill | ✅ Available |
| Multi-tasking | Agent Teams | ✅ Enabled |
| Email Integration | Gmail MCP | ✅ Configured |
| Calendar | Google Calendar MCP | ✅ Configured |
| Repository Management | GitHub MCP | ✅ Configured |
| Workspace Docs | Notion MCP | ✅ Configured |
| PDF/DOCX/PPTX | Document skills | ✅ Available |
| Visual Design | Canvas Design skill | ✅ Available |

---

## 💡 Next Steps

### Immediate Actions

1. **Install Codex Plugin:**
   ```bash
   npm install -g @openai/codex-plugin-cc
   ```

2. **Test adversarial review:**
   ```bash
   /codex:adversarial-review --scope=changed
   ```

3. **Create custom adversarial skill** (optional):
   ```bash
   /skill-creator
   # Create skill combining Claude + Codex reviews
   ```

### Recommended Additions

**MCP Servers to Consider:**
- **Memory MCP** - Persistent knowledge graph
- **Filesystem MCP** - File operations with access control
- **Git MCP** - Advanced repository operations

**Skills to Create:**
- Adversarial review wrapper (Claude + Codex automated loop)
- Security checklist validator
- Documentation standards checker
- Dark mode compatibility tester

---

## 📝 Session Recovery Checklist

**At the start of each session, verify:**

- [ ] Read `dev-docs/TOOLBOX-REFERENCE.md` (this file)
- [ ] Read latest session notes (dev-docs/SESSION-*.md)
- [ ] Check project standards (dev-docs/CLAUDE.md)
- [ ] Verify NotebookLM access: `notebooklm list`
- [ ] Check MCP servers: `cat .mcp.json`
- [ ] Confirm Codex plugin: `/codex:adversarial-review --help`
- [ ] Review current git branch: `git status`

---

*Keep this document updated as new tools are added*
*Version: 1.0*
*Last Updated: June 13, 2026*

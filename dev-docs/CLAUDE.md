# Claude Code Learning Manual - Project Standards

This file contains standards and guidelines for maintaining and expanding the Claude Code Learning Manual website.

**File Location:** `dev-docs/CLAUDE.md` (moved from root for better organization)

> **Note:** This file is automatically read by Claude Code. The project structure separates website files (docs/) from development documentation (dev-docs/).

> **📋 Session docs:** See `dev-docs/TOOLBOX-REFERENCE.md` for complete tool reference and configuration status.

---

## Project Overview

**Purpose:** Beginner-friendly learning manual for Claude Code in VS Code
**Target Audience:** Non-coders learning Claude Code for work
**Technology:** Simple HTML/CSS/JavaScript (no frameworks)
**Current Version:** 1.2 (docs folder structure)

---

## Content Standards

### Tone & Style

**Always:**
- Use plain English, no jargon
- Write like talking to a colleague
- Include real-world analogies
- Focus on practical examples over theory
- Be specific and actionable
- Assume beginner skill level

**Never:**
- Use technical jargon without explanation
- Assume prior knowledge
- Be condescending or overly simplistic
- Use emojis excessively (only in headers/callouts)
- Make content theoretical without examples

### Writing Patterns

**For Non-Coders:**
- Start concepts with "What it is" and "Why it matters"
- Include "Analogy:" sections for complex topics
- Add "For non-coders:" callouts
- Use comparisons (Traditional way vs. With Claude Code)

**Code Examples:**
- Always include copy buttons
- Provide clear explanations of what code does
- Show expected output when relevant
- Use syntax highlighting (Prism.js)

---

## HTML Structure Standards

### Page Template

Every page should include:
1. Complete HTML5 doctype
2. Header with title and controls
3. Search container
4. Sidebar navigation
5. Main content area
6. Breadcrumb navigation
7. All script includes at bottom

### Required Elements

**Header:**
```html
<header>
    <div class="header-content">
        <h1>Claude Code Learning Manual</h1>
        <p class="subtitle">Page Title</p>
    </div>
    <div class="header-controls">
        <button id="theme-toggle" class="icon-button">
            <span class="theme-icon">🌙</span>
        </button>
        <button id="search-toggle" class="icon-button">
            <span>🔍</span>
        </button>
    </div>
</header>
```

**Navigation:**
- Always mark current page with `class="active"`
- Update all pages when adding new navigation items
- Maintain emoji + text format for consistency

**Breadcrumbs:**
```html
<div class="breadcrumb">
    <a href="index.html">Home</a> &gt; <span>Current Page</span>
</div>
```

---

## CSS Class Standards

### Layout Classes

- `.container` - Main grid container
- `.main-content` - Content area
- `.sidebar` - Navigation sidebar
- `.breadcrumb` - Breadcrumb navigation

### Content Classes

**Cards:**
- `.concept-card` - For explaining concepts
- `.workflow-card` - For workflow examples
- `.info-box` - General information boxes
- `.tip-box` - Pro tips and suggestions
- `.warning-box` - Warnings and cautions
- `.success-box` - Success messages
- `.example-box` - Code/usage examples

**Grids:**
- `.grid-2` - Two-column grid (auto-responsive)
- `.grid-3` - Three-column grid (auto-responsive)
- `.comparison-grid` - For before/after comparisons

**Interactive:**
- `.copy-button` - Code copy buttons
- `.button` - Standard buttons
- `.button.primary` - Primary action buttons
- `.tab-button` - Tab navigation
- `.tab-content` - Tab content areas

**Sections:**
- `.highlight-section` - Featured content areas
- `.next-steps` - End-of-page next steps
- `.step-by-step` - Step-by-step instructions

### When to Use Each

**concept-card:**
```html
<div class="concept-card">
    <h3>Concept Name</h3>
    <p><strong>What it is:</strong> Definition</p>
    <p><strong>Why it matters:</strong> Benefit</p>
</div>
```

**info-box variants:**
```html
<div class="info-box">Default information</div>
<div class="info-box warning">Warning message</div>
<div class="info-box success">Success message</div>
```

**step-by-step:**
```html
<div class="step-by-step">
    <div class="step">
        <span class="step-number">1</span>
        <div class="step-content">
            <h4>Step Title</h4>
            <p>Instructions...</p>
        </div>
    </div>
</div>
```

---

## Code Block Standards

### Required Structure

```html
<pre><code class="language-bash">command here</code></pre>
<button class="copy-button" data-copy="command here">Copy</button>
```

### Language Classes

- `language-bash` - Terminal commands
- `language-javascript` - JavaScript code
- `language-json` - JSON configuration
- `language-markdown` - Markdown examples
- `language-html` - HTML examples

### Inline Code

Use `<code>` for inline commands/filenames:
```html
<p>Use the <code>/help</code> command to see options.</p>
```

---

## File Organization

### Adding New Pages

**Steps:**
1. Create HTML file in root directory
2. Copy structure from existing page
3. Update all navigation sidebars (in all files)
4. Add to search index in `script.js`
5. Update README.md if major addition
6. Test all links

**File Naming:**
- Use lowercase
- Hyphens for spaces: `salesforce-guide.html`
- Descriptive but concise

### Directory Structure

**Do NOT change:**
```
Root files: HTML pages, CSS, JS, README
.claude/skills/ - Custom skills
learning-journey/ - Documentation
content/youtube-extracts/ - Video content
```

---

## Content Integration Standards

### Adding YouTube Content

**Process:**
1. Use `/extract-youtube` skill
2. Review extracted markdown
3. Convert to HTML using project CSS classes
4. Integrate into appropriate page
5. Update youtube-extracts/index.md
6. Test formatting and links

**Conversion Rules:**
- Markdown headings → `<h3>` or `<h4>`
- Lists → Use existing list styles
- Code → Use proper `<pre><code>` structure
- Emphasis → Wrap in appropriate boxes (tip, info, etc.)

### Adding New Concepts

**Template:**
```html
<div class="concept-card">
    <h3>Concept Name</h3>
    <p><strong>What it is:</strong> Clear explanation</p>
    <p><strong>Why it matters:</strong> Practical benefit</p>
    <div class="example">
        <h4>Example:</h4>
        <pre><code class="language-bash">example code</code></pre>
        <button class="copy-button" data-copy="example code">Copy</button>
    </div>
    <p><strong>For non-coders:</strong> Simple analogy</p>
</div>
```

---

## Accessibility Standards

### Required

- All images have `alt` text
- Buttons have `aria-label` attributes
- Headings follow logical hierarchy (no skipping levels)
- Color contrast meets WCAG AA standards
- Keyboard navigation works
- Focus indicators visible

### Testing

Before adding new content:
- Tab through page with keyboard
- Toggle dark mode - ensure readability
- Test on mobile device
- Check contrast ratios

---

## Version 2 Preparation

### Placeholder Sections

Keep these in navigation:
```html
<div class="coming-soon">📌 Coming Soon:<br>Salesforce & nCino Integration</div>
```

### Company-Specific Standards (When Ready)

Add to new sections:
- Salesforce code patterns
- nCino naming conventions
- Company MCP configurations
- Internal resource links
- Security/compliance notes

---

## ⚠️ CRITICAL: CLI vs MCP Tools

### ALWAYS Use CLI Tools First (NOT MCP)

**IMPORTANT:** This project prioritizes CLI tools over MCP servers. When a tool is available as both CLI and MCP, **ALWAYS use the CLI version via Bash commands**.

### CLI Tools (Use via Bash) ✅

**NotebookLM** - Research and knowledge management
```bash
# CORRECT: Use CLI via Bash tool
notebooklm list
notebooklm use <notebook-id>
notebooklm ask "question"
notebooklm source add "url"

# WRONG: Do NOT look for mcp__notebooklm__* tools (they don't exist)
```

**GitHub CLI (gh)** - Repository and PR management
```bash
# CORRECT: Use CLI via Bash tool
gh pr create --title "Title" --body "Description"
gh pr list
gh issue create

# WRONG: Do NOT use mcp__github__* tools (CLI is preferred)
```

**Playwright** - Browser testing and automation
```bash
# CORRECT: Use CLI via Bash tool
npx playwright test
npx playwright test --headed
npx playwright codegen

# WRONG: Do NOT look for MCP equivalents
```

### Why CLI > MCP

1. **CLI tools don't cause crashes** - Direct Bash execution is more stable
2. **More features** - CLI versions often have more capabilities
3. **Better debugging** - Can see output directly
4. **User preference** - Explicitly requested by user

### When a Request Could Be Either

**If user says:** "Use NotebookLM to research..."
- ✅ DO: `notebooklm ask "question"` via Bash
- ❌ DON'T: Search for `mcp__notebooklm__*` tools

**If user says:** "Create a GitHub PR..."
- ✅ DO: `gh pr create` via Bash
- ❌ DON'T: Use MCP GitHub tools

**If user says:** "Test the website..."
- ✅ DO: `npx playwright test` via Bash
- ❌ DON'T: Look for MCP testing tools

---

## MCP Servers Configuration

### Current MCP Servers

The project uses the following MCP (Model Context Protocol) servers configured in `.mcp.json`:

**Active MCP Servers:**
- **Gmail** - Email access and management
- **Google Calendar** - Calendar integration and scheduling
- **Microsoft 365** - Microsoft suite integration (Outlook, Teams, etc.)
- **Notion** - Notion workspace integration for documentation

**Note:** GitHub is available via MCP but **use `gh` CLI instead** (user preference).

### Configuration Format

All MCP servers use HTTP-based configuration:

```json
{
  "mcpServers": {
    "server-name": {
      "type": "http",
      "url": "https://server-url.mcp.claude.com/mcp"
    }
  }
}
```

### Authentication

HTTP-based MCP servers use OAuth authentication. On first use, you'll be prompted to authorize access through your browser.

### Adding New MCP Servers

To add additional MCP servers:
1. Edit `.mcp.json`
2. Add server configuration following the pattern above
3. Restart Claude Code
4. Authorize access when prompted

**Available Official Servers:**
- Filesystem (file operations with access control)
- Git (repository operations)
- Fetch (web content retrieval)
- Memory (persistent knowledge graph)
- Time (timezone conversions)

See https://modelcontextprotocol.io for full list.

---

## Claude Code Skills

### What Are Skills?

Skills are custom instructions in `SKILL.md` files that extend Claude's capabilities. They can be invoked manually with `/skill-name` or trigger automatically.

### Available Skills for Documentation Work

**Documentation & Writing:**
- `/doc-coauthoring` - Structured workflow for documentation, proposals, specs
- `/extract-youtube` - Custom skill to extract and integrate YouTube content

**Front-End Development:**
- `/frontend-design` - Guidance for visual design and UI development
- `/web-artifacts-builder` - Create complex HTML artifacts with React/Tailwind
- `/theme-factory` - Apply styling themes to documentation and artifacts

**Utility Skills:**
- `/skill-creator` - Create, modify, and optimize custom skills
- `/brand-guidelines` - Apply Anthropic brand colors and typography

### Using Skills

**Manual invocation:**
```bash
/doc-coauthoring
/frontend-design
```

**With arguments:**
```bash
/extract-youtube https://youtube.com/watch?v=...
```

**Auto-triggering:**
Skills can automatically activate when Claude detects they're relevant to your task.

### Creating Custom Skills

Location: `.claude/skills/<name>/SKILL.md`

Example structure:
```yaml
---
description: Brief description of what the skill does
disable-model-invocation: false
user-invocable: true
arguments: [param1, param2]
---

# Skill Name

Detailed instructions for Claude...
```

**Recommended custom skills for this project:**
- Documentation standards validator
- HTML template converter (markdown → HTML)
- Dark mode compatibility checker
- Code copy button validator

---

## Testing Tools

### Playwright CLI

The project includes Playwright for automated browser testing.

**Installation:**
```bash
npm install -D @playwright/test
npx playwright install
```

**Installed Browsers:**
- Chromium (Chrome for Testing)
- Firefox
- WebKit (Safari)
- FFmpeg (for video recording)

**Usage:**

**Run tests:**
```bash
npx playwright test
```

**Run tests in headed mode:**
```bash
npx playwright test --headed
```

**Run tests in specific browser:**
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

**Generate tests interactively:**
```bash
npx playwright codegen http://localhost:8000
```

**View test report:**
```bash
npx playwright show-report
```

### Testing Your Documentation Website

**Before committing changes, test:**

1. **Visual testing** - Screenshots across browsers
2. **Interaction testing** - Copy buttons, search, theme toggle
3. **Responsive testing** - Mobile/tablet/desktop viewports
4. **Accessibility testing** - Keyboard navigation, ARIA labels
5. **Dark mode testing** - All pages render correctly

**Example test structure:**
```javascript
// tests/documentation.spec.js
const { test, expect } = require('@playwright/test');

test('homepage loads correctly', async ({ page }) => {
  await page.goto('http://localhost:8000');
  await expect(page).toHaveTitle(/Claude Code Learning Manual/);
});

test('copy buttons work', async ({ page }) => {
  await page.goto('http://localhost:8000');
  await page.click('.copy-button');
  // Add assertion for clipboard content
});
```

### Manual Testing Checklist

Use Playwright to automate testing of:
- [ ] All links work (internal and external)
- [ ] All code copy buttons function
- [ ] Search finds new content
- [ ] Dark mode displays correctly
- [ ] Mobile view is responsive
- [ ] No console errors
- [ ] Breadcrumbs updated
- [ ] Navigation updated in ALL pages

---

## Build & Testing

### Before Committing Changes

**Checklist:**
- [ ] All links work (internal and external)
- [ ] All code copy buttons function
- [ ] Search finds new content
- [ ] Dark mode displays correctly
- [ ] Mobile view is responsive
- [ ] No console errors
- [ ] Breadcrumbs updated
- [ ] Navigation updated in ALL pages

### Local Testing

```bash
# Open in browser
open index.html    # macOS
start index.html   # Windows

# Or use VS Code Live Server
# Right-click HTML file → "Open with Live Server"
```

### Deployment

**GitHub Pages:**
```bash
git add .
git commit -m "Descriptive message"
git push
# Pages auto-updates in 2-3 minutes
```

**Vercel:**
```bash
vercel --prod
```

---

## Common Tasks

### Adding a Tip

```html
<div class="tip-box">
    <h4>Pro Tip</h4>
    <p>Your tip here with <code>inline code</code> if needed.</p>
</div>
```

### Adding a Workflow Example

Add to `workflows.html`:
```html
<section class="workflow-section">
    <h2>Workflow Name</h2>
    <p class="workflow-desc">Brief description</p>

    <div class="workflow-card">
        <h3>Scenario</h3>
        <p>Describe the situation...</p>

        <h3>Step-by-Step</h3>
        <div class="step-by-step">
            <!-- Add steps -->
        </div>

        <div class="workflow-result">
            <h4>Result</h4>
            <p>What you achieve...</p>
        </div>
    </div>
</section>
```

### Adding a Troubleshooting Item

Add to `troubleshooting.html`:
```html
<div class="problem">
    <h4>Problem: Description</h4>
    <p><strong>Solution:</strong></p>
    <ol>
        <li>Step 1</li>
        <li>Step 2</li>
    </ol>
</div>
```

---

## Search Index Updates

When adding significant new content, update `script.js` search index:

```javascript
{
    title: "Topic Name",
    page: "page.html#section",
    keywords: "relevant search terms lowercase"
}
```

---

## Do's and Don'ts

### DO

✅ Keep tone beginner-friendly and encouraging
✅ Include practical examples for every concept
✅ Use analogies for complex topics
✅ Add copy buttons to all code blocks
✅ Test on mobile before committing
✅ Maintain consistent formatting
✅ Cross-reference related pages
✅ Update search index for new content

### DON'T

❌ Use technical jargon without explanation
❌ Create pages without updating navigation
❌ Forget to test dark mode
❌ Skip accessibility considerations
❌ Add content without examples
❌ Use inline styles (use CSS classes)
❌ Duplicate content across pages
❌ Forget copy buttons on code examples

---

## Questions? Maintenance?

For ongoing maintenance and questions:
- Check `learning-journey/evolution-roadmap.md` for expansion guidance
- Review `learning-journey/youtube-integration-guide.md` for content addition
- Reference this CLAUDE.md for all standards
- Test locally before deploying

---

## Project Goals

**Primary:** Help non-coders learn Claude Code through clear, practical documentation
**Secondary:** Enable easy expansion to company-wide enablement tool
**Maintain:** Simplicity, accessibility, beginner-friendliness

---

## Changelog

### Version 1.1 - June 13, 2026
- Added MCP Servers configuration section (GitHub, Gmail, Calendar, Microsoft 365, Notion)
- Added Claude Code Skills documentation (doc-coauthoring, frontend-design, etc.)
- Added Playwright CLI testing tools and usage guide
- Added testing checklist automation recommendations

---

*This file should be updated as standards evolve*
*Last updated: June 13, 2026*
*Version: 1.1*

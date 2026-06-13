# Project Organization Summary

**Date:** June 13, 2026
**Version:** 1.2
**Changes:** Reorganized to GitHub Pages standard `/docs` folder structure

---

## What Changed

### Version 1.0 (Original)

All files mixed in root directory:
- Website HTML/CSS/JS
- CLAUDE.md
- learning-journey/
- content/
- README.md

### Version 1.1 (First Reorganization)

Moved documentation to dev-docs/ but left website in root
- Had issue: .mcp.json and package.json in root seemed messy

### Version 1.2 (Current - `/docs` Structure)

**Industry standard separation using `/docs` folder:**

```
Root Directory (Development Workspace)
├── docs/                  # 🌐 WEBSITE (deployed by GitHub Pages)
│   ├── *.html
│   ├── styles.css
│   └── script.js
├── dev-docs/              # 📚 DOCUMENTATION (reference)
│   ├── CLAUDE.md
│   ├── DEPLOYMENT.md
│   └── learning-journey/
├── .claude/               # 🔧 SKILLS (Claude Code)
├── .mcp.json              # ⚙️  MCP CONFIG (must be in root)
├── package.json           # 🧪 NPM CONFIG (must be in root)
└── README.md              # Repository documentation
```

---

## Why This Structure?

### The `/docs` Folder Standard

This is the **GitHub Pages recommended structure** and industry best practice:

1. **Clean Deployment**
   - GitHub Pages serves **only `/docs` folder**
   - Zero ambiguity about what gets deployed
   - Professional public-facing website
   - Root stays clean for development workspace

2. **Tool Compatibility**
   - `.mcp.json` **must be in root** (Claude Code requirement)
   - `package.json` **must be in root** (npm requirement)
   - `.claude/` skills work from root
   - All tools function from their expected locations

3. **Perfect Separation**
   - **Product** → `/docs` (deployed website)
   - **Development** → Root (tools and configs)
   - **Documentation** → `/dev-docs` (reference materials)

4. **Scalability**
   - Industry standard structure
   - Easy for team members to understand
   - Professional repository organization
   - Can add more tools without cluttering website

### Why Not Other Approaches?

❌ **Website in root:** Mixes product with dev tools, cluttered
❌ **Configs in dev-docs:** Breaks npm and Claude Code (they expect root)
❌ **Everything in root:** No clear separation, unprofessional

✅ **Website in /docs:** Clean, standard, tools work, professional

---

## File Locations Quick Reference

### Website Files (docs/)
- `docs/index.html` - Homepage
- `docs/getting-started.html` - Getting started guide
- `docs/core-concepts.html` - Core concepts
- `docs/essential-features.html` - Essential features
- `docs/workflows.html` - Workflow examples
- `docs/advanced.html` - Advanced topics
- `docs/troubleshooting.html` - Troubleshooting
- `docs/styles.css` - Stylesheets
- `docs/script.js` - JavaScript

### Development Tools (Root - Must Stay Here)
- `.claude/` - Claude Code skills
- `.mcp.json` - MCP server config
- `package.json` - Playwright dependencies
- `.gitignore` - Git exclusions
- `README.md` - Repository documentation

### Documentation (dev-docs/)
- `CLAUDE.md` - Project standards ⭐ **Main reference**
- `DEPLOYMENT.md` - Deployment guide
- `PROJECT-ORGANIZATION.md` - This file
- `learning-journey/` - Learning docs
  - `planning-session.md`
  - `evolution-roadmap.md`
  - `youtube-integration-guide.md`
- `content/` - Reference content
  - `youtube-extracts/`

---

## What Claude Code Sees

Claude Code automatically reads `dev-docs/CLAUDE.md` for project standards and guidelines. This file contains:

- Content standards (tone, style, writing patterns)
- HTML structure standards
- CSS class standards
- Code block standards
- File organization rules
- MCP server configurations
- Available skills
- Testing tools (Playwright)
- Common tasks and workflows

**You don't need to manually reference it** - Claude Code loads it automatically.

---

## Git Configuration

### .gitignore Contents

```
# Dependencies
node_modules/

# System files
.DS_Store
*.log

# Development documentation (optional - currently included)
# dev-docs/

# Playwright test results
test-results/
playwright-report/
playwright/.cache/

# Environment files
.env
.env.local
```

**Note:** dev-docs/ is currently **included** in git. Uncomment the line to exclude it.

---

## Deployment Behavior

### GitHub Pages

- **Serves:** All files in root directory
- **URL:** `https://username.github.io/repository-name/`
- **Access:** index.html, all HTML pages, CSS, JS
- **Not Served:** Files inside subdirectories (unless linked)

**Result:** Website works perfectly. dev-docs/ exists in repo but isn't served by GitHub Pages.

### Vercel

- **Serves:** Root directory by default
- **Behavior:** Same as GitHub Pages
- **Configuration:** Can customize if needed

---

## Common Tasks

### Adding Website Content
1. Edit HTML files in root directory
2. Follow standards in `dev-docs/CLAUDE.md`
3. Test locally
4. Commit and push

### Adding Documentation
1. Add to `dev-docs/learning-journey/`
2. Follow markdown format
3. Update `dev-docs/CLAUDE.md` if standards change

### Using Skills
- `/doc-coauthoring` - Documentation writing
- `/frontend-design` - UI design guidance
- `/extract-youtube` - Extract YouTube content

### Testing
```bash
# Open locally
open index.html

# Run Playwright tests
npx playwright test

# Interactive test generation
npx playwright codegen http://localhost:8000
```

---

## Migration Summary

### Version 1.2 Changes

**Files Moved:**
- All `*.html, *.css, *.js` → `docs/` folder
- `CLAUDE.md` → `dev-docs/CLAUDE.md`
- `learning-journey/` → `dev-docs/learning-journey/`
- `content/` → `dev-docs/content/`

**Files Added:**
- `.gitignore`
- `docs/` folder (website deployment)
- `dev-docs/DEPLOYMENT.md`
- `dev-docs/PROJECT-ORGANIZATION.md` (this file)

**Files Updated:**
- `README.md` - Documented /docs structure
- `dev-docs/CLAUDE.md` - Updated file locations
- `dev-docs/DEPLOYMENT.md` - GitHub Pages /docs instructions

**Files Kept in Root (Required):**
- `.mcp.json` - Claude Code needs it here
- `package.json` - npm needs it here
- `.claude/` - Claude Code skills
- `README.md` - GitHub repository page

---

## Next Steps

1. **Review the new structure** - Make sure you understand where everything is
2. **Read DEPLOYMENT.md** - Understand deployment process
3. **Test locally** - Verify website still works (open index.html)
4. **Commit changes** - Save the new structure to git
5. **Deploy** - Push to GitHub and verify GitHub Pages works

---

## Questions?

- **Where are project standards?** → `dev-docs/CLAUDE.md`
- **How do I deploy?** → `dev-docs/DEPLOYMENT.md`
- **Where's the website?** → Root directory HTML files
- **Where's documentation?** → `dev-docs/` folder
- **What gets deployed?** → Everything in root (HTML, CSS, JS)
- **What doesn't get deployed?** → dev-docs/ is in git but not served by GitHub Pages

---

*This structure will help you maintain a clean, professional project that's easy to deploy and easy to develop!*

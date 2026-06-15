# Deployment Guide

## Project Structure

This project uses the **GitHub Pages standard `/docs` folder** for clean deployment separation.

### Complete Structure

```
LearnClaudecode/           # Project root (development workspace)
│
├── docs/                  # 🌐 WEBSITE (served by GitHub Pages)
│   ├── index.html
│   ├── getting-started.html
│   ├── core-concepts.html
│   ├── essential-features.html
│   ├── workflows.html
│   ├── advanced.html
│   ├── troubleshooting.html
│   ├── styles.css
│   └── script.js
│
├── dev-docs/              # 📚 DOCUMENTATION (development reference)
│   ├── CLAUDE.md          # Project standards
│   ├── DEPLOYMENT.md      # This file
│   ├── TOOLBOX-REFERENCE.md
│   ├── learning-journey/
│   └── content/
│
├── .claude/               # 🔧 CLAUDE CODE SKILLS
│   └── skills/
│
├── .mcp.json              # ⚙️  MCP server configurations
├── package.json           # 🧪 Playwright dependencies
├── package-lock.json      # Locked versions
├── .gitignore             # Git exclusions
├── node_modules/          # Dependencies (excluded from git)
└── README.md              # Repository documentation
```

### Why This Structure?

**Clean Separation:**
- **Website** → `/docs` folder (deployed)
- **Development tools** → Root directory (`.mcp.json`, `package.json`, `.claude/`)
- **Documentation** → `/dev-docs` folder (reference only)

**Benefits:**
- Industry standard structure
- Tools (npm, Claude Code) work from root
- GitHub Pages serves only `/docs`
- Clear distinction: product vs. development
- Professional, scalable organization

---

## Deployment Methods

### GitHub Pages (Recommended)

GitHub Pages serves the `/docs` folder only.

**What gets deployed:**
- ✅ Everything in `/docs` folder (website HTML, CSS, JS)
- ✅ Accessible at your GitHub Pages URL

**What stays in development:**
- ❌ `/dev-docs` (documentation - not served)
- ❌ `.claude/` (skills - not served)
- ❌ `.mcp.json` (MCP config - not served)
- ❌ `package.json` (npm config - not served)
- ❌ `node_modules/` (dependencies - excluded by .gitignore)

**Initial Setup:**
1. Push repository to GitHub
2. Go to **Settings → Pages**
3. Source: **main branch**
4. Folder: **/docs** ⬅️ **Important!**
5. Save and wait 2-3 minutes

**Deployment Workflow:**
```bash
# 1. Edit website files in docs/
# 2. Test locally
cd docs
python3 -m http.server 8000

# 3. Commit and push
git add .
git commit -m "Update website"
git push

# 4. GitHub Pages auto-deploys in 2-3 minutes
```

**Your GitHub Pages URL:**
- `https://username.github.io/repository-name/`

---

### Alternative: Vercel

If using Vercel for deployment:

```bash
vercel --prod
```

Vercel will serve the root directory HTML files by default.

---

## Development Workflow

### Working with Claude Code

1. **Reference project standards:**
   - Open `dev-docs/CLAUDE.md` for project guidelines
   - Claude Code automatically reads this file

2. **Use available skills:**
   - `/doc-coauthoring` - Write documentation
   - `/frontend-design` - Design HTML pages
   - `/extract-youtube` - Extract YouTube content

3. **MCP Servers available:**
   - GitHub (repository management)
   - Gmail (email)
   - Google Calendar (scheduling)
   - Microsoft 365 (Office suite)
   - Notion (workspace)

### Testing with Playwright

**Install browsers (one time):**
```bash
npx playwright install
```

**Run tests:**
```bash
npx playwright test
```

**Interactive test generation:**
```bash
npx playwright codegen http://localhost:8000
```

**View reports:**
```bash
npx playwright show-report
```

---

## File Organization Rules

### ✅ Add to docs/ (Website Files)

- Website HTML pages (*.html)
- Website CSS files (styles.css)
- Website JavaScript (script.js)
- Images, fonts, assets

### ✅ Keep in Root (Development Tools)

- `.claude/` (Claude Code skills)
- `.mcp.json` (MCP server config - **must be in root**)
- `package.json` (npm config - **must be in root**)
- `README.md` (GitHub repository page)
- `.gitignore` (Git exclusions)

### ✅ Add to dev-docs/ (Documentation)

- `CLAUDE.md` (project standards)
- `DEPLOYMENT.md` (deployment guide)
- `learning-journey/` (learning materials)
- `content/` (reference content)

### ❌ Never Commit

- `node_modules/` (excluded by .gitignore)
- `.DS_Store` (system files)
- `.env` files (sensitive data)
- `test-results/` (Playwright results)

---

## Clean Deployment Checklist

Before pushing to GitHub:

- [ ] All website HTML/CSS/JS files in root directory
- [ ] Development docs in dev-docs/
- [ ] .gitignore configured correctly
- [ ] node_modules/ not committed
- [ ] Test locally: open index.html
- [ ] Run Playwright tests (if configured)
- [ ] Verify dark mode works
- [ ] Check mobile responsiveness
- [ ] Commit with clear message
- [ ] Push to GitHub
- [ ] Verify GitHub Pages deployment (2-3 min wait)

---

## Maintenance

### Adding New Pages

1. Create HTML file in `docs/` directory
2. Update navigation in ALL existing HTML pages (in `docs/`)
3. Update search index in `docs/script.js`
4. Test all links
5. Follow `dev-docs/CLAUDE.md` standards

### Updating Documentation

1. Edit files in dev-docs/
2. Update dev-docs/CLAUDE.md if standards change
3. Document changes in changelog

### Updating Tools

**MCP Servers:**
- Edit `.mcp.json`
- Restart Claude Code
- Authorize new servers

**Skills:**
- Add to `.claude/skills/`
- Follow SKILL.md format

**Playwright:**
```bash
npm install -D @playwright/test@latest
npx playwright install
```

---

## Troubleshooting Deployment

### GitHub Pages not updating

1. Check GitHub repository Settings > Pages
2. Verify source is set to deploy from root
3. Check Actions tab for build errors
4. Wait 2-3 minutes for propagation
5. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+F5)

### Files not appearing

- Ensure files are in root directory (not subdirectories)
- Check .gitignore isn't excluding them
- Verify files are committed: `git status`

### Broken links

- Use relative paths: `href="page.html"` not `href="/page.html"`
- Test locally before deploying

---

## Quick Commands Reference

```bash
# View project structure
ls -la

# Check git status
git status

# Deploy to GitHub
git add .
git commit -m "Update message"
git push

# Test locally with Python server
python3 -m http.server 8000

# Test with Playwright
npx playwright test

# View what will be deployed
git ls-files
```

---

*Last updated: June 13, 2026*
*Project: Claude Code Learning Manual*

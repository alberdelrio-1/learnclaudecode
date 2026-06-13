# Claude Code Learning Manual

A comprehensive, beginner-friendly website manual for learning Claude Code in VS Code.

**Version 1.0** - Personal Learning Edition

## 🎯 What Is This?

This is your complete guide to mastering Claude Code - designed specifically for non-coders who need to use Claude Code for work. No prior coding experience required!

### Features

✅ **7 comprehensive pages** covering everything from installation to advanced features
✅ **30+ concepts explained** in plain English from popular tutorial
✅ **Real-world workflows** with practical examples
✅ **Search functionality** to find any topic instantly
✅ **Dark/Light mode toggle** for comfortable reading
✅ **Mobile-friendly** responsive design
✅ **Copy-to-clipboard** buttons on all code examples
✅ **Works offline** after first load

## 📁 Project Structure

The project uses the **GitHub Pages standard** `/docs` folder for clean deployment.

### Complete Structure

```
LearnClaudecode/                   # Project root (development workspace)
│
├── docs/                          # 🌐 WEBSITE (served by GitHub Pages)
│   ├── index.html                 # Home page
│   ├── getting-started.html       # Installation & setup guide
│   ├── core-concepts.html         # 30+ concepts explained
│   ├── essential-features.html    # Key features
│   ├── workflows.html             # Real-world examples
│   ├── advanced.html              # Advanced features
│   ├── troubleshooting.html       # Problem solving
│   ├── styles.css                 # All styling (dark/light mode)
│   └── script.js                  # Interactive features
│
├── dev-docs/                      # 📚 DOCUMENTATION (development reference)
│   ├── CLAUDE.md                  # Project standards & guidelines
│   ├── DEPLOYMENT.md              # Deployment guide
│   ├── PROJECT-ORGANIZATION.md    # Organization explained
│   ├── learning-journey/          # Learning documentation
│   └── content/                   # Reference materials
│
├── .claude/                       # 🔧 CLAUDE CODE (skills)
│   └── skills/
│       └── extract-youtube/
│
├── .mcp.json                      # ⚙️  MCP server configurations
├── package.json                   # 🧪 Playwright testing dependencies
├── package-lock.json              # Locked dependency versions
├── .gitignore                     # Git exclusions
└── README.md                      # This file
```

### What Gets Deployed

**GitHub Pages serves:** `/docs` folder only
- ✅ All website HTML pages
- ✅ styles.css and script.js
- ✅ All website functionality

**Not deployed (stays in development):**
- ❌ dev-docs/ (documentation)
- ❌ .claude/ (skills)
- ❌ .mcp.json, package.json (dev tools)
- ❌ node_modules/ (dependencies)

> **Clean Separation:** Website in `/docs`, development tools in root. Industry standard structure.

## 🚀 Quick Start

### Option 1: Open Locally (Easiest)

1. **Navigate to the `docs/` folder**
2. **Double-click `index.html`** to open in your browser
3. That's it! Everything works locally.

### Option 2: Use VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `docs/index.html`
3. Select "Open with Live Server"
4. Automatically opens in browser with live reload

### Option 3: Python HTTP Server

```bash
cd docs
python3 -m http.server 8000
# Open http://localhost:8000 in browser
```

## 🌐 Deploy to GitHub Pages

Share your manual online for free!

### Step 1: Create GitHub Repository

```bash
# In the LearnClaudecode directory
git init
git add .
git commit -m "Initial commit: Claude Code Learning Manual v1.0"

# Create new repo on GitHub (via website), then:
git remote add origin https://github.com/YOUR-USERNAME/claude-code-manual.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub.com
2. Click **Settings** → **Pages**
3. Under "Source", select **main branch**
4. Under "Folder", select **/docs**
5. Click **Save**
6. Wait 2-3 minutes

Your site will be live at: `https://YOUR-USERNAME.github.io/claude-code-manual/`

### Step 3: Share with Team

Send the URL to colleagues! They can access it anywhere.

## 🚀 Deploy to Vercel (Optional - For Later)

For faster loading and custom domain support:

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy

```bash
# In the LearnClaudecode directory
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? claude-code-manual
# - Directory? ./
```

### Step 3: Production Deployment

```bash
vercel --prod
```

You'll get a URL like: `https://claude-code-manual.vercel.app`

### Custom Domain (Optional)

1. Go to Vercel dashboard
2. Select your project
3. Settings → Domains
4. Add your custom domain

## ⚙️ How to Edit Content

### Adding or Updating Content

1. **Open any HTML file** in VS Code or text editor
2. **Find the section** you want to edit (use search: Cmd/Ctrl+F)
3. **Edit the text** - it's just like editing a document
4. **Save the file**
5. **Refresh browser** to see changes

### Example: Adding a New Tip

Find a section, add your tip:

```html
<div class="tip-box">
    <h4>Your New Tip Title</h4>
    <p>Your tip content here!</p>
</div>
```

Save and refresh - that's it!

### Adding a New Page

1. **Copy an existing HTML file** (e.g., copy `workflows.html`)
2. **Rename it** (e.g., `salesforce-guide.html`)
3. **Edit the content** inside
4. **Add link to navigation** in sidebar (in each HTML file):

```html
<li><a href="salesforce-guide.html">🔧 Salesforce Guide</a></li>
```

## 🎨 Customizing the Design

### Change Colors

Edit `styles.css` - find the `:root` section:

```css
:root {
    --accent-primary: #3b82f6;    /* Change this to your color */
    --accent-secondary: #8b5cf6;  /* And this one too */
}
```

### Change Fonts

In `styles.css`:

```css
:root {
    --font-body: 'Your Font Name', sans-serif;
}
```

## 🔍 Using the Search Feature

- **Click search icon** (🔍) or press `Cmd/Ctrl + K`
- **Type your query** (minimum 2 characters)
- **Click result** to jump to that page/section

### Adding Content to Search

Edit `script.js` - find `searchIndex` array and add:

```javascript
{
    title: "Your Topic",
    page: "page.html#section",
    keywords: "relevant keywords here"
}
```

## 🌙 Theme Toggle

- **Click moon/sun icon** to toggle dark/light mode
- **Preference is saved** automatically (uses localStorage)
- **Keyboard shortcut:** `Cmd/Ctrl + /`

## 📱 Mobile Support

The website automatically adapts to:
- Desktop (full layout)
- Tablet (adjusted spacing)
- Mobile (stacked single column)

No configuration needed!

## ✏️ Using the YouTube Extraction Skill

Extract content from YouTube videos and add to your manual:

### Step 1: Use the Skill

```bash
/extract-youtube
```

### Step 2: Provide Video Name or URL

When Claude asks, give the video title or URL:
- "Claude Code Tutorial for Beginners"
- "https://www.youtube.com/watch?v=VIDEO_ID"

### Step 3: Review Extracted Content

Claude saves content to `dev-docs/content/youtube-extracts/[video-name].md`

### Step 4: Integrate into Website

1. Read the generated markdown file
2. Copy relevant sections
3. Paste into appropriate HTML page
4. Format as needed (add HTML tags)

See `dev-docs/learning-journey/youtube-integration-guide.md` for detailed instructions.

## 🛠️ Troubleshooting

### Links Don't Work Locally

**Problem:** Clicking links shows "file not found"
**Solution:** Make sure all HTML files are in the same directory

### Styles Not Loading

**Problem:** Page looks unstyled
**Solution:** Ensure `styles.css` is in the same directory as HTML files

### Search Not Working

**Problem:** Search shows no results
**Solution:** Check internet connection (Fuse.js loads from CDN on first visit)

### Dark Mode Not Persisting

**Problem:** Theme resets on page refresh
**Solution:** Browser may be blocking localStorage. Check browser settings.

## 📈 Evolution to Version 2

Ready to expand for company-wide use?

See `dev-docs/learning-journey/evolution-roadmap.md` for:
- Adding Salesforce & nCino integration pages
- Creating company-specific sections
- Building evaluation framework
- Professional polish for sharing

Also check `dev-docs/DEPLOYMENT.md` for deployment best practices.

## 🤝 Contributing

This is your personal learning manual! Feel free to:
- Add your own tips and tricks
- Document workflows specific to your work
- Expand sections with more examples
- Fix any errors you find

## 📞 Getting Help

### For Website Issues

1. Check this README
2. Look in `troubleshooting.html` page
3. Ask Claude Code for help: "I'm having trouble with [issue]"

### For Claude Code Issues

1. Run `/doctor` command in Claude Code
2. Check `troubleshooting.html` page
3. Use `/feedback` to report to Anthropic

## 📜 License

This manual is for personal and company internal use. Feel free to customize, share internally, and adapt for your needs!

## 🎓 Learning Resources

### Included in This Manual
- Official Claude Code documentation (comprehensive)
- "All 35 Claude Code Concepts" tutorial (beginner-friendly)
- Real-world workflows and examples
- Troubleshooting guides

### External Resources
- Official docs: https://code.claude.com/docs
- GitHub: Search for "Claude Code" examples
- YouTube: Find tutorials and walkthroughs

## ✨ Credits

**Created by:** Your planning session with Claude Code
**Content sources:**
- Official Claude Code documentation
- "All 35 Claude Code Concepts Explained for Non Coders" (sabrina.dev)
- Real-world usage patterns

**Version:** 1.0 (Personal Learning Edition)
**Last updated:** June 2026

---

## Quick Commands Cheat Sheet

```bash
# Local development
open index.html                    # macOS
start index.html                   # Windows
xdg-open index.html               # Linux

# Git workflow
git add .
git commit -m "Update content"
git push

# Deploy to Vercel
vercel --prod

# Search keyboard shortcut
Cmd/Ctrl + K

# Theme toggle keyboard shortcut
Cmd/Ctrl + /
```

---

**Happy Learning!** 🚀

Remember: This manual evolves with you. Add notes, tips, and examples as you learn. Make it truly yours!

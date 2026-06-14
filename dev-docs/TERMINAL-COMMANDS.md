# Terminal Commands - Quick Reference
**Copy/paste these commands to run everything**

---

## Terminal 1: Production Site

```bash
# Start production docs server
cd /Users/albertodelrio/Documents/vscodelocal/LearnClaudecode/worktrees/main/docs
python3 -m http.server 8000

# Open in browser: http://localhost:8000
# This is your current production site
```

---

## Terminal 2: Redesign Development

```bash
# Navigate to redesign worktree
cd /Users/albertodelrio/Documents/vscodelocal/LearnClaudecode/worktrees/redesign

# Start Claude Code session here
# OR test with local server:
cd docs
python3 -m http.server 8001

# Open in browser: http://localhost:8001
```

---

## Terminal 3: Playwright Testing

```bash
# Navigate to project root
cd /Users/albertodelrio/Documents/vscodelocal/LearnClaudecode

# Run all tests
npx playwright test

# Run with visible browser
npx playwright test --headed

# Run specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Generate tests interactively
npx playwright codegen http://localhost:8000

# View test report
npx playwright show-report
```

---

## Terminal 4: Git Operations

```bash
# Check status
cd /Users/albertodelrio/Documents/vscodelocal/LearnClaudecode
git status
git worktree list
git branch -a

# Work in redesign branch
cd worktrees/redesign
git add .
git commit -m "Your message here"
git push origin feature/learning-page-redesign

# Create PR on GitHub
# Visit: https://github.com/alberdelrio-1/learnclaudecode/pulls

# Merge to main (after review)
git checkout main
git merge feature/learning-page-redesign
git push origin main
# GitHub Pages auto-deploys!
```

---

## Terminal 5: NotebookLM Research

```bash
# List notebooks
notebooklm list

# Use video tutorials notebook
notebooklm use dcdc7bc0-0f62-4973-a452-b31a3bc6c8e0

# Ask questions
notebooklm ask "What are best practices for interactive learning?"
notebooklm ask "How do I design multi-level content?"

# Generate content
notebooklm generate quiz
notebooklm generate flashcards
notebooklm generate report

# View history
notebooklm history

# Save history to file
notebooklm history --save
```

---

## Quick Setup Commands

### Start Fresh Session

```bash
# 1. Read context
cd /Users/albertodelrio/Documents/vscodelocal/LearnClaudecode
cat SESSION-COMPLETE-INVENTORY.md

# 2. Check git
git worktree list
git status

# 3. Navigate to work area
cd worktrees/redesign

# 4. Start Claude Code
# Ready to work!
```

### Check Everything

```bash
# Verify worktrees
git worktree list
# Should show:
# - /Users/albertodelrio/Documents/vscodelocal/LearnClaudecode [reorganisation]
# - /Users/albertodelrio/Documents/vscodelocal/LearnClaudecode/worktrees/main [main]
# - /Users/albertodelrio/Documents/vscodelocal/LearnClaudecode/worktrees/redesign [feature/learning-page-redesign]

# Verify NotebookLM
which notebooklm
# Should show: /Users/albertodelrio/.local/bin/notebooklm

# Verify Playwright
npx playwright --version
# Should show: Version 1.60.0
```

---

## Commit Current Work

```bash
# From project root
cd /Users/albertodelrio/Documents/vscodelocal/LearnClaudecode

# Add all files
git add .

# Commit with detailed message
git commit -m "Session complete: Adversarial team + Learning page architecture

- Added adversarial team workflow system
- Created learning page redesign architecture
- Set up git worktrees for parallel development
- Exported everything to Notion
- Ready for implementation

Files:
- SESSION-COMPLETE-INVENTORY.md
- TERMINAL-COMMANDS.md
- work/learning-page-redesign/ (complete planning)

🤖 Generated with Claude Code"

# Push to remote
git push origin reorganisation
```

---

## Export to Work Account

```bash
# Option 1: Via Notion (Already Done!)
# - Open Notion at work
# - Navigate to: "Claude Code - Complete Session Inventory"
# - Copy/paste content as needed

# Option 2: Create Archive
mkdir ~/Desktop/claude-code-export
cp -r .claude/skills ~/Desktop/claude-code-export/
cp -r dev-docs ~/Desktop/claude-code-export/
cp .mcp.json ~/Desktop/claude-code-export/
cp SESSION-COMPLETE-INVENTORY.md ~/Desktop/claude-code-export/
cp TERMINAL-COMMANDS.md ~/Desktop/claude-code-export/

cd ~/Desktop
zip -r claude-code-export.zip claude-code-export/

# Transfer to work machine and unzip
```

---

## Useful Aliases (Optional)

Add to `~/.zshrc` or `~/.bash_profile`:

```bash
# Quick navigation
alias cc='cd /Users/albertodelrio/Documents/vscodelocal/LearnClaudecode'
alias ccr='cd /Users/albertodelrio/Documents/vscodelocal/LearnClaudecode/worktrees/redesign'
alias ccm='cd /Users/albertodelrio/Documents/vscodelocal/LearnClaudecode/worktrees/main'

# Quick servers
alias serve='python3 -m http.server'
alias serve8000='python3 -m http.server 8000'
alias serve8001='python3 -m http.server 8001'

# Git shortcuts
alias gws='git worktree list'
alias gst='git status'
alias glog='git log --oneline -10'

# NotebookLM
alias nbvid='notebooklm use dcdc7bc0-0f62-4973-a452-b31a3bc6c8e0'
alias nbres='notebooklm use cfc1fd34-1337-4985-a916-a9ad8e4363c0'

# Reload shell
source ~/.zshrc
```

---

*Copy these commands for quick access!*

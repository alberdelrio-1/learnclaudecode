# Git Worktree Setup - GitHub Flow
**Strategy:** GitHub Flow (Simple, fast, gets shit done)
**Created:** June 13, 2026

---

## Worktree Structure

```
LearnClaudecode/                          [testing/ui-validation - current]
├── worktrees/
│   ├── main/                             [main branch - DEPLOYABLE]
│   └── redesign/                         [feature/learning-page-redesign]
├── docs/                                 (website files)
├── dev-docs/                             (development docs)
└── .claude/                              (skills)
```

---

## GitHub Flow Principles

1. **Main is always deployable** ✅
   - `worktrees/main/` contains production-ready code
   - Can serve docs at any time: `cd worktrees/main/docs && python3 -m http.server 8000`

2. **Feature branches from main** ✅
   - `feature/learning-page-redesign` branched from main
   - Work happens in `worktrees/redesign/`

3. **Merge back to main when ready**
   - Create PR: feature/learning-page-redesign → main
   - Review with adversarial team
   - Merge and deploy

---

## Workflow

### 1. Work on Redesign
```bash
cd worktrees/redesign
# Make changes to docs/index.html
# Test locally
```

### 2. Test Production Site (Parallel)
```bash
cd worktrees/main
python3 -m http.server 8000
# Current site runs while you work on redesign
```

### 3. When Feature Complete
```bash
cd worktrees/redesign
git add docs/
git commit -m "Redesign learning page with pedagogical structure"
git push origin feature/learning-page-redesign

# Create PR on GitHub
# Review
# Merge to main
```

### 4. Deploy
```bash
cd worktrees/main
git pull origin main
# GitHub Pages auto-deploys
```

---

## Commands

**List worktrees:**
```bash
git worktree list
```

**Add new worktree:**
```bash
git worktree add worktrees/<name> <branch>
```

**Remove worktree:**
```bash
git worktree remove worktrees/<name>
```

**Current setup:**
- Main branch: `worktrees/main/` (production)
- Redesign: `worktrees/redesign/` (feature branch)
- Root: `testing/ui-validation` (temp - switch to reorganisation)

---

## Benefits

✅ **Parallel work** - Test prod site while working on redesign
✅ **No branch switching** - Each worktree is independent
✅ **Fast testing** - Run both versions simultaneously
✅ **Clean separation** - Production code untouched during dev
✅ **Simple workflow** - GitHub Flow = fast iteration

---

**Next:** Switch root to `reorganisation` and work in `worktrees/redesign/`

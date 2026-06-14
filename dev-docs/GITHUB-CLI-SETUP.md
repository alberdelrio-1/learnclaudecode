# GitHub CLI Installation Guide

The GitHub CLI (`gh`) is required for some workflows but needs manual installation on your system.

## Installation Steps

Since Homebrew is not installed on your system, you have two options:

### Option 1: Install Homebrew First (Recommended)

1. **Install Homebrew** (requires admin password):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Add Homebrew to PATH** (for M-series Mac):
   ```bash
   echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
   eval "$(/opt/homebrew/bin/brew shellenv)"
   ```

3. **Install GitHub CLI**:
   ```bash
   brew install gh
   ```

4. **Verify installation**:
   ```bash
   gh --version
   ```

### Option 2: Direct Binary Installation

1. **Download the latest release**:
   ```bash
   cd ~/Downloads
   curl -LO https://github.com/cli/cli/releases/download/v2.62.0/gh_2.62.0_macOS_arm64.tar.gz
   ```

2. **Extract and install**:
   ```bash
   tar -xzf gh_2.62.0_macOS_arm64.tar.gz
   sudo cp gh_2.62.0_macOS_arm64/bin/gh /usr/local/bin/
   ```

3. **Verify installation**:
   ```bash
   gh --version
   ```

## Authentication

After installation, authenticate with GitHub:

```bash
gh auth login
```

Follow the prompts to:
1. Choose GitHub.com
2. Choose HTTPS
3. Authenticate via web browser
4. Complete the authentication flow

## Verify Setup

Test that GitHub CLI works:

```bash
# Check authentication status
gh auth status

# List your repositories
gh repo list

# Check current repository
cd /Users/albertodelrio/Documents/vscodelocal/LearnClaudecode
gh repo view
```

## Common Usage

### Create Pull Requests

From your worktree:
```bash
cd worktrees/redesign
gh pr create --title "Learning page redesign" --body "Implements new skill-level-selector and exercise viewer"
```

### View Pull Requests

```bash
gh pr list
gh pr view 123
```

### Create Issues

```bash
gh issue create --title "Bug: Context not clearing" --body "Description here"
```

### View Workflow Status

```bash
gh run list
gh run view
```

## Integration with Your Workflow

Once installed, you can use `gh` in your terminal scripts:

**Terminal 4** (Git Operations) can now:
```bash
# Create PR from feature branch
cd /Users/albertodelrio/Documents/vscodelocal/LearnClaudecode
gh pr create --title "Feature: X" --body "$(cat work/feature/plan.md)"

# Check CI status
gh run list --workflow=deploy

# Auto-merge after CI passes
gh pr merge --auto --squash
```

## Troubleshooting

### Command not found after installation

Add to PATH manually:
```bash
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zprofile
source ~/.zprofile
```

### Permission denied

Make the binary executable:
```bash
sudo chmod +x /usr/local/bin/gh
```

### Authentication fails

Try alternative auth method:
```bash
gh auth login --web
```

## Alternative: Use GitHub Web Interface

If you prefer not to install `gh`, you can still create PRs via:
1. Push your branch: `git push origin feature/learning-page-redesign`
2. Visit: https://github.com/[your-username]/LearnClaudecode/pulls
3. Click "New pull request"

The CLI just makes it faster and scriptable.

---

**Status**: ❌ Not installed (manual installation required)

**Priority**: Medium (nice to have, but not required for core workflow)

**Next Step**: Run Option 1 or Option 2 above to install

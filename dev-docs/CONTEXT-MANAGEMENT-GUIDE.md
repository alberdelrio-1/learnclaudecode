# Context Management Guide
## Never Hit Your Claude Session Limit Again

Based on the "How to Never Hit Your Claude Session Limit Again" video tutorial and best practices.

---

## Understanding Context & Tokens

**Tokens** are fundamental text units (letters, numbers, symbols) that Claude processes. With each interaction, Claude rereads the entire conversation history, causing token consumption to compound over time.

**The 1M Token Window**: Think of this as insurance, not a goal to fill. Performance and accuracy peak in the first 20% of sessions.

---

## The 60% Rule (CRITICAL)

**When context reaches ~60%, take action:**

1. **If mid-task** → Run `/compact` to summarize and continue
2. **If task complete** → Run `/session-handoff` and start fresh session

**Why 60%?**
- Prevents auto-compaction at 95% (which loses critical details)
- Maintains optimal performance and accuracy
- Avoids context rot (degraded thinking depth)

---

## Three-Command Workflow

### 1. `/context-check` - Monitor Health
Run periodically to check:
- Current token usage and percentage
- Session quality metrics
- Recommended action (continue/compact/handoff)

**When to use**: Every 30-45 minutes or after major tasks

### 2. `/session-handoff` - Clean Session Break
Creates a 300-word handoff document with:
- What we built
- Decisions made and why
- What's next
- Gotchas and warnings

**When to use**: At 60%+ context AND task completion

### 3. `/session-resume` - Start Fresh
Loads previous handoff and continues work in new session.

**When to use**: Starting a new session after handoff

---

## Session Management Strategies

### 1. Manual Compaction (Mid-Task)
```bash
# Check context first
/context-check

# If 60%+ and mid-task
/compact
```

**Best for**: Continuing current work without losing implementation context

### 2. Session Chaining (Between Tasks)
```bash
# End current session
/session-handoff

# Start new session
/session-resume
```

**Best for**: Discrete task boundaries, discovery → planning → execution phases

### 3. Sub-Agents (Isolated Tasks)
```bash
# Use Task tool for specific subtasks
/task "Implement user authentication" --agent-type security
```

**Best for**: Routine or isolated work with fresh context windows

---

## Token Reduction Techniques

### File Conversion
Convert heavy formats to markdown:
- PDFs → markdown (significant savings)
- HTML → markdown
- Images with text → OCR + markdown

### Concise Prompts
- Avoid unnecessary context repetition
- Reference file:line instead of copying code
- Use specific commands (Read, Edit) over verbose descriptions

### Strategic Tool Use
- Use Glob/Grep for discovery (cheaper than reading all files)
- Read files only when necessary
- Edit instead of Read + Write

---

## Problems to Avoid

### Context Rot
**Symptoms**:
- Claude asks repeated questions
- Forgets previous decisions
- Retrieval accuracy declines
- Reduced thinking depth

**Solution**: Session handoff before rot sets in (60% rule)

### Auto-Compaction (95%+ Danger Zone)
**What happens**:
- Claude automatically summarizes
- Critical details often lost
- Can't control what's preserved

**Prevention**: Manual intervention at 60%

### Over-Engineering Sessions
**Problem**: Trying to do everything in one session
**Solution**: Break into focused sessions:
- Session 1: Discovery & research
- Session 2: Architecture & planning
- Session 3: Implementation
- Session 4: Testing & refinement

---

## Status Line Configuration

Your status line now shows:
```
📁 [directory] | 🤖 [model] | ⚡ [style] | 📊 [tokens used]/[limit] ([%])
```

**Color coding** (when percentage visible):
- 0-40%: Green (healthy)
- 40-60%: Yellow (caution)
- 60-80%: Orange (warning)
- 80%+: Red (critical)

Watch the percentage and take action at 60%.

---

## Recommended Settings

Add to `.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "input=$(cat); cwd=$(echo \"$input\" | jq -r '.workspace.current_dir'); model=$(echo \"$input\" | jq -r '.model.display_name'); style=$(echo \"$input\" | jq -r '.output_style.name'); used=$(echo \"$input\" | jq -r '.context.used // 0'); limit=$(echo \"$input\" | jq -r '.context.limit // 0'); percentage=$(echo \"$input\" | jq -r '.context_window.used_percentage // 0'); printf '📁 %s | 🤖 %s | ⚡ %s | 📊 %s/%s (%.0f%%)' \"$(basename \"$cwd\")\" \"$model\" \"$style\" \"$used\" \"$limit\" \"$percentage\""
  },
  "autoCompactEnabled": false,
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

**Why `autoCompactEnabled: false`?**
- Gives you control over when to compact
- Prevents surprise data loss at 95%
- Allows strategic handoff instead

---

## Workflow Example: Learning Page Redesign

### Session 1: Discovery (0-60%)
```bash
# Start fresh
cd worktrees/redesign

# Research existing code
"Analyze the current learning page architecture"

# At 50-60%
/session-handoff
```

### Session 2: Planning (0-60%)
```bash
# Load context
/session-resume

# Create architecture plan
"Design new skill-level-selector component"

# At 60%
/session-handoff
```

### Session 3: Implementation (0-60%)
```bash
/session-resume

# Build component
"Implement skill-level-selector from plan"

# At 60%
/session-handoff
```

**Result**: 3 focused sessions instead of 1 bloated 180% session (which would fail)

---

## Key Metrics to Track

After each session, document:
- **Context used**: Actual percentage reached
- **Tasks completed**: What got done
- **Handoff quality**: Did next session resume smoothly?
- **Token efficiency**: Tokens used / work accomplished

Keep in `SESSION-NOTES.md` for improvement tracking.

---

## Advanced: Auto-Handoff Hook

Create `~/.claude/hooks/context-warning.sh`:

```bash
#!/bin/bash
input=$(cat)
percentage=$(echo "$input" | jq -r '.context_window.used_percentage // 0')

if (( $(echo "$percentage > 60" | bc -l) )); then
  echo "⚠️ Context at ${percentage}% - Consider /session-handoff or /compact"
fi
```

Make executable:
```bash
chmod +x ~/.claude/hooks/context-warning.sh
```

Add to settings:
```json
{
  "hooks": {
    "afterAssistantMessage": "~/.claude/hooks/context-warning.sh"
  }
}
```

---

## Quick Reference

| Context % | Status | Action |
|-----------|--------|--------|
| 0-40% | ✅ Healthy | Continue normally |
| 40-60% | ⚠️ Caution | Monitor closely |
| 60-80% | 🟧 Warning | Compact or handoff |
| 80-95% | 🔴 Critical | Immediate action |
| 95%+ | ☠️ Emergency | Auto-compact imminent |

---

## Commands Summary

- `/context` - Detailed context breakdown
- `/context-check` - Health check + recommendations
- `/compact` - Summarize and continue (mid-task)
- `/session-handoff` - Create handoff document (task complete)
- `/session-resume` - Load handoff and continue (new session)
- `/usage` - Session cost and resource metrics

---

## Sources

Based on guidance from:
- [How to Never Hit Your Claude Session Limit Again - Geeky Gadgets](https://www.geeky-gadgets.com/claude-session-limit-guide/)
- [Claude Code Token Management Hacks - MindStudio](https://www.mindstudio.ai/blog/claude-code-token-management-hacks)
- [AI Automation Society - Skool Community](https://www.skool.com/ai-automation-society/new-video-how-to-never-hit-your-claude-session-limit-again)

---

**Remember**: The 1M token window is insurance, not a goal. Peak performance happens in the first 20% of sessions. Use handoffs liberally.

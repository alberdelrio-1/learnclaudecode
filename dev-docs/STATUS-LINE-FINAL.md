# Status Line - Final Configuration

## What the Status Line Shows

```
📁 LearnClaudecode | 🤖 Sonnet 4.5 | 📊 Use /context for usage
```

Or when you exceed 200k tokens:
```
📁 LearnClaudecode | 🤖 Sonnet 4.5 | ⚠️ >200k tokens
```

## Why No Token Percentage?

**Discovery**: The status line JSON doesn't contain token/context data.

After debugging, we found the status line receives this JSON:
```json
{
  "session_id": "d479e793-da71-4dd0-b764-299c7155a8da",
  "cwd": "/Users/albertodelrio/Documents/vscodelocal/LearnClaudecode",
  "model": {
    "id": "claude-sonnet-4-5-20250929",
    "display_name": "Sonnet 4.5"
  },
  "workspace": {
    "current_dir": "/Users/albertodelrio/Documents/vscodelocal/LearnClaudecode",
    "project_dir": "/Users/albertodelrio/Documents/vscodelocal/LearnClaudecode"
  },
  "version": "2.0.50",
  "output_style": { "name": "default" },
  "cost": { ... },
  "exceeds_200k_tokens": false
}
```

**No `.context.used`, `.context.limit`, or `.tokens` fields exist.**

The `/context` command gets data from a different source (transcript file or internal API).

## Final Configuration

**Location**: `~/.claude/settings.json`

```json
{
  "statusLine": {
    "type": "command",
    "command": "input=$(cat); jq -r '.workspace.current_dir as $cwd | .model.display_name as $model | .exceeds_200k_tokens as $exceeds | \"📁 \\(if $cwd then ($cwd | split(\"/\") | last) else \"unknown\" end) | 🤖 \\($model // \"unknown\") | \\(if $exceeds then \"⚠️ >200k tokens\" else \"📊 Use /context for usage\" end)\"' <<< \"$input\""
  }
}
```

**What it displays:**
- 📁 Current directory name
- 🤖 Model name (Sonnet 4.5, Opus, etc.)
- 📊 Reminder to use `/context` command
- ⚠️ Warning if >200k tokens (emergency)

## How to Monitor Context

**Use the `/context` command** which shows detailed breakdown:

```
Context Usage
⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁   claude-sonnet-4-5 · 104k/200k tokens (52%)

⛁ System prompt: 3.0k tokens (1.5%)
⛁ System tools: 17.9k tokens (9.0%)
⛁ MCP tools: 26.0k tokens (13.0%)
⛁ Messages: 56.8k tokens (28.4%)
⛶ Free space: 96k (48.1%)
```

**Check `/context`:**
- Every 30-45 minutes during work
- After major tasks complete
- When approaching end of session
- Use `/context-check` for automated recommendations

## Recommended Workflow

**Instead of watching status line percentage:**

1. **Run `/context` periodically** (30-45 min)
2. **Watch for the 60% threshold** in `/context` output
3. **Use `/context-check`** for health check + recommendations
4. **Run `/session-handoff`** when you hit 60% and task is complete

**This is actually better because:**
- `/context` shows detailed breakdown (which category uses most)
- Visual bars make it easy to see at a glance
- Optimization suggestions included
- No overhead in status line (stays fast)
- You check when it matters, not constantly

## Alternative: External Script (Advanced)

If you really want percentage in status line, you'd need to:

1. Parse the transcript file (available as `transcript_path` in JSON)
2. Count tokens in messages
3. Calculate percentage

**This is slow and not recommended** because:
- Runs after every message (overhead)
- Duplicates work Claude already does
- `/context` already provides this

## Comparison

**Our approach:**
```
Status line: 📁 LearnClaudecode | 🤖 Sonnet 4.5 | 📊 Use /context for usage
When needed: /context → full detailed breakdown
```

**Alternative (not possible with available data):**
```
Status line: 📁 LearnClaudecode | 🤖 Sonnet 4.5 | 📊 104k/200k (52%)
Problem: Data not available in status line JSON
```

## Summary

✅ **Status line shows**: Directory, Model, Context reminder
✅ **Token monitoring**: Use `/context` command
✅ **Health check**: Use `/context-check` command
✅ **Session management**: Use `/session-handoff` at 60%

**Result**: Clean, fast status line + detailed context data when you need it.

---

**Status**: ✅ Configured and working
**Updated**: 2026-06-14
**Approach**: Hybrid (status line basics + `/context` for details)

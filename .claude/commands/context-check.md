---
description: Check current context usage and recommend next action (compact or handoff)
---

# Context Health Check

Check the current session's context usage and provide recommendations.

## Steps

1. **Show context statistics**
   - Current token usage
   - Percentage of context window used
   - Run: `/context` to get detailed breakdown

2. **Evaluate session health**
   Based on the context percentage:
   - **0-40%**: Healthy - continue normally
   - **40-60%**: Caution - watch for upcoming limit
   - **60-80%**: Warning - consider `/compact` if mid-task or `/session-handoff` if nearing completion
   - **80-95%**: Critical - immediate action required
   - **95%+**: Emergency - auto-compact imminent, risk of data loss

3. **Recommendations**
   Based on current context level, recommend ONE of:

   **Continue**: If below 60% and working efficiently

   **Compact**: If 60-80% and mid-task
   - Run `/compact` to summarize and continue in current session
   - Best for ongoing work that would be expensive to re-establish

   **Handoff**: If 60%+ and near task completion
   - Run `/session-handoff` to create handoff document
   - Start fresh session for next task
   - Best for transitioning between discrete tasks

4. **Session Quality Metrics**
   Also note:
   - How many tool calls in this session?
   - Any signs of context rot (repeated questions, forgotten context)?
   - File read operations count (indicator of retrieval struggles)

Provide a clear recommendation with reasoning.

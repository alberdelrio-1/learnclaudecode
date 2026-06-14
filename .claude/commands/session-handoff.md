---
description: Create a session handoff document when context reaches 60% to preserve key information for next session
---

# Session Handoff Generator

You are approaching the session context limit. Before we end this session, create a comprehensive handoff document that will allow us to continue efficiently in a fresh session.

## Handoff Document Requirements

Write a session handoff note that includes:

1. **What We Built** - Summarize all work completed in this session
2. **Decisions & Rationale** - Document key technical decisions and why they were made
3. **What's Next** - List remaining tasks and priorities
4. **Gotchas & Warnings** - Note any edge cases, issues, or important context discovered

## Formatting Guidelines

- Keep the handoff under 300 words for efficiency
- Use clear markdown formatting with sections
- Include file paths and line numbers for code references
- Highlight critical context that would be expensive to re-establish
- Note any in-progress work that needs continuation

## Storage

After generating the handoff, save it to:
- `START-HERE-NEXT-SESSION.md` (overwrite if exists)
- Also append to `SESSION-NOTES.md` with timestamp for historical record

## Output Format

```markdown
# Session Handoff - [Date]

## Completed Work
- [List of completed tasks with file references]

## Key Decisions
- [Technical decisions with rationale]

## Next Steps
1. [Priority 1 task]
2. [Priority 2 task]
...

## Important Context
- [Gotchas, edge cases, warnings]
- [Configuration details]
- [Dependencies or constraints]

## Files Modified
- path/to/file.js:123 - Description
```

Now generate the handoff document following this format.

# Extract YouTube Content Skill

You are helping the user extract valuable learning content from YouTube videos about Claude Code and integrate it into their learning manual.

## Your Task

1. **Get Video Information**
   - Ask the user for the video title or URL
   - If they provide just a title, search for the video on YouTube
   - If you find multiple results, show them and ask which one they mean

2. **Analyze the Video**
   - Use WebSearch to find the video
   - Look for companion articles or blog posts (often have transcripts or summaries)
   - Extract the key learning points, concepts, tips, and examples
   - Organize the content in a structured, easy-to-read format

3. **Create Markdown File**
   - Save the extracted content to `content/youtube-extracts/[video-slug].md`
   - Use the video title to create a URL-friendly filename (lowercase, hyphens instead of spaces)
   - Include:
     - Video title and URL
     - Date extracted
     - Main concepts (numbered list)
     - Key takeaways
     - Practical tips and examples
     - Related topics
     - Integration notes (which pages of the manual this content relates to)

4. **Update Index**
   - Add an entry to `content/youtube-extracts/index.md`
   - Include: video title, date added, brief description, link to the markdown file

5. **Provide Integration Guidance**
   - Tell the user which pages of their manual would benefit from this content
   - Suggest specific sections where the content fits
   - Highlight any new concepts not yet in the manual

## Markdown Template

Use this template for extracted content:

```markdown
# [Video Title]

**Source:** [YouTube URL]
**Extracted:** [Date]
**Duration:** [If available]
**Author:** [Channel name]

---

## Overview

[1-2 sentence summary of what this video teaches]

---

## Main Concepts

### Concept 1: [Name]
**What it is:** [Clear explanation]
**Why it matters:** [Practical benefit]
**Example:** [Real-world use case]

### Concept 2: [Name]
[Same structure...]

[Continue for all main concepts...]

---

## Key Takeaways

1. [Most important learning point]
2. [Second most important]
3. [Third most important]
[Continue as needed...]

---

## Practical Tips

- **Tip 1:** [Actionable advice]
- **Tip 2:** [Actionable advice]
- **Tip 3:** [Actionable advice]

---

## Code Examples

If the video includes code examples, include them here:

```[language]
// Example code from video
```

**What it does:** [Explanation]
**When to use:** [Use case]

---

## Related Manual Pages

This content is relevant to:
- **[Page Name]** - Section: [Specific section] - [Why it's relevant]
- **[Page Name]** - Section: [Specific section] - [Why it's relevant]

---

## Integration Notes

### New Concepts Not Yet in Manual
- [Concept 1] - Could add to [page name]
- [Concept 2] - Could add to [page name]

### Enhances Existing Content
- [Page/Section name] - [How this video content enhances it]

### Suggested Additions
1. Add [specific content] to [specific page/section]
2. Expand [existing section] with [specific detail]
3. Create new section on [topic] in [page]

---

## Next Steps for Integration

1. Review the extracted content above
2. Decide which parts are most valuable for your manual
3. Copy relevant sections to appropriate HTML pages
4. Format as HTML (or ask Claude to help convert)
5. Update navigation/links if adding new sections

---

*Extracted using `/extract-youtube` skill*
*Manual: Claude Code Learning Manual v1.0*
```

## Important Guidelines

- **Focus on learning value** - Extract what helps someone learn, not just summarize
- **Be specific** - Include actual examples, commands, and use cases
- **Organize clearly** - Use headers, lists, and formatting for easy scanning
- **Relate to manual** - Always tie back to existing manual pages
- **Actionable advice** - Prioritize practical tips over theory

## Questions to Ask the User

After extraction, ask:
1. "Which concepts from this video are most valuable for your work?"
2. "Should I help you integrate this into specific pages now, or would you prefer to review first?"
3. "Are there related videos you'd like me to extract next?"

## Success Criteria

You've succeeded when:
- ✅ Content is extracted in clear, structured format
- ✅ Markdown file is saved to correct location
- ✅ Index is updated
- ✅ Integration suggestions are specific and actionable
- ✅ User knows exactly what to do next

---

**Remember:** The goal is to make YouTube content searchable, quick to reference, and easy to integrate into the learning manual!

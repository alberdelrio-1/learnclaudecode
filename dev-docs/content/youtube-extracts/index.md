# YouTube Content Library

Extracted content from YouTube videos for the Claude Code Learning Manual.

This library contains key concepts, tips, and examples from educational videos about Claude Code, converted into searchable, scannable text format.

---

## 📚 How to Use This Library

1. **Browse Extractions:** Each video has its own markdown file
2. **Search Content:** Use your manual's search to find specific topics
3. **Integrate:** Copy valuable content into your HTML pages
4. **Reference:** Link back to original videos for full context

See `learning-journey/youtube-integration-guide.md` for detailed integration instructions.

---

## 🎬 Videos Extracted

### 1. All 35 Claude Code Concepts Explained for Non Coders

- **Extracted:** June 13, 2026
- **Source:** https://www.youtube.com/watch?v=UAMAAoSPu8o
- **Companion Article:** https://www.sabrina.dev/p/every-claude-code-concept-explained-beginners
- **File:** [all-35-concepts.md](all-35-concepts.md)
- **Author:** Sabrina Ramonov
- **Description:** Comprehensive beginner-friendly explanation of 30 core Claude Code concepts, organized into 9 progressive sections
- **Key Topics:**
  - Terminal and installation basics
  - File access and tool use
  - Context management and tokens
  - CLAUDE.md and Memory systems
  - Skills, Hooks, and MCP servers
  - Subagents and automation
  - Version control with Git
- **Integrated into:**
  - core-concepts.html (main integration - all 30 concepts)
  - essential-features.html (CLAUDE.md, Memory details)
  - workflows.html (practical examples)
  - advanced.html (skills, hooks, MCP references)
- **Status:** ✅ Fully integrated

---

## 📊 Extraction Statistics

- **Total Videos Extracted:** 1
- **Total Concepts Documented:** 30
- **Pages Enhanced:** 4
- **Last Updated:** June 13, 2026

---

## 🎯 Planned Extractions

Add videos you plan to extract here:

- [ ] Claude Code MCP Setup Tutorial
- [ ] Advanced Debugging with Claude Code
- [ ] Team Collaboration Workflows
- [ ] Salesforce Development with Claude Code
- [ ] Cost Optimization Strategies

---

## 💡 Extraction Guidelines

**Good Candidates for Extraction:**
- ✅ Concept explanations
- ✅ Workflow tutorials
- ✅ Tips and tricks
- ✅ Best practices
- ✅ Common mistakes to avoid
- ✅ Feature deep-dives

**Not Worth Extracting:**
- ❌ Very short clips (< 2 min)
- ❌ Purely promotional content
- ❌ Outdated information (pre-2025)
- ❌ Low-quality or inaccurate content

---

## 🔧 How to Extract New Videos

Use the `/extract-youtube` skill:

```bash
/extract-youtube
```

Then provide:
- Video title or YouTube URL
- Follow the prompts
- Review extracted content
- Integrate into manual pages

See `learning-journey/youtube-integration-guide.md` for complete instructions.

---

## 📝 Index Template

When you add new videos, use this template:

```markdown
### [Number]. [Video Title]

- **Extracted:** [Date]
- **Source:** [YouTube URL]
- **File:** [filename.md](filename.md)
- **Author:** [Channel/Creator Name]
- **Description:** [2-3 sentence description]
- **Key Topics:**
  - [Topic 1]
  - [Topic 2]
  - [Topic 3]
- **Integrated into:**
  - [page-name.html] ([what was added])
- **Status:** [✅ Integrated / 🔄 In Progress / 📋 Extracted Only]
```

---

## 🎓 Learning Path Suggestions

**For Beginners:**
1. Start with "All 35 Concepts" (already integrated in manual)
2. Look for "Getting Started" tutorials
3. Find "Common Mistakes" videos

**For Intermediate Users:**
4. MCP setup and configuration
5. Custom skills and hooks
6. Team collaboration workflows

**For Advanced Users:**
7. Performance optimization
8. Complex automation patterns
9. Enterprise deployment strategies

---

## 📌 Notes

- All extracted content is saved in markdown format for easy editing
- Original video links are always preserved for reference
- Content can be updated as new information becomes available
- Integration suggestions are provided but optional

---

## 🔗 Related Resources

- **Integration Guide:** `learning-journey/youtube-integration-guide.md`
- **Extraction Skill:** `.claude/skills/extract-youtube.md`
- **Main Manual:** `index.html`

---

*Last Updated: June 13, 2026*
*Maintained by: [Your Name]*
*Part of: Claude Code Learning Manual v1.0*

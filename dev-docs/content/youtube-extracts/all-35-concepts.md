# All 35 Claude Code Concepts Explained for Non Coders

**Source:** https://www.youtube.com/watch?v=UAMAAoSPu8o
**Companion Article:** https://www.sabrina.dev/p/every-claude-code-concept-explained-beginners
**Extracted:** June 13, 2026
**Author:** Sabrina Ramonov
**Duration:** ~45 minutes

---

## Overview

This video provides a comprehensive, beginner-friendly explanation of 30+ essential Claude Code concepts. Perfect for non-coders who need to use Claude Code for work. Concepts are organized into 9 progressive sections, starting with basics and building to advanced features.

**Target Audience:** Complete beginners, non-technical users
**Learning Path:** Week 1 → Week 2-3 → Month 1+

---

## Section 1: Getting Started (Concepts 1-4)

### Concept 1: The Terminal

**What it is:** The text-based interface where Claude Code runs. Unlike browser chatbots, it gives Claude access to your computer files, images, and apps like Google Suite and Airtable.

**Why it matters:** The terminal is your command center - where you type instructions instead of clicking buttons.

**Getting Started:**
```bash
mkdir ~/playground
cd ~/playground
claude
```

**For Non-Coders:** Think of it like a command center where you control things with typed words instead of mouse clicks.

---

### Concept 2: Installation & Pricing

**What it is:** Setting up Claude Code and choosing your subscription plan.

**Pricing Options:**
- **Max ($100-200/month):** Unlimited daily use - recommended for work
- **Pro ($20/month):** Limited usage - good for occasional use
- **Free tier:** Very limited - mainly for testing

**Installation Methods:**
```bash
# macOS
curl -fsSL https://claude.ai/install.sh | bash

# Windows
irm https://claude.ai/install.ps1 | iex
```

**ROI Insight:** Business owners typically see return on investment within a week!

---

### Concept 3: File Access

**What it is:** Claude reads and edits actual files on your computer directly - no copy-pasting required!

**Example:** Ask "tighten my proposal.docx" and Claude modifies it in place, preserving formatting.

**Analogy:** Instead of reading over your shoulder and telling you what to type, Claude can use your keyboard directly (with your permission).

**Why This Matters:**
- Saves enormous time
- Reduces errors from copy-paste
- Maintains formatting
- Works with any file type

---

### Concept 4: Image & PDF Reading

**What it is:** Drop screenshots, PDFs, diagrams, or photos into Claude. It reads text from images automatically.

**No manual retyping needed!**

**Use Cases:**
- Screenshot of error message → Claude explains and fixes
- PDF invoice → Claude extracts data to spreadsheet
- Diagram → Claude explains what it shows
- Whiteboard photo → Claude converts to formatted notes

---

## Section 2: Your First Real Tasks (Concepts 5-8)

### Concept 5: Tool Use (Claude ACTS, Not Just Chats)

**Key Insight:** Claude doesn't just chat - it performs actions using "tools."

**Actions Claude Takes:**
- Searches folders
- Reads files
- Runs commands
- Edits documents
- Analyzes code
- Creates files

**You see each "tool call" happen in real time** as Claude works.

**For Non-Coders:** This is like having an assistant who doesn't just give advice, but actually does the work for you.

---

### Concept 6: How to Talk to Claude Code

**Best Practices:**

**Be Specific:**
- Include tone, constraints, file names
- Use `@filename.xlsx` to tag specific files
- Mention any requirements upfront

**Start Vague, Then Refine:**
- Let Claude ask clarifying questions
- Provide context as needed
- Course-correct along the way

**Good Prompt Example:**
```
Make @proposal.docx more professional.
Focus on the executive summary.
Keep it under 2 pages.
Use formal business tone.
```

**Vague Prompt (Avoid):**
```
Fix the document
```

---

### Concept 7: CLAUDE.md (Your AI's Instruction Manual)

**What it is:** A file containing your business rules, brand voice, and preferences that Claude reads automatically in every conversation.

**Why it matters:** Write instructions once, Claude follows them forever. Eliminates repetition!

**What to Include:**
- Coding standards and style
- Build and test commands
- Brand voice and tone
- Project-specific gotchas
- Workflows and procedures
- Things Claude can't figure out from code

**Analogy:** Like company guidelines that every employee reads on day one.

**File Locations (Priority Order):**
1. `./CLAUDE.md` - Project-specific (shared with team)
2. `~/.claude/CLAUDE.md` - Personal preferences
3. `./CLAUDE.local.md` - Private notes (not in git)

---

### Concept 8: Plan Mode

**What it is:** Claude shows you its full approach before executing anything.

**How It Works:**
1. You ask Claude to do something
2. Claude creates a detailed plan
3. You review and approve (or modify)
4. Claude executes the approved plan

**When to Use:**
- Complex multi-file changes
- Unfamiliar codebase
- Critical features
- Important decisions
- When you want to learn the approach

**Benefit:** Ensures you stay in control and understand what's happening.

---

## Section 3: How Claude's Brain Works (Concepts 9-11)

### Concept 9: Context Window

**Analogy:** Think of Claude's memory as a whiteboard.

**How It Works:**
- Everything you write fills the whiteboard
- Every response fills more space
- When full, older information gets compressed or forgotten

**Why It Matters:** Long conversations waste space. Short, focused sessions keep it clean.

**Performance Impact:** As context window fills up, Claude's performance can degrade.

**Best Practice:** Keep conversations focused on one task/topic.

---

### Concept 10: Tokens & Cost Management

**What Are Tokens?** Tokens measure text usage (roughly 1 token = 4 characters).

**Check Spending:**
```bash
/usage
```

**Save Money By:**
- Switching to cheaper models (Haiku) for simple tasks
- Using `/clear` between unrelated work
- Running `/compact` during long sessions
- Reading files selectively, not wholesale
- Installing the context-mode plugin

**Cost Formula:** More tokens = More cost. Manage wisely!

---

### Concept 11: Model Selection (Picking the Right Brain)

**Three Options Available:**

**Opus:**
- **Speed:** Slowest
- **Cost:** $$$$
- **Best For:** Complex reasoning, critical decisions
- **When to Use:** Architecture decisions, complex debugging

**Sonnet:**
- **Speed:** Fast
- **Cost:** $$
- **Best For:** Daily driver, most tasks
- **When to Use:** 80% of your work - balanced performance

**Haiku:**
- **Speed:** Fastest
- **Cost:** $
- **Best For:** Simple queries, quick answers
- **When to Use:** Quick questions, simple refactoring

**Switch Models Mid-Conversation:**
```bash
/model
```

---

## Section 4: Managing Conversations (Concepts 12-14)

### Concept 12: /compact

**What It Does:** Compresses your conversation history into a tight summary.

**Result:** Frees memory space while preserving key details.

**When to Use:**
- During long sessions
- When context is filling up
- Before starting complex new work

**Usage:**
```bash
/compact
```

**Benefit:** Continue working without losing important context.

---

### Concept 13: /clear

**What It Does:** Wipes your current conversation entirely.

**When to Use:** Switching to totally different topics to prevent context confusion.

**Analogy:** Like erasing the whiteboard completely and starting fresh.

**Warning:** ⚠️ This cannot be undone! Make sure you're finished with current conversation.

**Usage:**
```bash
/clear
```

---

### Concept 14: Session Management

**What It Is:** Sessions persist across computer restarts.

**Commands:**
```bash
claude --continue              # Resume most recent
claude --resume                # Browse all sessions
claude --resume session-name   # Jump to specific session
```

**Why It Matters:**
- Work can span multiple days
- Context preserved between sessions
- Separate sessions for different projects
- Prevents context mixing

**Best Practice:** Start fresh sessions for new projects/topics.

---

## Section 5: Controlling Claude (Concepts 15-17)

### Concept 15: Permission Modes & Settings

**What It Is:** Control how much freedom Claude has to act.

**Permission Levels:**
- **"Ask before every edit"** - Safe, slower (good for beginners)
- **"Auto-approve safe actions"** - Balanced approach
- **"Do whatever you need"** - Fast, requires trust

**How to Set:** Configure once; every new session respects your preferences.

**Best Practice:** Start with "ask" mode, relax as you gain confidence.

---

### Concept 16: Effort Levels

**What It Is:** Tell Claude how hard to think.

**Examples:**
- **Low effort:** "What time is it in Denver?" - Quick facts
- **Normal effort:** Most tasks
- **High effort:** Complex strategy, critical decisions
- **"ultrathink":** Maximum reasoning for one response

**Analogy:** Like asking your colleague for a quick answer vs. asking for a detailed analysis.

**Trade-off:** Higher effort = Better answers but slower & more expensive.

---

### Concept 17: Interrupt & Redirect

**What It Is:** Stop Claude mid-task and change direction.

**How to Do It:** Press `Escape` anytime.

**Why It Matters:**
- No work is lost
- Type new instruction and pivot instantly
- You don't need perfect prompts
- Course-correct as Claude works

**Pro Tip:** It's better to interrupt and redirect than let Claude continue on wrong path!

---

## Section 6: Reviewing Work & Teaching Claude (Concepts 18-20)

### Concept 18: Visual Studio Code

**What It Is:** Free app for reviewing Claude's work side-by-side.

**Shows:** Color-coded changes:
- Green = Additions
- Red = Deletions
- Yellow = Modifications

**Why Use It:** Better than squinting at terminal output. See exactly which lines Claude changed.

**Setup:** Install VS Code, open your project folder, view diffs.

---

### Concept 19: Memory

**What It Is:** Claude's personal notebook that it writes itself.

**Opposite of CLAUDE.md:**
- **CLAUDE.md:** You write instructions manually
- **Memory:** Claude captures preferences automatically

**Example:**
- You correct Claude: "I prefer casual tone"
- Claude saves this in memory
- Future sessions remember your preference

**View/Edit:**
```bash
/memory
```

**Location:** `~/.claude/projects/<project>/memory/`

---

### Concept 20: Project Scope vs Global Scope

**What It Is:** Different rules for different projects vs. consistent preferences everywhere.

**Analogy:**
- **Project scope:** Department handbooks (specific to one project)
- **Global scope:** Company-wide policy (applies everywhere)

**Example Use:**
- Global: Casual tone preference
- Project A: Formal tone (legal project override)
- Project B: Casual tone (inherits global)

**Files:**
- Global: `~/.claude/CLAUDE.md`
- Project: `./CLAUDE.md`

---

## Section 7: Skills & Automation (Concepts 21-24)

### Concept 21: Slash Commands

**What They Are:** Quick actions accessed with `/` prefix.

**Essential Commands:**
- `/help` - Show available commands
- `/clear` - Clear context
- `/compact` - Compress conversation
- `/model` - Switch models
- `/usage` - Check token usage
- `/memory` - View/edit memory
- `/config` - Open settings
- `/doctor` - Diagnose issues

**Hidden Gems:**
- `/insights` - Shows usage patterns
- `/btw` - Add side notes without interrupting

**Tip:** Type `/` to see all available commands.

---

### Concept 22: Skills (Your Custom Workflows)

**What They Are:** Saved instruction sets that automate multi-step workflows.

**How They Work:** One command triggers entire processes.

**Example: /crosspost Skill:**
1. Transcribes video
2. Writes captions
3. Publishes to 7 platforms
4. Updates databases
All with one command!

**Creating Skills:**
1. Create `.claude/skills/` directory
2. Add `skill-name.md` file
3. Write instructions inside
4. Use with `/skill-name`

**Power:** Turn repetitive multi-step tasks into single commands.

---

### Concept 23: Hooks (Automated Guardrails)

**What They Are:** Scripts running automatically before/after actions.

**Example Use Case:** Quality gate hook that intercepts every post:
- Checks character limits
- Flags banned words
- Validates required tags
- Prevents publishing if issues found

**For Non-Coders:** Like autocorrect, but customized for your specific needs.

**Types:**
- Pre-action hooks (run before)
- Post-action hooks (run after)
- Validation hooks (check if allowed)

**Benefit:** Automated quality control and policy enforcement.

---

### Concept 24: Web Browsing

**What It Is:** Paste any URL and Claude fetches, reads, and analyzes webpage content.

**Doesn't Just Summarize - Claude Can:**
- Create files from web content
- Compare competitors
- Extract specific data
- Generate spreadsheets
- Analyze documentation

**Example Uses:**
- "Compare pricing from these 3 competitors and create a spreadsheet"
- "Read this documentation and write a summary for our team"
- "Extract all email addresses from this page"

**Benefit:** Web becomes searchable, actionable data source.

---

## Section 8: Connecting to the Real World (Concepts 25-26)

### Concept 25: MCP Servers (From Consultant to Employee)

**What MCP Is:** Model Context Protocol bridges Claude to real apps.

**The Transformation:**
- **Without MCP:** Claude says "You should update your spreadsheet"
- **With MCP:** Claude actually updates it ✨

**Connects To:**
- Google Drive
- Slack
- Airtable
- Stripe
- **Salesforce** ← Important for your work!
- GitHub
- Jira
- And hundreds more...

**Analogy:** MCP turns Claude from a consultant (gives advice) into an employee (does the work).

**Setup:**
```bash
claude mcp add
# Follow prompts to configure
```

**Authenticate:**
```bash
/mcp
# OAuth browser login
```

---

### Concept 26: Perplexity MCP (AI-Powered Web Research)

**What It Is:** Advanced web research connecting to Perplexity.

**How It Works:**
Instead of reading one link you provide, Claude:
1. Researches broadly across sources
2. Finds verified information
3. Cites every fact
4. Cross-references multiple sources

**Use Case:**
```
Research our top 5 competitors and summarize their pricing strategies with sources.
```

**Result:** Comprehensive research report with citations.

**Benefit:** Turns Claude into a research assistant with fact-checking.

---

## Section 9: Agents, Remote Control & Scheduling (Concepts 27-30)

### Concept 27: Subagents (Automatic Parallel Workers)

**What They Are:** For multi-part tasks, Claude automatically spawns mini-Claudes working simultaneously.

**Example:**
- **Sequential:** Researching 5 competitors takes 50 minutes (10 min each)
- **Parallel (Subagents):** Takes 10 minutes (all at once)

**When Claude Uses Them:**
- Researching multiple items
- Analyzing several files
- Running parallel tests
- Complex investigations

**For Non-Coders:** Like delegating parts of a project to multiple assistants who work at the same time.

**Trade-off:** 5 subagents = 5x the token cost. Use for time-sensitive work.

---

### Concept 28: Remote Control (Use Claude From Your Phone)

**What It Is:** Start a session on your computer, control it from the Claude mobile app.

**How It Works:**
1. Start session on computer
2. Generate QR code
3. Scan with mobile app
4. Control from anywhere

**Analogy:** Your phone is a remote; the computer does the work.

**Use Cases:**
- Monitor long-running tasks away from desk
- Trigger builds from your phone
- Check status of automated workflows
- Respond to Claude's questions remotely

---

### Concept 29: Scheduled Tasks (/loop)

**What It Is:** Schedule recurring tasks using `/loop` command.

**Examples:**
```bash
/loop 1h "Check email for urgent messages"
/loop 1d "Check Google Drive for new invoices"
/loop 30m "Monitor build status and alert if failures"
```

**Scheduling Options:**
- `1h` - Every hour
- `1d` - Every day
- `30m` - Every 30 minutes
- `1w` - Every week

**Safety Feature:** Tasks auto-expire after 3 days to prevent runaway automation.

**Other Scheduling Methods:**
- Routines (Web interface)
- Desktop tasks
- GitHub Actions
- Cron jobs

---

### Concept 30: Version Control with Git

**What It Is:** Every Claude change gets saved as reversible versions.

**Benefits:**
- Roll back mistakes instantly
- See history of all changes
- Optional GitHub integration for cloud backup
- Team review of changes

**For Non-Coders:** Like "track changes" in Word, but for your entire project.

**What Claude Can Do:**
- Create commits with contextual messages
- Create and manage branches
- Create pull requests
- Resolve merge conflicts
- View diff history

**Safety:** Never lose work - everything is versioned and recoverable.

---

## Quick Start Path

**Week 1: Foundations**
- Terminal basics (Concept 1)
- File access (Concept 3)
- CLAUDE.md (Concept 7)
- Plan mode (Concept 8)

**After 1 Week: Core Skills**
- Context management (Concepts 9-11)
- Model switching
- Memory system (Concept 19)
- Basic skills

**After 1 Month: Advanced**
- MCP connections (Concept 25)
- Perplexity research (Concept 26)
- Remote control (Concept 28)
- Scheduling (Concept 29)
- Version control (Concept 30)

---

## Related Manual Pages

This content is integrated into:

- **core-concepts.html** - All 30 concepts with detailed explanations
- **essential-features.html** - CLAUDE.md (7), Memory (19), Plan Mode (8), Context (9-11), Sessions (14)
- **workflows.html** - Practical examples using concepts
- **advanced.html** - Skills (22), Hooks (23), MCP (25), Subagents (27), Scheduling (29)
- **troubleshooting.html** - Common issues references

---

## Integration Notes

### Fully Integrated Concepts

All 30 concepts have been integrated into the manual's core-concepts.html page with:
- Clear explanations in plain English
- Real-world analogies
- Practical examples
- For non-coders callouts
- Step-by-step instructions

### Enhanced Sections

**Essential Features Page:**
- Expanded CLAUDE.md section with examples
- Memory system detailed explanation
- Context management strategies

**Workflows Page:**
- Added practical examples using these concepts
- Real-world use cases

**Advanced Page:**
- Skills creation guide
- Hooks configuration
- MCP setup instructions

---

## Next Steps for Your Learning

1. **Read core-concepts.html** - See all 30 concepts in your manual
2. **Try Concept 1-4** - Get hands-on with basics this week
3. **Create your CLAUDE.md** - Apply Concept 7
4. **Practice with Plan Mode** - Use Concept 8 for next task
5. **Explore at your pace** - Follow the timeline that works for you

---

*Extracted using `/extract-youtube` skill*
*Integrated into: Claude Code Learning Manual v1.0*
*Last Updated: June 13, 2026*

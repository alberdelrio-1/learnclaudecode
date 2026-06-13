# Evolution Roadmap: Version 1 → Version 2

**Current:** Version 1.0 (Personal Learning Edition)
**Future:** Version 2.0 (Company Enablement Edition)

---

## 🎯 Purpose of This Document

This roadmap shows you how to evolve your personal learning manual into a company-wide enablement tool for Claude Code with Salesforce and nCino integration.

**When to use this:** After you've tested Version 1 and confirmed it's helpful for your learning.

---

## Phase 1: Version 1 Testing & Validation

### Your Current Checklist

**Personal Testing (Week 1-2):**
- [ ] Opened website and explored all pages
- [ ] Used search to find specific topics
- [ ] Tested dark/light mode toggle
- [ ] Tried copying code examples
- [ ] Read through at least 3 major sections
- [ ] Referenced it while actually using Claude Code

**Usefulness Validation:**
- [ ] Found answers when stuck
- [ ] Learned something new
- [ ] Bookmarked for regular reference
- [ ] Would recommend to a colleague

**Technical Validation:**
- [ ] All links work correctly
- [ ] All features function (search, theme, copy buttons)
- [ ] Looks good on desktop
- [ ] Looks good on mobile
- [ ] Works in different browsers

### Colleague Testing (Week 3-4)

**Share with 2-3 trusted colleagues:**
- [ ] Sent them the GitHub Pages URL
- [ ] Asked for specific feedback
- [ ] Observed where they got stuck
- [ ] Noted what they found confusing
- [ ] Collected suggestions

**Feedback Questions to Ask:**
1. Was navigation intuitive?
2. Could you find what you needed?
3. Was language clear and beginner-friendly?
4. What's missing for your use case?
5. Would you use this regularly?

---

## Phase 2: Identify Company-Specific Needs

### Discovery Questions

**Salesforce/nCino Usage:**
1. What Salesforce IDE extensions are installed company-wide?
2. What are common Salesforce development workflows?
3. Which MCP servers connect to Salesforce/nCino?
4. What are typical nCino customization tasks?
5. What pain points exist in current workflow?

**Team Needs:**
1. What skill levels exist in the team?
2. What are common questions people ask?
3. What mistakes do beginners make repeatedly?
4. What would make onboarding faster?
5. What internal resources already exist?

**Company Standards:**
1. Any company coding standards?
2. Security/compliance requirements?
3. Approved tools and configurations?
4. Internal support channels?
5. Training budget/resources?

---

## Phase 3: Content Additions for Version 2

### New Pages to Create

#### 1. salesforce-ncino.html

**Purpose:** Claude Code specifically for Salesforce and nCino development

**Sections to Include:**

**A. Salesforce IDE Extension Integration**
```markdown
## Setting Up Claude Code with Salesforce

### Prerequisites
- Salesforce Extensions for VS Code installed
- Org authenticated
- Claude Code extension installed

### Configuration
- How to connect Claude to Salesforce orgs
- MCP server setup for Salesforce
- Permission configuration

### Common Workflows
- Querying Salesforce data with Claude
- Analyzing Apex code
- Creating test classes
- Debugging Salesforce errors
- Reviewing Lightning components
```

**B. nCino-Specific Workflows**
```markdown
## nCino Development with Claude Code

### Understanding nCino Objects
- Common nCino custom objects
- Standard vs custom fields
- Relationships and lookups

### Common Tasks
- Customizing loan origination flows
- Creating validation rules
- Writing triggers for nCino objects
- Testing nCino functionality

### Best Practices
- nCino naming conventions
- Performance considerations
- Testing strategies
```

**C. MCP Server Configurations**
```markdown
## MCP Servers for Salesforce

### Available Integrations
- Salesforce MCP server setup
- Authentication methods
- Common queries and operations

### Example Workflows
- "Fetch all open cases and summarize"
- "Create new lead from this data"
- "Update opportunity stage"
- "Query account hierarchy"
```

**D. Code Examples Library**
```markdown
## Company Code Examples

### Apex Patterns
- Your company's Apex patterns
- Common utility classes
- Test class templates

### nCino Customizations
- Example customizations
- Before/after triggers
- Custom buttons and actions
```

---

#### 2. evaluation.html

**Purpose:** Self-assessment and effectiveness measurement

**Sections:**

**A. Self-Assessment Checklist**
```markdown
## Week 1 Competency Check

After your first week with Claude Code:
- [ ] Can install and configure Claude Code
- [ ] Understand basic commands (/help, /clear, /compact)
- [ ] Know how to create CLAUDE.md file
- [ ] Can use plan mode for complex tasks
- [ ] Understand context management

## Month 1 Competency Check

After your first month:
- [ ] Created custom skills for your workflow
- [ ] Set up MCP connections to Salesforce
- [ ] Using Claude Code daily for development
- [ ] Can troubleshoot common issues
- [ ] Teaching others basic usage
```

**B. Knowledge Tests**
```markdown
## Test Your Knowledge

### Basic Level
1. What command shows available Claude Code commands?
2. How do you save context between sessions?
3. What's the difference between /compact and /clear?

### Intermediate Level
1. When should you use plan mode?
2. How do MCP servers enhance Claude Code?
3. What's the best way to manage large codebases?

### Advanced Level
1. How would you create a custom skill for your workflow?
2. Explain the difference between CLAUDE.md and Memory
3. How do subagents improve parallel work?
```

**C. Success Metrics**
```markdown
## Measuring Effectiveness

### Individual Metrics
- Tasks completed faster (before/after comparison)
- Reduction in questions to colleagues
- Code quality improvements
- Time saved per week

### Team Metrics
- Onboarding time reduction
- Support ticket reduction
- Code review efficiency
- Knowledge sharing improvement
```

**D. Feedback Collection**
```markdown
## Provide Feedback

### What's Working
- Which features are most useful?
- What workflows have improved?
- What would you teach others first?

### What Needs Improvement
- What's still confusing?
- What's missing from this manual?
- What examples would help?
- What company-specific content is needed?
```

---

#### 3. company-standards.html

**Purpose:** Internal guidelines and best practices

**Sections:**

**A. Company CLAUDE.md Template**
```markdown
## Your Company's CLAUDE.md Template

### Salesforce Standards
- API version to use
- Naming conventions
- Security requirements
- Test coverage requirements

### nCino Standards
- Custom object naming
- Field naming patterns
- Integration patterns
- Deployment process

### General Standards
- Code style guide
- Documentation requirements
- Git workflow
- Review process
```

**B. Approved MCP Configurations**
```markdown
## Company-Approved MCP Servers

### Salesforce MCP
- Installation instructions
- Authentication method
- Approved operations
- Security considerations

### Internal Tools MCP
- Jira integration
- Slack integration
- Documentation systems
```

**C. Security & Compliance**
```markdown
## Security Guidelines

### What NOT to Share with Claude
- Production credentials
- Customer PII
- Sensitive business logic
- Unreleased features

### Approved Usage
- Development code review
- Test data generation
- Documentation creation
- Learning and research

### Compliance Requirements
- Data retention policies
- Audit logging
- Access controls
```

**D. Internal Resources**
```markdown
## Company Resources

### Support Channels
- #claude-code-help Slack channel
- Internal wiki
- Training sessions schedule
- Office hours

### Contacts
- Claude Code champions
- Salesforce team leads
- DevOps contacts

### Additional Materials
- Company-specific tutorials
- Video recordings
- Workshop materials
```

---

### Enhancing Existing Pages

#### Update index.html
- Add "Company Resources" section
- Link to internal pages
- Company-specific quick wins

#### Update workflows.html
- Add Salesforce workflow examples
- nCino customization workflows
- Company-specific patterns

#### Update troubleshooting.html
- Salesforce-specific issues
- nCino error patterns
- Company IT support contacts

---

## Phase 4: Professional Polish

### Visual Enhancements

**Company Branding:**
- Add company logo to header
- Use company colors in theme
- Match internal design system

**Professional Touches:**
- Print stylesheet for PDF export
- High-quality screenshots
- Professional diagrams
- Consistent formatting

### Content Improvements

**Clarity:**
- Review all content for accuracy
- Fix any typos or errors
- Ensure consistency in terminology
- Add more visual examples

**Organization:**
- Ensure logical flow between pages
- Add more cross-references
- Improve navigation
- Add "related topics" sections

### Accessibility

**Ensure:**
- Screen reader compatibility
- Keyboard navigation
- Sufficient color contrast
- Alt text on all images
- ARIA labels where needed

---

## Phase 5: Deployment & Rollout

### Pre-Launch Checklist

**Content Review:**
- [ ] All Salesforce info accurate
- [ ] nCino sections validated
- [ ] Company standards approved
- [ ] Security guidelines reviewed
- [ ] All links tested

**Technical Validation:**
- [ ] Works on company network
- [ ] Compatible with company browsers
- [ ] Mobile access confirmed
- [ ] Search indexing complete
- [ ] Performance optimized

**Stakeholder Approval:**
- [ ] IT security reviewed
- [ ] Management approved
- [ ] Training team aligned
- [ ] Support resources ready

### Launch Strategy

**Soft Launch (Week 1):**
- Share with pilot group (10-20 people)
- Collect immediate feedback
- Fix any critical issues
- Document common questions

**Wider Launch (Week 2-3):**
- Announce to development team
- Send email with overview
- Post in team channels
- Offer office hours for questions

**Company-Wide (Week 4+):**
- Present in all-hands meeting
- Include in onboarding process
- Regular updates and improvements
- Ongoing support and maintenance

---

## Phase 6: Maintenance & Growth

### Regular Updates

**Monthly:**
- Review feedback and questions
- Add new examples
- Fix reported issues
- Update for new Claude Code features

**Quarterly:**
- Major content review
- Add new sections as needed
- Survey user satisfaction
- Measure effectiveness

**Annually:**
- Complete content audit
- Technology updates
- Redesign if needed
- Success metrics review

### Community Building

**Encourage Contributions:**
- Accept tips and tricks from users
- Feature user success stories
- Create contribution guidelines
- Recognize contributors

**Knowledge Sharing:**
- Regular tips in Slack
- Lunch & learn sessions
- Office hours
- Champions program

---

## Implementation Checklist

Use this to track your progress from Version 1 to Version 2:

### Phase 1: Testing
- [ ] Personal testing complete
- [ ] Colleague feedback collected
- [ ] Issues identified and fixed
- [ ] Decision to proceed to Version 2

### Phase 2: Discovery
- [ ] Salesforce workflows documented
- [ ] nCino needs identified
- [ ] Company standards collected
- [ ] Team needs assessed

### Phase 3: Content Creation
- [ ] salesforce-ncino.html created
- [ ] evaluation.html created
- [ ] company-standards.html created
- [ ] Existing pages updated
- [ ] All content reviewed

### Phase 4: Polish
- [ ] Branding applied
- [ ] Content proofread
- [ ] Accessibility validated
- [ ] Screenshots/diagrams added

### Phase 5: Deployment
- [ ] Pre-launch checks complete
- [ ] Stakeholder approval received
- [ ] Soft launch successful
- [ ] Full rollout executed

### Phase 6: Ongoing
- [ ] Feedback system in place
- [ ] Update schedule defined
- [ ] Community engagement started
- [ ] Success metrics tracked

---

## Quick Start: Adding Your First Company Page

**Right now, you can:**

1. **Create placeholder salesforce-ncino.html:**
   - Copy workflows.html
   - Rename to salesforce-ncino.html
   - Replace content with company-specific sections
   - Add to navigation in all pages

2. **Start collecting examples:**
   - Create `examples/salesforce/` folder
   - Save Apex code examples
   - Document nCino patterns
   - Organize for easy reference

3. **Document your MCP setup:**
   - Take screenshots of configuration
   - Write step-by-step setup guide
   - Test with a colleague
   - Refine based on feedback

---

## Resources Needed

**Time Investment:**
- Phase 1 (Testing): 2-4 weeks
- Phase 2 (Discovery): 1-2 weeks
- Phase 3 (Content): 2-3 weeks
- Phase 4 (Polish): 1 week
- Phase 5 (Deployment): 1-2 weeks
- **Total: 7-12 weeks** from Version 1 to full Version 2 rollout

**People Needed:**
- You (primary author/maintainer)
- 2-3 colleagues (testing and feedback)
- 1 Salesforce expert (content validation)
- 1 security reviewer (compliance check)
- 1 manager (approval and support)

**Tools Needed:**
- VS Code (for editing)
- Git/GitHub (for version control)
- Screen recording tool (optional, for tutorials)
- Diagramming tool (optional, for visuals)

---

## Success Indicators

**You're ready to launch Version 2 when:**

✅ Version 1 is actively used by you and colleagues
✅ You have company-specific content ready
✅ Stakeholders are supportive
✅ Support resources are in place
✅ You're confident it solves real problems

**Version 2 is successful when:**

✅ 80%+ of team has accessed it
✅ Onboarding time reduced
✅ Common questions answered proactively
✅ Regular usage (not one-time)
✅ Positive feedback from users
✅ Measurable time/effort savings

---

## Final Notes

**Remember:**
- Version 1 is already valuable - don't rush to Version 2
- Collect real usage data before expanding
- Company rollout requires buy-in and support
- Maintenance is ongoing - plan for it
- Success = people using it, not perfection

**This evolution is optional:**
- Version 1 can remain your personal tool
- You can share informally without Version 2
- Pace yourself based on feedback and need

**You're in control of the timeline!**

---

*Last updated: June 13, 2026*
*Part of: Claude Code Learning Manual*
*Purpose: Guide for expanding to company enablement*

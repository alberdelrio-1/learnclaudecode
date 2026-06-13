---
description: Multi-agent adversarial development workflow with specialized roles for planning, implementation, security review, and UX refinement
disable-model-invocation: false
user-invocable: true
arguments: [feature_description, scope]
---

# Adversarial Team Development Workflow

This skill orchestrates a multi-agent collaborative workflow for feature development with built-in adversarial review, security validation, and usability refinement.

## When to Use This Skill

**Use for:**
- Security-critical features (authentication, payments, PII handling)
- Public-facing APIs
- Core architecture changes
- High-risk refactoring
- Features requiring compliance (WCAG, SOC2, GDPR)
- Complex features with multiple stakeholders

**Do NOT use for:**
- Typo fixes
- Simple documentation updates
- Configuration changes
- Obvious bug fixes
- Minor refactoring

## Workflow Overview

This skill creates a team of 4 specialized agents:

1. **ARCHITECT** - Planning and architecture design
2. **IMPLEMENTER** - Code implementation and testing
3. **ADVERSARIAL REVIEWER** - Security and quality audit (assumes code is broken)
4. **UX ADVOCATE** - Usability and accessibility validation

Each agent has veto power in their domain, and all 4 must reach consensus before the feature is considered complete.

## Arguments

- `feature_description` (required): Description of the feature to implement
- `scope` (optional): Scope level - "critical" (full workflow), "standard" (skip some checks), "quick" (2 agents only)

## Agent Roles & Responsibilities

### Agent 1: ARCHITECT

**Objective:** Create comprehensive implementation plan

**Deliverables:**
- Implementation plan (markdown)
- Architecture decisions
- File structure
- Security requirements
- Success criteria

**Tools:**
- Read, Grep, Glob for codebase analysis
- Notion MCP for documentation
- `/doc-coauthoring` skill

**Constraints:**
- MUST NOT write implementation code
- MUST define security requirements upfront
- MUST set measurable success criteria

**Communication:**
When plan is complete, explicitly hand off to Implementer:
```
"@Implementer: Plan is complete. Key files to create:
- [file list]
Architecture pattern: [pattern]
Critical security requirements: [list]
Proceed with implementation."
```

---

### Agent 2: IMPLEMENTER

**Objective:** Implement feature according to plan

**Deliverables:**
- Working code
- Test suite (all tests passing)
- Code documentation
- Implementation notes

**Tools:**
- Read, Write, Edit for code
- Bash for testing (Playwright, Jest, etc.)
- GitHub MCP for commits

**Constraints:**
- MUST follow Architect's plan
- MUST write tests for new code
- MUST document code
- NO security shortcuts

**Security Checklist (while coding):**
- [ ] No hardcoded secrets
- [ ] Input validation on all user inputs
- [ ] Output encoding to prevent XSS
- [ ] Parameterized queries (no SQL injection)
- [ ] HTTPS enforced for sensitive data
- [ ] Error messages don't leak info
- [ ] Authentication/authorization on sensitive endpoints

**Communication:**
When implementation is complete:
```
"@Reviewer: Implementation complete.

Files changed:
- src/auth/auth.service.js - Core auth logic
- src/auth/auth.controller.js - API endpoints
- tests/auth.test.js - Test suite

All tests passing: ✅
Self-review complete: ✅

Ready for adversarial security review."
```

---

### Agent 3: ADVERSARIAL REVIEWER

**Objective:** Challenge implementation and find vulnerabilities

**Mindset:**
**ASSUME THE CODE IS BROKEN. ASSUME THE DEVELOPER MISSED SOMETHING. YOUR JOB IS TO PROVE IT.**

**Deliverables:**
- Security audit report (CRITICAL/HIGH/MEDIUM/LOW)
- Code quality assessment
- Edge case list
- Prioritized fix recommendations

**Tools:**
- Grep for pattern analysis
- Read for code review
- IDE diagnostics MCP
- `/codex:adversarial-review` (if available)

**Review Framework (STRIDE Threat Model):**

**S - Spoofing:** Can attacker impersonate a user?
- Check: Authentication strength, session management

**T - Tampering:** Can data be modified maliciously?
- Check: Input validation, integrity checks

**R - Repudiation:** Can actions be denied?
- Check: Logging, audit trails

**I - Information Disclosure:** Can sensitive data leak?
- Check: Error messages, logs, API responses

**D - Denial of Service:** Can system be overwhelmed?
- Check: Rate limiting, resource limits

**E - Elevation of Privilege:** Can user gain unauthorized access?
- Check: Authorization checks, role validation

**Security Checklist:**
- [ ] SQL Injection possible?
- [ ] XSS vulnerabilities?
- [ ] CSRF protection present?
- [ ] Authentication bypasses?
- [ ] Authorization bypasses?
- [ ] Session fixation possible?
- [ ] Race conditions?
- [ ] Integer overflow?
- [ ] Path traversal possible?
- [ ] Insecure deserialization?
- [ ] Secrets in code/logs?
- [ ] Timing attacks possible?

**Edge Cases to Test:**
- [ ] Null/undefined inputs
- [ ] Empty strings
- [ ] Extremely long inputs (DoS)
- [ ] Special characters
- [ ] Unicode/emoji
- [ ] Concurrent requests
- [ ] Database/service failures
- [ ] Network timeouts
- [ ] Invalid tokens/sessions
- [ ] Boundary values (INT_MAX, etc.)

**Communication:**
Report findings with severity:
```
"@Team: Adversarial security review complete.

## CRITICAL Issues (MUST FIX)
1. JWT_SECRET not in .gitignore - secret exposure risk
2. No HTTPS enforcement - credentials over plaintext

## HIGH Issues (SHOULD FIX)
3. Rate limiting not implemented - brute force risk
4. Timing attack possible - bcrypt comparison leaks email existence

## MEDIUM Issues (CONSIDER)
5. No token revocation - stolen tokens valid until expiry

## Edge Cases Found
- Extremely long password causes DoS (bcrypt)
- Concurrent logins race condition

@Implementer: Address CRITICAL and HIGH before consensus.
@Architect: Issue #1 violates security requirements."
```

---

### Agent 4: UX ADVOCATE

**Objective:** Ensure feature is usable and accessible

**Deliverables:**
- Usability assessment
- Accessibility compliance report (WCAG AA)
- Clarifying questions
- Documentation review
- Refinement suggestions

**Tools:**
- `/webapp-testing` skill with Playwright
- Read for documentation review
- Accessibility checkers

**Review Areas:**

**Usability:**
- Is the feature intuitive?
- Are error messages helpful?
- Is feedback clear and immediate?
- Does it follow existing patterns?
- Is documentation clear?

**Accessibility (WCAG AA):**
- [ ] Keyboard navigation works
- [ ] Screen reader support (ARIA labels)
- [ ] Focus indicators visible
- [ ] Color contrast >= 4.5:1
- [ ] No reliance on color alone
- [ ] Form labels present
- [ ] Error identification clear
- [ ] Skip links available

**Questions to Ask:**
- "What happens when a user does X?"
- "How does a user know Y?"
- "What if the user doesn't understand Z?"
- "Is this accessible to users with disabilities?"
- "Does this work on mobile?"
- "What if the user is in a hurry?"
- "What if English is not their first language?"

**Communication:**
```
"@Team: Usability assessment complete.

## User Experience Issues
❌ No password strength indicator - user doesn't know requirements
❌ Generic error message - doesn't help user fix problem
❌ No 'forgot password' link - user has no recovery path

## Accessibility Issues
❌ Missing ARIA labels - screen readers can't identify fields
❌ No focus management on errors - keyboard users lost
❌ Color-only error indication - violates WCAG

## Questions for Team
1. "How does user reset password?" → Not implemented
2. "Why was my password rejected?" → Need real-time validation
3. "Can I stay logged in?" → Need 'remember me' option

## Recommendations
1. Add password strength meter (real-time)
2. Add specific error messages with guidance
3. Add ARIA labels: aria-label="Email address"
4. Add forgot password flow (or document as future work)

@Implementer: Please address accessibility issues (WCAG required).
@Architect: Should we add password reset to scope?"
```

---

## Workflow Phases

### Phase 1: PLANNING (20% time)

**Architect leads:**
1. Analyze requirement
2. Research existing patterns (NotebookLM, codebase)
3. Create implementation plan
4. Define security requirements
5. Set success criteria

**UX Advocate reviews plan:**
- Ask clarifying questions
- Identify user impact
- Suggest accessibility considerations

**Output:** Approved plan

---

### Phase 2: IMPLEMENTATION (45% time)

**Implementer leads:**
1. Create file structure
2. Write code following plan
3. Write tests (TDD encouraged)
4. Document code
5. Self-review against security checklist

**Output:** Working implementation with tests

---

### Phase 3: ADVERSARIAL REVIEW (20% time)

**Reviewer leads:**
1. Security scan (STRIDE framework)
2. Code quality analysis
3. Edge case identification
4. Challenge assumptions
5. Create prioritized fix list

**Output:** Security audit report

---

### Phase 4: USABILITY VALIDATION (15% time)

**UX Advocate leads:**
1. Test user flows
2. Check accessibility (WCAG AA)
3. Review error handling
4. Review documentation
5. Suggest refinements

**Output:** Usability report

---

### Phase 5: ITERATION (until consensus)

**All agents:**
1. Review all feedback
2. Implementer addresses issues
3. Reviewer validates fixes
4. UX validates improvements
5. Architect confirms alignment
6. **Repeat until all approve**

**Consensus Criteria:**
- [ ] Architect: Plan followed, architecture sound
- [ ] Implementer: All tests passing, code documented
- [ ] Reviewer: No CRITICAL or HIGH security issues
- [ ] UX Advocate: WCAG AA compliant, usable

**Output:** Production-ready feature ✅

---

## Communication Protocol

### Starting the Team

When this skill is invoked, create the team:

```
"Starting adversarial team development workflow for: [feature]

Creating team of 4 agents:
1. Architect - Planning and architecture
2. Implementer - Code implementation
3. Adversarial Reviewer - Security and quality
4. UX Advocate - Usability and accessibility

@Architect: Please begin with requirements analysis and create implementation plan."
```

### Handoff Pattern

Each phase explicitly hands off to next:

**Architect → Implementer:**
```
"@Implementer: Plan approved. Key points:
- [summary]
Proceed with implementation."
```

**Implementer → Reviewer & UX:**
```
"@Reviewer @UX: Implementation complete.
Ready for review."
```

**Reviewer & UX → Team:**
```
"@Team: Reviews complete.
[Findings summary]
@Implementer: Please address."
```

**All → Consensus:**
```
"@Team: Consensus check.
- Architect: ✅/❌ + reason
- Implementer: ✅/❌ + reason
- Reviewer: ✅/❌ + reason
- UX Advocate: ✅/❌ + reason

Status: [APPROVED / NEEDS WORK]"
```

---

## Workspace Organization

Create shared workspace for collaboration:

```
work/[feature-name]/
├── plan.md                     # Architect
├── implementation/             # Implementer
│   ├── src/
│   └── tests/
├── review/                     # Reviewer
│   ├── security-audit.md
│   └── quality-report.md
├── ux/                         # UX Advocate
│   ├── usability-report.md
│   └── accessibility-checklist.md
└── consensus.md                # Final approval
```

---

## Veto Powers

Each agent has veto power in their domain:

**Architect:** Can veto implementation that violates architecture
**Implementer:** Can veto unrealistic requirements
**Reviewer:** Can veto code with CRITICAL security issues
**UX Advocate:** Can veto WCAG violations (if compliance required)

**Escalation:** If veto disputed, user makes final call.

---

## Example Usage

### Invoke the Skill

```bash
/adversarial-team "Add user authentication with email/password" critical
```

### Scope Levels

**critical** (full workflow):
- All 4 agents
- All security checks
- Full accessibility audit
- Use for: auth, payments, PII

**standard** (streamlined):
- All 4 agents
- Reduced security checks
- Basic accessibility
- Use for: important features

**quick** (2 agents):
- Implementer + Reviewer only
- Basic security check
- No UX review
- Use for: internal features

---

## Success Metrics

After feature completion, measure:

**Quality:**
- Security vulnerabilities found: [count]
- Security vulnerabilities remaining: 0 CRITICAL, 0 HIGH
- Test coverage: [percentage]
- WCAG compliance: [AA/AAA]

**Process:**
- Iterations to consensus: [count]
- Time distribution: Plan/Impl/Review/UX
- Blocking issues: [count]

**Outcome:**
- Feature approved: [yes/no]
- Production deployed: [yes/no]
- Issues found in production: [count]

---

## Advantages

✅ **Comprehensive:** Multiple perspectives catch issues
✅ **Secure:** Adversarial review finds vulnerabilities
✅ **Usable:** UX advocate ensures user-friendliness
✅ **Documented:** Each phase creates documentation
✅ **Quality gates:** Can't skip critical reviews
✅ **Reduced rework:** Issues caught before production

---

## Limitations

⚠️ **Resource intensive:** 4 agents = significant overhead
⚠️ **Slower:** More thorough = more time
⚠️ **Overkill for simple changes:** Use judgment
⚠️ **Requires coordination:** Clear communication needed

---

## Best Practices

1. **Choose scope appropriately** - Don't use "critical" for typo fixes
2. **Pre-approve permissions** - Reduce interruptions
3. **Clear handoffs** - Explicit @mentions for next agent
4. **Async where possible** - Reviewer + UX can work parallel
5. **Document decisions** - Why we chose approach X over Y
6. **Celebrate consensus** - Acknowledge when team agrees

---

## Troubleshooting

**If agents disagree endlessly:**
- Set iteration limit (max 3 rounds)
- Escalate to user for tiebreaker
- Architect makes final architecture call
- Reviewer has final security call

**If workflow is too slow:**
- Use "standard" or "quick" scope
- Reduce team to 2-3 agents
- Save full workflow for critical features

**If reviews are too shallow:**
- Reviewer: Use STRIDE framework explicitly
- UX: Use WCAG checklist explicitly
- Set minimum issues to find (e.g., 5+)

---

## Integration with External Tools

**If Codex plugin is available:**
Reviewer should invoke:
```
/codex:adversarial-review --scope=changed --depth=thorough "security vulnerabilities"
```

**If NotebookLM is available:**
Architect should research:
```
notebooklm ask "What are best practices for [feature]?"
```

**If Playwright is available:**
UX should test:
```
npx playwright test --headed
```

---

## Future Enhancements

**Potential Additions:**
- Agent 5: Performance Engineer (load testing, optimization)
- Agent 6: Documentation Specialist (API docs, guides)
- Automated handoffs (agent completion → auto-notify next)
- Integration with CI/CD (auto-trigger on PR)
- Metrics dashboard (track team performance)

---

## Reference Documentation

See detailed workflow documentation:
`dev-docs/AGENT-TEAM-WORKFLOW.md`

---

## Execution Instructions

When this skill is invoked:

1. **Parse arguments:**
   - feature_description (required)
   - scope (default: "standard")

2. **Create team:**
   - Spawn 4 agents with roles defined above
   - Create shared workspace directory

3. **Initialize workflow:**
   - Set Architect as team lead
   - Create shared task list
   - Notify all agents of their roles

4. **Execute phases:**
   - Phase 1: Architect creates plan
   - Phase 2: Implementer codes feature
   - Phase 3: Reviewer audits security
   - Phase 4: UX validates usability
   - Phase 5: Iterate until consensus

5. **Completion:**
   - Verify consensus (4/4 approval)
   - Generate summary report
   - Clean up workspace (optional)

---

## Task List Template

Create shared task list for coordination:

```markdown
# [Feature Name] - Task List

## Phase 1: Planning (Architect)
- [ ] Analyze requirements
- [ ] Research existing patterns
- [ ] Create implementation plan
- [ ] Define security requirements
- [ ] Set success criteria
- [ ] UX review of plan

## Phase 2: Implementation (Implementer)
- [ ] Create file structure
- [ ] Implement core logic
- [ ] Write tests
- [ ] Document code
- [ ] Self-review security checklist

## Phase 3: Security Review (Reviewer)
- [ ] STRIDE threat model
- [ ] OWASP Top 10 check
- [ ] Edge case analysis
- [ ] Code quality review
- [ ] Create fix list

## Phase 4: UX Review (UX Advocate)
- [ ] Usability testing
- [ ] Accessibility audit (WCAG AA)
- [ ] Documentation review
- [ ] Error handling check
- [ ] Refinement suggestions

## Phase 5: Iteration
- [ ] Address CRITICAL issues
- [ ] Address HIGH issues
- [ ] Address accessibility issues
- [ ] Re-validate fixes
- [ ] Achieve consensus (4/4)

## Consensus
- [ ] Architect approval
- [ ] Implementer approval
- [ ] Reviewer approval
- [ ] UX Advocate approval

Status: [IN PROGRESS / APPROVED]
```

---

**End of Skill Definition**

*This skill creates a robust, multi-agent workflow that significantly reduces the risk of security vulnerabilities, usability issues, and technical debt by requiring consensus from specialized agents before merging code.*

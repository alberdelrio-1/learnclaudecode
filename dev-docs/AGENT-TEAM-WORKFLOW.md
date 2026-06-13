# Agent Team Collaboration Workflow
**Multi-Agent Adversarial Development & Review System**

*Created: June 13, 2026*
*Status: Planning & Design Phase*

---

## Overview

This document outlines a sophisticated agent team workflow that combines planning, implementation, review, and usability refinement through multiple AI agents working in collaboration.

**Goal:** Create a robust development workflow where different agents specialize in different aspects of the development lifecycle, providing comprehensive coverage and adversarial validation.

---

## Agent Team Structure

### Team Composition (4 Agents)

```
┌─────────────────────────────────────────────────────────────┐
│                    AGENT TEAM WORKFLOW                       │
└─────────────────────────────────────────────────────────────┘

Agent 1: ARCHITECT           Agent 2: IMPLEMENTER
  ├─ Analyzes requirements     ├─ Writes code
  ├─ Creates plan              ├─ Follows architecture
  ├─ Defines architecture      ├─ Implements features
  └─ Sets success criteria     └─ Creates tests
           │                            │
           ▼                            ▼
Agent 3: ADVERSARIAL         Agent 4: UX ADVOCATE
  ├─ Security review           ├─ Usability questions
  ├─ Code quality audit        ├─ User experience review
  ├─ Edge case analysis        ├─ Documentation clarity
  └─ Challenges assumptions    └─ Accessibility check
           │                            │
           └────────────┬───────────────┘
                        ▼
                 ITERATION LOOP
                 (until consensus)
```

---

## Agent Roles & Responsibilities

### Agent 1: ARCHITECT (Planning Specialist)

**Primary Responsibilities:**
- Analyze user requirements and project context
- Create comprehensive implementation plan
- Define system architecture and design patterns
- Set success criteria and acceptance tests
- Identify potential challenges and dependencies

**Deliverables:**
- Detailed implementation plan (markdown)
- Architecture diagrams (if needed)
- File structure and module organization
- Success criteria checklist
- Risk assessment

**Skills/Tools:**
- `/doc-coauthoring` - Structured planning
- NotebookLM - Research existing patterns
- Notion MCP - Documentation

**Constraints:**
- NO code implementation
- Focus on "what" and "why", not "how"
- Must consider security from design phase

---

### Agent 2: IMPLEMENTER (Execution Specialist)

**Primary Responsibilities:**
- Implement features according to architecture plan
- Write clean, maintainable code
- Create unit tests and integration tests
- Follow established patterns and conventions
- Document code with inline comments

**Deliverables:**
- Implemented features (code files)
- Test suites (passing tests)
- Implementation notes
- Code documentation

**Skills/Tools:**
- Built-in code editing (Read, Write, Edit)
- Testing frameworks (Playwright, Jest, etc.)
- Git operations for commits

**Constraints:**
- MUST follow Architect's plan
- Cannot deviate from architecture without team discussion
- Must write tests for all new code
- Security-first mindset (no SQL injection, XSS, etc.)

---

### Agent 3: ADVERSARIAL REVIEWER (Security & Quality Specialist)

**Primary Responsibilities:**
- Challenge implementation approach
- Security vulnerability scanning (OWASP Top 10)
- Code quality and pattern analysis
- Edge case identification
- Performance bottleneck detection
- Assume code is broken and hunt for problems

**Deliverables:**
- Security audit report
- Code quality assessment
- List of vulnerabilities found
- Edge cases to test
- Recommended fixes (prioritized)

**Skills/Tools:**
- Built-in security analysis
- `/codex:adversarial-review` (if available)
- Grep for pattern detection
- IDE diagnostics MCP

**Review Checklist:**
- [ ] SQL Injection vulnerabilities
- [ ] XSS (Cross-Site Scripting)
- [ ] CSRF protection
- [ ] Authentication/Authorization flaws
- [ ] Insecure deserialization
- [ ] Race conditions
- [ ] Input validation
- [ ] Error handling
- [ ] Secrets in code
- [ ] Dependency vulnerabilities

**Mindset:**
- **Assume hostility:** Every input is malicious
- **Question everything:** Why this approach? What breaks?
- **Find the edge:** What happens at limits?
- **Challenge assumptions:** What did we miss?

---

### Agent 4: UX ADVOCATE (Usability & Refinement Specialist)

**Primary Responsibilities:**
- Evaluate user experience and usability
- Ask clarifying questions for unclear features
- Review documentation for clarity
- Accessibility compliance (WCAG)
- API/Interface design review
- Suggest refinements and improvements

**Deliverables:**
- Usability assessment report
- Clarifying questions list
- Accessibility compliance report
- Documentation improvement suggestions
- User-facing refinements

**Skills/Tools:**
- `/webapp-testing` - UI testing with Playwright
- Accessibility checkers
- Documentation review

**Review Focus:**
- **Usability:** Is it intuitive? Clear error messages?
- **Accessibility:** Keyboard navigation? Screen reader support?
- **Documentation:** Can a user understand how to use it?
- **Error handling:** Are errors helpful or cryptic?
- **Consistency:** Does it match existing patterns?

**Key Questions to Ask:**
- "What happens when a user does X?"
- "How does a user know Y?"
- "What if the user doesn't understand Z?"
- "Is this accessible to users with disabilities?"
- "Does this work on mobile?"

---

## Workflow Phases

### Phase 1: PLANNING (Architect leads)

**Input:** User requirement/feature request

**Process:**
1. Architect analyzes requirement
2. Architect creates detailed plan
3. Architect defines success criteria
4. UX Advocate reviews plan for user impact
5. Team discusses and approves plan

**Output:** Approved implementation plan

**Duration:** ~15-20% of total time

---

### Phase 2: IMPLEMENTATION (Implementer leads)

**Input:** Approved plan from Phase 1

**Process:**
1. Implementer creates file structure
2. Implementer writes code following plan
3. Implementer creates tests
4. Implementer documents code
5. Self-review against plan

**Output:** Implemented feature with tests

**Duration:** ~40-50% of total time

---

### Phase 3: ADVERSARIAL REVIEW (Reviewer leads)

**Input:** Implemented code from Phase 2

**Process:**
1. Reviewer performs security scan
2. Reviewer analyzes code quality
3. Reviewer identifies edge cases
4. Reviewer challenges approach
5. Reviewer creates prioritized fix list

**Output:** Security & quality audit report

**Critical Questions:**
- "Can this be exploited?"
- "What breaks at scale?"
- "What assumptions are wrong?"
- "What edge cases were missed?"

**Duration:** ~20-25% of total time

---

### Phase 4: USABILITY REFINEMENT (UX Advocate leads)

**Input:**
- Implemented code
- Review feedback

**Process:**
1. UX Advocate tests user flows
2. UX Advocate reviews error handling
3. UX Advocate checks accessibility
4. UX Advocate reviews documentation
5. UX Advocate suggests improvements

**Output:** Usability assessment & refinements

**Duration:** ~15-20% of total time

---

### Phase 5: ITERATION & CONSENSUS

**Input:** All feedback from Phases 3-4

**Process:**
1. Team reviews all feedback
2. Implementer addresses critical issues
3. Reviewer validates fixes
4. UX Advocate confirms improvements
5. Architect validates against plan
6. **Repeat until consensus**

**Consensus Criteria:**
- [ ] All security vulnerabilities addressed
- [ ] Code quality meets standards
- [ ] All tests passing
- [ ] Usability approved
- [ ] Documentation complete
- [ ] Accessibility compliant
- [ ] Architect confirms alignment with plan

**Output:** Production-ready feature

---

## Communication Protocol

### Inter-Agent Communication

**Architect → Implementer:**
```
"Here's the plan for [feature]. Key points:
- Architecture: [pattern]
- Files to create: [list]
- Success criteria: [list]
Proceed with implementation."
```

**Implementer → Reviewer:**
```
"Implementation complete. Files changed:
- [file1]: [description]
- [file2]: [description]
Ready for security and quality review."
```

**Reviewer → Team:**
```
"Adversarial review findings:
CRITICAL: [issues]
HIGH: [issues]
MEDIUM: [issues]
Recommend addressing CRITICAL before proceeding."
```

**UX Advocate → Team:**
```
"Usability assessment:
Questions: [list]
Accessibility issues: [list]
Suggestions: [list]
Approval status: [APPROVED/NEEDS WORK]"
```

### Escalation Protocol

**If agents disagree:**
1. Architect makes final call on architecture
2. Reviewer has veto power on security
3. UX Advocate has veto power on accessibility
4. Implementer proposes alternatives

**If blocked:**
- Team discusses in shared space
- Vote if necessary (3/4 consensus)
- User provides tiebreaker

---

## Technical Implementation

### Using Claude Code Agent Teams

**Enable Agent Teams:**
Already enabled in `~/.claude/settings.json`:
```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

**Starting the Team:**
```
"Create a team of 4 agents for feature development:
- Architect: Planning and architecture
- Implementer: Code implementation
- Reviewer: Adversarial security review
- UX Advocate: Usability and refinement"
```

**Task Distribution:**
Architect creates a shared task list that all agents can see and update.

### File Organization

**Shared Workspace:**
```
work/
├── plan.md                 # Architect's plan
├── implementation/         # Implementer's code
│   ├── src/
│   └── tests/
├── review/                 # Reviewer's findings
│   ├── security-audit.md
│   └── quality-report.md
└── ux/                     # UX findings
    ├── usability-report.md
    └── accessibility-checklist.md
```

### Tools Matrix

| Agent | Primary Tools | MCP Servers | Skills |
|-------|---------------|-------------|--------|
| **Architect** | Read, Grep, Glob | Notion, GitHub | /doc-coauthoring |
| **Implementer** | Read, Write, Edit, Bash | GitHub, IDE | Testing frameworks |
| **Reviewer** | Grep, Read, Bash | IDE (diagnostics) | /codex:adversarial-review |
| **UX Advocate** | Read, Bash | IDE | /webapp-testing |

---

## Example Workflow

### Scenario: Add User Authentication Feature

**User Request:**
"Add user authentication with email/password to the application"

---

#### Phase 1: Planning

**Architect Agent:**
```markdown
# User Authentication Implementation Plan

## Requirements Analysis
- Email/password authentication
- Secure password storage
- Session management
- Password reset functionality

## Architecture
- Use bcrypt for password hashing (10 rounds minimum)
- JWT tokens for session management
- Rate limiting on login attempts
- HTTPS required for all auth endpoints

## Files to Create
- src/auth/auth.service.js
- src/auth/auth.controller.js
- src/auth/auth.middleware.js
- tests/auth.test.js

## Security Requirements
- Passwords: bcrypt, salt rounds >= 10
- Sessions: JWT with 1hr expiry, refresh tokens
- Rate limiting: 5 failed attempts = 15min lockout
- Input validation: email format, password strength
- HTTPS only, no credentials in logs

## Success Criteria
- [ ] User can register with email/password
- [ ] User can login and receive JWT
- [ ] Passwords are hashed with bcrypt
- [ ] Rate limiting prevents brute force
- [ ] All tests pass
- [ ] No credentials in code or logs
```

**UX Advocate Review of Plan:**
```markdown
Questions for refinement:
1. What happens if user forgets password?
2. Should we have password strength requirements?
3. Email verification required?
4. How do we handle "remember me" functionality?
5. Error messages: specific or generic for security?

Suggestions:
- Add password strength meter
- Add "show password" toggle
- Accessibility: proper labels and ARIA
```

---

#### Phase 2: Implementation

**Implementer Agent:**
```javascript
// src/auth/auth.service.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  async register(email, password) {
    // Validate input
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    if (!this.isStrongPassword(password)) {
      throw new Error('Password does not meet requirements');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store user (implementation depends on database)
    // ... database logic ...

    return { success: true };
  }

  async login(email, password) {
    // Rate limiting check
    if (await this.isRateLimited(email)) {
      throw new Error('Too many login attempts. Try again in 15 minutes.');
    }

    // Retrieve user from database
    const user = await this.getUserByEmail(email);

    if (!user) {
      // Generic error for security
      throw new Error('Invalid credentials');
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isValid) {
      await this.incrementFailedAttempts(email);
      throw new Error('Invalid credentials');
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    await this.resetFailedAttempts(email);

    return { token };
  }

  // ... other methods ...
}

module.exports = AuthService;
```

---

#### Phase 3: Adversarial Review

**Reviewer Agent:**
```markdown
# Security Audit: Authentication System

## CRITICAL Issues

### 1. JWT_SECRET Exposure Risk
- **Issue:** JWT_SECRET stored in environment variable
- **Risk:** If .env file committed to git, secret is exposed
- **Fix:** Add .env to .gitignore, document in setup guide
- **Priority:** CRITICAL

### 2. No HTTPS Enforcement
- **Issue:** Code doesn't enforce HTTPS
- **Risk:** Credentials transmitted in plaintext over HTTP
- **Fix:** Add middleware to reject non-HTTPS in production
- **Priority:** CRITICAL

## HIGH Issues

### 3. Rate Limiting Not Implemented
- **Issue:** isRateLimited() method referenced but not implemented
- **Risk:** Brute force attacks possible
- **Fix:** Implement rate limiting with Redis or in-memory store
- **Priority:** HIGH

### 4. Generic Error Messages May Leak Info
- **Issue:** Timing attacks possible (bcrypt comparison time varies)
- **Risk:** Attacker can determine if email exists
- **Fix:** Add artificial delay to failed logins
- **Priority:** HIGH

## MEDIUM Issues

### 5. No Session Invalidation
- **Issue:** No logout functionality or token revocation
- **Risk:** Stolen tokens valid until expiry
- **Fix:** Implement token blacklist or short-lived tokens + refresh
- **Priority:** MEDIUM

## Edge Cases to Test

- [ ] What happens with extremely long passwords? (DoS via bcrypt)
- [ ] What if database is down during registration?
- [ ] What if JWT_SECRET is undefined?
- [ ] SQL injection in email parameter?
- [ ] XSS in email/password fields?
- [ ] Concurrent login attempts?
- [ ] Token reuse after logout?

## Recommendations

1. **Implement ALL critical fixes before merge**
2. Add helmet.js for security headers
3. Add CORS configuration
4. Log authentication events (but NOT credentials)
5. Add monitoring for failed login spikes
6. Consider 2FA for sensitive accounts
```

---

#### Phase 4: Usability Refinement

**UX Advocate Agent:**
```markdown
# Usability Assessment: Authentication

## User Experience Issues

### Registration Flow
❌ **No password strength indicator**
- User doesn't know requirements until failure
- Recommendation: Add real-time strength meter

❌ **No email confirmation**
- User might typo email address
- Recommendation: Add "confirm email" field or send verification

✅ **Good:** Clear error messages

### Login Flow
❌ **Generic error exposes no info**
- Good for security, bad for UX
- Recommendation: "Email or password incorrect" is acceptable

❌ **No "forgot password" link**
- User has no recovery path
- Recommendation: Add password reset flow (Phase 2 feature?)

❌ **No "remember me" option**
- User must login every hour
- Recommendation: Add optional extended session

### Accessibility

✅ **Good:** Proper error handling
❌ **Missing:** ARIA labels for screen readers
❌ **Missing:** Keyboard navigation not tested
❌ **Missing:** Focus management on errors

### Documentation

❌ **Missing:** API documentation
❌ **Missing:** Error code reference
❌ **Missing:** Setup instructions for JWT_SECRET

## Recommended Refinements

1. **Add password requirements UI**
   - "8+ characters, 1 uppercase, 1 number, 1 special"
   - Real-time validation feedback

2. **Add forgot password flow**
   - Email reset link
   - Time-limited reset tokens

3. **Improve accessibility**
   - Add ARIA labels: `aria-label="Email address"`
   - Add `aria-invalid="true"` on errors
   - Focus on first error field

4. **Add API documentation**
   - POST /auth/register - parameters, responses
   - POST /auth/login - parameters, responses
   - Include example requests

## User Questions to Answer

1. "How do I reset my password?" → Not possible yet
2. "Why was my password rejected?" → Need strength indicator
3. "Can I stay logged in?" → No, 1hr max currently
4. "Is my data secure?" → Need security docs
```

---

#### Phase 5: Iteration & Consensus

**Implementer addresses feedback:**

1. ✅ Add .env to .gitignore
2. ✅ Add HTTPS enforcement middleware
3. ✅ Implement rate limiting with memory store
4. ✅ Add artificial delay to failed logins
5. ✅ Add logout endpoint with token blacklist
6. ✅ Add password strength requirements UI
7. ✅ Add ARIA labels
8. ✅ Add API documentation

**Reviewer validates fixes:**
```
✅ All CRITICAL issues resolved
✅ All HIGH issues resolved
✅ Rate limiting tested - working
✅ HTTPS enforcement tested - working
⚠️  MEDIUM: Token blacklist needs Redis for production
→ Documented in tech debt backlog
```

**UX Advocate validates:**
```
✅ Password strength indicator added
✅ Accessibility improved
✅ API docs complete
⚠️  Forgot password still missing
→ Agreed: Separate feature for Phase 2
```

**Architect validates:**
```
✅ All security requirements met
✅ Architecture followed
✅ Tests comprehensive
✅ Documentation complete
→ APPROVED FOR MERGE
```

**CONSENSUS ACHIEVED** ✅

---

## Workflow Metrics

### Success Metrics

**Quality Metrics:**
- Security vulnerabilities: 0 CRITICAL, 0 HIGH
- Test coverage: >= 80%
- Code review approval: 4/4 agents
- Accessibility: WCAG AA compliant

**Process Metrics:**
- Planning completeness: Architect approval
- Implementation accuracy: <= 2 major deviations from plan
- Review thoroughness: >= 10 issues identified
- Usability score: UX approval

**Efficiency Metrics:**
- Iterations to consensus: <= 3
- Rework percentage: <= 20%
- Blocking issues: 0

---

## Advantages of This Workflow

### 1. **Comprehensive Coverage**
- Architecture: Planned upfront
- Security: Adversarial review catches vulnerabilities
- Quality: Code review ensures standards
- Usability: UX advocate ensures user-friendliness

### 2. **Reduced Blind Spots**
- Multiple perspectives on same code
- Adversarial mindset catches edge cases
- Usability focus prevents developer-centric design

### 3. **Built-in Documentation**
- Plan documents intent
- Reviews document decisions
- UX notes document user impact

### 4. **Knowledge Sharing**
- Each agent learns from others
- Review feedback teaches best practices
- Cross-functional awareness

### 5. **Quality Gates**
- Can't skip security review
- Can't ignore usability
- Can't deviate from architecture without approval

---

## Limitations & Considerations

### Resource Intensive
- 4 agents = 4x context windows
- Requires significant computational resources
- Best for critical features, not minor changes

### Coordination Overhead
- Requires clear communication protocol
- Can slow down simple changes
- May over-engineer trivial features

### When NOT to Use This Workflow

**Skip for:**
- Typo fixes
- Documentation updates
- Configuration changes
- Obvious bug fixes

**Use simplified workflow:**
- 2 agents: Implementer + Reviewer
- Or: Single agent with checklist

### When TO Use This Workflow

**Use for:**
- Security-critical features (auth, payments, PII)
- Public-facing APIs
- Core architecture changes
- High-risk refactoring
- Compliance-critical code

---

## Future Enhancements

### Potential Additions

**Agent 5: Performance Engineer**
- Load testing
- Performance profiling
- Optimization recommendations
- Scalability analysis

**Agent 6: Documentation Specialist**
- API documentation
- User guides
- Code comments
- Runbooks

**Integration with External Tools**
- Codex adversarial review (when available)
- SonarQube for code quality
- Snyk for dependency scanning
- Lighthouse for performance

### Automation Opportunities

**Automated Handoffs:**
- Architect finishes → Auto-notify Implementer
- Implementer commits → Auto-trigger Reviewer
- Reviews complete → Auto-notify Implementer

**Automated Checks:**
- Pre-review: Run linters, tests
- Post-implementation: Run security scanners
- Pre-consensus: Verify all checklists complete

---

## Implementation Checklist

### Setup

- [ ] Verify Agent Teams enabled in settings
- [ ] Create shared workspace directory structure
- [ ] Define communication templates
- [ ] Create review checklists
- [ ] Document workflow for team

### Per-Feature Workflow

- [ ] User provides requirement
- [ ] Architect creates plan
- [ ] UX reviews plan
- [ ] Team approves plan
- [ ] Implementer codes feature
- [ ] Implementer writes tests
- [ ] Reviewer performs security audit
- [ ] Reviewer performs quality review
- [ ] UX tests usability
- [ ] UX checks accessibility
- [ ] Implementer addresses feedback
- [ ] All agents validate fixes
- [ ] Achieve 4/4 consensus
- [ ] Merge to main

---

## Conclusion

This agent team workflow provides a robust, multi-perspective approach to software development that significantly reduces the risk of security vulnerabilities, usability issues, and technical debt.

By assigning specialized roles to different agents and requiring consensus before merging, we create multiple safety nets that catch issues before they reach production.

**Key Principle:** Multiple AIs challenging each other produce better results than a single AI, even a very capable one.

---

**Next Steps:**
1. Create custom skill to orchestrate this workflow
2. Test on real feature implementation
3. Refine based on learnings
4. Document lessons learned

---

*End of Workflow Documentation*

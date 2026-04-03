# Blog Post Fill-Out Tasks: Agentic Workflows

This document contains prompts to gather content for each section of the blog post. Work through these sequentially, using the `ask` tool to collect answers.

---

## 1. Introduction Hook

**Section:** Opening paragraph
**Context:** Similar to how the massage therapy post started with "By far my favorite thing about software development is building real tools...", we need an engaging hook about AI agents transforming your development workflow.

**Prompt:**

```
Write a 2-3 paragraph introduction for the agentic workflows blog post.

Include:
- Your journey into using AI coding agents
- What problem or pain point led you to adopt this workflow
- Why this topic matters now (timing, evolution of tools)
- A hint at what makes your approach unique (multi-agent refinement, custom MCP tools)

Keep the tone personal and engaging, like you're explaining to a fellow developer.
```

---

## 2. The Landscape

**Section:** Current state context
**Context:** This section sets up why you chose these particular tools over alternatives.

**Prompt:**

```
Describe the current landscape of AI-assisted development tools.

Include:
- What options are available (briefly mention alternatives you considered)
- Why you landed on your specific stack (GitHub Copilot Pro, Claude Code, Opencode.ai)
- What gap in the market or your workflow this combination fills
- How the landscape has changed recently (2024-2025)

2-3 paragraphs.
```

---

## 3. GitHub Copilot Pro

**Section:** Agent Ecosystem > Code Agents
**Context:** First of three code agent descriptions.

**Prompt:**

```
Describe your use of GitHub Copilot Pro:

- What specific tasks do you use it for?
- What are its strengths in your workflow?
- Typical use cases or examples
- When do you reach for Copilot vs other agents?

Aim for 1-2 paragraphs with concrete examples.
```

---

## 4. Claude Code

**Section:** Agent Ecosystem > Code Agents
**Context:** Second code agent description.

**Prompt:**

```
Describe your use of Claude Code:

- What specific tasks do you use it for?
- What are its strengths compared to Copilot?
- Typical use cases or examples
- When do you reach for Claude Code vs other agents?
- Any unique capabilities it has?

Aim for 1-2 paragraphs with concrete examples.
```

---

## 5. Opencode.ai

**Section:** Agent Ecosystem > Code Agents
**Context:** Third code agent description.

**Prompt:**

```
Describe your use of Opencode.ai:

- What specific tasks do you use it for?
- What are its strengths compared to Copilot and Claude Code?
- Typical use cases or examples
- When do you reach for Opencode.ai?
- What makes it different from the other two?

Aim for 1-2 paragraphs with concrete examples.
```

---

## 6. Playwright MCP

**Section:** Agent Ecosystem > MCP Tools > Off-the-Shelf
**Context:** First off-the-shelf MCP tool.

**Prompt:**

```
Describe how you use the Playwright MCP tool:

- What browser automation tasks do you use it for?
- How does it integrate into your development workflow?
- Specific examples of when it's been valuable
- How agents interact with it

1 paragraph with a concrete example.
```

---

## 7. PostHog MCP

**Section:** Agent Ecosystem > MCP Tools > Off-the-Shelf
**Context:** Second off-the-shelf MCP tool.

**Prompt:**

```
Describe how you use the PostHog MCP tool:

- What analytics/product insights do you pull with it?
- How does it integrate into your workflow?
- Specific examples of decisions it's informed
- How agents interact with it

1 paragraph with a concrete example.
```

---

## 8. Google Calendar Access MCP

**Section:** Agent Ecosystem > MCP Tools > Custom-Built
**Context:** First custom MCP tool you built.

**Prompt:**

```
Describe your custom Google Calendar Access MCP tool:

- Why did you build this instead of using an off-the-shelf solution?
- What specific use cases does it solve?
- What integration patterns do you use with it?
- Example of an agent using it to accomplish a task
- Any technical challenges in building it?

2 paragraphs with examples.
```

---

## 9. Gmail Access MCP

**Section:** Agent Ecosystem > MCP Tools > Custom-Built
**Context:** Second custom MCP tool you built.

**Prompt:**

```
Describe your custom Gmail Access MCP tool:

- Why did you build this instead of using an off-the-shelf solution?
- What specific use cases does it solve?
- What integration patterns do you use with it?
- Example of an agent using it to accomplish a task
- Any technical challenges in building it?

2 paragraphs with examples.
```

---

## 10. Multi-Agent Planning Loop

**Section:** Multi-Agent Workflow Process
**Context:** This is a key differentiator of your approach.

**Prompt:**

```
Describe your multi-agent refinement process in detail:

For the section "The Planning Loop" with three subsections:

1. Initial Planning with Claude #1
   - How do you structure initial prompts?
   - What do you ask for in the planning phase?
   - What format do you get back?

2. Refinement with Claude #2
   - Why pass to a fresh context?
   - What prompt do you give Claude #2?
   - What are you looking for in the validation?

3. Iterative Improvement
   - How do you cycle answers back to Claude #1?
   - When do you stop iterating?
   - What improvements do you typically see?

Include a concrete example of this process for a real feature you've built.

Aim for 3-4 paragraphs total, one per subsection plus the example.
```

---

## 11. Pre-commit Hooks

**Section:** Code Quality Enforcement
**Context:** Your automated quality control system.

**Prompt:**

```
Describe your pre-commit hook setup:

- What hooks do you have configured?
- What checks do they run (linting, type checking, tests, etc.)?
- Your philosophy on pre-commit hooks with AI-generated code
- How they've saved you from merging bad code
- Any challenges or refinements you've made?

Include the 250+ line refactor hook details:
- How it works
- Why you chose 250 lines as the threshold
- Benefits you've seen
- Any challenges or false positives?

2-3 paragraphs total.
```

---

## 12. Stack Choices for Agent Development

**Section:** The Stack
**Context:** Why these specific technologies work well with agents.

**Prompt:**

```
For each technology in your stack, explain why it works well with AI agents:

- Next.js 15/16: Why this framework for agent-assisted development?
- Tailwind CSS: How do agents work with utility-first CSS? Benefits?
- HeadlessUI & ShadCN: What makes these component libraries agent-friendly?
- TypeScript: How does type safety improve agent outputs?
- Vercel: How does deployment/CI/CD work with agent-generated code?

Aim for 1-2 sentences per technology. Focus on the agent-specific benefits.
```

---

## 13. Challenge: Agent Hallucinations

**Section:** Struggles and Solutions > Challenge 1
**Context:** First of four challenges.

**Prompt:**

```
Describe a specific challenge with agent hallucinations or code quality:

**Problem:**
- What was the issue?
- How did it manifest?
- Why was it a problem?

**Solution:**
- How did pre-commit hooks help?
- How does multi-agent review catch this?
- What specific checks or processes prevent this?

Use a concrete example. 1-2 paragraphs.
```

---

## 14. Challenge: Context Management

**Section:** Struggles and Solutions > Challenge 2
**Context:** Second challenge.

**Prompt:**

```
Describe the challenge of maintaining context across different agents:

**Problem:**
- What gets lost when switching agents?
- How does this cause issues?
- Specific example of context loss causing problems?

**Solution:**
- Your workflow for maintaining context
- Tools or techniques you use
- How you've improved this over time

Use a concrete example. 1-2 paragraphs.
```

---

## 15. Challenge: Speed vs Understanding

**Section:** Struggles and Solutions > Challenge 3
**Context:** Third challenge.

**Prompt:**

```
Describe the challenge of balancing speed with understanding agent-generated code:

**Problem:**
- The temptation to merge code you don't fully understand
- Risks you've encountered
- How this has bitten you

**Solution:**
- Your process for ensuring you understand code
- How you force yourself to review properly
- Tools or techniques that help

Use a concrete example. 1-2 paragraphs.
```

---

## 16. Challenge: Tool Integration

**Section:** Struggles and Solutions > Challenge 4
**Context:** Fourth challenge.

**Prompt:**

```
Describe challenges with integrating multiple tools and agents:

**Problem:**
- Complexity of managing multiple tools
- Configuration challenges
- Integration headaches

**Solution:**
- How MCP standardization helped
- Your approach to tool management
- Benefits you've seen

Use a concrete example. 1-2 paragraphs.
```

---

## 17. Integrated Development Flow

**Section:** Integrated Development Flow
**Context:** How all pieces work together.

**Prompt:**

```
Describe how all these pieces work together in a typical development session:

Walk through each layer and its role:
- Agent Layer: How different agents are used
- Automation Layer: When hooks and CI/CD trigger
- Tool Layer: How MCP integrations are invoked
- Quality Layer: How multi-agent review happens
- Deployment Layer: How Vercel fits in

Provide a concrete example: "When I built [feature X]..."

2-3 paragraphs showing the full flow.
```

---

## 18. Feature Development Journey

**Section:** Usage Patterns > Feature Development Journey
**Context:** Typical workflow for building a feature.

**Prompt:**

```
Walk through your process for building a new feature with agents:

1. Ideation: How you start with agents
2. Planning: Multi-agent refinement process
3. Implementation: Which agent for which task
4. Review: Automated checks and manual review
5. Deployment: CI/CD flow

Use a specific feature as an example (maybe one from your projects).

2-3 paragraphs.
```

---

## 19. Daily Development Flow

**Section:** Usage Patterns > Daily Development Flow
**Context:** How you structure a typical day.

**Prompt:**

```
Describe a typical development day using this workflow:

- Morning Planning: How you structure your day with agents
- Active Development: Agent switching strategies, when you use which tool
- Quality Checks: When you run hooks, tests, etc.

Make it concrete - walk through a real day.

2 paragraphs.
```

---

## 20. Technical Lessons

**Section:** Takeaways > Technical Lessons
**Context:** Key technical insights you've gained.

**Prompt:**

```
Expand on these technical lessons with specific examples:

- Embrace Multiple Agents: Why different tools for different tasks matters
- Build Custom Tools: When and why to create MCP servers vs using off-the-shelf
- Automate Quality Control: Why hooks and CI/CD are essential with agents
- Maintain Context Awareness: Importance of understanding what agents generate

For each, provide a 1-2 sentence explanation with a concrete example or benefit you've experienced.
```

---

## 21. Workflow Lessons

**Section:** Takeaways > Workflow Lessons
**Context:** Process and methodology insights.

**Prompt:**

```
Expand on these workflow lessons with specific examples:

- Multi-Agent Review Works: Benefits of fresh context
- Type Safety Saves Time: How TypeScript catches agent mistakes
- Pre-commit Hooks Are Essential: Maintaining standards
- Choose the Right Agent for the Task: When to use which tool

For each, provide a 1-2 sentence explanation with a concrete example or benefit you've experienced.
```

---

## 22. Future Evolution

**Section:** Takeaways > Future Evolution
**Context:** Where you're taking this workflow next.

**Prompt:**

```
Describe your plans for evolving this workflow:

- What custom MCP tools are you planning to build?
- How do you want to enhance multi-agent orchestration?
- What deeper integration patterns are you exploring?
- What new agent capabilities are you excited about?

Be specific about near-term plans (next 3-6 months).

1-2 paragraphs.
```

---

## 23. Conclusion

**Section:** Final wrap-up
**Context:** Bring it all home.

**Prompt:**

```
Write a conclusion for the blog post:

- How has this workflow changed your development practice?
- What's the biggest insight you've gained about working with AI agents?
- What advice would you give to developers starting with agent-assisted development?
- What excites you most about this future?

Keep it punchy and inspirational. 2-3 paragraphs.
```

---

## Usage Instructions

**Using the `ask` tool to collect responses:**

1. Work through these prompts sequentially
2. For each section, use the `ask` tool with the `-m` flag to pass the prompt
3. Example: `ask -m "Write a 2-3 paragraph introduction for the agentic workflows blog post..."`
4. The user will answer in VSCode, responses are archived to `~/claude-conversations/`
5. Take the user's response and insert it into the corresponding section in `agentic-workflows-modern-development.mdx`
6. Check off completed sections below in the Progress Tracking checklist

**Workflow:**

- Copy the prompt text from each section below
- Run: `ask -m "PASTE_PROMPT_HERE"`
- Wait for user to answer and close VSCode
- Insert response into blog post
- Move to next prompt

## Progress Tracking

- [ ] 1. Introduction Hook
- [ ] 2. The Landscape
- [ ] 3. GitHub Copilot Pro
- [ ] 4. Claude Code
- [ ] 5. Opencode.ai
- [ ] 6. Playwright MCP
- [ ] 7. PostHog MCP
- [ ] 8. Google Calendar Access MCP
- [ ] 9. Gmail Access MCP
- [ ] 10. Multi-Agent Planning Loop
- [ ] 11. Pre-commit Hooks
- [ ] 12. Stack Choices
- [ ] 13. Challenge: Agent Hallucinations
- [ ] 14. Challenge: Context Management
- [ ] 15. Challenge: Speed vs Understanding
- [ ] 16. Challenge: Tool Integration
- [ ] 17. Integrated Development Flow
- [ ] 18. Feature Development Journey
- [ ] 19. Daily Development Flow
- [ ] 20. Technical Lessons
- [ ] 21. Workflow Lessons
- [ ] 22. Future Evolution
- [ ] 23. Conclusion

---

## Notes

- Each prompt is designed to give enough context for a standalone answer
- Responses can be edited/refined after collection
- Some sections may inspire additions or reorganization
- Images should be added to `/public/static/images/agentic-workflows/` and referenced in the post

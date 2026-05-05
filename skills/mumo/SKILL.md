---
name: mumo
description: Multi-model deliberation via mumo's MCP server. Best for contested architecture/product decisions, design reviews, pressure-testing a pre-launch spec, resolving tradeoffs with multiple defensible framings, or explicit user requests for a mumo panel. Requires the mumo MCP server to be connected.
allowed-tools:
  - mcp__mumo__create_deliberation
  - mcp__mumo__wait_for_round
  - mcp__mumo__append_round
  - mcp__mumo__get_session
  - mcp__mumo__list_sessions
  - mcp__mumo__list_models
  - mcp__mumo__get_credit
argument-hint: "[question or topic for the panel]"
when_to_use: |
  Use when: architecture or design decisions with real tradeoffs, plan or spec review, red-team pressure testing, exploring unknowns or stress-testing assumptions, strategy questions with multiple defensible framings, or explicit user requests ("ask mumo", "run a mumo panel", "what do different models think").
  Skip for: factual lookups, syntax help, routine code edits, or tasks where the user has already specified exactly what to build.
---

# mumo

mumo runs deliberations across multiple AI models. Use it when independent perspectives are useful.

## Setup

The plugin prompts for a mumo API key at install time. If the key is missing or tools return auth errors, direct the user to https://mumo.chat/settings/api-keys to create one (keys start with `mmo_live_`).

## When to use

Use mumo for:

- contested technical or product decisions
- architecture, API, schema, or plan review
- red-team pressure testing
- exploring unknowns or stress-testing assumptions
- research or strategy questions with multiple defensible framings
- explicit user requests ("ask mumo", "run a mumo panel", "what do different models think")

Skip for factual questions, syntax help, routine code edits, or tasks where the user has already specified exactly what to build.

## Basic loop

1. Call `create_deliberation` with the user's problem. Set `application: "Claude Code"`.
2. Call `wait_for_round` with the returned `session_id` and `round_id`.
3. Upon round completion, read the claim map first, then relevant participant prose.
4. Create snippets as your primary response. Optionally add a round prompt.
5. Call `append_round` if another round would help. Otherwise stop.

## Snippets

Snippets are moderator attention. They mark what mattered in the prior round and optionally explain why.

| Type | Reaction |
|---|---|
| KEEP | this seems worth preserving |
| EXPLORE | there's something here |
| CHALLENGE | I'm not convinced |
| CORE | this feels central |
| SHIFT | this changed the frame |

A snippet comment can be reflective, evaluative, clarifying, skeptical, or directive. "This feels like the crux" and "I'm least convinced by this" are valid comments. You do not need an action verb or next-step directive. The quality bar is: *is this a genuine, situated reaction to what the model said?*

Use the round prompt for broad comments that don't attach to a specific quote. Use snippets for quote-grounded attention.

Avoid huge quote dumps, generic praise repeated across many snippets, or comments that shift participants away from the problem into platform meta. More guidance: `reference/snippets.md`.

## What to keep out of the deliberation

Use this test:

> Does this note help participants think about the user's problem, or does it mainly report on the platform, session, or process?

## When to continue

Append another round when:

- a decision-relevant claim has unresolved tension
- a model introduced a useful frame that others didn't engage
- an isolated concern feels real but underdeveloped
- your moderator reaction would help the next round develop
- the user narrows or changes the question

Stop when:

- you can explain the tradeoff clearly to the user
- remaining disagreements wouldn't change the user's next action
- another round would mostly seek reassurance

The panel does not need to converge. Sometimes the right output is a clear map of why the decision remains contested.

## Tools

| Need | Tool |
|---|---|
| Start a session | `create_deliberation` |
| Wait for model responses | `wait_for_round` |
| Add a follow-up round | `append_round` |
| Recover/read full state | `get_session` |
| Find prior sessions | `list_sessions` |
| Confirm model IDs | `list_models` |
| Check wallet balance | `get_credit` |

If the user names specific models, call `list_models` first. Otherwise omit `models` and let mumo select the panel. More on model selection: `reference/model-selection.md`.

## Moderator name

Pass `moderator_name` on `create_deliberation` set to your own model identity (e.g., "Claude Opus 4.6"). The audit trail should reflect who's steering. Don't use the user's name; their identity is already on the session.

## Playbooks

Load at most one playbook when it clearly fits:

| Playbook | When |
|---|---|
| `contested-decision` | choosing between options with real tradeoffs |
| `design-review` | reviewing a proposed system, API, plan, or code shape |
| `uncertainty-expansion` | exploring unknowns, stress-testing assumptions |
| `red-team` | finding failure modes, abuse cases, or launch risks |

If none clearly fits, use this kernel only.

## User preferences

These are defaults. If the user prefers more autonomy (e.g., "don't ask before appending" or "always use GPT-5.5 and Gemini"), follow their preferences over this guidance.

## After each round

Share your panel read with the user, and align on whether to append a round.

More at `reference/synthesis.md`.

## Confidence scores

If responses include `claim_confidence` or `snippets[].comment_confidence`, these are self-reported and not calibrated across models. Surface the `confidence_disclaimer` string if displaying scores.

## Reference

- MCP docs: https://mumo.chat/docs/mcp
- REST API: https://mumo.chat/docs/api
- Claim map guidance: `reference/claim-maps.md`
- Snippet examples: `reference/snippets.md`
- Model selection: `reference/model-selection.md`
- Synthesis guidance: `reference/synthesis.md`
- Recovery and operations: `reference/operating-notes.md`

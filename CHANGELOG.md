# Changelog

## 0.4.0 — 2026-06-19

Baseline content release for the coordinated 0.4.0 client alignment (Trello #245). MCP tool surface unchanged, so `server.json` stays at 0.2.0.

- `SKILL.template.md`: added the "Prompt voice" section (first-person operator framing), the author-bias counter in "When to use," and a `claim_map_url` surfacing line in "After each round."
- `scripts/clients/_shared.json`: `DESCRIPTION_PREFIX` dropped the "contested" gate; now leads with pre-implementation review (auth, security, tokens, payments, data exposure, migrations).
- `scripts/clients/claude-code/frontmatter.yml`: `when_to_use` rewritten to match; skip rule now keys on "no ambiguity over the correctness of your approach."
- `scripts/clients/hermes/frontmatter.yml`: version 0.1.5 → 0.4.0 (was lagging the shipped 0.1.6).
- Rendered to all six clients via `build-skill.js`.

## 0.2.2 — 2026-05-05

Removed `agents/mumo-moderator.md`. The agent positioned itself as the moderator role, but moderation is exactly what should stay with the primary agent — it owns the conversational context, the user's intent, and the cross-round steering decisions. A subagent that ran a "complete brief" panel was a thin operational helper at best, and the framing risked the primary agent over-delegating.

- `agents/` directory removed.
- README updated to drop the moderator subagent line.

## 0.2.1 — 2026-05-04

Plugin architecture — mumo now installs and behaves like a native Claude Code capability.

- **API key via keychain**: `userConfig` with `sensitive: true` prompts for the key at install time and stores it in the system keychain. No more `export MUMO_API_KEY` in your shell.
- **No permission prompts**: `allowed-tools` in SKILL.md pre-approves all seven MCP tools. Deliberations run without interruption.
- **Moderator agent**: `agents/mumo-moderator.md` — a dedicated subagent with tool restrictions, high effort, and the mumo skill preloaded. Can run deliberations in an isolated context.
- **Auto-triggering**: `when_to_use` frontmatter gives Claude richer context for deciding when to reach for mumo without being asked.
- **Inline invocation**: `argument-hint` enables passing a question directly when invoking the skill.

## 0.2.0 — 2026-05-04

Architecture rewrite. SKILL.md becomes a lean kernel; detailed guidance moves to on-demand files.

- `skills/mumo/SKILL.md` — rewritten as a compact kernel: deliberation loop, snippet-as-attention doctrine, non-forwarding test, continuation/stop rules, playbook index, user-preferences section. Synthesis guidance deferred to reference.
- `skills/mumo/playbooks/` — four cognitive-shape playbooks: `contested-decision`, `design-review`, `uncertainty-expansion`, `red-team`. Loaded at most one per session when the shape clearly fits.
- `skills/mumo/reference/` — five reference docs: `claim-maps`, `snippets`, `model-selection`, `synthesis`, `operating-notes`. Loaded on demand for extended mechanics.
- `plugin.json` bumped to 0.2.0, homepage changed to `/install`.
- `server.json` simplified to tool list + description, bumped to 0.2.0.
- `wait_for_round` added to README tool list (was missing since 0.1.3).

## 0.1.3 — 2026-04-24

- Added `get_credit` as the sixth MCP tool — fetches the caller's wallet: effective balance, per-bucket breakdown (free / subscription / refill with reset timing + rollover cap + subscription status), autorefill state, and FIFO debit order. Mirrors the new `GET /api/credit` REST endpoint. README tool list and SKILL.md tool map updated to reflect the sixth tool.

## 0.1.2 — 2026-04-23

Skill content update, no runtime behavior change. Mirrors the MCP doc demotion shipping on mumo.chat.

- `skills/mumo/SKILL.md` — dropped the promoted "Modes" (autonomous) and "Surfacing to humans" (distill) sections. Both remain valid API inputs but aren't default-path on MCP, so agents no longer see them as suggested surfaces.
- Default workflow opener no longer passes `rounds: 1` — `single_shot` labeling was artificially constraining for agent loops where rounds unfold organically via `append_round`.
- Tool map renamed the `get_session` row from "Inspect state / poll autonomous" to "Read session state."

## 0.1.1 — 2026-04-22

Listing refresh, no runtime behavior change. Brings the Claude Code + Cowork listing into line with the cross-marketplace positioning we locked down in [`mumo-vscode@0.1.1`](https://github.com/mumo-chat/mumo-vscode) and [`mumo-cursor@0.1.6`](https://github.com/mumo-chat/mumo-cursor).

- `plugin.json` description rewritten to the value-prop hero: *"Multi-model responses + cross-model reactions. Want more rounds? Context carries automatically. Stop when you have what you need."* Same string in `server.json` (MCP Registry surface) to keep the three description sources consistent.
- README gains a bolded hero matching the manifest and a "When to use" block before install — research on Claude Cowork listings found the top-performing plugins (Sales, Finance, Productivity) lead with use cases, not install steps.
- Model list now explicitly names all seven providers (Claude, GPT, Gemini, Grok, Qwen, GLM, Kimi) instead of "Claude, GPT, Gemini, Grok, Qwen, and more."
- "Install — VS Code (GitHub Copilot)" section now points at the shipped [`mumo.mumo-vscode`](https://marketplace.visualstudio.com/items?itemName=mumo.mumo-vscode) Marketplace extension. The manual `mcp.json` paste block is removed — the extension handles MCP registration and `SecretStorage` natively.
- Deliberately **no screenshots added.** Claude Code and Cowork plugin listings are README-only surfaces (no Marketplace-style inline image rendering); adding PNGs would add maintenance cost without user-visible payoff.

## 0.1.0 — 2026-04-21

Initial release.

- `.claude-plugin/plugin.json` manifest for Claude Code + Cowork distribution.
- `.mcp.json` wiring remote streamable-HTTP MCP server at `https://mumo.chat/api/mcp` with `${MUMO_API_KEY}` bearer auth.
- `server.json` metadata for MCP Registry (`registry.modelcontextprotocol.io`) submission.
- `skills/mumo/SKILL.md` — auto-triggering skill, shared canonical source with `mumo-chat/mumo-cursor`.

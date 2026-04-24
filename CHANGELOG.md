# Changelog

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

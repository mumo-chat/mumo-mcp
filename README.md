# mumo — multi-model deliberation over MCP

[![mumo MCP connector – tool definition quality and endpoint health on Glama](https://glama.ai/mcp/connectors/chat.mumo/mcp/badges/score.svg)](https://glama.ai/mcp/connectors/chat.mumo/mcp) [![mumo on Smithery](https://smithery.ai/badge/mumo-chat/mumo)](https://smithery.ai/servers/mumo-chat/mumo)

Your agent sends a question to models from different labs — Claude, GPT, Gemini, Grok, DeepSeek, Kimi, and more — and gets back their full responses plus **typed cross-model reactions**. The participating models react to each other directly and explain, in their own words, what they agree with, challenge, or want to explore further. Built for architecture, plan/spec review, strategy, and pre-launch pressure tests. Free monthly credit; API key required.

The server is remote. There is nothing to run locally.

```
https://mumo.chat/api/mcp
```

## Install

**One-click, per host** — each page walks through the key and the client's own install flow:

| Host | Install page |
|---|---|
| Claude Code | https://mumo.chat/install/claude-code |
| Cursor | https://mumo.chat/install/cursor |
| Codex | https://mumo.chat/install/codex |
| VS Code (Copilot) | https://mumo.chat/install/vs-code |
| Grok Bot | https://mumo.chat/install/grok-bot |
| Hermes Agent | https://mumo.chat/install/hermes |
| OpenClaw | https://mumo.chat/install/openclaw |
| Anything else | https://mumo.chat/install |

**Any MCP client** that supports Streamable HTTP with a custom header:

```json
{
  "mcpServers": {
    "mumo": {
      "url": "https://mumo.chat/api/mcp",
      "headers": {
        "Authorization": "Bearer mmo_live_YOUR_KEY_HERE"
      }
    }
  }
}
```

Get a key at [mumo.chat/settings/api-keys](https://mumo.chat/settings/api-keys) (sign-in required; keys start with `mmo_live_`). `initialize` and `tools/list` work without a key, so your client can inspect the tools before you create one; tool calls need the header.

## Tools

| Tool | What it does |
|---|---|
| `create_deliberation` | Start a deliberation. Returns an ack immediately (`session_id` + `round_id`); the models run in the background. |
| `wait_for_round` | Block on cheap progress polling until the round is done, then return every model's response and the claim map. |
| `append_round` | Add a follow-up round, optionally steered with typed snippets (KEEP / EXPLORE / CHALLENGE / CORE / SHIFT). |
| `get_session` | Read full session state: rounds, responses, snippets, claim maps. |
| `share_session` | Share a session at its public URL; returns the page plus `.md` and `.brief.md` machine twins. |
| `list_sessions` | List your prior sessions. |
| `list_models` | List the models available to your account, with pricing. |
| `get_credit` | Read your credit balance. |

Full reference, request and response shapes, and per-client notes: https://mumo.chat/docs/mcp. Machine-readable descriptors: [`/.well-known/mcp.json`](https://mumo.chat/.well-known/mcp.json) (manifest) and [`/api/mcp/server-card`](https://mumo.chat/api/mcp/server-card) (MCP Server Card). Registry name: `chat.mumo/mcp`.

## The loop

1. `create_deliberation` with the question, written in the operator's first person ("I'm deciding whether to…").
2. `wait_for_round` — panels take 15–120 s; a long wait is normal.
3. Read the claim map before the prose. Steer with `append_round` and snippets, or stop.

The panel is advisory. Read the disagreement; don't defer to whichever side has more votes.

---

## This repo: the client baseline

Beyond the server, mumo ships a skill for each host that teaches the agent when to convene a panel and how to read one. This repo is the **source of truth** for that skill: one tokenized `SKILL.template.md` plus a per-client overlay, rendered into each sibling client repo by the build script in `scripts/`. Never edit a client's `SKILL.md` directly — edit here and re-render.

| Client repo | Renders to |
|---|---|
| `mumo-chat/mumo-claude` | Claude Code plugin |
| `mumo-chat/mumo-cursor` | Cursor plugin |
| `mumo-chat/mumo-codex` | Codex plugin |
| `mumo-chat/mumo-vscode` | VS Code extension |
| `mumo-chat/mumo-hermes` | Hermes Agent skill |
| `mumo-chat/mumo-openclaw` | OpenClaw skill |

### Contents

```
skills/mumo/
├── SKILL.template.md       # tokenized baseline (the source of truth)
├── playbooks/              # shared cognitive-shape playbooks
└── references/             # shared reference docs (claim maps, snippets, takeaway, etc.)
scripts/
├── build-skill.js          # renderer: template + per-client overlay -> client SKILL.md
├── README.md               # how the build system works
└── clients/                # per-client configs + Setup/Frontmatter partials
server.json                 # Official MCP Registry descriptor (chat.mumo/mcp)
```

The template uses `{{TOKEN}}` markers for per-client substitution points (application name, moderator example, install URL, tool-naming registry note, etc.). Each `scripts/clients/<client>.json` fills them in.

### Building

```bash
node scripts/build-skill.js                      # render to all six sibling client repos
node scripts/build-skill.js --target <client>    # render one
node scripts/build-skill.js --verify-all         # check for drift across all six (use in CI)
```

See `scripts/README.md` for details (token reference, adding a new client, etc.).

### Editing

- **Shared kernel changes** → edit `skills/mumo/SKILL.template.md`. Re-render to propagate.
- **Per-client overlay changes** (`## Setup` body, frontmatter, application name, moderator example, install URL, tool-naming note) → edit `scripts/clients/<client>/` partials or `scripts/clients/<client>.json` tokens. Re-render.
- **Shared playbooks / references** → edit `skills/mumo/playbooks/` or `skills/mumo/references/`. Currently propagated manually; build-system handling is a follow-up.

### Architecture

The shared-sections + per-client-overlay model is documented in [`docs/MCP_CLIENTS.md`](https://github.com/mumo-chat/mumo/blob/main/docs/MCP_CLIENTS.md) in the main mumo repo. The 2026-05-20 audit at [`docs/audits/2026-05-20-mcp-skill-delta.md`](https://github.com/mumo-chat/mumo/blob/main/docs/audits/2026-05-20-mcp-skill-delta.md) enumerates exactly which sections are shared vs. per-client.

## Links

- Product — https://mumo.chat
- For agents — https://mumo.chat/for-agents
- MCP reference — https://mumo.chat/docs/mcp
- REST API — https://mumo.chat/docs/api · OpenAPI — https://mumo.chat/openapi.json
- Issues — https://github.com/mumo-chat/mumo-mcp/issues

## License

MIT

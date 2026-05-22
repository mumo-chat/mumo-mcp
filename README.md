# mumo-mcp — canonical baseline for mumo MCP client packages

This repo is the **source of truth** for mumo's MCP client SKILL.md content. It is not a client package — no end user installs from here directly. Per-client packages live in sibling repos (see below), and each is rendered from this baseline by the build script in `scripts/`.

mumo runs multi-model deliberations across Claude, GPT, Gemini, Grok, Qwen, GLM, and Kimi in parallel. Use it for contested decisions — architecture, plan review, strategy — where a single model might be confidently wrong. The mumo MCP server lives at `https://mumo.chat/api/mcp` and exposes `create_deliberation`, `wait_for_round`, `append_round`, `get_session`, `list_sessions`, `list_models`, `get_credit`.

## Install (end users)

Pick the package for your host:

| Host | Install page | Repo |
|---|---|---|
| Claude Code | https://mumo.chat/install/claude-code | `mumo-chat/mumo-claude` |
| Codex | https://mumo.chat/install/codex | `mumo-chat/mumo-codex` |
| Cursor | https://mumo.chat/install/cursor | `mumo-chat/mumo-cursor` |
| VS Code (Copilot) | https://mumo.chat/install/vs-code | `mumo-chat/mumo-vscode` |
| Hermes Agent | https://mumo.chat/install/hermes | `mumo-chat/mumo-hermes` |
| OpenClaw | https://mumo.chat/install/openclaw | `mumo-chat/mumo-openclaw` |

API keys: sign up at https://mumo.chat and create a platform key at [Settings → API Keys](https://mumo.chat/settings/api-keys) (keys start with `mmo_live_`).

## Repo contents

```
skills/mumo/
├── SKILL.template.md       # tokenized baseline (the source of truth)
├── playbooks/              # shared cognitive-shape playbooks
└── references/             # shared reference docs (claim maps, snippets, recap, etc.)
scripts/
├── build-skill.js          # renderer: template + per-client overlay -> client SKILL.md
├── README.md               # how the build system works
└── clients/                # per-client configs + Setup/Frontmatter partials
```

The template uses `{{TOKEN}}` markers for per-client substitution points (application name, moderator example, install URL, tool-naming registry note, etc.). Each `scripts/clients/<client>.json` fills them in.

## Building

```bash
node scripts/build-skill.js                      # render to all six sibling client repos
node scripts/build-skill.js --target <client>    # render one
node scripts/build-skill.js --verify-all         # check for drift across all six (use in CI)
```

See `scripts/README.md` for details (token reference, adding a new client, etc.).

## Editing

- **Shared kernel changes** → edit `skills/mumo/SKILL.template.md`. Re-render to propagate.
- **Per-client overlay changes** (`## Setup` body, frontmatter, application name, moderator example, install URL, tool-naming note) → edit `scripts/clients/<client>/` partials or `scripts/clients/<client>.json` tokens. Re-render.
- **Shared playbooks / references** → edit `skills/mumo/playbooks/` or `skills/mumo/references/`. Currently propagated manually; build-system handling is a follow-up.

## Architecture

The shared-sections + per-client-overlay model is documented in [`docs/MCP_CLIENTS.md`](https://github.com/mumo-chat/mumo/blob/main/docs/MCP_CLIENTS.md) in the main mumo repo. The 2026-05-20 audit at [`docs/audits/2026-05-20-mcp-skill-delta.md`](https://github.com/mumo-chat/mumo/blob/main/docs/audits/2026-05-20-mcp-skill-delta.md) enumerates exactly which sections are shared vs. per-client.

## Links

- Product — https://mumo.chat
- MCP reference — https://mumo.chat/docs/mcp
- REST API — https://mumo.chat/docs/api
- Issues — https://github.com/mumo-chat/mumo-mcp/issues

## License

MIT

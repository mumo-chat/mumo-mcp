# mumo — Claude Code + Cowork plugin

**Multi-model responses + cross-model reactions. Want more rounds? Context carries automatically. Stop when you have what you need.**

Claude, GPT, Gemini, Grok, Qwen, GLM, Kimi in parallel. For contested decisions — architecture, plan review, pricing, strategy — where a single model might be confidently wrong.

Works in both Claude Code (developer audience) and Claude Cowork (knowledge-worker audience). Same plugin, same skill, different distribution marketplaces. For Cursor, see [`mumo-chat/mumo-cursor`](https://github.com/mumo-chat/mumo-cursor). For VS Code (GitHub Copilot), see [`mumo-chat/mumo-vscode`](https://github.com/mumo-chat/mumo-vscode).

## When to use

Reach for mumo when:

- **Architecture and design reviews** — "Postgres or MongoDB for our event store?" "Is this migration safe under concurrent writes?"
- **Plan and pre-launch pressure tests** — "What would we regret 6 months in?" "Where's the biggest risk in this spec?"
- **Contested product or pricing decisions** — "Should this feature be paid or free?" "Which of these positionings actually converts?"
- **Strategy with real cost** — anywhere a confidently-wrong single model could push a team in the wrong direction for a week.

The bundled skill auto-triggers on this category and stays quiet on factual lookups, routine refactoring, and code generation from a clear spec.

## What's in the box

- **MCP server** — `https://mumo.chat/api/mcp`, five tools: `create_deliberation`, `append_round`, `get_session`, `list_sessions`, `list_models`
- **Auto-triggering skill** — `skills/mumo/SKILL.md` tells the agent *when* to reach for the panel so you don't have to

## Install — Claude Code

Inside Claude Code:

```
/plugin marketplace add anthropics/claude-plugins-official
/plugin install mumo
```

## Install — Claude Cowork

Open Claude Desktop → **Cowork** tab → **Customize** → **Browse plugins** → search for `mumo` → **Install**. Or browse the full catalog at [claude.com/plugins](https://claude.com/plugins/).

> **Note:** Claude Code and Cowork have separate plugin panels backed by different marketplaces. Installing in one surface does **not** auto-install in the other — install in each separately.

## Install — VS Code (GitHub Copilot)

Install the [**mumo** extension](https://marketplace.visualstudio.com/items?itemName=mumo.mumo-vscode) from the Visual Studio Marketplace. It registers the MCP server natively and stores your key in VS Code's `SecretStorage` — no `MUMO_API_KEY` env-var required.

For the full story and manual-install alternatives, see [`mumo-chat/mumo-vscode`](https://github.com/mumo-chat/mumo-vscode).

The auto-triggering skill from this repo is not bundled in the VS Code extension — Copilot's agent mode routes to the MCP server organically when you mention mumo or ask for a panel. For the explicit skill experience, use Claude Code or Cowork.

## API key setup

Claude Code and Cowork both need a mumo API key:

1. Sign up at https://mumo.chat and create a platform key at [Settings → API Keys](https://mumo.chat/settings/api-keys) (keys start with `mmo_live_`)
2. Export it in your shell:
   ```bash
   export MUMO_API_KEY=mmo_live_YOUR_KEY_HERE
   ```
3. Restart Claude Code or Claude Cowork

## Using the panel

Invoke the skill explicitly if the agent doesn't reach for it on its own:

- "Run this by a mumo panel"
- "Get me a second opinion from mumo on…"
- "Ask mumo about…"

### Try it first

Ask Claude Code or Cowork something the panel will want to engage with:

> Postgres or MongoDB for our event store given 50k events/day, a Postgres-experienced team, and a 3-month runway? What would we regret 6 months in?

The first round returns each model's prose plus a cross-model claim map showing where the panel agrees and where it splits. You can stop there, or `append_round` with typed snippets (KEEP / EXPLORE / CHALLENGE / CORE / SHIFT) to steer further.

See [mumo.chat/mcp](https://mumo.chat/mcp) for the tool reference, the deliberation loop, and prompt patterns. The canonical trigger language lives in [`skills/mumo/SKILL.md`](skills/mumo/SKILL.md) — that's what Claude Code loads.

## Links

- Product — https://mumo.chat
- MCP reference — https://mumo.chat/docs/mcp/reference
- REST API — https://mumo.chat/docs/api
- Cursor plugin — https://github.com/mumo-chat/mumo-cursor
- VS Code extension — https://github.com/mumo-chat/mumo-vscode
- Issues — https://github.com/mumo-chat/mumo-mcp/issues

## License

MIT

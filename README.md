# mumo — Claude Code plugin

Multi-model deliberation as MCP tools, with an auto-triggering skill. Consult a panel of models (Claude, GPT, Gemini, Grok, Qwen, and more) on contested decisions — architecture, plan review, pricing — where a single model might be confidently wrong.

## What's in the box

- **MCP server** — `https://mumo.chat/api/mcp`, five tools: `create_deliberation`, `append_round`, `get_session`, `list_sessions`, `list_models`
- **Auto-triggering skill** — `skills/mumo/SKILL.md` tells Claude Code *when* to reach for the panel (architecture tradeoffs, plan reviews, contested decisions) so you don't have to

## Install

Inside Claude Code:

```
/plugin marketplace add anthropics/claude-plugins-official
/plugin install mumo
```

You'll also need a mumo API key:

1. Sign up at https://mumo.chat and create a platform key at [Settings → API Keys](https://mumo.chat/settings/api-keys) (keys start with `mmo_live_`)
2. Export it in your shell:
   ```bash
   export MUMO_API_KEY=mmo_live_YOUR_KEY_HERE
   ```
3. Restart Claude Code

## Using the panel

Once installed and keyed, ask Claude Code architecture questions, plan reviews, or contested decisions — the skill auto-triggers and calls the panel. You can also be explicit: "run this by a mumo panel" or "get me a second opinion from mumo."

See [mumo.chat/mcp](https://mumo.chat/mcp) for the full tool reference, the deliberation loop, and worked examples.

## Links

- Product — https://mumo.chat
- MCP reference — https://mumo.chat/docs/mcp/reference
- REST API — https://mumo.chat/docs/api
- Issues — https://github.com/mumo-chat/mumo-mcp/issues

## License

MIT

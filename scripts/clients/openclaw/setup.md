The mumo MCP server is registered via `openclaw mcp set mumo '<json>'` and stored in `~/.openclaw/openclaw.json` under `mcp.servers.mumo`. See `config/mumo.example.json` in this skill's directory for the canonical config payload (reference only — OpenClaw doesn't auto-load this file; it's the JSON shape to paste into the CLI command).

If tools return auth errors, the API key is missing or invalid. Direct the user to https://mumo.chat/settings/api-keys to create one (keys start with `mmo_live_`), then re-run `openclaw mcp set mumo` with the new value and restart OpenClaw.

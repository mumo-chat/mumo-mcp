The mumo MCP server is configured in `~/.hermes/config.yaml` under `mcp_servers`. If this skill was installed from HermesHub, Hermes prompts for `MUMO_API_KEY` at install time and auto-saves it to `.env`. If installed via `git clone`, see `config/mumo.yaml` in this skill's directory for the canonical block to merge under your `mcp_servers:` key, with the placeholder `mmo_live_YOUR_KEY_HERE` replaced by your real key.

Either way, after the config lands, **fully exit and restart Hermes** (the `/reload-mcp` slash command is unreliable across versions).

If tools return auth errors, the API key is missing or invalid. Direct the user to https://mumo.chat/settings/api-keys to create one (keys start with `mmo_live_`).

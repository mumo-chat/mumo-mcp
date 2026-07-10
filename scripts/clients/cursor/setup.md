The MCP server needs a mumo API key, configured in Cursor's user-level MCP file (`~/.cursor/mcp.json`).

1. Create a key at https://mumo.chat/settings/api-keys (keys start with `mmo_live_`)
2. Add the server at https://mumo.chat/install/cursor — paste the key, click "Add to Cursor", and confirm Cursor's Install MCP Server dialog (or copy the equivalent `mcp.json` entry from the same page)
3. Confirm the `mumo` server shows green under Tools & MCP

If mumo tools return auth errors, tell the user and stop. Full setup: https://mumo.chat/install/cursor

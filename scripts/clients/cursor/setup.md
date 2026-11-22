The MCP server is added to Cursor separately from this plugin and connects with a browser sign-in; no API key is required.

1. Add the server at https://mumo.chat/install/cursor — click "Add to Cursor" and confirm Cursor's Install MCP server dialog (or add `"mumo": { "url": "https://mumo.chat/api/mcp/oauth" }` under `mcpServers` in `~/.cursor/mcp.json`)
2. In Cursor Settings → Tools & MCP, start the sign-in from the `mumo` row and allow access in the browser
3. Confirm the `mumo` server shows green under Tools & MCP

If the server is not signed in or tools return auth errors, ask the user to sign in again from the `mumo` row under Tools & MCP, and stop. A server set up with an API key (`https://mumo.chat/api/mcp`) keeps working. Full setup: https://mumo.chat/install/cursor

The mumo MCP server is bundled with this plugin (`.mcp.json` at the plugin root). It uses HTTP transport against `https://mumo.chat/api/mcp/oauth` and connects with a browser sign-in; no API key is required.

If the server is not signed in or tools return auth errors, ask the user to sign in from a terminal with `codex mcp login mumo`, allow access in the browser, then start a new Codex thread. `codex mcp list` shows `OAuth` in the Auth column once it is signed in.

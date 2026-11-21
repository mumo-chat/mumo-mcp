The plugin bundles the mumo MCP server (`https://mumo.chat/api/mcp/oauth`) and connects with a browser sign-in; no API key is required. If the server is not connected or tools return auth errors, ask the user to sign in: in Claude Code, run `/mcp`, select `mumo`, choose **Authenticate**, and allow access in the browser.

For a delegated wait, a subagent may not have the mumo tools loaded: tell it to load `mcp__plugin_mumo_mumo__wait_for_round` with ToolSearch before calling it.

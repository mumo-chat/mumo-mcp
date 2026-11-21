The mumo MCP server is bundled with this plugin (`mcp_config.json` at the plugin root). It uses Streamable HTTP against `https://mumo.chat/api/mcp/oauth` with browser OAuth sign-in — no API key required.

If tools return auth errors or the server is not yet connected, ask the user to sign in to mumo: in Antigravity CLI (`agy`), open `/plugin`, expand `mumo` under **Installed**, and choose **Sign in**. Complete the mumo sign-in in the browser, copy the authorization code from the callback page, and paste it back into `agy`. Installing and signing in once from `agy` also connects the Antigravity Desktop app.

**Antigravity runtime notes:**
- Large round results (roughly 8–10 KB and above) may be saved to a file with a truncated preview. Read the saved file path before synthesizing so you do not miss model prose or reactions.
- For delegated waits, invoke the built-in `self` subagent (`TypeName: "self"`, `Model: "inherit"`) — built-in `research` has no MCP or network access, so only `self` inherits the `mumo_mumo` tools.

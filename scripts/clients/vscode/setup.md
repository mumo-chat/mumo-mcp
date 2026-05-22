The mumo VS Code extension prompts for an API key on first MCP tool call and stores it in VS Code's `SecretStorage` (OS keychain). To set or rotate the key manually, run the **mumo: Set API Key** command. Create keys at https://mumo.chat/settings/api-keys (they start with `mmo_live_`).

If mumo tools return auth errors, tell the user and stop. Full setup: https://mumo.chat/install

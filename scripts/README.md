# mumo SKILL.md build system

The `mumo-mcp` repo is the canonical source for the mumo SKILL.md content used across all six client packages (Claude Code, Codex, Cursor, VS Code, Hermes Agent, OpenClaw). This script renders the tokenized baseline into each client's `SKILL.md` by combining the shared kernel with per-client config and partials.

## Layout

```
scripts/
  build-skill.js               # the renderer
  README.md                    # this file
  clients/
    <client>.json              # per-client config (tokens + partial pointers + target path)
    <client>/
      frontmatter.yml          # client's full YAML frontmatter block
      setup.md                 # client's ## Setup section body
      framing-prompts.md       # (optional) ## Framing prompts for the panel — productivity tier only
```

The tokenized baseline lives at `../skills/mumo/SKILL.template.md`. Each render writes to the path specified by `<client>.json` → `target`.

## Tokens

The template uses `{{TOKEN_NAME}}` markers. Each client config resolves them in two ways:

- **String tokens** (`config.tokens.NAME`) — substituted inline.
- **Partial tokens** (`config.partials.NAME`) — replaced with the contents of a file under `clients/<client>/`.

Any unresolved token is replaced with empty string (so optional sections like `{{FRAMING_PROMPTS_SECTION}}` can be omitted from a client config without explicit opt-out).

Current substitution surface:

| Token | Resolved by | Notes |
|---|---|---|
| `{{FRONTMATTER}}` | partial → `frontmatter.yml` | Full YAML block including `---` delimiters |
| `{{SETUP_SECTION}}` | partial → `setup.md` | Body of `## Setup` (no heading) |
| `{{APPLICATION_NAME}}` | string | Value for `application:` arg, e.g. `"Codex"` |
| `{{MODERATOR_EXAMPLE}}` | string | Example moderator identity for this client |
| `{{INSTALL_URL}}` | string | Per-client install page on mumo.chat |
| `{{TOOL_NAMING_NOTE}}` | string | Optional registry-name note after the Tools table |
| `{{FRAMING_PROMPTS_SECTION}}` | partial → `framing-prompts.md` | Optional productivity-tier section (currently OpenClaw only) |

## Commands

```bash
# Build all clients (default)
node scripts/build-skill.js

# Build one client
node scripts/build-skill.js --target codex

# Check for drift against the checked-in SKILL.md
node scripts/build-skill.js --verify codex
node scripts/build-skill.js --verify-all
```

Verify exits non-zero on any drift and reports the first differing line.

## Workflow

1. Edit `skills/mumo/SKILL.template.md` for shared-kernel changes.
2. Edit `scripts/clients/<client>/setup.md` or `frontmatter.yml` for per-client overlay changes.
3. Run `node scripts/build-skill.js --all` to render to all six target paths (sibling repos at `../mumo-<client>/...`).
4. Commit changes in each affected client repo separately.
5. In CI for each client repo, run `node ../mumo-mcp/scripts/build-skill.js --verify <client>` (or however the client repo accesses mumo-mcp) to catch drift before merge.

## Adding a new client

1. Create `scripts/clients/<client>.json` with `target`, `tokens`, and `partials`.
2. Create `scripts/clients/<client>/frontmatter.yml` and `setup.md`.
3. Run `node scripts/build-skill.js --target <client>` to render.
4. Update `docs/MCP_CLIENTS.md` (in the main mumo repo) with the new client entry.

## Notes

- Partials are stripped of trailing newlines on read so they compose cleanly with surrounding template content.
- Token markers must be all-caps with underscores, e.g. `{{APPLICATION_NAME}}`. The "everything unresolved becomes empty" rule uses this pattern as a regex.
- The renderer has no external dependencies — plain Node, no `npm install` needed.

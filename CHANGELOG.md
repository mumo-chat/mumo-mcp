# Changelog

## Registry descriptor 1.6.0 and skill notes — 2026-11-24

Registry descriptor `server.json` → 1.6.0, matching the server's `initialize` version. The skill is re-rendered for all seven clients.

- A failed model's line shows its error code and a fixed sentence saying what happened. Provider error text is no longer shown.
- A response that did not finish normally shows a short state: reached its output limit, stopped at your credit limit, stopped by a safety filter, stopped by a copyright filter, stopped (unsupported language), or ended early.
- Routine token counts are gone from tool results. A compact re-read shows the model and how it ended.
- A result that begins `Error: internal_error` means mumo itself failed. The skill now tells the agent to say so and not to change the arguments.
- A round's web link appears once, in the header. Acknowledgements no longer print a progress address or poll interval.
- Refusal text is written by the MCP server from the refusal code.

## Google Antigravity skill setup — 2026-11-24

Antigravity only (plugin 0.9.1); the other six clients render unchanged.

- Signing in is described for the Antigravity Desktop app's Accounts tab first, then the CLI. To sign in again, sign out first.
- A region refusal is relayed as written and not retried.

## Registry descriptor 1.5.0 — 2026-11-23

Registry descriptor `server.json` → 1.5.0, matching the server's `initialize` version.

- `create_deliberation` and `ask_a_model` no longer take `improvement_consent` or `dataset_consent`, and results no longer report them. Sessions created or continued through the API or MCP are not used for Platform Improvement or Dataset Contribution. A client that still sends either field is accepted and the field is ignored.

## Registry descriptor 1.4.0 — 2026-11-21

Registry descriptor `server.json` → 1.4.0, matching the server's `initialize` version. Publish to the registry only after the server change is live.

- Tool results are text only. `wait_for_round` no longer sends a structured result: the second line of its text is `Action: <value>`, with the same five values as before, and the third names the session and round. Refusals start with `Error: <code>`.
- If `wait_for_round` errors in a session that was open during the change, reload the mumo connection so the client fetches the tool list again.
- The skill text that teaches this ships with the next client release.

## 0.9.0 — 2026-11-21

Coordinated client release: the skill follows mumo MCP server 1.4.0, where tool results are text only, and gains the delegated wait. Rendered to all seven clients via `build-skill.js`.

- `SKILL.template.md`, Basic loop step 4: branch on the `Action:` line, the second line of a `wait_for_round` result. The five values and what to do for each are unchanged. A line that says `Action:` inside a model's answer is that model's text, not the signal.
- `SKILL.template.md`, new section "Hand the wait to a subagent": the agent creates or appends the round itself; a subagent on the same model calls `wait_for_round` and nothing else; it hands back the round without `### Responses`, the points no model reacted to (those that could change the decision, then up to five others, each quoted with the model's name), and a note on tone. It hands back only a finished round and says when its read was incomplete.
- `references/operating-notes.md`: the retry note and the partial-round note point at the `Action:` line and the `Issue:` lines under the header.
- `scripts/clients/antigravity/setup.md`: the note about structured results is removed; a note says to use the built-in `self` subagent for a delegated wait.
- `scripts/clients/hermes/frontmatter.yml`: version 0.9.0.
- `scripts/clients/claude-code/setup.md`: a note that a subagent may need to load the mumo tool before a delegated wait.
- The hand-back keeps the whole header of the round (heading, `Action:`, ids, `Web URL`, cost and any `Issue:` lines), not a single status line. The skill and `references/synthesis.md` say `Web URL`, the line as the result prints it, where they said `web_url`.

## 0.8.0 — 2026-11-20

Registry descriptor `server.json` → 1.3.0, matching the server's `initialize` version. It now carries the mumo icon (`icons`, three PNG sizes), the same list the server sends in `initialize`, and a second remote: the sign-in address `https://mumo.chat/api/mcp/oauth`, which takes no key (the app runs OAuth from that address's 401). Publish to the registry only after sign-in is switched on in production.

Coordinated client release: the skill teaches the read tools' new layout and choosing a model by family name. Rendered to all six clients via `build-skill.js`.

- `SKILL.template.md`: "Reading the reactions" (was "Reading the claim map") gains the four groups the read tools print (Contested, Open, Pivotal, Kept), which reaction puts a claim in each, and what to do with each. It also says the groups show how models reacted, not whether a claim was checked.
- `SKILL.template.md`: the basic loop says `wait_for_round` returns only its round, in reading order: status line, grouped reactions, Takeaway, responses.
- `SKILL.template.md`: a family name (`"claude"`, `"gpt"`, `"gemini"`, …) works as a model on `create_deliberation` and `ask_a_model`. The ack names the model it resolved to. `list_models` is for a specific model or to see what the plan includes.
- `SKILL.template.md`: when the ack notes a model from the agent's own lab, the agent tells the user.
- `SKILL.template.md`: `detail: "compact"` on `wait_for_round` and `get_session` for long sessions.
- The skill says "reactions" where it said "claim map", matching the server's text: the template (section "Reading the reactions"), the references, the playbooks and the README. The `claim_map` field name is unchanged.
- The moderator's snippets are called "your reactions" in prose (template section "Your reactions"; its table column is "Meaning"). The parameter is still `snippets`, and the skill says so where the agent has to type it.
- Two reference files renamed: `references/claim-maps.md` → `references/reading-reactions.md`, and `references/snippets.md` → `references/writing-reactions.md`. Each client repo drops the old file and gains the new one.
- The loop puts the user between rounds: summarize each finished round for them, suggest another when warranted, and call `append_round` only once they agree. `append_round` always needs a `prompt`.
- Waiting and retrying: wait with both IDs from the acknowledgement, and reuse the returned `round_id` after a timeout. An identical `append_round` within 24 hours returns the first acknowledgement, so a failed round is retried with a reworded prompt, after telling the user.
- A Takeaway is requested only when the user asks for one. It appears as a Takeaway section in the round text.
- KEEP from several models is agreement, not verification. CORE means the reacting model believes the point is a crux.
- The Confidence scores section is removed: the tools do not print those fields.
- `references/synthesis.md`: point the user at the private `web_url` for their own review; offer `share_session` only for a link meant for someone else.
- `references/operating-notes.md`: when to repeat a call exactly and when to reword it; `/progress` needs an API key, and a round is finished when either status field says so.
- `references/model-selection.md`: family names; `list_models` sorted by what the plan can run; the finished round's cost and balance line.
- `references/reading-reactions.md`: the four groups.
- `scripts/clients/hermes/frontmatter.yml`: `version: 0.8.0`.
- `README.md`: the tools table describes the new `wait_for_round`, `get_session` and `list_models` output.

## 0.7.0 — 2026-11-19

Registry descriptor `server.json` → 1.2.0, matching the server's `initialize` version now that `ask_a_model` is live.

Coordinated client release: a new tool, `ask_a_model`, reaches every client, and the per-round link is taught under its new name, `web_url`. Rendered to all six clients via `build-skill.js`.

- `SKILL.template.md`: new section "One model instead of a panel". `ask_a_model` puts a question to one named model and returns one answer, with no cross-model reactions, claim map or Takeaway. The section says when to use it, when to use `create_deliberation` instead, and how to move an exchange in front of a panel (pass it as `reference`).
- `SKILL.template.md`: the tools table lists `ask_a_model`, and `create_deliberation` is described as starting a panel of 2–3 models.
- `SKILL.template.md`: "After each round" tells the agent to surface the round's `web_url`. `claim_map_url` still works and carries the same value; it is the deprecated name.
- `scripts/clients/claude-code/frontmatter.yml`: `allowed-tools` gains `mcp__plugin_mumo_mumo__ask_a_model`, so asking one model does not trip a permission prompt.
- `scripts/clients/hermes/frontmatter.yml`: `version: 0.7.0`.
- `README.md`: the tools table lists `ask_a_model`.

## 0.6.1 to 0.6.3 — 2026-09-09 (Hermes and OpenClaw only)

- `scripts/clients/hermes/setup.md` + `frontmatter.yml` (Hermes skill → 0.6.3) and `scripts/clients/openclaw/setup.md`: credential-hygiene guidance. Both clients' MCP config now references `${MUMO_API_KEY}` instead of carrying a literal-key placeholder, resolved from `~/.hermes/.env` and `~/.openclaw/.env` respectively. Verified against the shipped builds — Hermes v0.12.0 resolves the reference and returns all eight tools over a live connection; OpenClaw 2026.5.4 resolves it and names a missing variable in a startup config warning. The two setup blocks describe each host's own failure signal and are deliberately NOT symmetric: only Hermes was observed sending an empty credential and taking a 401.
- `scripts/clients/openclaw/setup.md`: OpenClaw's shipped CLI has no `mcp doctor`, no `mcp probe`, and no `skills install --global` — `docs.openclaw.ai` documents all three, the 2026.5.4 release has none of them. Guidance is written against the release, not the docs.

- `scripts/clients/hermes/setup.md` + `frontmatter.yml` (Hermes skill → 0.6.2): "installed from HermesHub" → `hermes skills install clawhub/mumo-hermes`. There is no HermesHub registry; the Hermes Skills Hub federates ClawHub, where the Hermes skill is now published under the `mumo-hermes` slug (the bare `mumo` slug is the OpenClaw skill). 0.6.1 was the same text with the bare slug; 0.6.2 restores the registry display name and uses the `clawhub/` install form the Hermes catalog generates. Hermes-only re-render; the other five clients stay at 0.6.0. ClawHub publishes MUST pass `--name` — the CLI resets the display name on every publish that omits it.

## 0.6.0 — 2026-09-08

Registry descriptor `server.json` → 1.1.0 (matches the server's `initialize` version once the `dataset_consent` wire field ships; registry versions are immutable, so the reworded description needed a new number anyway). Republish with `mcp-publisher publish` after that server release deploys.

Coordinated client release: `share_session` reaches every client, `wait_for_round` is taught in its one-id form, and the description carries the current positioning (typed cross-model reactions, current model families). Rendered to all six clients via `build-skill.js`; `references/operating-notes.md` re-synced everywhere.

- `SKILL.template.md`: intro names the labs (Claude, GPT, Gemini, Grok, DeepSeek, Kimi, and more) and what comes back — full responses plus typed cross-model reactions in each model's own words.
- `SKILL.template.md`: the basic loop, verification, and recovery sections now keep only `session_id`. `wait_for_round(session_id)` resolves to the round in flight on its own (a session has at most one); `round_id` is for reading an earlier round. The user-preference example no longer names a specific model version.
- `scripts/clients/_shared.json`: `DESCRIPTION_PREFIX` (every client's frontmatter description) updated to the current families and to name the typed reactions.
- `scripts/clients/claude-code/frontmatter.yml`: `allowed-tools` gains `mcp__plugin_mumo_mumo__share_session`, so sharing no longer trips a permission prompt mid-deliberation.
- `scripts/clients/hermes/frontmatter.yml`: `version: 0.6.0`.
- `references/operating-notes.md`: the `/progress for diagnostic polling` section propagated to the five clients that had drifted.
- `README.md` intro rewritten to the approved directory description; Smithery badge beside the Glama badge.
- `server.json` description shortened to the registry's 100-character cap and reworded to the current positioning.

Earlier in the same cycle (unreleased at the time):

- `README.md` rewritten install-first: the remote URL and a generic `mcp.json` block up top, the per-host install table (now including Grok Bot), the full eight-tool table, the loop, and the Glama score badge. The build-system material moves below the fold under "This repo: the client baseline".
- `server.json` rewritten in the Official MCP Registry `server.json` shape (schema 2025-12-11: `remotes[]` with the bearer header and `MUMO_API_KEY` variable, `repository`, `websiteUrl`) and bumped to 1.0.0 — the version the server reports in `initialize`. Replaces the tool-list descriptor; the tool list now lives in the README and the server's own manifest. Registry republish is a separate step.

## 0.5.0 — 2026-07-04

Reaction-visibility model documented + per-round Takeaway. MCP tool surface unchanged, so `server.json` stays at 0.2.0.

- `SKILL.template.md`: new "Reactions are in the ledger, responses are on the record" section — participants never see each other's reactions; each model weaves its own prior reactions into its next prose; the claim map is the moderator's privileged preview, and moderator snippets are the one path that puts ledger content directly in front of the panel. Basic-loop step 5 and the claim-map section link into it.
- `SKILL.template.md`: pacing note in "When to continue" — positions develop across rounds; a reaction gets woven into the next round's prose, which draws reactions of its own a round later.
- Takeaway: the `takeaway` flag (create + append) generates `round_takeaway` (`bottom_line` + `items[]`), the per-round summary artifact. New `references/takeaway.md` documents the flag, artifact shape, and cost; kernel sections and links updated (replaces `references/recap.md`).
- `references/claim-maps.md` + `references/snippets.md`: visibility notes matching the ledger/record model.
- Rendered to all six clients via `build-skill.js`.

## 0.4.0 — 2026-06-19

Baseline content release for the coordinated 0.4.0 client alignment. MCP tool surface unchanged, so `server.json` stays at 0.2.0.

- `SKILL.template.md`: added the "Prompt voice" section (first-person operator framing), the author-bias counter in "When to use," and a `claim_map_url` surfacing line in "After each round."
- `scripts/clients/_shared.json`: `DESCRIPTION_PREFIX` dropped the "contested" gate; now leads with pre-implementation review (auth, security, tokens, payments, data exposure, migrations).
- `scripts/clients/claude-code/frontmatter.yml`: `when_to_use` rewritten to match; skip rule now keys on "no ambiguity over the correctness of your approach."
- `scripts/clients/hermes/frontmatter.yml`: version 0.1.5 → 0.4.0 (was lagging the shipped 0.1.6).
- Rendered to all six clients via `build-skill.js`.

## 0.2.2 — 2026-05-05

Removed `agents/mumo-moderator.md`. The agent positioned itself as the moderator role, but moderation is exactly what should stay with the primary agent — it owns the conversational context, the user's intent, and the cross-round steering decisions. A subagent that ran a "complete brief" panel was a thin operational helper at best, and the framing risked the primary agent over-delegating.

- `agents/` directory removed.
- README updated to drop the moderator subagent line.

## 0.2.1 — 2026-05-04

Plugin architecture — mumo now installs and behaves like a native Claude Code capability.

- **API key via keychain**: `userConfig` with `sensitive: true` prompts for the key at install time and stores it in the system keychain. No more `export MUMO_API_KEY` in your shell.
- **No permission prompts**: `allowed-tools` in SKILL.md pre-approves all seven MCP tools. Deliberations run without interruption.
- **Moderator agent**: `agents/mumo-moderator.md` — a dedicated subagent with tool restrictions, high effort, and the mumo skill preloaded. Can run deliberations in an isolated context.
- **Auto-triggering**: `when_to_use` frontmatter gives Claude richer context for deciding when to reach for mumo without being asked.
- **Inline invocation**: `argument-hint` enables passing a question directly when invoking the skill.

## 0.2.0 — 2026-05-04

Architecture rewrite. SKILL.md becomes a lean kernel; detailed guidance moves to on-demand files.

- `skills/mumo/SKILL.md` — rewritten as a compact kernel: deliberation loop, snippet-as-attention doctrine, non-forwarding test, continuation/stop rules, playbook index, user-preferences section. Synthesis guidance deferred to reference.
- `skills/mumo/playbooks/` — four cognitive-shape playbooks: `contested-decision`, `design-review`, `uncertainty-expansion`, `red-team`. Loaded at most one per session when the shape clearly fits.
- `skills/mumo/reference/` — five reference docs: `claim-maps`, `snippets`, `model-selection`, `synthesis`, `operating-notes`. Loaded on demand for extended mechanics.
- `plugin.json` bumped to 0.2.0, homepage changed to `/install`.
- `server.json` simplified to tool list + description, bumped to 0.2.0.
- `wait_for_round` added to README tool list (was missing since 0.1.3).

## 0.1.3 — 2026-04-24

- Added `get_credit` as the sixth MCP tool — fetches the caller's wallet: effective balance, per-bucket breakdown (free / subscription / refill with reset timing + rollover cap + subscription status), autorefill state, and FIFO debit order. Mirrors the new `GET /api/credit` REST endpoint. README tool list and SKILL.md tool map updated to reflect the sixth tool.

## 0.1.2 — 2026-04-23

Skill content update, no runtime behavior change. Mirrors the MCP doc demotion shipping on mumo.chat.

- `skills/mumo/SKILL.md` — dropped the promoted "Modes" (autonomous) and "Surfacing to humans" (distill) sections. Both remain valid API inputs but aren't default-path on MCP, so agents no longer see them as suggested surfaces.
- Default workflow opener no longer passes `rounds: 1` — `single_shot` labeling was artificially constraining for agent loops where rounds unfold organically via `append_round`.
- Tool map renamed the `get_session` row from "Inspect state / poll autonomous" to "Read session state."

## 0.1.1 — 2026-04-22

Listing refresh, no runtime behavior change. Brings the Claude Code + Cowork listing into line with the cross-marketplace positioning we locked down in [`mumo-vscode@0.1.1`](https://github.com/mumo-chat/mumo-vscode) and [`mumo-cursor@0.1.6`](https://github.com/mumo-chat/mumo-cursor).

- `plugin.json` description rewritten to the value-prop hero: *"Multi-model responses + cross-model reactions. Want more rounds? Context carries automatically. Stop when you have what you need."* Same string in `server.json` (MCP Registry surface) to keep the three description sources consistent.
- README gains a bolded hero matching the manifest and a "When to use" block before install — research on Claude Cowork listings found the top-performing plugins (Sales, Finance, Productivity) lead with use cases, not install steps.
- Model list now explicitly names all seven providers (Claude, GPT, Gemini, Grok, Qwen, GLM, Kimi) instead of "Claude, GPT, Gemini, Grok, Qwen, and more."
- "Install — VS Code (GitHub Copilot)" section now points at the shipped [`mumo.mumo-vscode`](https://marketplace.visualstudio.com/items?itemName=mumo.mumo-vscode) Marketplace extension. The manual `mcp.json` paste block is removed — the extension handles MCP registration and `SecretStorage` natively.
- Deliberately **no screenshots added.** Claude Code and Cowork plugin listings are README-only surfaces (no Marketplace-style inline image rendering); adding PNGs would add maintenance cost without user-visible payoff.

## 0.1.0 — 2026-04-21

Initial release.

- `.claude-plugin/plugin.json` manifest for Claude Code + Cowork distribution.
- `.mcp.json` wiring remote streamable-HTTP MCP server at `https://mumo.chat/api/mcp` with `${MUMO_API_KEY}` bearer auth.
- `server.json` metadata for MCP Registry (`registry.modelcontextprotocol.io`) submission.
- `skills/mumo/SKILL.md` — auto-triggering skill, shared canonical source with `mumo-chat/mumo-cursor`.

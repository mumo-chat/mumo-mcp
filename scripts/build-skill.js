#!/usr/bin/env node
// build-skill.js — render the mumo SKILL.md baseline to each client repo.
//
// Reads:
//   ../skills/mumo/SKILL.template.md  (tokenized baseline)
//   ./clients/<client>.json           (per-client config)
//   ./clients/<client>/<partial>      (per-client partial files)
//
// Writes:
//   <config.target>                   (rendered SKILL.md for that client)
//
// Usage:
//   node scripts/build-skill.js                    # build all clients
//   node scripts/build-skill.js --all              # build all clients
//   node scripts/build-skill.js --target codex     # build one client
//   node scripts/build-skill.js --verify codex     # check for drift in one
//   node scripts/build-skill.js --verify-all       # check for drift in all
//
// Exits non-zero on render failure or (for --verify*) on detected drift.

const fs = require("fs");
const path = require("path");

const SCRIPT_DIR = __dirname;
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");
const BASELINE_PATH = path.join(REPO_ROOT, "skills", "mumo", "SKILL.template.md");
const CLIENTS_DIR = path.join(SCRIPT_DIR, "clients");

function loadClientConfig(client) {
  // Shared tokens are merged into every client config so values used in
  // multiple clients (e.g. the description prefix) have a single source.
  // Per-client tokens override shared tokens on collision.
  const sharedPath = path.join(CLIENTS_DIR, "_shared.json");
  const shared = fs.existsSync(sharedPath)
    ? JSON.parse(fs.readFileSync(sharedPath, "utf8"))
    : {};
  const configPath = path.join(CLIENTS_DIR, `${client}.json`);
  if (!fs.existsSync(configPath)) {
    throw new Error(`Client config not found: ${configPath}`);
  }
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  return {
    ...config,
    tokens: { ...(shared.tokens || {}), ...(config.tokens || {}) },
    partials: { ...(shared.partials || {}), ...(config.partials || {}) },
  };
}

function loadPartial(client, relPath) {
  const partialPath = path.join(CLIENTS_DIR, client, relPath);
  if (!fs.existsSync(partialPath)) {
    throw new Error(`Partial not found for ${client}: ${partialPath}`);
  }
  // Trim trailing newlines so partials compose cleanly with surrounding template.
  return fs.readFileSync(partialPath, "utf8").replace(/\n+$/, "");
}

function render(client) {
  const config = loadClientConfig(client);
  let content = fs.readFileSync(BASELINE_PATH, "utf8");

  // Partial tokens FIRST: {{NAME}} -> contents of config.partials[NAME].
  // Order matters: partials can themselves contain string tokens (e.g. a
  // frontmatter partial referencing {{DESCRIPTION_PREFIX}}), which the
  // string-token pass below then resolves.
  for (const [name, partialRel] of Object.entries(config.partials || {})) {
    const partialContent = loadPartial(client, partialRel);
    content = content.split(`{{${name}}}`).join(partialContent);
  }

  // String tokens: {{NAME}} -> config.tokens[NAME].
  // Runs after partial substitution so tokens inside partials resolve.
  for (const [name, value] of Object.entries(config.tokens || {})) {
    content = content.split(`{{${name}}}`).join(value);
  }

  // Any remaining tokens default to empty string (treat as optional).
  // This lets the template define optional sections without every client
  // having to opt out explicitly.
  content = content.replace(/\{\{[A-Z_]+\}\}/g, "");

  // Collapse runs of 3+ newlines (= 2+ blank lines) down to 2 newlines
  // (= 1 blank line). Empty token substitutions on their own lines leave
  // extra blank lines; this normalizes them back to standard markdown.
  content = content.replace(/\n\n\n+/g, "\n\n");

  return content;
}

function write(client) {
  const config = loadClientConfig(client);
  const targetPath = path.resolve(REPO_ROOT, config.target);
  const rendered = render(client);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, rendered);
  console.log(`  rendered ${client.padEnd(12)} -> ${targetPath}`);
}

function verify(client) {
  const config = loadClientConfig(client);
  const targetPath = path.resolve(REPO_ROOT, config.target);
  if (!fs.existsSync(targetPath)) {
    console.error(`  ${client.padEnd(12)} target missing: ${targetPath}`);
    return false;
  }
  const current = fs.readFileSync(targetPath, "utf8");
  const rendered = render(client);
  if (current === rendered) {
    console.log(`  ${client.padEnd(12)} no drift`);
    return true;
  }
  // Report first differing line for fast diagnosis.
  const cur = current.split("\n");
  const ren = rendered.split("\n");
  let diffAt = -1;
  for (let i = 0; i < Math.max(cur.length, ren.length); i++) {
    if (cur[i] !== ren[i]) {
      diffAt = i;
      break;
    }
  }
  console.error(`  ${client.padEnd(12)} DRIFT at line ${diffAt + 1}:`);
  console.error(`      current:  ${JSON.stringify(cur[diffAt])}`);
  console.error(`      expected: ${JSON.stringify(ren[diffAt])}`);
  return false;
}

function listClients() {
  // Files starting with `_` are shared config / not real clients.
  return fs
    .readdirSync(CLIENTS_DIR)
    .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
    .map((f) => f.replace(/\.json$/, ""))
    .sort();
}

function usage() {
  console.error(
    `Usage:
  node scripts/build-skill.js                    # build all clients
  node scripts/build-skill.js --all              # build all clients
  node scripts/build-skill.js --target <client>  # build one client
  node scripts/build-skill.js --verify <client>  # check drift in one
  node scripts/build-skill.js --verify-all       # check drift in all

Known clients: ${listClients().join(", ")}`
  );
  process.exit(1);
}

function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];
  const target = args[1];

  if (cmd === undefined || cmd === "--all") {
    console.log("Building all clients:");
    for (const c of listClients()) write(c);
    return;
  }

  if (cmd === "--target") {
    if (!target) usage();
    write(target);
    return;
  }

  if (cmd === "--verify") {
    if (!target) usage();
    process.exit(verify(target) ? 0 : 1);
  }

  if (cmd === "--verify-all") {
    console.log("Verifying all clients:");
    let ok = true;
    for (const c of listClients()) {
      if (!verify(c)) ok = false;
    }
    process.exit(ok ? 0 : 1);
  }

  usage();
}

try {
  main();
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}

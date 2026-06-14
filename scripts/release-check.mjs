#!/usr/bin/env node
// Release guard (CI, pull_request): if a PR changes the installable plugin
// surface — anything under skills/, or the plugin/marketplace manifests — it
// MUST bump the version, and the bump must be a real semver increase. This is
// what makes `/plugin` upgrades actually deliver new skills to existing installs.
// Pairs with validate.mjs, which enforces that the three manifests share one
// version. The pure core is unit-tested; the CLI shells git (injectable runner).
// See .spine/decisions/0018-enforce-version-bump-on-ship.md.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

// ── Pure core ────────────────────────────────────────────────────────────────

// The installable surface: changes here reach users on upgrade, so they need a
// version bump. Repo tooling (scripts/, .github/, .spine/, docs/) does not.
const SHIPPABLE = [
  /^skills\//,
  /^\.claude-plugin\/plugin\.json$/,
  /^\.claude-plugin\/marketplace\.json$/,
];

export const isShippable = (file) => SHIPPABLE.some((re) => re.test(file));

// "1.2.3" -> [1,2,3]; null if not three numeric parts.
export function parseSemver(v) {
  const m = typeof v === "string" && v.trim().match(/^(\d+)\.(\d+)\.(\d+)$/);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}

// >0 if a>b, 0 if equal, <0 if a<b; null if either is unparseable.
export function compareSemver(a, b) {
  const pa = parseSemver(a);
  const pb = parseSemver(b);
  if (!pa || !pb) return null;
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
  return 0;
}

// Given the changed files and the base/head versions, decide whether the bump
// rule is satisfied. Returns { errors }.
export function requireBump({ changedFiles, baseVersion, headVersion }) {
  const errors = [];
  const shipped = (changedFiles ?? []).filter(isShippable);
  if (shipped.length === 0) return { errors }; // nothing installable changed

  const where = `${shipped[0]}${shipped.length > 1 ? ` (+${shipped.length - 1} more)` : ""}`;
  const cmp = compareSemver(headVersion, baseVersion);
  if (cmp === null) {
    errors.push(
      `version must be valid semver to ship a plugin change — base "${baseVersion}", head "${headVersion}".`,
    );
  } else if (cmp === 0) {
    errors.push(
      `this PR changes the plugin surface (${where}) but does not bump the version (still "${headVersion}"). Bump package.json + both manifests together.`,
    );
  } else if (cmp < 0) {
    errors.push(
      `version went backwards: head "${headVersion}" < base "${baseVersion}".`,
    );
  }
  return { errors };
}

// ── CLI ──────────────────────────────────────────────────────────────────────

const versionOf = (text) => {
  try {
    return JSON.parse(text).version;
  } catch {
    return undefined;
  }
};

export function main(
  run = (cmd, args) => execFileSync(cmd, args, { encoding: "utf8" }),
) {
  const base = process.env.BASE_REF || "origin/main";
  let changedFiles;
  let baseVersion;
  try {
    changedFiles = run("git", ["diff", "--name-only", `${base}...HEAD`])
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    baseVersion = versionOf(run("git", ["show", `${base}:package.json`]));
  } catch (e) {
    console.error(`release-check: cannot read git history vs ${base}: ${e.message}`);
    process.exit(1);
  }
  const headVersion = versionOf(readFileSync("package.json", "utf8"));
  const { errors } = requireBump({ changedFiles, baseVersion, headVersion });
  if (errors.length) {
    console.error("RELEASE CHECK FAILED:");
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log(`release-check: ok (version ${baseVersion} → ${headVersion}).`);
}

// Run only when invoked directly (not when imported by the test file).
if (import.meta.url === `file://${process.argv[1]}`) main();

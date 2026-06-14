import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isShippable,
  parseSemver,
  compareSemver,
  requireBump,
} from "./release-check.mjs";

const hasErr = (res, needle) =>
  res.errors.some((e) => e.toLowerCase().includes(needle.toLowerCase()));

// ── isShippable ──────────────────────────────────────────────────────────────

test("installable surface is shippable; repo tooling is not", () => {
  for (const f of [
    "skills/raise-init/SKILL.md",
    "skills/align/references/x.md",
    ".claude-plugin/plugin.json",
    ".claude-plugin/marketplace.json",
  ]) {
    assert.ok(isShippable(f), `expected shippable: ${f}`);
  }
  for (const f of [
    "scripts/validate.mjs",
    ".github/workflows/validate.yml",
    ".spine/journal.md",
    "README.md",
    "package.json",
  ]) {
    assert.ok(!isShippable(f), `expected not shippable: ${f}`);
  }
});

// ── semver helpers ───────────────────────────────────────────────────────────

test("parseSemver accepts x.y.z, rejects junk", () => {
  assert.deepEqual(parseSemver("1.2.3"), [1, 2, 3]);
  for (const bad of ["1.2", "v1.2.3", "1.2.3-rc1", "", undefined, 12]) {
    assert.equal(parseSemver(bad), null, `expected null for ${bad}`);
  }
});

test("compareSemver orders versions; null on unparseable", () => {
  assert.ok(compareSemver("1.3.0", "1.2.0") > 0);
  assert.ok(compareSemver("1.2.0", "1.3.0") < 0);
  assert.equal(compareSemver("1.2.0", "1.2.0"), 0);
  assert.ok(compareSemver("2.0.0", "1.9.9") > 0);
  assert.equal(compareSemver("1.2", "1.2.0"), null);
});

// ── requireBump ──────────────────────────────────────────────────────────────

test("no installable change → ok even when version is unchanged", () => {
  const res = requireBump({
    changedFiles: ["scripts/validate.mjs", ".spine/journal.md", "README.md"],
    baseVersion: "1.2.0",
    headVersion: "1.2.0",
  });
  assert.deepEqual(res.errors, []);
});

test("skill change without a bump → error", () => {
  const res = requireBump({
    changedFiles: ["skills/raise-match/SKILL.md"],
    baseVersion: "1.2.0",
    headVersion: "1.2.0",
  });
  assert.ok(hasErr(res, "does not bump"));
});

test("manifest change without a bump → error", () => {
  const res = requireBump({
    changedFiles: [".claude-plugin/plugin.json"],
    baseVersion: "1.2.0",
    headVersion: "1.2.0",
  });
  assert.ok(hasErr(res, "bump"));
});

test("skill change with a real bump → ok", () => {
  const res = requireBump({
    changedFiles: ["skills/raise-match/SKILL.md", "scripts/x.mjs"],
    baseVersion: "1.2.0",
    headVersion: "1.3.0",
  });
  assert.deepEqual(res.errors, []);
});

test("version going backwards → error", () => {
  const res = requireBump({
    changedFiles: ["skills/raise-match/SKILL.md"],
    baseVersion: "1.3.0",
    headVersion: "1.2.0",
  });
  assert.ok(hasErr(res, "backwards"));
});

test("invalid semver on a shipped change → error", () => {
  const res = requireBump({
    changedFiles: ["skills/raise-match/SKILL.md"],
    baseVersion: "1.2.0",
    headVersion: "1.2",
  });
  assert.ok(hasErr(res, "semver"));
});

# 0018. Bump the version on every shipped plugin change — by skill and by gate

- **Status:** accepted
- **Date:** 2026-06-14
- **Labels:** release, versioning, ci, ship, tooling

## Context

The fundraising track (PR #15) shipped without bumping the version — all three
manifests stayed at `1.1.0`. That is an install-blocker of a subtler kind: a
`/plugin` upgrade keys off the version, so an existing install sees "1.1.0 ==
1.1.0" and **pulls nothing** — the 11 new skills never reach the user. The `ship`
skill is *supposed* to bump the version, but nothing enforced it, so the dogfood
missed it. We want this to be impossible to forget, on every ship to `main`.

The repo is zero-dependency; its harness is `scripts/validate.mjs` (pure
validators in `manifest-schema.mjs`, unit-tested with `node --test`) plus the
`validate` CI workflow. Three places carry the version: root `package.json`,
`.claude-plugin/plugin.json`, and the `marketplace.json` `plugins[]` entry — and
they were only loosely coupled (a *warning* on plugin↔marketplace mismatch,
`package.json` not checked at all).

## Decision

Enforce versioning at **two layers** — the skill does it, the gate guarantees it.

**A — the `ship` skill bumps.** `ship` gains an explicit step: if the diff touches
the installable surface (`skills/**` or either manifest), bump the version in all
three files together — **minor** for a new skill/capability, **patch** for a fix
to an existing skill — and refresh the marketplace description/keywords if the
surface changed. Pure tooling changes (`scripts/`, `.github/`, `.spine/`, docs)
need no bump.

**B — CI guards it**, two checks:
1. **Version sync (static, local + CI).** `crossCheck` in `manifest-schema.mjs` is
   upgraded from a plugin↔marketplace *warning* to a three-way **error**: root
   `package.json`, `plugin.json`, and the marketplace entry must all declare the
   same version. `validate.mjs` now reads `package.json` and passes its version
   in. Runs everywhere `validate` runs.
2. **Bump-required (CI, pull_request).** New `scripts/release-check.mjs`: a pure
   core (`isShippable`, `parseSemver`, `compareSemver`, `requireBump`) plus a thin
   CLI that diffs the PR against its base branch. If any changed file is shippable
   and the version was **not** bumped (or moved backwards, or isn't valid semver),
   it fails. Wired as a `pull_request`-only step in the `validate` workflow
   (`fetch-depth: 0` so the base is diffable). Unit-tested in
   `release-check.test.mjs`.

The "installable surface" is defined once, in `release-check.mjs`: `skills/**`,
`.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`.

## Consequences

- A shipped skill change that forgets the bump now **fails the PR** — the silent
  no-op upgrade can't recur. Belt (the skill) and suspenders (the gate).
- The three versions can no longer drift; a stale marketplace entry is an error,
  not a warning. This tightened an existing rule — the prior crossCheck warning
  tests were rewritten to assert the error (the old behavior is superseded here).
- `release-check` is **CI-only** for the bump rule (it needs the base branch);
  its logic is pure and unit-tested, with the CLI shelling git through an
  injectable runner, per the repo's hermetic-test convention. Version *sync* also
  runs locally via `validate.mjs`, so most mistakes surface before CI.
- Patch-vs-minor is a **judgement** the `ship` skill makes, not something the gate
  enforces (the gate only requires *some* forward bump) — we deliberately don't
  encode semver intent in CI.
- Rejected: **auto-bump-and-commit in CI** (option C) — it would create bot
  commits on `main` and need a branch-protection-bypassing token; enforcing a
  human/agent bump keeps `main` clean and the intent explicit. Rejected a
  separate `VERSION` file or a CHANGELOG mandate as out of scope for now.

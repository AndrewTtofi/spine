# Journal

## Current focus

**Handoff:** spine is a **v1.3.0** Claude Code plugin (9 lifecycle skills
`init`…`remember` + meta `new-skill`) plus an **optional 11-skill fundraising
track** (`raise-*`), all unified by the per-repo `.spine/` memory store, plus a
`spine-dashboard` that renders any repo's `.spine/` as a deterministic
spring+collision "brain" in a Stripe-grade light theme. The fundraising track
(PR #15) lives on its own walled-off `.spine/raise/` namespace and hands off via
structured YAML headers — see [[0015-optional-fundraising-track]]. Releases are now
**self-policing**: the `ship` skill bumps the version and CI (`validate` workflow +
`scripts/release-check.mjs`) fails any PR that ships a `skills/`/manifest change
without a forward bump, so `/plugin` upgrades never silently no-op — see
[[0018-enforce-version-bump-on-ship]]. Everything was built by **dogfooding the
spine lifecycle on this repo**. All merged to `main` (PRs #7–#16); CI + branch
protection gate `main`.

**Active:** none. `main` clean, 20 skills valid, 32 tests pass, CI green.

## Next step

None pending. Candidate follow-ups (not committed): a worked `.spine/raise/`
example run on a real profile; dashboard support for the raise namespace;
surfacing more dashboard `concept` nodes; a CHANGELOG to pair with the version bumps.

## History

- 2026-06-14 {release, versioning, ci, ship, tooling} — **PR #16 (merged,
  `6c1ee6f`)**: make the version bump **self-policing** so `/plugin` upgrades never
  silently no-op (as the fundraising track nearly did at a stale 1.1.0). Two layers:
  the `ship` skill bumps the version on any installable-surface change; CI enforces
  it — `crossCheck` upgraded to a **three-way version-sync error** (package.json +
  plugin.json + marketplace entry) and a new `scripts/release-check.mjs` fails any
  PR that ships a `skills/`/manifest change without a forward semver bump. Dogfood:
  bumped 1.2.0 → **1.3.0**. 32/32 tests. [[0018-enforce-version-bump-on-ship]].
- 2026-06-14 {release, versioning} — bumped 1.1.0 → **1.2.0** (release commit
  `e1d2acb`) so existing installs upgrade and pull the fundraising track; synced
  all three manifests + refreshed the stale marketplace description. This omission
  is what motivated PR #16.
- 2026-06-14 {raise, skills, fundraising, namespace, dogfood} — **PR #15 (merged,
  `8a36c51`)**: the **optional fundraising track** — 11 `raise-*` skills taking a
  founder from "are we fundable" through fund research, pitch prep, outreach, term
  sheets, to a consolidated investor dossier. Re-homes the idea (clean-room from the
  MIT vcupid-plugin) onto a walled-off **`.spine/raise/`** namespace with
  **structured-header handoff** (not prose-string parsing), a **cheap vet gate**
  before the expensive 4-sub-agent `raise-match`, and a **profile-required** guard
  across the track. Shipped in the same plugin, grouped as optional; core lifecycle
  untouched. 20 skills valid, `node:test` 22/22, clean-room grep clean.
  [[0015-optional-fundraising-track]], [[0016-raise-namespace-layout-structured-handoff]],
  [[0017-raise-match-subagent-contract]].
- 2026-06-13 {tooling, validate, manifest, ci, tests} — **PR #14 (merged, `c917e29`)**: harden
  `validate.mjs` against the Claude Code **manifest schema**. Pure
  `manifest-schema.mjs` (`validateManifest`/`validateMarketplace`/`crossCheck` →
  `{errors,warnings}`); `validate.mjs` becomes a thin two-tier CLI wrapper (errors
  fail, warnings inform); both manifests checked (author/owner must be objects,
  name kebab-case, keywords array, source `./`-prefixed, clean JSON errors). Root
  `package.json` + CI now runs validate + `node:test` (22/22). First feature run
  through the full align→design→build→verify→ship gate with CI + branch
  protection live. [[0014-manifest-schema-validation-pure-module]].
- 2026-06-13 {skills, align, init, gate, dogfood} — **PR #12 (merged, `4f02c64`)**: the
  **contracting gate**. `align` reworked into an extensive, certainty-gated
  intent interview — 12 interrogation dimensions, an explicit confidence score,
  and a context playback the user must confirm before any building. `init` now
  **installs the gate into any repo** (self-gating `UserPromptSubmit` hook in
  `.claude/settings.json` + marker-delimited `CLAUDE.md` block), so enforcement
  ships with the Spine rather than living only here. Installed + dogfooded on
  this repo; `.gitignore` narrowed so the shared hook is committed.
  `validate.mjs` green; hook verified silent-without/fires-with `.spine/`; merge
  proven idempotent.
- 2026-06-13 {dashboard, graph, ux, labels, layout} — **PR #11 (merged,
  `95b78e6`)**: a queryable + navigable brain — a **labels** layer (derived
  `type`/`scope` + explicit Spine labels the skills write)
  [[0010-labels-as-a-queryable-layer]]; a **filter bar** (date range + label chips)
  and a **WIP anchor** [[0011-filter-bar-and-wip-anchor]]; and the
  **deterministic spring+collision layout** — left→right by time, zero overlap, no
  scramble [[0012-deterministic-sequenced-organic-layout]],
  [[0013-deterministic-spring-collision-brain]]. 42/42 tests.
- 2026-06-13 {dashboard, graph, ux} — **PR #10 (merged)**: expanding a cluster no
  longer reshuffles the brain (pin existing nodes), focus-on-expand fades the
  unrelated set, and the focus star was removed.
- 2026-06-13 {dashboard, graph} — **PR #9 (merged, `7472942`)**: the force-directed
  knowledge-graph brain — every commit clustered
  [[0006-cluster-every-commit-into-segments]], Stripe-grade light reskin
  [[0008-stripe-grade-light-design-system]], module hubs / concepts /
  non-sequential edges [[0009-knowledge-graph-brain-with-hubs]].
  **Lesson:** verify a PR is still open before claiming a push lands in it.
- 2026-06-13 {dashboard, graph, docs} — **PR #8 (merged)**: PR-clustering +
  three-pane enterprise docs [[0004-cluster-commits-by-pull-request]],
  [[0005-docs-three-pane-with-generated-toc]].
- 2026-06-13 {skills, dashboard} — **PR #7 (merged, `df26c02`)**: v1.1 skills
  (ship/troubleshoot/new-skill) + `plugin.json` author fix + the first dashboard
  graph redesign [[0001-git-history-as-commit-backbone]],
  [[0002-spine-overlays-the-commit-timeline]],
  [[0003-vertical-timeline-via-cytoscape-preset]]; spec
  `docs/specs/2026-06-13-dashboard-graph-redesign.md`.
- 2026-06-13 {spine, dogfood} — Seeded this `.spine/` via `init`; dogfooded the
  full spine lifecycle to produce the work above.

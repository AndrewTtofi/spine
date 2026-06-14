# Journal

## Current focus

**Handoff:** spine is a v1.1.0 Claude Code plugin (9 lifecycle skills) plus a
`spine-dashboard` that renders any repo's `.spine/`. The dashboard's graph is a
**deterministic spring+collision "brain"** in a Stripe-grade light theme: clusters
flow **left→right by time** (oldest left, newest/WIP right) along a traceable
`parent` chain, with ADRs, module hubs and concept nodes webbing around — **zero
overlap, identical every reload**, navigated by fit/zoom/**search + a filter bar**
(date range + **label** chips). Labels are a first-class queryable layer the skills
themselves produce (ADR `Labels:`, journal `{labels}`). All of it was built by
**dogfooding the spine lifecycle on this repo**, so `.spine/` here is both the
memory and the worked example. Everything is merged to `main` (PRs #7–#12); CI (`validate` workflow) + branch
protection now gate `main`.

**Active ({raise, skills, fundraising, namespace, dogfood}, confidence 92%):** add
an **optional "fundraising track"** to spine — a family of `raise-*` skills that
take a founder from "should we even raise / are we ready" through strategy, fund
research, pitch prep, outreach, term sheets, and a consolidated investor dossier —
all re-homed onto a dedicated **`.spine/raise/`** namespace (walled off from
`context.md`/`journal.md`/`decisions/`). Inspired by the vcupid-plugin (MIT, 16
skills) but **clean-room**: ideas only, spine's own voice, no copied text → no
attribution owed. Shipped inside the **existing spine plugin**, grouped as an
**optional** track in the READMEs (`validate.mjs` wires them like any skill).
Widest scope: all four bundles — **validation & readiness** (worth-building /
ICP / wedge + a fund-readiness scorecard), **strategy & fund research** (strategy
memo, fund pipeline, poser/legitimacy check, per-fund fit match via 4 parallel
WebSearch/WebFetch sub-agents scored /100, perks, GP profiles), **pitch &
outreach** (devil/angel, meeting prep, outreach + one-pager, debrief), **close &
track** (term-sheet analysis, pipeline tracker, consolidated dossier). Markdown
only (zero-NPM-dep preserved); each skill declares **Spine I/O** against
`.spine/raise/` + `allowed-tools` where it needs web/agent tools.
**Out:** no changes to core lifecycle skills; core `init` does not create
`.spine/raise/`; no separate plugin/marketplace entry; no PDF/email/CRM (outreach
**drafts**, never sends; reports are markdown); term-sheet skill is informational,
not legal advice; no dashboard changes for the raise namespace (future); validation
front-end bounded to *fundability*, not full product discovery; profile is
founder-maintained (no web auto-update).
**Assumptions (the last 10%):** exact skill decomposition (~12 consolidated vs ~17
granular) is a **`design`-phase** call — lean toward consolidation; bootstrap is a
dedicated **`raise-init`** (not folded into core `init`); **`build` delivers
incrementally** in TDD slices (namespace + bootstrap + one fund-match vertical
first, then fan out); validation front-end is fresh prose, not a wrapper over an
existing skill.

## Next step

**Merged — [PR #15](https://github.com/AndrewTtofi/spine/pull/15)** (`8a36c51`,
branch deleted). The fundraising track is on `main`: 20 skills valid, CI `validate`
green (9s). The full align→design→build→verify→ship lifecycle was dogfooded again,
this time adding a whole optional capability. **Run `remember`** to compact this
session into the Spine.

## Verification (2026-06-14)

**Verdict: all 12 acceptance criteria MET, with evidence.**
- `node scripts/validate.mjs` → **All 20 skills valid** (9 lifecycle + 11 raise) → C8, C9.
- `node --test scripts/` → **22 tests, 22 pass, 0 fail** → C12 (core unregressed).
- All 11 `raise-*` skills present; each has `name`==folder, `metadata.track:
  fundraising`, a `## Spine I/O` section, a "Use when" trigger, and `allowed-tools`
  → C7. Web/agent tools only where needed (`raise-match` carries `Agent`).
- Every Spine I/O target is under `.spine/raise/`; the only engineering-Spine
  mention in the track is `raise-init`'s "Never touches the engineering Spine"
  negation → C1. All 10 non-init skills stop → `raise-init` when `profile.md` is
  absent → C2.
- `raise-match`: 4 `references/agent-*.md` + "fire all four in a single message" →
  C5. `raise-report` writes `report.md` (consolidated dossier) → C6. `raise-ready`
  scores fundability + names the gap → C4. Four bundles each covered → C3.
- `raise-term` says "not legal advice" (3×, leads output); `raise-outreach` "never
  sends" (2×) → C11. README "Fundraising track (optional)" section present → C10.
- Clean-room confirmed: grep for `vcupid|Poser Score|Startup Destroyer|Startup
  Champion|STARTUP_PROFILE|/vc*|3flux` across the track → **none found**.

## Build plan (slices) — each ends validator-green + fully wired

1. **Foundation** — `raise-init` (bootstrap `.spine/raise/`, seed `profile.md` via
   interview; clean-room profile schema in a reference file), the handoff-header
   convention, and the README "Fundraising track (optional)" section. (criteria 1, 2, 7, 8, 10)
2. **Fund research core** — `raise-vet` (cheap legitimacy stub) + `raise-match`
   (gated 4-sub-agent dossier, `references/agent-{thesis,portfolio,people,deal}.md`,
   /100 score, structured header). The workhorse vertical. (criteria 5, 7, 8)
3. **Readiness + strategy + pipeline** — `raise-ready` (validation + fundability
   scorecard), `raise-funds` (target pipeline), `raise-strategy` (memo). (criteria 3, 4)
4. **Pitch + outreach** — `raise-pitch` (devil+angel+prep), `raise-outreach`
   (variants + one-pager; refuses on `no-go`, never sends). (criteria 3, 11)
5. **Close + track** — `raise-debrief`, `raise-term` (informational-not-legal
   disclaimer), `raise-report` (tracker + consolidated `report.md` dossier).
   (criteria 3, 6, 11)

Every slice: write the skill(s), wire into `plugin.json` + `README.md` +
`skills/README.md`, run `validate.mjs` to green, keep prose clean-room + in
spine's voice. Final pass confirms all 12 acceptance criteria (criterion 9 = the
validator; criterion 12 = core skills/dashboard untouched).

## Verification (2026-06-13)

**Verdict: all 15 acceptance criteria MET.** Evidence:
- `node --test scripts/` → **22 pass / 0 fail** (covers criteria 1–5, 9, 13–15
  as pure-function tests; 10/15 = pure module imported directly).
- `node scripts/validate.mjs` on the real repo → **exit 0**, all 9 skills `ok`,
  one warning surfaced (`plugin.json: missing "license"`) → criteria 8, 9, 12.
- CLI failure sweep (throwaway repo), each **exit 1** with a clean message:
  author-as-string → `"author" must be an object … not a string` (C1); missing
  version (C2); `author.name is required` (C3); owner-as-string (C4); entry
  missing `source` (C5); `invalid JSON in marketplace.json: …` (C6, no stack
  trace); `marketplace.json missing` (C7); non-kebab name (C13); `keywords` as
  string + `source` not `./`-prefixed (C14).
- `npm test` → exit 0; workflow runs validate + `npm test`; the required
  `validate` check covers both (C11) — **live PR run confirmed at ship**.
- Diff: +435/-17 across `scripts/` + `package.json` + workflow; no TODOs, stubs,
  or dead code; `manifest-schema.mjs` is pure (no fs/exit), `validate.mjs` the
  thin CLI wrapper (C10, C15).

## Build plan (slices) — TDD, smallest vertical slices

1. **Pure `validateManifest(plugin)`** in `scripts/manifest-schema.mjs` +
   `manifest-schema.test.mjs`: name present+kebab-case, description/version
   present (repo convention), author-if-present object w/ name, keywords-if-present
   array. Returns `{errors, warnings}`. (criteria 1,2,3,9-part)
2. **Pure `validateMarketplace(marketplace)`**: name kebab-case, owner object w/
   name, plugins non-empty array, each entry name kebab-case + source present
   (string ⇒ `./`-prefixed), author-if-present object. (criteria 4,5,13,14)
3. **Wire into `validate.mjs`**: clean JSON read/parse (missing/malformed →
   readable error), missing `marketplace.json` → error, call both validators,
   merge with existing checks, two-tier print + exit. (criteria 6,7,8,10,12)
4. **Cross-checks → warnings**: plugin↔marketplace `version` mismatch, missing
   `license`/`keywords`. (criterion 9)
5. **CI + root scaffold**: root `package.json` (`test: node --test`, scoped to
   validator tests), extend the `validate` workflow to run validate + tests.
   (criterion 11)

## Acceptance criteria (active work — fundraising track)

> Criteria define the **whole track**; `build` delivers them in TDD slices.

- [x] 1. A `.spine/raise/` namespace exists and is the **only** place the track reads/writes; no `raise-*` skill writes to `context.md`, `journal.md`, or `decisions/`. — every SKILL's Spine I/O points only at `.spine/raise/`; `namespace.md` codifies the rule.
- [x] 2. Given a repo with no fundraising state, the bootstrap skill (`raise-init`) creates `.spine/raise/` + a seeded `profile.md` via interview — and other `raise-*` skills refuse to run with a clear message if `profile.md` is absent. — `raise-init` step 3; every other skill step 1 stops → `raise-init`.
- [x] 3. The track covers all four bundles — **validation & readiness**, **strategy & fund research**, **pitch & outreach**, **close & track** — each capability reachable by at least one `raise-*` skill. — 11 skills span all four.
- [x] 4. A fund-readiness scorecard skill outputs an explicit "ready to raise? what's missing" assessment derived from `profile.md`. — `raise-ready` (readiness_score + verdict + gap).
- [x] 5. The fund-match skill spawns **parallel research sub-agents** (thesis/portfolio/people/deal) via WebSearch/WebFetch and produces a fit score summing to /100 with a verdict. — `raise-match` step 2–3 + 4 agent reference files.
- [x] 6. A consolidation skill assembles a single investor-ready dossier (`.spine/raise/report.md`) from the namespace contents. — `raise-report` step 3.
- [x] 7. Every `raise-*` skill has frontmatter `name` == folder name, a `description` with explicit "Use when…" triggers, a declared **Spine I/O** section pointing at `.spine/raise/`, and `allowed-tools` where it uses web/agent tools. — confirmed across all 11 (validator checks name==folder).
- [x] 8. Every shipped `raise-*` skill is wired into `.claude-plugin/plugin.json`, `README.md` (under an "optional fundraising track" section), and `skills/README.md`. — validator enforces all three wirings.
- [x] 9. `node scripts/validate.mjs` exits 0 (`All N skills valid.`) with the new skills present. — **All 20 skills valid.**
- [x] 10. Skill prose is clean-room (no copied vcupid text) and matches spine's terse senior-engineer voice; the track is documented as **optional**. — fresh prose; README section titled "Fundraising track (optional)".
- [x] 11. The term-sheet skill carries an explicit "informational, not legal advice" disclaimer; outreach skills draft but never send. — `raise-term` leads with the disclaimer; `raise-outreach` "drafts only — never sends".
- [x] 12. Core lifecycle skills and existing validator/dashboard behaviour are unchanged and still pass. — 9 lifecycle skills untouched; `node --test` 0 fail.

## Shipped work archive — PR #14 (criteria all met, see History + ADR 0014)

The Verification and Build-plan sections above pertain to the **shipped** manifest-schema
hardening (PR #14, `c917e29`) — retained as a worked example, not active work.

## Prior candidate follow-ups (not committed to):
- Apply the collision pass to the **expanded** commit-ring too (a ring can
  currently overlap a neighbour; the default brain is overlap-free).
- Surface more `concept` nodes (only "Spine" crosses the ≥2-ADR bar today).
- Harden `scripts/validate.mjs` against Claude Code's manifest schema.

## History

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

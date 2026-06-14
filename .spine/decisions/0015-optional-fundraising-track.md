# 0015. Add an optional fundraising track of `raise-*` skills on `.spine/raise/`

- **Status:** accepted
- **Date:** 2026-06-14
- **Labels:** raise, skills, fundraising, namespace, packaging

## Context

spine is a lifecycle for *building* software, but a real project often reaches a
moment where it needs *funding*. Nothing in spine helps with that today. The best
existing tool, the **vcupid-plugin** (MIT © 3Flux, 16 `/vc*` skills), proves the
fundraising workflow is valuable but keeps all state in loose, flat
`STARTUP_PROFILE.md` + `vc*-<fund>.md` files in the working directory, coupled by
**exact-string parsing** of prose (`Recommended Action: Pursue`) and with no
project memory. spine's differentiator is exactly what vcupid lacks: a single
per-repo memory store that every skill reads and writes, carried across sessions
and queryable.

Align settled the intent (see `journal.md` Active focus + the 12 acceptance
criteria): an **optional** capability, activated only when a project needs
funding; widest scope (validation & readiness → strategy & fund research → pitch
& outreach → close & track); its **own walled-off namespace**; **clean-room**
(ideas from vcupid, none of its text — so no attribution is owed); markdown only
(spine's zero-NPM-dep purity preserved); live web research kept.

## Decision

Ship a **fundraising track**: a family of **11 `raise-*` skills** inside the
**existing spine plugin**, grouped and documented as an **optional** track,
operating on a dedicated **`.spine/raise/`** sub-namespace (ADR 0016) — never
mixing with `context.md` / `journal.md` / `decisions/`.

The 11 skills (deep modules — one verb a founder invokes; consolidated from
vcupid's 16 plus two new readiness capabilities):

| Skill | Owns | Folds in (vcupid) |
|-------|------|-------------------|
| `raise-init` | bootstrap `.spine/raise/` + seed `profile.md` via interview | (new; replaces manual `STARTUP_PROFILE.md`) |
| `raise-ready` | validation (worth-building / ICP / wedge) **+** fundability scorecard | (new) |
| `raise-strategy` | fundraising strategy memo | vcraise |
| `raise-funds` | build the ranked target-fund pipeline | vclist |
| `raise-vet` | **cheap** legitimacy gate (is this fund real & active?) | vcposer |
| `raise-match` | **expensive** 4-sub-agent fit + perks + people dossier, scored /100 | vcmatch, vcperks, vcpartner |
| `raise-pitch` | adversarial stress-test + champion brief + meeting prep | vcdevil, vcangel, vcprep |
| `raise-outreach` | outreach variants + fund-specific one-pager | vcintro, vclp |
| `raise-debrief` | post-meeting debrief | vcdebrief |
| `raise-term` | term-sheet clause analysis (informational, not legal advice) | vcterm |
| `raise-report` | pipeline tracker **+** consolidated investor dossier | vctrack (+ new dossier) |

`raise-vet` is kept **separate** from `raise-match` deliberately: a cheap
pre-filter gates the expensive 4-agent research so we never burn four sub-agents
on a zombie fund (the sequencing contract is ADR 0017).

**Frontmatter convention** for `raise-*` skills (additive to the repo's
`name`/`description` rule — `validate.mjs` checks only those two and ignores the
rest): a `description` with explicit "Use when…" triggers, an `allowed-tools`
line where the skill uses web/agent tools (e.g. `WebSearch WebFetch Read Write
Agent`), a `metadata.track: fundraising` marker so the track is groupable, and a
`## Spine I/O` section naming exactly what it reads/writes under `.spine/raise/`.
Each shipped skill is wired into `plugin.json`, `README.md` (a new "Fundraising
track (optional)" section), and `skills/README.md`, per the standing contract.

## Consequences

- A project's raise becomes **first-class project memory** — queryable, labelled,
  and carried across sessions — instead of loose files. The dashboard renders it
  for free (it reads `.spine/`).
- Consolidating 16 → 11 honours spine's **deep-module** convention: a small
  invocation surface over rich implementations. We accept that `raise-match` is a
  heavy skill (legitimacy-gated, four sub-agents, perks + people) — that is the
  deep module, not sprawl.
- Two **new** capabilities (`raise-ready`'s validation + fundability scorecard)
  make the "OR at least get them ready" half of the goal explicit — beyond
  vcupid's pitch-stage-assumed lane.
- Clean-room prose is a standing obligation: contributors must not paste vcupid
  text. If any phrasing ends up derived, a NOTICE credit must be added.
- Core lifecycle skills, core `init`, the validator, and the dashboard are
  **unchanged**; core `init` does not create `.spine/raise/` (the track is opt-in
  via `raise-init`).
- Rejected: a **separate plugin/marketplace entry** (more manifest surface, two
  installs — the track is a sub-part of spine, not a sibling product); a **~16
  granular** set near vcupid 1:1 (fights the deep-module convention); folding
  `raise-vet` into `raise-match` (loses the cheap-gate-before-expensive-research
  saving). See ADR 0016 (layout + handoff) and ADR 0017 (match contract).

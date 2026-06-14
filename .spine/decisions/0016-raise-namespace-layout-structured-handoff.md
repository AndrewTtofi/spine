# 0016. Lay out `.spine/raise/` and hand off between skills via structured headers

- **Status:** accepted
- **Date:** 2026-06-14
- **Labels:** raise, namespace, data, handoff

## Context

The fundraising track (ADR 0015) needs a file layout for its `.spine/raise/`
namespace and a contract for how skills consume each other's output. vcupid's flaw
is its coupling: downstream skills **parse literal prose strings** ("the string
`Recommended Action:` followed by `Pursue`") out of a free-form report. That is
brittle — a wording change silently breaks the pipeline, and there is no clean
place to read a fund's current state. A startup also accumulates several artifacts
per fund (a dossier, outreach, meeting prep, a debrief, a term sheet), so the
layout must keep per-fund state together while cross-fund artifacts stay at the
top.

## Decision

**Layout** — per-fund artifacts nest under `funds/<slug>/`; cross-fund artifacts
live at the top of the namespace:

```
.spine/raise/
  profile.md            # the startup profile (raise-init seeds; founder maintains)
  readiness.md          # raise-ready: validation + fundability scorecard
  strategy.md           # raise-strategy: the strategy memo
  pipeline.md           # raise-funds: ranked target universe (tiers)
  pitch.md              # raise-pitch: general devil+angel stress-test (no fund)
  report.md             # raise-report: consolidated investor-ready dossier
  tracker.md            # raise-report: internal pipeline status table
  funds/
    <slug>/
      dossier.md        # raise-vet legitimacy + raise-match fit/perks/people
      outreach.md       # raise-outreach: intro variants + one-pager
      pitch.md          # raise-pitch: fund-specific meeting prep
      debrief.md        # raise-debrief
      term.md           # raise-term
```

The fund **slug** is the lowercased fund name with punctuation/space stripped
(`Y Combinator` → `y-combinator`, `a16z` → `a16z`).

**Handoff contract** — every generated file opens with a small **YAML
frontmatter header** of structured fields, and downstream skills read those
fields **by key**, never by scraping prose. The fund dossier header is the
backbone:

```yaml
---
fund: a16z
slug: a16z
legitimacy_score: 82        # raise-vet (0–100)
legitimacy_verdict: legit   # legit | probable | watch | poser
fit_score: 78               # raise-match (0–100)
recommended_action: pursue  # pursue | warm-up | no-go
updated: 2026-06-14
---
```

`profile.md` carries a clean-room startup-profile schema (company overview ·
market & model · traction & milestones · team · fundraise), seeded by
`raise-init`. `pipeline.md` lists each candidate fund with a tier and slug.
`raise-outreach` refuses when `recommended_action: no-go`; `raise-report`
aggregates every `funds/*/dossier.md` header into `tracker.md`; `raise-strategy`
sequences off the headers. Skills must tolerate **missing** files (a fund with a
dossier but no debrief yet) — absence means "that step hasn't run", not an error.

## Consequences

- The pipeline is coupled on **named fields**, not wording — a skill can rewrite
  its prose freely without breaking the founders' downstream steps. This is the
  concrete spine-native upgrade over vcupid.
- A fund's whole story lives in one `funds/<slug>/` directory — easy to read,
  diff, and reason about; cross-fund state stays shallow at the top.
- `dossier.md` has **two authors** (`raise-vet` then `raise-match`). To avoid
  fragile multi-writer merges, `raise-vet` writes a stub dossier (header +
  legitimacy section); `raise-match` is the **assembler** — it reads the vet
  header, then rewrites `dossier.md` whole with every section and a completed
  header (ADR 0017). Single source of truth per fund.
- Markdown-with-YAML-header keeps the store **human-readable and zero-dep** —
  parseable by the same lightweight regex the validator already uses for skill
  frontmatter, no parser dependency.
- Rejected: flat prefixed files (`vcmatch-a16z.md`) like vcupid (scatters a
  fund's artifacts, invites string-coupling); a JSON/SQLite state file (breaks
  human-readability and zero-dep); one mega-file per raise (unmergeable, poor
  diffs).

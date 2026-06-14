# The `.spine/raise/` namespace — layout and handoff contract

The canonical contract for the fundraising track. Every `raise-*` skill reads and
writes here, and **only** here — never the engineering Spine (`context.md`,
`journal.md`, `decisions/`). See ADR 0016 in `.spine/decisions/`.

## Layout

Cross-fund artifacts live at the top; everything about one fund nests under
`funds/<slug>/`:

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
      debrief.md        # raise-debrief: post-meeting read + follow-up
      term.md           # raise-term: term-sheet clause analysis
```

## Fund slug

Lowercase the fund name, strip punctuation and spaces:
`Y Combinator` → `y-combinator`, `a16z` → `a16z`, `Lowercarbon Capital` →
`lowercarbon-capital`. Skills derive the slug the same way so they always find
each other's files.

## Structured handoff header

Every generated file opens with **YAML frontmatter** carrying its key facts.
Downstream skills read these fields **by key** — never by scraping prose. This is
the contract that replaces fragile string-matching.

The **fund dossier** header is the backbone of the pipeline:

```yaml
---
fund: a16z
slug: a16z
legitimacy_score: 82          # raise-vet, 0–100
legitimacy_verdict: legit     # legit | probable | watch | poser
fit_score: 78                 # raise-match, 0–100
recommended_action: pursue    # pursue | warm-up | no-go
updated: 2026-06-14
---
```

Consumers of the header:

- **`raise-outreach`** refuses to draft when `recommended_action: no-go`.
- **`raise-match`** reads `legitimacy_score` to decide whether to run (see ADR 0017).
- **`raise-report`** aggregates every `funds/*/dossier.md` header into the tracker.
- **`raise-strategy`** sequences the raise off the headers across all funds.

## Rules

- **Tolerate missing files.** A fund may have a `dossier.md` but no `debrief.md`
  yet — absence means "that step hasn't run", not an error. Skills check for the
  files they need and tell the founder which skill to run if one is missing.
- **`profile.md` is required** by every skill except `raise-init`. If it's
  absent, stop and tell the founder to run `raise-init` first.
- **`dossier.md` has one assembler.** `raise-vet` writes the stub (header +
  legitimacy section); `raise-match` rewrites the file whole, preserving the
  legitimacy section and completing the header (ADR 0017). No other skill writes
  `dossier.md`.
- **Markdown only.** No JSON/SQLite state, no added dependencies — the namespace
  stays human-readable and diff-friendly, and the dashboard renders it for free.

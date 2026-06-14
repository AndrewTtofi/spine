# 0017. Gate expensive fund research behind a cheap vet; fan out match to 4 sub-agents

- **Status:** accepted
- **Date:** 2026-06-14
- **Labels:** raise, agents, research, match

## Context

Fund fit analysis needs real, current data — a fund's thesis, recent portfolio,
partners, and deal process — which means live web research. Doing that well is
expensive (many searches, broad reading), and most of a founder's target list
will not survive first contact (zombie funds, wrong stage, no dry powder). Running
the full research on every candidate wastes tokens and time. vcupid solved the
research depth with a 4-parallel-sub-agent fan-out in `vcmatch`, and the waste
with a separate cheap `vcposer` pre-filter — a sequencing we keep (ADR 0015 chose
`raise-vet` separate from `raise-match`).

## Decision

**`raise-vet` — the cheap gate.** One skill, 1–2 targeted searches, eight
legitimacy checks (fund vitality / last investment date, dry powder & partner
departures, thesis authenticity, lead-vs-follow, stage honesty, check-size
reality, signal-to-check ratio, founder sentiment) → a `legitimacy_score` (0–100)
and verdict. It writes a **stub** `funds/<slug>/dossier.md`: the YAML header (ADR
0016) plus a Legitimacy section. No fit scoring.

**`raise-match` — the expensive research, gated.** On invocation it reads the
existing dossier header and branches on `legitimacy_score`:

- **< 40** → stop ("likely a poser — run `raise-vet` to review, or move on"); no
  sub-agents spawned.
- **40–59** → proceed, flag a caution banner in the output.
- **≥ 60 or no vet yet** → proceed normally.

When it proceeds it **fans out four sub-agents in a single message** (true
parallelism), each given a fully **self-contained** prompt (sub-agents see none of
the parent context) built by substituting startup-profile placeholders
(`{{FUND_NAME}}`, `{{SECTOR}}`, `{{STAGE}}`, `{{ONE_LINER}}`, `{{TRACTION}}`,
`{{CEO_*}}`/`{{CTO_*}}`, `{{REFERRAL_*}}`, …) into prompt templates kept as
**reference files** under `skills/raise-match/references/agent-*.md` (progressive
disclosure):

| Sub-agent | Returns (named field blocks only — no scoring, no file writes) |
|-----------|----------------------------------------------------------------|
| `agent-thesis` | stated mandate, de-facto focus, stage focus, geography, verbatim thesis quotes |
| `agent-portfolio` | recent deals (24mo), entry-stage reality, traction bar, sector clusters, check-size signals |
| `agent-people` | partner roster + backgrounds, team-fund fit signals, warm-intro paths, referral overlap |
| `agent-deal` | check-size reality, instrument preference, decision timeline, diligence style, pass triggers, **perks / value beyond the check** |

The main skill waits for all four, reconciles conflicts (noting the source),
**scores 8 fit dimensions summing to /100** (sector 20, stage 20, thesis 20,
team-fund 10, traction-signal 10, check/terms 10, geography 5, network/warm-path
5), derives `recommended_action` (≥75 pursue · 50–74 warm-up · <50 no-go), and
**rewrites `funds/<slug>/dossier.md` whole** — Legitimacy (preserved from vet) +
Firm snapshot, Thesis, Portfolio pattern, Key people, Fit assessment, Why it
works, Risks, Deal process, Best approach, Warm-intro path, Diligence questions,
Perks — with a completed header. Degrade the action one tier if fewer than 3
sub-agents return usable data, and note the gap. Never fabricate names, quotes, or
check sizes — cite sources or mark `Unknown`.

## Consequences

- Obvious dead funds cost ~one cheap skill run, not four sub-agents — the
  sequencing pays for itself across a 15–20 fund pipeline.
- The fan-out keeps research **deep and parallel** (wall-clock ≈ the slowest
  agent, not the sum) while each agent stays narrow and self-contained.
- `raise-match` owns `dossier.md` as the **sole assembler** (ADR 0016), so the
  two-writer file never needs a merge — vet's section is carried forward by a
  full rewrite.
- The agent prompts are clean-room reference files; tuning a research angle means
  editing one `agent-*.md`, not the skill body.
- All scoring/thresholds live in the **main** skill, not the sub-agents — sub-agents
  only gather, so the calibration is in one place and the scores stay comparable
  across funds.
- Rejected: a single mega-search in one context (shallower, hits context limits);
  scoring inside sub-agents (uncalibrated, inconsistent across funds); skipping
  the vet gate (the 10-skill option in ADR 0015 — wastes research on zombies).

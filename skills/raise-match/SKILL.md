---
name: raise-match
description: Use to deeply analyse whether a specific VC fund fits your startup — spawns four parallel research sub-agents (thesis, portfolio, people, deal), scores the fit across eight dimensions out of 100, and writes a complete fund dossier with the warm-intro path, perks, and a pursue/warm-up/no-go verdict. Run after raise-vet clears the fund. Use when asked to "analyse this fund", "does this VC fit us", "research a fund", or "should we pitch this investor".
allowed-tools: WebSearch WebFetch Read Write Agent
metadata:
  track: fundraising
---

# raise-match — the gated, four-agent fund dossier

The workhorse of the track. Where `raise-vet` asks *"is this fund real?"*,
`raise-match` asks *"does it fit **us**?"* — and answers it with real research:
four sub-agents in parallel, an evidence-cited fit score, and a single dossier the
rest of the track builds on. It is the **sole assembler** of `dossier.md`.

## Invocation

```
raise-match <fund name>
```

## Steps

### 1 — Load context and the vet gate

Read `.spine/raise/profile.md` (stop → `raise-init` if absent). Derive the fund
**slug**. Read `.spine/raise/funds/<slug>/dossier.md` if it exists and branch on
`legitimacy_score` (see ADR 0017):

- **< 40** → stop: "This fund scored [N]/100 on vet — likely a poser. Run
  `raise-vet <fund>` to review, or move to the next fund." Spawn nothing.
- **40–59** → proceed, and flag a caution banner in the dossier.
- **≥ 60, or no vet yet** → proceed normally (suggest the founder run `raise-vet`
  first if there's no dossier, but don't block).

### 2 — Fan out four research sub-agents

Read the four prompt templates and fill the profile placeholders
(`{{FUND_NAME}}`, `{{SECTOR}}`, `{{STAGE}}`, `{{GEOGRAPHY}}`, `{{ONE_LINER}}`,
`{{TRACTION}}`, `{{RAISE_AMOUNT}}`, `{{BUSINESS_MODEL}}`, `{{CEO_NAME}}`,
`{{CEO_CREDENTIALS}}`, `{{CTO_NAME}}`, `{{CTO_CREDENTIALS}}`,
`{{REFERRAL_CONTACTS}}`, `{{COMPETITORS}}`):

- [references/agent-thesis.md](references/agent-thesis.md) — mandate, focus, stage, geography, quotes
- [references/agent-portfolio.md](references/agent-portfolio.md) — recent deals, entry-stage reality, traction bar
- [references/agent-people.md](references/agent-people.md) — partners, team-fund fit, warm-intro paths
- [references/agent-deal.md](references/agent-deal.md) — check size, instrument, process, perks

**Fire all four `Agent` calls in a single message** so they run in parallel. Each
prompt must be fully **self-contained** — sub-agents see none of this
conversation. Instruct each to return only its named field blocks: no scoring, no
recommendations, no file writes. Wait for all four.

### 3 — Synthesise and score

Reconcile conflicting data (note the conflict and its sources). Score eight fit
dimensions, **each citing specific evidence** from the returns — never an
uncalibrated guess:

| Dimension | Max | Evidence |
|---|---|---|
| Sector fit | 20 | thesis: focus clusters |
| Stage fit | 20 | thesis: stage + portfolio: entry-stage reality |
| Thesis alignment | 20 | thesis: mandate + quotes |
| Team–fund fit | 10 | people: fit signals |
| Traction signal fit | 10 | portfolio: traction bar |
| Check size / terms | 10 | deal: check size + instrument |
| Geographic fit | 5 | thesis/deal: geography |
| Network / warm path | 5 | people: warm-intro paths |

**Fit score** = the sum (max 100). **Recommended action**: ≥75 → `pursue` ·
50–74 → `warm-up` · <50 → `no-go`. If fewer than three sub-agents returned usable
data, downgrade the action one tier and note the gap.

### 4 — Write the dossier (whole)

Rewrite `.spine/raise/funds/<slug>/dossier.md` end to end using
[references/dossier-format.md](references/dossier-format.md). **Preserve the
`## Legitimacy` section** if `raise-vet` wrote one, and complete the handoff
header (`fit_score`, `recommended_action`, `updated`). Then report the fit score
and verdict, and the next step: pursue → `raise-pitch` / `raise-outreach`;
warm-up → name the lowest-scoring dimension to fix; no-go → state the primary
mismatch and suggest `raise-funds`.

## Spine I/O

- **Reads:** `.spine/raise/profile.md`; `.spine/raise/funds/<slug>/dossier.md` (vet stub).
- **Writes:** `.spine/raise/funds/<slug>/dossier.md` (full dossier; sole assembler).

## Notes

- All scoring lives **here**, not in the sub-agents — so calibration is in one
  place and scores stay comparable across funds.
- Never fabricate portfolio names, check sizes, or partner quotes — cite sources
  or mark `Unknown`. Each prose section stays under ~200 words; lead with tables.
- This is the only skill that writes the full `dossier.md` (ADR 0016).

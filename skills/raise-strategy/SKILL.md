---
name: raise-strategy
description: Use to synthesise everything known about the startup and its fund pipeline into a full fundraising strategy memo — raise parameters, sequencing, a milestone map, a month-by-month timeline, risks, and this week's next actions. Run after the profile, readiness, pipeline, and any fund dossiers exist. Use when asked to "build a fundraising strategy", "how should we run this raise", "what's our raise plan", or "sequencing strategy".
allowed-tools: Read Write
metadata:
  track: fundraising
---

# raise-strategy — the fundraising strategy memo

Pulls the whole namespace together into one plan: how much to raise, on what
instrument, who to approach in what order, which milestones unlock which
investors, and what to do this week. A strategy document, not a pitch — honest
about what's missing.

## Invocation

```
raise-strategy
```

## Steps

1. **Load all available context** (read what exists; don't error on absence):
   `.spine/raise/profile.md` (**required** → `raise-init` if absent),
   `readiness.md`, `pipeline.md`, and every `funds/*/dossier.md` (read their
   handoff headers for `fit_score`/`recommended_action` to sequence by).
2. **Write `.spine/raise/strategy.md`** — seven sections:
   - **Current state** — brutal honesty: what you have, what a fundable round in
     this sector typically needs that you lack, the single biggest risk, and a
     one-line verdict ("fundable now at [tier], not yet at [tier] without [X]").
     Anchor on `readiness.md` if present.
   - **Raise parameters** — recommended amount, instrument, valuation-cap range
     (from comps), timeline, and a minimum-viable close, each with a rationale.
   - **Sequencing** — who first (pull Tier-1 / highest-`fit_score` funds from the
     pipeline and dossiers), parallel vs. sequential with a recommendation, and the
     specific lever to create urgency.
   - **Milestone map** — which proof points unlock which investor tier, with target
     dates consistent with the profile's milestones.
   - **Month-by-month timeline** — from now to close, with hard dependencies
     flagged.
   - **Risks & contingencies** — each risk, its probability, and a specific
     fallback. Add a row for any fund whose dossier scores legitimacy < 60.
   - **This week — next three actions** — concrete, specific, doable in seven days.
3. **Report.** Summarise the recommended raise and the first three actions, and
   point to `raise-outreach <fund>` for each Tier-1 fund once dossiers exist.

## Spine I/O

- **Reads:** `.spine/raise/profile.md`, `readiness.md`, `pipeline.md`,
  `funds/*/dossier.md`.
- **Writes:** `.spine/raise/strategy.md`.

## Notes

- Every fund named in the sequencing/timeline must come from `pipeline.md` or a
  dossier — never invent funds or fit scores.
- "Current state" must acknowledge gaps, not cheerlead; the strategy is only as
  useful as it is honest.
- Re-run it as traction grows — new milestones change which funds are reachable.

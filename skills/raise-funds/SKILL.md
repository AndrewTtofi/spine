---
name: raise-funds
description: Use to research the VC landscape and build a ranked pipeline of funds to target — produces 15–20 funds in three tiers (pursue now, warm up first, monitor) with a fit rationale and a contact angle for each. Run before vetting and matching individual funds. Use when asked to "build a target list", "which VCs should we approach", "find funds for us", or "research the VC landscape".
allowed-tools: WebSearch WebFetch Read Write
metadata:
  track: fundraising
---

# raise-funds — build the target-fund pipeline

You can't analyse funds one by one until you know *which* funds. `raise-funds`
researches the landscape and produces a ranked, tiered target list — the universe
the rest of the track works through with `raise-vet` and `raise-match`.

## Invocation

```
raise-funds
```

## Steps

1. **Load the profile.** Read `.spine/raise/profile.md` (stop → `raise-init` if
   absent). Extract sector, stage, geography, check size, business model, and any
   named warm contacts — these drive the search.
2. **Research the landscape.** Search for funds that invest at this stage and
   sector and geography: thesis-matched firms, active recent investors in adjacent
   companies, and funds reachable through the profile's warm contacts. Aim for
   **15–20** real candidates. Cite a source per fund; never invent funds.
3. **Rank into three tiers**, each with a one-line rationale and a suggested
   contact angle:
   - **Tier 1 — Pursue now:** strong thesis + stage fit, and a plausible warm path.
   - **Tier 2 — Warm up first:** good fit but missing a proof point or an intro.
   - **Tier 3 — Monitor:** stage mismatch or unclear path — revisit after a milestone.
4. **Write `.spine/raise/pipeline.md`** with a structured header
   (`fund_count`, `tier1_count`, `updated`) and a table per tier: Fund · Slug ·
   Why it fits · Contact angle · Source. Use the standard slug rule so downstream
   skills find each fund.
5. **Report and point onward.** Summarise the tier counts and tell the founder to
   run `raise-vet <fund>` then `raise-match <fund>` on the Tier 1 funds before any
   outreach.

## Spine I/O

- **Reads:** `.spine/raise/profile.md`.
- **Writes:** `.spine/raise/pipeline.md`.

## Notes

- Quality over quantity — 15 well-matched funds beat 50 names off a list. A
  Tier-1 slot must have a real reason and a real path in.
- This skill ranks *fit potential* from the landscape; `raise-vet` confirms each
  fund is alive and `raise-match` confirms the fit with real research.

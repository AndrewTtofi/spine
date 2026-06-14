# Fund dossier format — `.spine/raise/funds/<slug>/dossier.md`

The single artifact the rest of the track reads. `raise-match` writes it whole,
preserving any `## Legitimacy` section `raise-vet` left. Lead with tables; keep
each prose section under ~200 words. Cite sources or mark `Unknown` — never
fabricate.

## Handoff header

```yaml
---
fund: <Fund Name>
slug: <slug>
legitimacy_score: <0–100 or blank if not vetted>
legitimacy_verdict: <legit | probable | watch | poser | blank>
fit_score: <0–100>
recommended_action: <pursue | warm-up | no-go>
updated: <YYYY-MM-DD>
---
```

## Sections

1. **Verdict banner** — fit score, recommended action, and (if legitimacy < 60) a
   caution line.
2. **Legitimacy** — preserved verbatim from `raise-vet` (the eight checks). Omit
   only if the fund was never vetted.
3. **Firm snapshot** — founded, model, fund size, standard check, key GPs, notable
   portfolio.
4. **Thesis & focus** — stated mandate vs. de-facto focus, with verbatim quotes.
5. **Portfolio pattern** — what the last 24 months reveal about real priorities,
   and the traction bar vs. ours.
6. **Key people** — partner roster, best-fit GP, team–fund fit signals.
7. **Fit assessment** — the eight-dimension score table (with evidence per row)
   summing to /100.
8. **Why it works** — the positive signals, with named portfolio analogs.
9. **Key risks & objections** — material mismatches, with specific math.
10. **Deal process** — check size, instrument, timeline, diligence style, pass
    triggers.
11. **Perks** — value beyond the check, `[Confirmed]`/`[Reported]`.
12. **Best approach** — warm vs. cold, what to lead with, what to avoid.
13. **Warm-intro path** — named intermediaries and specific actions, ranked.
14. **Diligence questions to prepare** — 5–8 fund-specific questions.
15. **Gaps / to verify** — open `Unknown`s.
16. **Sources** — the URLs the analysis relied on.

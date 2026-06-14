---
name: raise-vet
description: Use to vet a VC fund's legitimacy before spending real research on it — a cheap background check that answers "is this fund actually real and active, or a zombie?" Runs eight evidence-based checks and writes a stub fund dossier with a legitimacy score. Run before raise-match. Use when asked to "vet a fund", "check if a VC is legit", "is this fund still active", or "screen this investor".
allowed-tools: WebSearch WebFetch Read Write
metadata:
  track: fundraising
---

# raise-vet — the cheap legitimacy gate

Most of a target list won't survive first contact — zombie funds with no dry
powder, firms that haven't led a round in two years, theses their portfolio
doesn't back up. `raise-vet` is the **inexpensive** pre-filter that catches them
before `raise-match` spends four research sub-agents on a dead end. It answers
*"is this fund real and writing checks?"* — **not** *"does it fit us?"* (that's
`raise-match`).

## Invocation

```
raise-vet <fund name>
```

## Steps

1. **Load the profile.** Read `.spine/raise/profile.md` for stage/sector
   calibration (a fund can be alive but wrong for you — that's fine here, vet only
   judges vitality). If it's missing, stop and tell the founder to run
   `raise-init`. Derive the fund **slug** (see
   [../raise-init/references/namespace.md](../raise-init/references/namespace.md)).
2. **Run the eight checks** with a small number of targeted searches (this is the
   cheap pass — don't fan out sub-agents):
   - **Vitality** — date of last announced investment. >18 months silent = zombie risk.
   - **Health** — active current fund with dry powder? Recent key-partner departures?
   - **Thesis authenticity** — does the actual portfolio match the stated sector thesis?
   - **Lead capacity** — evidence of *leading* rounds, not only co-investing.
   - **Stage honesty** — stated stage vs. the real entry stage of recent deals.
   - **Check-size reality** — stated range vs. observable deal sizes.
   - **Signal-to-check ratio** — conference/content volume vs. actual new deals.
   - **Founder sentiment** — public patterns: ghosting, slow decisions, reneging.
3. **Score and judge.** Sum to a **legitimacy score (0–100)** and a verdict:
   - **legit (80–100)** — active, real checks. Proceed to `raise-match`.
   - **probable (60–79)** — yellow flags; proceed if fit looks strong.
   - **watch (40–59)** — material poser signals; de-prioritise unless a warm intro exists.
   - **poser (0–39)** — don't spend cycles; move to the next fund.
4. **Write the stub dossier.** Write `.spine/raise/funds/<slug>/dossier.md` with
   the structured handoff header (`legitimacy_score`, `legitimacy_verdict`, and a
   `fit_score`/`recommended_action` left blank for `raise-match`) followed by a
   **## Legitimacy** section: a one-line verdict, the eight checks as a table with
   evidence and a 🟢/🟡/🔴 per check, and any open questions. Cite sources; mark
   unknowns as `Unknown`, never invent dates or deal data. If a dossier already
   exists, refresh only the header's legitimacy fields and the Legitimacy section
   — never discard a `raise-match` analysis.
5. **Report.** Tell the founder the score and verdict, and the next move: legit/
   probable → "Run `raise-match <fund>` for the fit analysis"; watch → "only if a
   warm intro exists"; poser → "skip — run `raise-funds` for better-matched funds".

## Spine I/O

- **Reads:** `.spine/raise/profile.md`; `.spine/raise/funds/<slug>/dossier.md` (if present).
- **Writes:** `.spine/raise/funds/<slug>/dossier.md` (header legitimacy fields + Legitimacy section).

## Notes

- Vet is the **cheap** pass — a few searches, no sub-agent fan-out. The expensive
  research is `raise-match`'s job, and it only runs on funds that clear this gate.
- Legitimacy ≠ fit. A fully legit fund can still be wrong for your stage; a
  perfect-thesis fund can be a zombie. You need both reads.
- `raise-match` is the sole assembler of `dossier.md` (see ADR 0017) — vet writes
  only the stub it will build on.

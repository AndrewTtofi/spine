---
name: raise-ready
description: Use before pitching anyone to find out whether you're actually fundable yet — pressure-tests the idea (real demand, sharp ICP, narrow wedge) and scores fund-readiness, naming exactly what's missing and what to fix first. The honest "should we even raise" gut-check. Use when asked "are we ready to raise", "are we fundable", "is this worth funding", or "what's missing before we pitch".
allowed-tools: WebSearch Read Write
metadata:
  track: fundraising
---

# raise-ready — are you actually fundable yet?

The cheapest fundraising mistake to avoid is pitching too early. `raise-ready` is
the honest gut-check before any outreach: it stress-tests whether the thing is
fundable at all, scores how ready you are, and tells you the gap to close first —
so you don't burn warm intros on a pitch that isn't baked.

## Invocation

```
raise-ready
```

## Steps

1. **Load the profile.** Read `.spine/raise/profile.md` (stop → `raise-init` if
   absent). Optionally search for stage/sector comps to calibrate the bar.
2. **Pressure-test the foundation** — be a skeptic, not a cheerleader:
   - **Demand** — is there evidence real users feel this pain *now* (pull), or is
     it a vitamin? What proof exists (LOIs, waitlist, paid pilots, retention)?
   - **ICP** — is the target customer a specific, reachable buyer, or a vague
     segment?
   - **Wedge** — is the entry point narrow and winnable, or a boil-the-ocean
     platform pitch?
   - **Why now / why you** — is there a real timing unlock and a credible reason
     this team wins?
3. **Score fund-readiness (0–100)** across the dimensions that decide a raise:
   team, traction, market, product stage, clarity of the ask, and warm-path
   access. Each sub-score cites evidence from the profile.
4. **Name the verdict and the gap.** A tier — *not yet* / *fundable at
   [angels/pre-seed/seed]* / *ready* — plus the **single biggest** thing to fix
   and two or three concrete, doable-this-month actions to close it.
5. **Write `.spine/raise/readiness.md`** with a structured header
   (`readiness_score`, `verdict`, `updated`), the four foundation reads, the
   scorecard table, and the prioritised gap list. Then tell the founder the score,
   the verdict, and whether to proceed to `raise-funds`/`raise-strategy` now or
   close the gap first.

## Spine I/O

- **Reads:** `.spine/raise/profile.md`.
- **Writes:** `.spine/raise/readiness.md`.

## Notes

- Honesty is the whole value — a flattering scorecard helps no one. Say what's
  missing plainly.
- This judges *fundability*, not whether the idea is good in the abstract — a
  great mission with no demand evidence is still "not yet".
- Feeds `raise-strategy`, which sequences the raise around the gaps this surfaces.

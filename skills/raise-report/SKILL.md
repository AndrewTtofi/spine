---
name: raise-report
description: Use to see the whole raise at a glance and to produce an investor-ready dossier — scans the .spine/raise/ namespace, builds a pipeline status tracker (every fund's scores, stage, and next action), and assembles a consolidated dossier suitable for sharing with an investor or advisor. Use when asked to "show the pipeline", "raise status", "track the funds", "what's stale", or "generate the investor report".
allowed-tools: Read Write
metadata:
  track: fundraising
---

# raise-report — the pipeline tracker and the investor dossier

Two outputs from one scan of the namespace: an **internal tracker** (where every
fund stands and what to do next) for your weekly review, and a **consolidated
dossier** (the polished, investor-ready summary) for sharing.

## Invocation

```
raise-report
```

## Steps

1. **Scan the namespace.** Read `.spine/raise/profile.md` (stop → `raise-init` if
   absent), `readiness.md`, `strategy.md`, `pipeline.md`, and every
   `funds/*/` directory. Parse the **handoff headers** (`legitimacy_score`,
   `fit_score`, `recommended_action`, `updated`) — read fields by key, not prose —
   and note which artifacts each fund has (dossier / outreach / pitch / debrief /
   term) to infer the stage reached.
2. **Write `.spine/raise/tracker.md`** (internal):
   - **Summary counts** — total funds, active, no-go, stale (no update in N weeks).
   - **Pipeline table** — Fund · Legitimacy · Fit · Recommended action · Stage
     reached · Next step.
   - **Urgent actions** — funds with missing follow-through, each tagged with the
     exact `raise-*` command to run next (e.g. a pursue-verdict fund with no
     outreach → `raise-outreach <fund>`).
3. **Write `.spine/raise/report.md`** (the consolidated, investor-ready dossier):
   - The company at a glance (from the profile), the raise ask and use of funds,
     the strongest traction and team signals, the market, and the current
     fundraising status — a clean narrative an investor or advisor can read in one
     pass. Draw only from what's in the namespace; mark gaps rather than inventing.
4. **Report** the headline counts, the most urgent next action across the
   pipeline, and where the two files were written. Note the dossier is shareable;
   the tracker is for the founder.

## Spine I/O

- **Reads:** the whole `.spine/raise/` namespace.
- **Writes:** `.spine/raise/tracker.md`, `.spine/raise/report.md`.

## Notes

- Run the tracker before every weekly review or investor-update call — the table
  is the fastest way to see what's stale and what needs a nudge.
- Reads handoff headers **by key**, so a fund's status is structured data, not a
  string match — the spine-native upgrade over loose files.
- The dossier consolidates; it never fabricates. If the namespace is thin, the
  report says so plainly.

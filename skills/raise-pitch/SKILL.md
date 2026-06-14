---
name: raise-pitch
description: Use to prepare for pitching — full-spectrum prep in one skill. With no fund, it runs the stress-test: ten lethal questions a hostile VC would ask (know what to defend) and ten strongest signals a champion would champion (know what to lead with). With a fund, it builds a timed meeting plan with segment scripts, preemptive answers to that fund's diligence questions, and red-flag rebuttals. Use when asked to "prep me to pitch", "stress-test my pitch", "destroy my startup", "what are my strongest signals", or "prep for the meeting with <fund>".
allowed-tools: Read Write
metadata:
  track: fundraising
---

# raise-pitch — stress-test, then choreograph the room

Two modes, one skill. Run it **without a fund** early, to find out what you can't
defend and what you should lead with. Run it **with a fund** before a booked
meeting, to walk in with the room choreographed.

## Invocation

```
raise-pitch            # general stress-test (devil + angel)
raise-pitch <fund>     # fund-specific meeting prep
```

## Steps

1. **Load context.** Read `.spine/raise/profile.md` (stop → `raise-init` if
   absent). If a fund was named, also read `.spine/raise/funds/<slug>/dossier.md`
   (if missing, tell the founder to run `raise-match <fund>` first for fund-specific
   prep, or run the general stress-test instead).

2. **General mode (no fund) — write `.spine/raise/pitch.md`:**
   - **The devil — ten lethal questions.** In the voice of a contemptuous,
     seen-it-all VC, derive the ten hardest questions from *this* profile — the
     specific traps, not generic diligence. For each: the question phrased to
     sting, **why it kills you** (the exact vulnerability), and **what a real
     answer looks like** (the rebuttal framework).
   - **The angel — ten strongest signals.** In the voice of a partner who
     champions deals, surface the ten most under-rated strengths in the profile.
     For each: the signal as they'd say it in the partner meeting, **why it wins
     the room**, and **how to amplify it**.
   - The questions you can't answer in 30 seconds are the gaps to close first —
     say so.

3. **Fund mode (with fund) — write `.spine/raise/funds/<slug>/pitch.md`:**
   - A **timed agenda** for the meeting length (default 15 min) across ~8 segments.
   - **Segment scripts** — what to say, what to show, what *not* to say, per segment.
   - **Preemptive answers** to every diligence question in the fund's dossier, each
     with an "if they push" follow-up.
   - **Red-flag rebuttals** — a one-liner for each risk the dossier raised.
   - **The ask** — exact amount, the 90-day plan, the leave-behind action.
   - **Meeting discipline** — three rules for controlling the room.

4. **Report.** Point onward: general → close the undefendable gaps, then
   `raise-outreach <fund>`; fund → rehearse this, then attend; debrief with
   `raise-debrief <fund>` the same day.

## Spine I/O

- **Reads:** `.spine/raise/profile.md`; `.spine/raise/funds/<slug>/dossier.md` (fund mode).
- **Writes:** `.spine/raise/pitch.md` (general) or `.spine/raise/funds/<slug>/pitch.md` (fund).

## Notes

- Run the general stress-test *before* outreach — full-spectrum prep is knowing
  what to defend **and** what to lead with.
- Fund prep is for rehearsal, not the room: print it, rehearse it, then leave it
  behind. The meeting is a conversation, not a recital.

---
name: raise-debrief
description: Use right after a VC meeting to turn raw memory into a structured debrief — a signal read (interest vs. hesitation vs. pushback), the open diligence queue with draft answers, a send-ready follow-up email, and a clear recommended next step. Run within 24 hours; the follow-up email degrades fast. Use when asked to "debrief the meeting", "how did the pitch go", "write the follow-up email", or "what do I do after the meeting with <fund>".
allowed-tools: Read Write
metadata:
  track: fundraising
---

# raise-debrief — convert a meeting into a next move

A meeting is only worth what you do with it in the next day. `raise-debrief` reads
your raw notes against what the fund's dossier predicted, reads the signals, and
hands you a send-ready follow-up and one clear next step.

## Invocation

```
raise-debrief <fund>
```

## Steps

1. **Load context.** Read `.spine/raise/profile.md` (stop → `raise-init` if
   absent) and `.spine/raise/funds/<slug>/dossier.md` (if missing, proceed but note
   there's no prediction to compare against). **Ask the founder for their meeting
   notes** — who attended, what was asked, what landed, what felt off — this skill
   can't read the room without them.
2. **Write `.spine/raise/funds/<slug>/debrief.md`:**
   - **Meeting summary** — attendees, duration, format.
   - **Signal read** — 🟢 interest, 🟡 hesitation, 🔴 pushback signals, each tied to
     a specific moment from the notes.
   - **Prediction vs. reality** — which of the dossier's diligence questions came
     up, which didn't, and what surprised you.
   - **Open diligence queue** — every item the fund raised, each with a draft
     answer and a deadline.
   - **Landing assessment** — what from the pitch angle resonated vs. missed.
   - **Follow-up email** — send-ready, subject + body, referencing something
     specific from the meeting; written to be sent today.
   - **Recommended next step** — exactly one: request second meeting / send deck /
     send data room / give space / drop fund.
   - **Updated fit signal** — revised read on interest vs. the dossier's prediction.
3. **Report** the signal read and the recommended next step, and remind the founder
   to send the follow-up the same day. If the step is "drop fund", suggest
   `raise-report` to refocus the pipeline.

## Spine I/O

- **Reads:** `.spine/raise/profile.md`, `.spine/raise/funds/<slug>/dossier.md`;
  the founder's meeting notes (asked for in-session).
- **Writes:** `.spine/raise/funds/<slug>/debrief.md`.

## Notes

- Run it the **same day** — memory fades and the follow-up email loses its impact
  after 24 hours.
- The signal read is only as honest as the notes; record the awkward moments, not
  just the encouraging ones.

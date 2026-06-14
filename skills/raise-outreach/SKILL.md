---
name: raise-outreach
description: Use to turn a fund dossier into ready-to-send outreach — a cold email, a warm-intro request your contact can forward, and a LinkedIn DM, each built on the fund's own thesis language, plus a fund-specific one-pager. Refuses to draft for a no-go fund. Drafts only — it never sends. Use when asked to "draft outreach for <fund>", "write the intro email", "cold email this VC", or "make a one-pager for <fund>".
allowed-tools: Read Write
metadata:
  track: fundraising
---

# raise-outreach — fund-specific outreach, drafted not sent

Turns the research in a fund's dossier into outreach written in *that fund's*
language — never a generic blast. Produces three variants for whatever path you
have, plus a one-pager framed around the fund's thesis. It **drafts**; sending is
always your call.

## Invocation

```
raise-outreach <fund>
```

## Steps

1. **Load context.** Read `.spine/raise/profile.md` (stop → `raise-init` if
   absent) and `.spine/raise/funds/<slug>/dossier.md`. If the dossier is missing,
   stop and tell the founder to run `raise-match <fund>` first.
2. **Honour the verdict.** Read `recommended_action` from the dossier header. If
   it's **`no-go`**, stop and say so: "This fund is a no-go (fit [N]/100) — don't
   spend outreach on it. Run `raise-funds` for better-matched funds." Do not draft.
3. **Draft three variants**, each opening with the **verbatim fund-specific hook**
   from the dossier — never generic:
   - **Cold email** — a four-sentence direct note to the best-fit partner; subject
     line references their thesis.
   - **Warm-intro request** — a forwardable note to the relevant warm contact from
     the profile / the dossier's warm-intro path, written so they can pass it
     straight to the partner.
   - **LinkedIn DM** — three sentences, no deck link, opening on the hook.
   Recommend which variant to use based on the warm paths available (a forwarded
   intro converts far better than cold).
4. **Write a fund-specific one-pager** (≤500 words) in the fund's framing:
   headline reframed in their thesis language, the problem in their published
   framing, solution mapped to their portfolio language, only the traction and
   credentials that scored highest for *this* fund, the market sized in their
   terms, the ask, and a fund-specific "why now". Note it attaches to the cold/warm
   variant.
5. **Write `.spine/raise/funds/<slug>/outreach.md`** (header + the three variants +
   the one-pager) and report which variant you recommend and why. Remind the
   founder this is a draft — review and send yourself.

## Spine I/O

- **Reads:** `.spine/raise/profile.md`, `.spine/raise/funds/<slug>/dossier.md`.
- **Writes:** `.spine/raise/funds/<slug>/outreach.md`.

## Notes

- **Drafts only — never sends.** No email/CRM integration; the founder is always
  the one who hits send.
- The one-pager is fund-specific by construction — don't reuse it for another fund
  without running `raise-match` on that fund first.
- If there's no warm path in the profile or dossier, say so and lead with the cold
  variant — but flag that finding a warm intro is worth the delay.

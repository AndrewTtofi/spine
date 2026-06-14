---
name: raise-term
description: Use to analyse a VC term sheet — benchmarks every clause against current market norms, flags founder-unfriendly terms, scores founder-friendliness out of 100, and produces a ranked negotiation priority list with suggested pushback language. Informational only, not legal advice. Use when asked to "analyse this term sheet", "review the term sheet", "is this term sheet fair", or "what should I negotiate".
allowed-tools: Read Write
metadata:
  track: fundraising
---

# raise-term — read the term sheet like a founder-friendly lawyer would

Benchmarks each clause against market norms, flags what's aggressive, and tells you
what to fight for and how — ranked by how much it actually costs you. It tells you
where to push; your attorney tells you how to push without blowing the deal.

> **Informational only — not legal advice.** Share the output with your attorney
> before responding to the fund. This skill states the disclaimer in its output.

## Invocation

```
raise-term <fund> <term-sheet-file>
```

The term-sheet file is a markdown/text file the founder provides (paste the term
sheet into a file in the repo first).

## Steps

1. **Load context.** Read `.spine/raise/profile.md` (stop → `raise-init` if absent)
   and the term-sheet file the founder named (stop if it doesn't exist). Optionally
   read the fund's dossier for context on the firm.
2. **Write `.spine/raise/funds/<slug>/term.md`** — opening with the disclaimer,
   then:
   - **At a glance** — instrument, amount, cap, discount, key dates.
   - **Founder-friendliness score (/100)** — start at 100; −15 per red flag, −5 per
     yellow. Show the arithmetic.
   - **Clause analysis table** — each material term vs. its market norm, with a
     🟢/🟡/🔴 verdict (liquidation preference, participation, option pool / shuffle,
     board composition, protective provisions, anti-dilution, pro-rata, vesting,
     drag-along, redemption, etc.).
   - **Red-flag deep dives** — the real-world impact of each 🔴, with the math.
   - **Negotiation priority list** — ranked by founder harm: the clause, suggested
     pushback language, and a rough likelihood of winning it.
   - **Questions before signing** — 5–8 for the fund or your attorney.
   - **Verdict tier** — 85–100 founder-friendly · 65–84 acceptable · 45–64
     investor-favorable · 0–44 aggressive (get a second legal opinion).
3. **Report** the score, the tier, and the top three things to negotiate — and
   repeat that this goes to the attorney, not instead of one.

## Spine I/O

- **Reads:** `.spine/raise/profile.md`, the founder-provided term-sheet file,
  `.spine/raise/funds/<slug>/dossier.md` (optional).
- **Writes:** `.spine/raise/funds/<slug>/term.md`.

## Notes

- **Not legal advice** — the disclaimer leads the output every time. The skill
  prioritises; the lawyer executes.
- Benchmark against *current* norms for the round's stage and geography; a clause
  that's standard at Series A can be aggressive at pre-seed.
- Never tell the founder a deal is "safe to sign" — frame everything as what to
  review with counsel.

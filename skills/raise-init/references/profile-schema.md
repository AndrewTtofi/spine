# Startup profile schema — `.spine/raise/profile.md`

The single source of truth for the fundraising track. Every `raise-*` skill reads
it; the sharper it is, the sharper every output. Favour specific, sourced facts
over adjectives. Seed it with this structure; the founder keeps it current.

The file opens with a structured handoff header (see
[namespace.md](namespace.md)) so downstream skills can read stage, sector, and
raise parameters by key:

```yaml
---
company: <legal name>
one_liner: <what you do and for whom, in one sentence>
sector: <e.g. Deep Tech / Climate / Infra / Vertical SaaS>
stage: <idea | mvp | mvbp | revenue | growth>
geography: <city, country>
raise_amount: <e.g. $2.5M>
instrument: <safe | priced-seed | tbd>
updated: <YYYY-MM-DD>
---
```

## 1. Company

- **One-liner** — one sentence: what you do and for whom.
- **Problem** — the specific pain, with its scale and urgency a VC would feel.
- **Solution** — what you built and how it works; be technical where it matters.
- **Value proposition** — the headline outcome (time saved, cost cut, risk removed).
- **Category & website** — sector, and the URL.
- **Founded** — month and year, and where.

## 2. Market & business model

- **Target customer** — the precise buyer ("grid operators at electric
  co-ops"), not a segment ("enterprises").
- **Market opportunity** — beachhead TAM with a source, plus the expansion path.
- **Business model** — how you charge (subscription, usage, value-based,
  marketplace, …).
- **Competition** — who else solves this, and the wedge that beats them.

## 3. Traction & milestones

- **Stage** — idea / MVP / MVBP / revenue / growth.
- **Traction** — the hard proof: design partners, signed LOIs, revenue, pilots,
  grants, government partnerships — with exact numbers and dates.
- **Next milestone** — what the raise will let you prove, and by when.
- **Warm paths** — named people who can open investor doors (name, relationship,
  contact); the outreach skills use these.

## 4. Team

For each founder/key hire: role, name, and the **three to five** credentials that
matter to an investor (relevant wins, domain depth, prior exits) — not a full CV.

## 5. Fundraise

- **Amount** — how much you're raising.
- **Instrument** — SAFE / priced seed / TBD.
- **Use of funds** — the top three line items.
- **Milestone this round funds** — what you'll have achieved when the money runs
  out (this is what unlocks the next round).

## Quality bar

- Numbers everywhere: "$30M transmission project", not "a large project".
- Name the referrals with contact details — skills act on them.
- State the problem with a VC's sense of urgency, not just your solution.
- List credentials investors weight, not your résumé.

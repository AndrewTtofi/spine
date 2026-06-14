---
name: raise-init
description: Use to bootstrap the fundraising track in a repo — creates the .spine/raise/ namespace and seeds profile.md (the startup profile) through a short interview. Run once before any other raise-* skill. Use when a project decides it needs funding, or when asked to "set up fundraising", "start a raise", or "create the startup profile".
allowed-tools: Read Write
metadata:
  track: fundraising
---

# raise-init — bootstrap the fundraising track

The fundraising track keeps all its state in **`.spine/raise/`**, a namespace
walled off from the engineering Spine. Every other `raise-*` skill reads the
startup profile this skill seeds. Run it once; the founder maintains the profile
after.

## Steps

1. **Check for an existing raise namespace.** If `.spine/raise/profile.md` exists,
   report what's there and ask whether to refresh sections rather than
   overwriting — never clobber a maintained profile.
2. **Interview for the profile.** Work through the schema in
   [references/profile-schema.md](references/profile-schema.md), in a few batched
   rounds (overview → market & model → traction → team → fundraise). Push for
   **specific numbers and named facts** — "$5M DOE proposal", "38k-member
   community", a named design partner — not vague descriptors. Vague input yields
   generic output from every downstream skill. Leave a flagged `<placeholder>`
   only where the founder genuinely doesn't have the answer yet.
3. **Create the namespace and seed the profile.** Create `.spine/raise/` (and its
   `funds/` subdirectory) and write `.spine/raise/profile.md` from the schema,
   filled with the interview answers.
4. **Confirm.** Play the seeded profile back; correct anything wrong before
   finishing. Note that the profile is the single source of truth — updating it
   (after a new LOI, hire, or revenue milestone) sharpens every later skill.
5. **Point to the next step.** Tell the founder the namespace is live and suggest
   `raise-ready` (am I fundable yet?) or `raise-funds` (build the target list) as
   the next move. Mention that all `raise-*` skills refuse to run without this
   profile.

## Spine I/O

- **Reads:** `.spine/raise/profile.md` (only to detect an existing profile).
- **Writes:** `.spine/raise/profile.md`; creates `.spine/raise/` and
  `.spine/raise/funds/`.
- Never touches the engineering Spine (`context.md`, `journal.md`, `decisions/`).

## Notes

- The `.spine/raise/` layout and the structured handoff header every skill writes
  are specified in [references/namespace.md](references/namespace.md) — the
  canonical contract for the whole track.
- Merge, never overwrite — a founder's profile accrues hard-won detail.
- This is the only `raise-*` skill that runs without an existing profile; it is
  what creates one.

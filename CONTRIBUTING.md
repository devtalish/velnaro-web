# Contributing

This repository powers the VELNARO website. Keep changes scoped to the site,
brand system, and infrastructure described in the docs.

## What's in scope

**Welcome:**
- Bug fixes: layout breaks, WebGL errors, accessibility problems, broken links
- Performance work, especially asset weight and the 3D scenes
- Documentation fixes, and anything that makes forking this easier
- Browser/device compatibility fixes (particularly Safari and low-end mobile)

**Not in scope:**
- Changes to brand content, service copy, project data, reviews, or legal text
  without owner approval.
- Rewrites into another framework or styling system
- New dependencies that duplicate something already here

Not sure? Open an issue first.

## Getting set up

```bash
git clone <repository-url>
cd velnaro-web
npm install
npm run dev
```

No `.env` needed. The two Supabase variables are optional, and running without
them is a supported state the code branches on, so if you touch that path, test it
by leaving them unset.

Before opening a PR:

```bash
npm run lint
npm run build
```

Both must pass. There is no test suite, so the build's type-check is the gate.
`npm run lint` is currently at **zero errors**; the remaining warnings are all
`<img>`-versus-`next/image` judgment calls on small SVG icons. Keep it at zero.

## Conventions

- **TypeScript, strict.** No `any`. Components are typed `FC<Props>`, with props
  declared in `types/portfolio-types.ts` when they're shared.
- **Content lives in constants**, never in components. A new string on the page
  belongs in `constants/portfolio-constants.ts` with a type in
  `types/portfolio-types.ts`.
- **Tailwind v4, CSS-first.** New colours go in the `@theme` block in
  `app/globals.css`, not as hex values in class names. There is no
  `tailwind.config.js` and there should not be one.
- **`"use client"` only where it's needed:** anything with hooks, WebGL or
  browser APIs. Keep the server boundary as low as it will go.
- **Comments explain *why*.** The codebase's existing comments are the model:
  they record the trade-off or the bug being avoided, not what the line does.
  See `lib/admin/session.ts` and `components/portfolio/themed-globe.tsx`.
- **Commits:** short, imperative, present tense, e.g. `fix: globe z-index on Safari`.

## Working on the 3D

`components/portfolio/themed-globe.tsx` is dense and its header comment lists
every deliberate deviation from the demo it was ported from. **Read it before
changing anything there**, because several "missing" features (shadow maps, refraction,
hold-to-destroy) were removed for stated reasons and shouldn't be reintroduced
without addressing them.

Test any 3D change on a real mid-range phone, not just a desktop with the
devtools throttle on.

## Security

Found something exploitable? **Don't open a public issue.** Email
`hello@velnaro.agency` directly.

Never commit a `.env` or a real credential. `.env*` is gitignored, so keep it that
way.

This project deliberately has **no server-only secrets**: no service-role key,
no admin password, no session signing key, no SMTP credentials. If a change
needs one, that is worth discussing in an issue first, because it is usually a sign the
work belongs in a Supabase Edge Function or an RLS policy instead.

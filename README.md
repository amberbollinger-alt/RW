# RootWise — City Experience

Root One now lives in its own teaching area at `/roots/one`. The main user area is **The Grove**: a quiet, tree-centered place for choosing a path, with no lessons or chapter content mixed into it.

## Root One includes

- Six connected city districts
- Chapter 3-style district navigation
- The Chapter Promise before every lesson
- Conversational Sage openings and contextual Ask Sage support
- Choice-and-consequence scenarios without test-style scoring
- Reflection, real-world action, and a four-part Root Connection
- Saved on-device progress
- Mobile-first district and Sage drawers
- The approved Sage and tree artwork already established for RootWise

## Local checks

```powershell
npm.cmd install
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run dev
```

The normal Vite server runs the interface. To test the `/api/sage` Vercel Function locally, use `vercel dev` after linking the project and pulling the existing development environment.

## Sage configuration

Sage reads `OPENAI_API_KEY` only inside the server-side Vercel Function. Keep the real value in Vercel project settings; never put it in a `VITE_*` variable or commit it. `OPENAI_MODEL` is optional and defaults to `gpt-5.6-luna`.

Copy `.env.example` only when a local, ignored environment file is needed. Do not paste a real key into source files, screenshots, chat, or commits.

## Routes

- `/` — approved RootWise landing page
- `/#/dashboard` — The Grove
- `/roots/one` — The City of Foundations
- `/#/learn` — seven-root overview and Root One entrance

Production deployment is intentionally outside this branch task. Verify through a preview before any production promotion.

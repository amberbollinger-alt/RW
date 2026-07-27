# RootWise — Adult Financial Decision Journey

Root One lives in its existing teaching area at `/roots/one`. The Grove introduces the RootWise method, and the Root continues through the eight original connected lessons.

## Root One includes

- The eight original adult lessons following Ivy, Eli, and Sage
- Understand, Recognize, and Examine layers inside every lesson
- Saved and editable Apply It Now workbook responses
- Practical knowledge checks and choice-and-consequence scenarios
- Contextual Ask Sage support that preserves the learner’s judgment
- Completion based on application plus both lesson activities
- Saved on-device progress and editable private reflections
- Responsive lesson-map navigation without a hamburger drawer
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
- `/roots/one` — Root One: The Story Beneath the Decision
- `/#/learn` — eleven-Root overview
- `/grove` — the complete eleven-Root learner map
- `/roots/:root` — Root overview and lesson index
- `/roots/:root/lessons/:lesson` — stable published lesson route

Production deployment is intentionally outside this branch task. Verify through a preview before any production promotion.

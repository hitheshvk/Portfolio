# UI components (shadcn-compatible)

This folder follows the [shadcn/ui](https://ui.shadcn.com/) convention: reusable UI primitives live under `components/ui/`.

## Current site vs React

The live portfolio (`index.html`) is **static HTML + CSS**. The animated “Read case study” buttons are implemented in `styles.css` (`.case-card__cta`) so they work without a build step.

The React sources here (`button-3.tsx`) are for a future Next.js/Vite + shadcn migration.

## Set up a React + shadcn + Tailwind + TypeScript project

From the repo root (or a new app folder):

```bash
npx create-next-app@latest portfolio-app --typescript --tailwind --eslint --app --src-dir=false
cd portfolio-app
npx shadcn@latest init
```

When prompted, use:

- **Components path:** `components/ui` (default — keeps imports as `@/components/ui/...`)
- **Style:** Default
- **Base color:** Neutral

Install the button dependency:

```bash
npm install lucide-react
```

Copy `button-3.tsx` into `components/ui/` (already in this repo).

Usage:

```tsx
import { Button3 } from "@/components/ui/button-3";

<Button3 label="Read case study" href="/work/diagnostics-v7.html" />
```

## Why `components/ui`?

shadcn and most React design systems expect `components/ui` so that:

- `@/components/ui/button` imports stay stable across docs and generators
- CLI commands (`npx shadcn add button`) land in a predictable place
- App-specific composites stay in `components/` while primitives stay in `components/ui/`

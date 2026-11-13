# Balerion — Framer code-component package

This is a conversion of the current Balerion website into **React code components for Framer**, not a native Framer project/remix link. Layouts inside the component remain code-editable. The package includes the interactive Product demo, animated workflows, Research, Team, Security, Press filters, career descriptions, and application UI. It preserves the current copy and design.

## 1. Host the included assets

Upload everything inside `assets/` to a public HTTPS static host **without changing the folder structure**. For example, if your asset base is `https://assets.example.com/balerion/`, the logo must load at `https://assets.example.com/balerion/brand/balerion-logo.svg`.

The ZIP includes the assets, but copying code into Framer does not upload a folder of assets automatically. You may also upload images individually to Framer and replace their source paths in the editable source; that requires rebuilding the bundled runtime.

## 2. Add three code files in Framer

In a Framer project, open Assets → Code → Create Code File.

Create these files with the exact names and copy in the corresponding contents from `framer/`, **in this order**:

1. `BalerionConfig.tsx`
2. `BalerionRuntime.tsx`
3. `BalerionSite.tsx`

In `BalerionConfig.tsx`, set `ASSET_BASE_URL` to the public folder URL from step 1. Do not paste `balerion.css` separately: it is already embedded in the runtime. The standalone CSS copy is included for inspection.

Use Framer's React-compatible code-component editor, not a code override, Embed block, or HTML widget.

## 3. Create Framer pages

Use `ROUTES.md`. Place one BalerionSite component on each page and select its **Page** property. Set **Detail slug** for individual job and case-study pages.

- Width: Fill / 100%, with no extra Framer max-width.
- Height: Fit Content / auto, not a fixed clipped frame.
- Position: use normal page flow.
- Overflow: Visible; avoid transformed parent frames that change fixed-header positioning.
- The component includes its own navigation and footer. Do not add duplicates.
- Set the Framer page background to `#0a0a0a`.
- Reuse the component on desktop, tablet, and phone breakpoints. Its responsive styles already handle those widths.
- Check the actual Framer Preview and published staging site, not just the Canvas.
- Configure page titles, descriptions, canonical URLs, sharing images, and indexing in Framer's native page settings. Client-side metadata effects are not a substitute for Framer's SEO settings.

The Canvas renders all reveal content visibly. Preview/published pages retain the original reveal effects and reduced-motion behavior.

## 4. Job application delivery — separate backend required

`APPLICATION_API_URL` is deliberately blank. Set it to the origin of a working backend, **without `/api`**, only after deployment and CORS setup.

The form calls:

- `GET /api/applications/status` → `{ "available": true }`
- `POST /api/applications` → an object with a nonempty `id` only after the submission is accepted.

POST JSON fields: `roleId`, `fullName`, `email`, optional `phone`, `workUrl`, `linkedinUrl`, `resumeName`, `resumeBase64`, and a `website` honeypot. Valid role IDs are in `ROUTES.md`.

The backend must validate file type/size, contact fields, and role IDs; rate-limit and abuse-protect the endpoint; deliver the attachment to the recruiting recipients server-side; and return clear errors. Enable CORS only for your actual Framer production/staging origins, including OPTIONS preflights and the Content-Type header. Requests do not send cross-origin cookies.

No email-provider credentials, sessions, database, or server secrets are included. Framer frontend code cannot replace the existing backend. With no API configured, the form explicitly explains that delivery is unavailable and never claims a successful submission.

Email demo links still open the user's mail app, as in the current website.

## Included folders

- `framer/`: the three Framer-ready code files plus a CSS reference.
- `assets/`: local photographs, logos, compliance artwork, and other public assets.
- `source/`: editable website source and a standalone Vite project.
- `conversion-source/`: readable Framer wrapper and routing/application adapters.
- `ASSET-MANIFEST.json`: asset inventory and important externally hosted media.
- `VALIDATION.md`: checks run on this package and the limits of verification.

To run the standalone source: Node 22+, then `npm install`, `npm run dev` in `source/`. Set its `src/BalerionConfig.tsx` application API setting separately if needed. Standalone source uses public/ for local images. It is not necessary to run this project just to use the Framer component.

## Boundaries

- This package is not an automatically importable `.framer` project and does not provide native editable layers.
- Framer routing is handled by the native pages you create. Internal links are regular anchors; no separate React router competes with Framer.
- The export includes current case-study placeholders exactly as they exist in the website.
- Fonts, research animation, videos, external articles, and social links retain their hosted URLs; they need network access and permission to remain publicly available.
- No live hiring emails were sent during export validation.
- The live Replit website has not been replaced, published, or otherwise changed by this export.
- A final check in your actual Framer workspace is required: it cannot be validated from a local build alone.

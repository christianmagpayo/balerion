# Export validation

## Passed

- Current website production build.
- Framer runtime compiled with React and configuration as the only external imports.
- Framer wrapper compiled using a minimal local shim for property controls and RenderTarget.
- All 12 page/slug combinations rendered without a missing-module or server-render error:

```
Home rendered (50888 chars)
Product rendered (70534 chars)
Research rendered (30441 chars)
Team rendered (31056 chars)
Security rendered (17755 chars)
Press rendered (44679 chars)
Careers rendered (15857 chars)
Job:software-engineer rendered (23956 chars)
Job:forward-deployed-engineer rendered (23783 chars)
Job:ai-engineer rendered (24464 chars)
Case study:fm-home-loans rendered (8873 chars)
Case study:alameda-mortgage rendered (8929 chars)
Unconfigured application API correctly rejected submission; no network request sent
```

- Bundled CSS scoped beneath .balerion-framer; public assets included in the archive.
- No workspace aliases, development domains, absolute workspace paths, or import.meta environment references in the exported runtime.
- Application API requests explicitly fail when no backend origin is configured. No live application email was sent.

## Important limits

The package has not been opened in your actual Framer project. Framer Canvas sizing, publishing, native page setup, real asset hosting, and CORS/application delivery must be checked after installation. Local compatibility checks do not verify those external systems.

Case-study routes: /case-studies/fm-home-loans and /case-studies/alameda-mortgage (existing placeholder content preserved).

## Additional packaging checks

- The separate standalone Vite source also passed its production build using the existing workspace dependency installation. A fresh dependency installation outside this workspace has not been tested.
- Converted homepage checked in a desktop screenshot and Product checked at desktop and phone widths using the exact exported runtime with a local Framer API shim.
- CSS selector rewriting uses a selector parser so component class names containing words such as body remain intact.
- No live website code was modified for the conversion.

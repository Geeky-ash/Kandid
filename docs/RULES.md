# kandid — coding rules & engineering standards

> this document defines mandatory coding guidelines, architectural constraints, and engineering standards for the **kandid** monorepo (`@kandid/*`, bundle id: `com.kandid.app`).

---

## 1. typescript strict mode & type safety

1. **strict configuration**:
   all `tsconfig.json` files must enforce:
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true,
       "strictNullChecks": true,
       "strictFunctionTypes": true,
       "noImplicitThis": true,
       "alwaysStrict": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true,
       "noImplicitReturns": true,
       "noFallthroughCasesInSwitch": true
     }
   }
   ```
2. **no `any`**:
   using `any` is strictly prohibited. use `unknown`, generics, or explicit union types. if a third-party untyped library requires casting, use `as unknown as TargetType` and document the justification with an inline comment.
3. **shared types**:
   domain types (`Pose`, `JointCoordinate`, `BestShotVerdict`, `UserConsent`) reside in `packages/content` or `apps/mobile/src/types/` and must never be duplicated across features.

---

## 2. folder & file naming conventions

- **directories**: `kebab-case` (e.g., `best-shots/`, `guided-shoot/`, `ui-tokens/`).
- **react components**: `PascalCase.tsx` (e.g., `PoseCard.tsx`, `MannequinOverlay.tsx`, `PillButton.tsx`, `CueCard.tsx`).
- **hooks**: `camelCase.ts` prefixed with `use` (e.g., `useCameraControls.ts`, `useCueCards.ts`, `useHardwareLenses.ts`).
- **stores & utilities**: `camelCase.ts` (e.g., `cameraStore.ts`, `guestStore.ts`, `formatTime.ts`).
- **route files**: follow expo router and next.js conventions: `index.tsx`, `[id].tsx`, `_layout.tsx`, `page.tsx`.

---

## 3. component boundaries & size limits

1. **150-line rule**:
   any react component exceeding 150 lines must be refactored:
   - extract reusable child components into a local `components/` subfolder.
   - extract state, effects, and business logic into a custom hook.
2. **single responsibility**:
   a component handles only presentation and user interaction. data fetching belongs in queries; business rules belong in domain hooks or stores.
3. **no prop drilling beyond 2 levels**:
   use zustand stores or react context for state shared across distant components.

---

## 4. the zero-hardcoding constraint & lowercase rules

### 4.1 colors & tokens (stitch mcp governance)
- **source of truth**: the connected stitch mcp project (`id: 931723337622910157`) is the **sole source of truth** for colors, fonts, radii, and spacing scales. `packages/ui-tokens` must be generated directly from it.
- **same-commit synchronization rule**: any modification or addition to tokens in `packages/ui-tokens` **strictly requires updating `docs/DESIGN.md` in the exact same git commit**.
- **token drift check**: before marking any milestone done, execute the automated token drift check comparing code tokens against stitch mcp.
- **never** write raw hex codes (`#c5a880`, `#fcf9f4`, etc.) in style objects, tailwind classes, or inline props.
- import all color values, spacing scales, radii, and shadows directly from `@kandid/ui-tokens`:
  ```typescript
  import { colors, radius, space, typography } from '@kandid/ui-tokens';
  ```
- **gold contrast rule**: gold fills (`#c5a880`) **strictly pair with espresso text** (`#1c1a18`). white text on gold is strictly prohibited (fails wcag aa at 2.2:1). thin gold icons or gold body text on cream canvases are forbidden.
- **sage status rule**: `status.post` badge uses `#4a7046` with white text (5.0:1) or `#5b7e68` container with dark espresso text (5.1:1).
- **minimum text size**: minimum **12px** enforced across all mobile screens.
- **`text.tertiary` restriction**: restricted strictly to non-essential elements (timestamps, decorative hairline dividers).

### 4.2 copy & internationalization
- **never** hardcode english strings inside component jsx:
  ```tsx
  // ❌ forbidden
  <Text>effortless angles for every shot.</Text>

  // ✅ mandatory
  import { copy } from '@kandid/content';
  <Text>{copy.onboarding.tagline}</Text>
  ```
- **strictly lowercase with allowed exceptions**: all user-facing copy in `packages/content` must be strictly lowercase.
  - **allowed exceptions**:
    1. *legal text*: terms of service, privacy policy legal clauses, copyright notices ("© 2026 kandid"), and eula provisions.
    2. *user-generated content*: user profile names, custom shoot titles.
    3. *technical error identifiers*: machine error codes (e.g. `ERR_CAMERA_UNAVAILABLE`, `HTTP_500`).
    4. *platform & partner brand names*: proper trademarks where casing is legally required (e.g. `Apple`, `Google`, `Google Play`, `App Store`, `RevenueCat`).

---

## 5. safe zone cue docking & camera constraints

1. **docked safe zone constraint**:
   - cue cards must never occlude the central 70% of the viewfinder.
   - cards must dock at `bottom: 120px` (above the shutter container and below the top control bar), with maximum height 72px.
2. **cues schema split**:
   - all pose cues must be structured as `subjectCues[]` (posing direction) and `photographerCues[]` (camera angle, height, and framing).
3. **camera zoom hardware clamping**:
   - zoom pills must query device physical camera hardware via `Camera.getAvailableCameraDevices()`.
   - pills switch between physical lenses (`0.5x`, `1x`, `2x`, `3x`).
   - digital zoom is clamped strictly to hardware bounds.
   - android single-lens hardware falls back smoothly to digital crop `[1x, 2x]`.
4. **android blur fallback**:
   - on android, all blur surfaces fall back to solid translucent colors (`#1c1a18e6` for dark chrome, `#fcf9f4f2` for light huds) to avoid frame drops.

---

## 6. security & secrets protection

1. **gitignore enforcement**:
   - `.agents/mcp_config.json` must be strictly listed in `.gitignore`.
   - never commit local agent configs, live api keys, or service role credentials.
2. **zero hardcoded secrets**:
   - never commit private api keys, supabase service role keys, or revenuecat secret keys.
   - mobile client bundles only public anonymous identifiers (`EXPO_PUBLIC_SUPABASE_ANON_KEY`, `EXPO_PUBLIC_REVENUECAT_APPLE_KEY`).

---

## 7. error handling & performance budgets

1. **error boundaries**:
   - every top-level route in `apps/mobile/app/` must be wrapped in an `ErrorBoundary` with a user-friendly lowercase error state and `"try again"` button.
2. **performance budgets**:
   - **camera cold start**: < 2.5s to interactive viewfinder.
   - **mannequin render latency**: sustained 60fps on skia overlay.
   - **memory ceiling**: < 180mb during active camera capture.
   - **website lighthouse**: score ≥ 95 across performance, accessibility, best practices, and seo.

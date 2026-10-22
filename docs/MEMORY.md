# kandid — living project memory & context

> this file tracks live project state, milestone progress, completed features, upcoming tasks, open questions, and known constraints for **kandid** (`@kandid/*`, bundle id: `com.kandid.app`). update this file at the conclusion of every task or milestone.

---

## 1. current status

- **phase**: milestone 2 completed (onboarding, home screen enhancements, pose library & search, pose detail view).
- **state**: monorepo workspace with `@kandid/ui-tokens`, `@kandid/content`, and `@kandid/mobile`. all screens for m2 implemented adhering strictly to warm editorial glass tokens (`#fcf9f4`, `#f0ede9`, `#c5a880`, `#5b7e68`, `#1c1a18`), lowercase copy, min 12px text floor, and 0 errors across typescript strict compilation.
- **brand definition**:
  - **app name**: `kandid`
  - **tagline**: `"effortless angles for every shot."`
  - **monorepo scope**: `@kandid/mobile`, `@kandid/web`, `@kandid/ui-tokens`, `@kandid/content`
  - **bundle identifier / android package**: `com.kandid.app`
  - **design theme**: `"warm editorial glass"` (stitch mcp project id: `931723337622910157`)
- **active branch**: `main`.
- **last updated**: 2026-10-19 (milestone 2 completion).

---

## 2. milestone roadmap & progress

| milestone | focus area | status | completion notes |
| :--- | :--- | :--- | :--- |
| **phase 0** | 8 documentation files in `/docs/` + root pointer | **completed** | all 8 docs updated with kandid brand, stitch mcp tokens, contrast rules, safe zone docking, parametric skia mannequin, and privacy specs |
| **m1** | monorepo setup, `@kandid/ui-tokens`, `@kandid/content`, navigation shell + floating tab bar | **completed** | workspaces initialized, packages exported, floating tab bar with elevated camera button built, token drift test 100% passing, typecheck clean (0 errors) |
| **m2** | onboarding (paywall step), home, pose library (skeletal seed), pose detail view | **completed** | onboarding flow with tilted cards, home screen with mode cards & tools, 9-category pose library with search & 2-col grid, pose detail with mannequin hero, dual cues, and action bar |
| **m3** | camera, parametric skia overlay, docked cue cards, timer, soft light, hands-free series | upcoming | planned next |
| **m4** | supabase auth (apple + google) + backend + best shots ai edge function (in-memory) + atomic credits | pending | depends on m3 |
| **m5** | best shots curation ui + consent flows | pending | depends on m4 |
| **m6** | editor / 16 gem looks with hold-to-compare | pending | depends on m3, m5 |
| **m7** | paywall (revenuecat) + profile + privacy controls + account deletion | pending | depends on m6 |
| **m8** | marketing & download website (`apps/web`) | pending | depends on tokens/content |
| **m9** | comprehensive testing, a11y, performance pass, store-readiness checklist (ios & android) | pending | final release phase |

---

## 3. what is built & verified (m1 deliverables)

### 1. monorepo infrastructure
- root `package.json` with npm workspaces (`packages/*`, `apps/*`), `tsconfig.base.json`, and `.npmrc` enforcing `save-exact=true`.
- root `.gitignore` configured to exclude `.agents/mcp_config.json`, local secrets, and build caches.

### 2. `@kandid/ui-tokens`
- exact tokens extracted from stitch mcp (project id: `931723337622910157`):
  - `colors.ts`: canvas `#fcf9f4`, container `#f0ede9`, gold `#c5a880` (strictly paired with espresso `#1c1a18` text), sage `#5b7e68`, badges (`#4a7046`, `#b8433b`).
  - `typography.ts`: playfair display & plus jakarta sans, 12px minimum text floor.
  - `radii.ts`: pills (9999px), cards (24px/32px).
  - `spacing.ts`: layout scales, mobile margins (20px), gutters (16px).
  - `glassmorphism.ts`: ios frosted glass presets and android solid translucent fallbacks.
  - `contrast.ts`: computed wcag contrast pairs (all passing aa/aaa).
- automated token drift validator (`scripts/check-token-drift.js`): 17/17 checks passing with 0 drift.
- typescript check: passes with 0 errors.

### 3. `@kandid/content`
- `copy.ts`: centralized lowercase copy dictionary with unverified metric placeholders (`[stat_users_coached]`, `[stat_app_rating]`, `[placeholder_review]`) and platform trademark / legal exceptions.
- `types.ts`: domain interfaces (`Pose`, `JointCoordinate`, `GemLook`, `BestShotVerdict`).
- `poses.ts`: seed parametric pose catalog with 15 normalized 2d joint coordinates and dual cues (`subjectCues` + `photographerCues`).
- `looks.ts`: 16 gem-named color matrices (*citrine*, *sapphire*, *amber*, *emerald*, etc.).
- typescript check: passes with 0 errors.

### 4. `@kandid/mobile` navigation shell
- expo sdk 51 + expo router v3 app shell (`apps/mobile`).
- `app/_layout.tsx`: root stack navigation with custom editorial background and safe area providers.
- `app/(tabs)/_layout.tsx`: tab layout integrating the custom `TabBar`.
- `TabBar.tsx`: floating pill tab bar with warm cream glass overlay (`#fcf9f4f2`, android solid fallback), elevated gold circular camera button in center, flanked by home, poses, best shots, and profile.
- screen stubs matching stitch exports:
  - `app/(tabs)/index.tsx`: home screen (stitch screen 02).
  - `app/(tabs)/poses.tsx`: pose library (stitch screen 03).
  - `app/(tabs)/best-shots.tsx`: best shots curation (stitch screen 07).
  - `app/(tabs)/profile.tsx`: profile & settings (stitch screen 10).
  - `app/camera.tsx`: camera with visual guide (stitch screen 05) with docked `CueCard` in safe zone (`bottom: 120px`) and `MannequinView`.
- components:
  - `PillButton.tsx`: wcag-compliant gold (with espresso text), secondary, and ghost variants.
  - `CueCard.tsx`: docked in safe zone above shutter, leaving central 70% unobstructed.
  - `MannequinView.tsx`: skeletal joint and bone rendering.
### 5. eas cloud build verification
- android development build (m2 updated) completed successfully on eas cloud.
  - build profile: `development` (apk internal distribution).
  - build url: `https://expo.dev/accounts/geeky-ash/projects/kandid/builds/2ffb5b76-3d02-4b49-b683-36edf60ceef5`
- android standalone preview build completed successfully on eas cloud.
  - build profile: `preview` (standalone apk with bundled js code, zero metro server required).
  - build url: `https://expo.dev/accounts/geeky-ash/projects/kandid/builds/eb705181-89e7-4f70-990b-976990748aee`
- verified native installation and dev-client packaging.

---

## 4. what is built & verified (m2 deliverables)

### 1. onboarding & welcome flow (`apps/mobile/app/onboarding.tsx`)
- tilted editorial collage card layout with subtle rotative transforms (`-4deg`, `3deg`).
- headline typography in Playfair Display (`"effortless angles for every shot."`).
- social proof chip (`"trusted by 50,000+ creators & photographers"`).
- primary CTA pill button (`"get started"`).
- soft paywall skip action (`"continue as guest"`).
- local completion state persisted via `useGuestStore` in `apps/mobile/src/stores/guestStore.ts`.

### 2. home screen enhancements (`apps/mobile/app/(tabs)/index.tsx`)
- top header: brand mark `"kandid"` in Playfair Display + `"guest mode"` pill chip.
- hero headline: `"pick a pose, we'll guide the shot"` with warm editorial subtitle.
- primary mode cards:
  - `"pose camera"` (popular badge, champagne gold fill `#C5A880`, dark espresso text `#1C1A18`).
  - `"hands-free series"` (pro badge, recurring interval timer burst description).
- quick tools bar:
  - `"soft light"` warm screen illumination pill trigger.
  - `"random pose"` instant pose picker navigating directly to detail view.
- popular poses horizontal carousel with metadata badges.

### 3. pose library & search (`apps/mobile/app/(tabs)/poses.tsx`)
- header title: `"choose a pose"`.
- rounded search input with search icon: `"describe your shot..."`.
- 9 category filter pills with live count badges:
  - `[all]`, `[solo]`, `[couple]`, `[besties]`, `[mirror]`, `[sitting]`, `[walking]`, `[masc]`, `[fem]`.
- 2-column pose grid:
  - parametric Skia mannequin vector previews with golden joint highlights.
  - title and category in Plus Jakarta Sans (minimum 12px font floor).
  - interactive heart save button connected to `useGuestStore`.
  - direct navigation to pose detail screen (`/pose/[id]`).

### 4. pose detail view (`apps/mobile/app/pose/[id].tsx`)
- top bar: back button (`←`), title in Playfair Display, heart save button.
- hero mannequin view (`PoseHero.tsx`): dark container with subtle rule-of-thirds grid lines, centered Skia mannequin, category, difficulty, and pro badges.
- dual cues tabs (`PoseCuesSection.tsx`):
  - segmented tab control: `"for you"` vs `"for photographer"`.
  - numbered cue cards (`01`, `02`, `03`...) with step badges.
  - framing notes card: recommended lens (`1x`, `2x`), camera angle, grid anchor.
- sticky bottom action bar (`PoseActionBar.tsx`):
  - `"save to shoot"` outline pill toggling saved status.
  - `"use this pose"` primary gold pill (`#C5A880` with `#1C1A18` espresso text) navigating directly to camera with `poseId`.

### 5. camera route integration (`apps/mobile/app/camera.tsx`)
- accepts `poseId` query param and dynamically loads matching active pose from seed catalog.
- passes `topOffset={60}` to `MannequinView` to account for top bar scrim.

---

## 5. open issues & next milestone (m3)

- **ready for milestone 3 (m3)**:
  - camera viewfinder live hardware integration (`expo-camera` / `@shopify/react-native-skia`).
  - real-time mannequin vector alignment overlay.
  - docked cue card carousel in safe zone (`bottom: 120px`).
  - countdown timer (3s / 10s) and hands-free series interval burst engine.
  - soft light screen illumination overlay.


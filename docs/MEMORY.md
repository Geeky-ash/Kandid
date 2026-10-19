# kandid — living project memory & context

> this file tracks live project state, milestone progress, completed features, upcoming tasks, open questions, and known constraints for **kandid** (`@kandid/*`, bundle id: `com.kandid.app`). update this file at the conclusion of every task or milestone.

---

## 1. current status

- **phase**: milestone 1 completed (monorepo architecture, ui tokens, content, and navigation shell).
- **state**: monorepo workspace initialized with npm workspaces. `@kandid/ui-tokens` and `@kandid/content` exported and typechecked with 0 errors. `@kandid/mobile` navigation shell implemented with root layout, floating pill tab bar (warm editorial glass with android solid fallback), elevated gold camera action button, and 4 tab routes + camera view. automated token drift check script verified with 0 drift.
- **brand definition**:
  - **app name**: `kandid`
  - **tagline**: `"effortless angles for every shot."`
  - **monorepo scope**: `@kandid/mobile`, `@kandid/web`, `@kandid/ui-tokens`, `@kandid/content`
  - **bundle identifier / android package**: `com.kandid.app`
  - **design theme**: `"warm editorial glass"` (stitch mcp project id: `931723337622910157`)
- **active branch**: `main`.
- **last updated**: 2026-10-19 (milestone 1 completion).

---

## 2. milestone roadmap & progress

| milestone | focus area | status | completion notes |
| :--- | :--- | :--- | :--- |
| **phase 0** | 8 documentation files in `/docs/` + root pointer | **completed** | all 8 docs updated with kandid brand, stitch mcp tokens, contrast rules, safe zone docking, parametric skia mannequin, and privacy specs |
| **m1** | monorepo setup, `@kandid/ui-tokens`, `@kandid/content`, navigation shell + floating tab bar | **completed** | workspaces initialized, packages exported, floating tab bar with elevated camera button built, token drift test 100% passing, typecheck clean (0 errors) |
| **m2** | onboarding (paywall step), home, pose library (60–100 skeletal seed), pose detail | upcoming | planned next |
| **m3** | camera, parametric skia overlay, docked cue cards, timer, soft light, hands-free series | pending | depends on m2 |
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
- android development build completed successfully on eas cloud.
  - build profile: `development` (apk internal distribution).
  - build url: `https://expo.dev/accounts/geeky-ash/projects/kandid-monorepo/builds/c313d422-aaa6-428d-824f-64e1384158df`
- android standalone preview build running on eas cloud.
  - build profile: `preview` (standalone apk with bundled js code, zero metro server required).
  - build url: `https://expo.dev/accounts/geeky-ash/projects/kandid/builds/eb705181-89e7-4f70-990b-976990748aee`
- verified native installation and dev-client packaging.

---

## 4. open issues & next milestone (m2)

- **ready for milestone 2 (m2)**:
  - onboarding flow (tilted collage, welcome screen, permissions, soft paywall step with 7-day free trial toggle).
  - home mode switcher enhancements & recent shoot storage via mmkv.
  - full pose library browsing, category filtering, search, and pose detail screen with dual cues.

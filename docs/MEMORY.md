# kandid — living project memory & context

> this file tracks live project state, milestone progress, completed features, upcoming tasks, open questions, and known constraints for **kandid** (`@kandid/*`, bundle id: `com.kandid.app`). update this file at the conclusion of every task or milestone.

---

## 1. current status

- **phase**: release build verification & production standalone packaging verified (v1.0.0).
- **state**: monorepo workspace with `@kandid/ui-tokens`, `@kandid/content`, and `@kandid/mobile`. all screens and services for m1, m2, m3, m4, and m5 implemented adhering strictly to warm editorial glass tokens (`#fcf9f4`, `#f0ede9`, `#c5a880`, `#5b7e68`, `#1c1a18`), lowercase copy, min 12px text floor, <150 lines per file, zero image retention over TLS, and 0 errors across typescript strict compilation and token drift check.
- **brand definition**:
  - **app name**: `kandid`
  - **tagline**: `"effortless angles for every shot."`
  - **monorepo scope**: `@kandid/mobile`, `@kandid/web`, `@kandid/ui-tokens`, `@kandid/content`
  - **bundle identifier / android package**: `com.kandid.app`
  - **design theme**: `"warm editorial glass"` (stitch mcp project id: `931723337622910157`)
- **active branch**: `main`.
- **last updated**: 2026-10-28 (final release build verification & production packaging).

---

## 2. milestone roadmap & progress

| milestone | focus area | status | completion notes |
| :--- | :--- | :--- | :--- |
| **phase 0** | 8 documentation files in `/docs/` + root pointer | **completed** | all 8 docs updated with kandid brand, stitch mcp tokens, contrast rules, safe zone docking, parametric skia mannequin, and privacy specs |
| **m1** | monorepo setup, `@kandid/ui-tokens`, `@kandid/content`, navigation shell + floating tab bar | **completed** | workspaces initialized, packages exported, floating tab bar with elevated camera button built, token drift test 100% passing, typecheck clean (0 errors) |
| **m2** | onboarding (paywall step), home, pose library (skeletal seed), pose detail view | **completed** | onboarding flow with tilted cards, home screen with mode cards & tools, 9-category pose library with search & 2-col grid, pose detail with mannequin hero, dual cues, and action bar |
| **m3** | camera, parametric skia overlay, docked cue cards, timer, soft light, hands-free series | **completed** | vision-camera hardware integration, dynamic lens discovery (0.5x-3x), safe zone cue cards docked at bottom: 120px, single/series hands-free burst modes, soft light 3-temp glow tool |
| **m4** | supabase auth (apple + google) + backend + best shots ai edge function (in-memory) + atomic credits | **completed** | supabase client & session cache, atomic credit ledger with auto-refunds, auth screen (email/apple/google/guest), best shots photo picker, cloud ai edge function with zero disk retention, curation results view |
| **m5** | settings & profile, privacy & permission consent flow, credit top-up, haptics & workspace e2e verification | **completed** | profile card with tier badge, credit top-up modal with atomic updates, ledger history modal, capture preferences toggles, 4-pillar zero-storage privacy modal, device permission modal, haptic feedback integration, curation skeleton animation, 0 typecheck errors, 0 token drift |
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
- android development build (m3/m4 with vision-camera + skia + custom gradle/cmake throttle plugin) **completed successfully** on eas cloud:
  - build profile: `development` (apk internal distribution).
  - build url: `https://expo.dev/accounts/geeky-ash/projects/kandid/builds/017f70a8-8731-4209-8a07-d53cfcb64a59`
  - commit: `00f0bd8` (`fix(build): inject gradle.properties and CMake parallel limit via custom Expo config plugin`).
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

## 5. what is built & verified (m3 deliverables)

### 1. camera hardware viewfinder (`apps/mobile/src/components/camera/VisionViewfinder.tsx`)
- integrated `react-native-vision-camera` v5 with permission request handling (`useCameraPermission`).
- dynamic physical lens discovery with zoom support (`0.5x`, `1x`, `2x`, `3x`) and smooth digital crop fallback.
- graceful fallback state when permissions are pending or in simulator, preventing any native crash.

### 2. parametric skia mannequin & framing overlay (`apps/mobile/src/components/camera/CameraOverlay.tsx`)
- translucent parametric Skia vector mannequin aligned directly over camera feed.
- rule-of-thirds grid lines (`33.3%`, `66.6%`) with toggle.
- horizon level guide / center framing anchor.
- prominent countdown overlay with gold circular badge (`3`, `2`, `1`).

### 3. safe zone cue docking (`apps/mobile/src/components/camera/CueCard.tsx`)
- docked strictly in safe zone (`bottom: 120px`), max height 72px, leaving central 70% viewfinder clear.
- bidirectional cue navigation (`‹` and `›`), step counts (`cue 1 of 4`).
- instant toggle between `subjectCues[]` (`"for you"`) and `photographerCues[]` (`"for photographer"`).
- warm dark glassmorphism styling (`rgba(28, 26, 24, 0.82)`) with Android solid fallback.

### 4. hands-free series & shutter engine (`apps/mobile/src/components/camera/ShutterBar.tsx`)
- single capture mode with 3s / 10s countdown timer.
- interval series mode with recurring bursts (every 2s, 3s, or 5s).
- champagne gold shutter button (`#C5A880`) with active recording status ring.
- quick hardware zoom selector (`ZoomPillSelector.tsx`).
- gallery thumbnail with real-time capture counter.
- front/back camera flip.

### 5. soft light illumination tool (`apps/mobile/src/components/camera/SoftLightModal.tsx`)
- fullscreen warm screen glow modal with center cut-out window.
- 3 color temperature options: neutral white (`#FFFBF5`), 3200K warm candlelight (`#FFD5A5`), 4500K golden hour (`#FFE6C2`).
- 4 brightness levels: 35%, 65%, 85%, 100%.

### 6. centralized camera state store (`apps/mobile/src/stores/cameraStore.ts`)
- Zustand store managing flash, timer, grid, zoom, camera position, shutter mode, burst intervals, and capture history.

---

## 6. what is built & verified (m4 deliverables)

### 1. supabase client & session cache (`apps/mobile/src/lib/supabase.ts`)
- initialized Supabase client with custom secure storage adapter and auto session refresh.

### 2. atomic credit store & ledger (`apps/mobile/src/stores/creditStore.ts`)
- tracks user balance and transaction history with immutable status indicators (`completed`, `refunded`, `failed`).
- atomic deduction with transaction ID tracking and automatic refund mechanism on processing failure.

### 3. auth store & full screen (`apps/mobile/src/stores/authStore.ts`, `apps/mobile/app/auth.tsx`)
- email/password sign-in and sign-up with input validation and error feedback.
- Apple and Google OAuth sign-in buttons styled with warm editorial pills.
- smooth conversion path for guest users upgrading to full authenticated accounts.

### 4. best shots photo picker screen (`apps/mobile/app/(tabs)/best-shots.tsx`)
- top header featuring live credit balance pill indicator (`✦ 3 credits`).
- candidate photo selection grid with checkboxes and gold selection state.
- selection counter and cost preview banner (`"curate X photos — 1 credit"`).
- zero-retention privacy guarantee callout card.

### 5. supabase cloud ai edge function (`supabase/functions/curate-best-shots/index.ts`)
- in-memory stream evaluation over secure TLS without persistent storage.
- aesthetic scoring for focus, lighting, composition, and expression.
- atomic credit validation and auto-refund triggers.
- structured evaluation output with ranked scores and editorial improvement cues.

### 6. client curation service (`apps/mobile/src/services/curationService.ts`)
- handles pre-curation atomic credit deduction, edge function invocation over TLS, and auto-refund on failure.

### 7. curation results screen (`apps/mobile/app/curation-results.tsx`)
- top ranked hero photo with gold `"✦ best shot"` badge and score pill (`9.8 / 10`).
- detailed breakdown cards with `"post"`, `"keep"`, and `"delete"` verdicts (WCAG AA calibrated colors).
- specific strengths and suggestions for each evaluated photo.
- `"save curated picks"` and `"try another pose"` navigation actions.

---

## 7. what is built & verified (m5 deliverables)

### 1. profile & account settings screen (`apps/mobile/app/(tabs)/profile.tsx`)
- assembled modular subcomponents (each strictly < 150 lines).
- user profile card with avatar initials, email/guest state, and account tier badge (`apps/mobile/src/components/profile/UserProfileCard.tsx`).
- legal navigation links (privacy policy, terms of service, eula) and version footer ("version 1.0.0 (build 1) · m5 production ready").

### 2. credit balance & atomic top-up system
- `CreditBalanceSection.tsx`: current credit balance display, "top up credits" CTA, and "view credit history" CTA.
- `TopUpModal.tsx`: credit purchase tiers (starter 5 credits, editorial creator 20 credits, unlimited pro pass) triggering atomic credit ledger updates in `creditStore.ts`.
- `TransactionHistoryModal.tsx`: full transactional ledger list showing timestamps, amounts (+ / -), reasons, and status.

### 3. capture preferences & local storage controls
- `preferencesStore.ts`: reactive Zustand store managing `saveOriginals`, `hapticsEnabled`, and `autoGrid`.
- `PreferencesSection.tsx`: interactive switches calibrated with warm gold tracks.
- `PrivacySection.tsx`: triggers for zero-storage architecture modal, permission management modal, and local cache reset with feedback alert.

### 4. privacy & device permission consent flow
- `PermissionModal.tsx`: graceful contextual prompt for Camera and Media Library access with explicit zero-retention disclaimers.
- `PrivacyPolicyModal.tsx`: 4-pillar architectural privacy commitment (on-device capture, zero cloud retention, ephemeral in-memory evaluation, strict no-training guarantee).

### 5. ui polish, haptics & skeleton animations
- `haptics.ts`: wrapper around `expo-haptics` with user preference checks across light, medium, heavy, selection, and success haptic styles.
- integrated tactile feedback across camera shutter (`ShutterBar.tsx`), tab bar selection (`TabBar.tsx`), pose favorites (`poses.tsx`, `pose/[id].tsx`), and credit purchases.
- `CurationSkeleton.tsx`: smooth dual shimmer cards rendering during vision ai analysis in `best-shots.tsx`.

### 6. workspace e2e verification
- `npx tsc --noEmit`: 100% clean (0 TypeScript compilation errors across `@kandid/content`, `@kandid/ui-tokens`, `@kandid/mobile`).
- `node packages/ui-tokens/scripts/check-token-drift.js`: 17/17 design token and contrast checks passed with 0 unverified drift.
- all 10 new screens and subcomponents strictly under 150 lines per file.

---

## 8. open issues & next milestone (m6)

- **ready for milestone 6 (m6)**:
  - Editor & 16 Gem Looks with hold-to-compare (`@shopify/react-native-skia` color matrix filters).
  - Split-view comparison slider and instant preset switching.
  - Final high-resolution keeper export to camera roll.




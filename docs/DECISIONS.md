# kandid — architectural decision records (adrs)

> this document records key architectural, design system, and engineering decisions for **kandid** (`@kandid/*`, bundle id: `com.kandid.app`).

---

## index of architectural decisions

| adr # | title | status | date |
| :--- | :--- | :---: | :---: |
| **adr-001** | monorepo structure with npm/pnpm workspaces | accepted | 2026-10-18 |
| **adr-002** | react-native-vision-camera for viewfinder & hardware lens control | accepted | 2026-10-18 |
| **adr-003** | [superseded by adr-012] two cameras, one coach | superseded | 2026-10-18 |
| **adr-004** | shopify react native skia for mannequin overlays & gem looks | accepted | 2026-10-18 |
| **adr-005** | zustand + react-native-mmkv for offline-first state & guest mode | accepted | 2026-10-18 |
| **adr-006** | revenuecat for cross-platform subscription & credit management | accepted | 2026-10-18 |
| **adr-007** | provider-agnostic serverless edge function for best shots curation | accepted | 2026-10-18 |
| **adr-008** | next.js 14 app router for marketing & store redirect website | accepted | 2026-10-18 |
| **adr-009** | expo router v3 file-based routing for mobile application | accepted | 2026-10-18 |
| **adr-010** | supabase auth (apple + google) & postgres credit ledger | accepted | 2026-10-18 |
| **adr-011** | lowercase copy enforcement with pragmatic exceptions | accepted | 2026-10-18 |
| **adr-012** | removal of voice coach; visual text cues & guided shoot mode | accepted | 2026-10-18 |
| **adr-013** | proposed dependencies approval list (sensors, brightness, blur) | proposed | 2026-10-18 |
| **adr-014** | exact version pinning for dependencies | accepted | 2026-10-18 |
| **adr-015** | in-memory zero-storage best shots privacy model | accepted | 2026-10-18 |
| **adr-016** | parametric skia mannequin rendering (joint coordinates vs static assets) | accepted | 2026-10-18 |
| **adr-017** | enterprise vision ai privacy (zero data retention, no training, us/eu residency) | accepted | 2026-10-18 |
| **adr-018** | stitch mcp single source of truth, same-commit sync, and token drift check | accepted | 2026-10-18 |

---

## adr-001: monorepo structure with npm/pnpm workspaces
- **context**: kandid consists of an expo mobile application, a next.js marketing site, shared ui design tokens, and shared pose content.
- **decision**: use a monorepo structure (`apps/mobile`, `apps/web`, `packages/ui-tokens`, `packages/content`).
- **consequences**: single lint/typecheck command, zero token divergence between web and mobile.

---

## adr-002: react-native-vision-camera for viewfinder & lens controls
- **context**: need reliable 60fps camera feed, tap-to-focus, multi-camera physical lens discovery, and skia frame integration.
- **decision**: use `react-native-vision-camera` v4.
- **consequences**: direct access to physical camera devices (`0.5x`, `1x`, `2x`, `3x`), optical switching, and skia integration.

---

## adr-003: [superseded by adr-012] two cameras, one coach
- **status**: **superseded** by adr-012. voice coaching and live frame vision pipeline have been removed.

---

## adr-004: shopify react native skia for mannequin overlays & gem looks
- **context**: visual pose guidance requires drawing responsive outlines and color matrix shaders at 60fps without bridging delays.
- **decision**: use `@shopify/react-native-skia`.
- **consequences**: hardware-accelerated skia canvas renders parametric joint skeletons and gem look color filters directly on the gpu.

---

## adr-005: zustand + react-native-mmkv for offline-first state & guest mode
- **context**: kandid must work 100% offline in guest mode without account sign-up.
- **decision**: use `zustand` for in-memory reactive state and `react-native-mmkv` for synchronous local persistence.
- **consequences**: zero cold-start delay, robust offline storage for guest favorites and shoot history.

---

## adr-006: revenuecat for cross-platform subscriptions & credits
- **context**: need reliable in-app purchases across ios app store and google play store.
- **decision**: integrate `react-native-purchases` (revenuecat sdk).
- **consequences**: unified entitlement management for kandid pro subscriptions and consumable credit packs.

---

## adr-007: provider-agnostic serverless edge function for best shots
- **context**: best shots requires high-accuracy vision analysis without vendor lock-in.
- **decision**: implement `/rank-best-shots` as a supabase edge function abstracting the vision model.
- **consequences**: can switch between gemini 1.5 flash, gpt-4o mini, or claude 3.5 sonnet via environment flags without mobile updates.

---

## adr-008: next.js 14 app router for marketing & store redirect site
- **context**: web presence exists solely to showcase the app, provide interactive web demos, and direct visitors to app stores.
- **decision**: build `apps/web` with next.js 14 app router, tailwind css, and vercel deployment.
- **consequences**: lighthouse score ≥ 95, automatic user-agent redirection to apple app store or google play store.

---

## adr-009: expo router v3 file-based routing
- **context**: deep linking, universal links from marketing site, modal presentation, and nested tab navigation.
- **decision**: use `expo-router` v3.
- **consequences**: declarative route definitions, strict typing for route params, unified deep linking.

---

## adr-010: supabase auth & postgres credit ledger
- **context**: guest users need seamless optional account creation with apple and google sign-in.
- **decision**: use supabase auth + postgres stored procedures for credit management.
- **consequences**: sign in with apple meets app store guideline 4.8; atomic credit transactions prevent race conditions.

---

## adr-011: lowercase copy enforcement with pragmatic exceptions
- **context**: brand guidelines mandate warm, approachable lowercase copy across all ui.
- **decision**: enforce lowercase across all user-facing copy in `packages/content`, with strict exceptions:
  1. *legal text*: terms of service, privacy policy legal clauses, copyright notices ("© 2026 kandid"), and eula provisions.
  2. *user-generated content*: user profile names, custom shoot titles.
  3. *technical error identifiers*: machine error codes (e.g. `ERR_CAMERA_UNAVAILABLE`).
  4. *platform & partner brand names*: proper trademarks where casing is legally required (e.g. `Apple`, `Google`, `Google Play`, `App Store`, `RevenueCat`).
- **consequences**: automated linter enforces lowercase strings while allowing required exceptions.

---

## adr-012: removal of voice coach in v1; visual text cues & guided shoot mode
- **context**: user feedback and field testing identified that audio coaching is intrusive, socially awkward in public, and introduces brittle voice recognition dependencies.
- **decision**:
  - eliminate all speech recognition, text-to-speech, audio recording, and microphone permissions.
  - replace voice coaching with on-screen swipeable cue cards docked in defined safe zones (`bottom: 120px`).
  - add **guided shoot** mode: full-screen cue card timeline with progress indicator and haptic advance button.
- **consequences**: zero microphone permissions requested; app operates 100% offline for shooting; zero privacy concerns regarding voice capture.

---

## adr-013: proposed dependencies approval list (sensors, brightness, blur)
- **context**: specific features require device hardware interaction:
  1. camera level indicator: requires device accelerometer/gyroscope.
  2. soft light feature: requires adjusting screen illumination to 80–100%.
  3. glassmorphic huds: requires frosted background surface on ios.
- **decision**: propose the following official expo libraries:
  - `expo-sensors`: for leveling accelerometer.
  - `expo-brightness`: for soft light screen glow.
  - `expo-blur`: for ios frosted glass surfaces, paired with android solid translucent fallback.
- **consequences**: all libraries are maintained in the official expo sdk matrix.

---

## adr-014: exact version pinning for dependencies
- **context**: cross-platform camera and native animation builds are vulnerable to minor/patch version breakage.
- **decision**: pin all package dependencies to exact versions using `.npmrc` (`save-exact=true`).
  - expo sdk: `~51.0.0`
  - react native: `0.74.x`
  - react-native-vision-camera: `4.5.1`
  - @shopify/react-native-skia: `1.3.1`
  - typescript: `5.4.x`
- **consequences**: deterministic builds across developer machines and ci runners.

---

## adr-015: in-memory zero-storage best shots privacy model
- **context**: privacy is paramount for personal photos. cloud photo storage creates massive liability and user anxiety.
- **decision**:
  - zero supabase storage buckets exist in the architecture.
  - photos selected for best shots curation are compressed in client ram to 1024px jpeg.
  - photos are streamed over tls 1.3 directly into edge function memory, parsed into memory buffers, evaluated statelessly by the vision ai, and discarded immediately.
  - credits are deducted atomically via postgres stored procedure `rpc_deduct_credits_for_curation`. if vision processing fails, an automatic refund is issued.
- **consequences**: zero user photos ever touch server persistent storage. app store privacy label verifies `photos: user-selected only, not tracked, not stored`.

---

## adr-016: parametric skia mannequin rendering (joint coordinates vs static assets)
- **context**: traditional photo guide apps bundle 300+ static svg or png illustrations, causing huge binary bloat (> 25 mb) and rendering poorly across different camera aspect ratios (4:3 vs 16:9).
- **decision**:
  - represent poses as 15 normalized 2d joint coordinates (`skeleton_joints`).
  - render all poses using a single parametric skia component (`MannequinOverlay.tsx`) that connects joints with gold/white dashed lines.
  - launch with a curated seed catalog of **60–100 core poses** (< 45 kb total json).
  - distribute new pose collections via versioned remote json delta updates cached in mmkv/sqlite.
- **consequences**: binary size reduced by > 90%; poses scale fluidly to any camera viewport or tablet aspect ratio.

---

## adr-017: enterprise vision ai privacy & compliance standards
- **context**: using third-party vision models (gemini / gpt-4o mini) for best shots must strictly protect user rights.
- **decision**: enterprise api agreements must guarantee:
  1. zero data retention (zdr): requests are processed statelessly and discarded immediately after inference.
  2. strict no-training guarantee: user photos are never logged or used to train public or proprietary models.
  3. regional data residency: data processed in us/eu enterprise zones.
- **consequences**: qualifies kandid for enterprise privacy certification and strict apple/google store approvals.

---

## adr-018: stitch mcp single source of truth, same-commit sync & token drift check
- **context**: maintaining design fidelity between stitch design exports and implementation code without drift.
- **decision**:
  - connected stitch mcp project (`id: 931723337622910157`) is the **sole source of truth** for colors, fonts, radii, and spacing scales.
  - `packages/ui-tokens` must be generated directly from stitch tokens.
  - **same-commit synchronization**: any modification or addition to a token in `packages/ui-tokens` strictly requires updating `docs/DESIGN.md` in the exact same git commit.
  - **token drift check**: before any milestone is marked done, an automated or scripted token drift check compares code tokens against stitch mcp, failing if drift is detected.
- **consequences**: guaranteed design system consistency across the monorepo lifecycle.

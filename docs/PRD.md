# kandid — product requirements document (prd)

> **app name**: kandid  
> **tagline**: "effortless angles for every shot."  
> **monorepo scope**: `@kandid/mobile`, `@kandid/web`, `@kandid/ui-tokens`, `@kandid/content`  
> **bundle id / android package**: `com.kandid.app`  
> **target platforms**: ios (16.0+) and android (8.0+ / api 26+) via expo react native; next.js 14 marketing website

---

## 1. executive summary & problem statement

### 1.1 the problem
taking photos of oneself or others is fraught with friction and social anxiety:
- **the poser's struggle**: "what do i do with my hands?", "how should i stand?", "does this look unnatural?"
- **the photographer's struggle**: friends and partners are handed a phone with zero direction, leading to awkward angles, bad lighting, frustration, and dozens of nearly identical throwaway shots.
- **the post-shoot fatigue**: after taking 50 photos, users dread scrolling through camera rolls to find the few keepers worth sharing.
- **privacy discomfort**: users are increasingly skeptical of uploading personal photos to cloud servers that retain images or use them to train generative models.

### 1.2 the solution: kandid
kandid turns any phone into a calm, editorial camera director:
1. **parametric mannequin overlays**: semi-transparent, responsive joint-angle guide lines drawn in real-time using skia directly over the camera viewfinder.
2. **split visual cue cards**: ordered, lowercase text prompts divided cleanly into `subjectCues[]` (for the person posing) and `photographerCues[]` (for whoever is holding the phone).
3. **safe zone docking**: cue cards dock gracefully above the shutter and below the top bar, leaving the central 70% of the viewfinder unobstructed.
4. **guest mode offline freedom**: 100% offline camera, pose library, and looks editor with zero account sign-up required.
5. **zero-retention best shots curation**: opt-in serverless vision analysis that recommends `post`, `keep`, or `delete` with plain-text reasons. photos are processed ephemerally in-memory over tls and are never stored on disk.
6. **editorial warmth**: styled in "warm editorial glass" (cream canvas `#fcf9f4`, champagne gold accents `#c5a880`, sage mist `#5b7e68`, and rich espresso typography `#1c1a18`).

---

## 2. target audiences & user personas

| persona | profile | primary pain point | core kandid value |
| :--- | :--- | :--- | :--- |
| **the everyday poser** (chloe, 24) | wants stylish casual photos for instagram/beacons but feels stiff in front of a lens. | feels awkward posing, doesn't know what to do with hands or posture. | visual mannequin outline + concise `subjectCues` ("chin slightly down", "rest hand on hip"). |
| **the designated photographer** (marcus, 28) | often asked to take photos of friends or partner; gets overwhelmed by vague requests. | doesn't know framing, angles, or how to direct someone else. | actionable `photographerCues` ("crouch to waist height", "align eyes with upper third grid line"). |
| **the solo creator** (elena, 22) | takes self-portraits and ootd photos using tripods or leaning phones on shelves. | rushing to position before a 10s timer runs out; taking 1 shot at a time. | hands-free recurring interval bursts + soft light screen glow. |
| **the social group** (friends & couples) | traveling or dining out together; wants memorable, candid-looking group shots. | repetitive standing poses; awkward group spacing. | duo & group pose categories with paired cues for both participants. |

---

## 3. feature breakdown & priority

### 3.1 priority 0 (p0) — launch critical (mvp)
- **guest mode & local architecture**:
  - instant app access: no sign-up or login required to shoot, browse poses, or edit photos.
  - 100% offline functionality for camera, parametric mannequin guides, and looks editor.
- **parametric mannequin camera overlay**:
  - responsive skeletal pose outlines rendered using `@shopify/react-native-skia` based on 15 normalized joint coordinates.
  - launch catalog of 60–100 core poses (solo casual, seated, mirror, duo, golden hour).
  - catalog count derived dynamically at build and runtime (`{pose_catalog_count}`); zero hardcoded totals in copy.
- **dual cue guidance cards**:
  - structured schema: `subjectCues[]` (pose adjustments) and `photographerCues[]` (framing, angle, phone height).
  - docked safe zone: anchored above the shutter container (`bottom: 120px`), max height 72px, leaving central 70% unobstructed.
  - swipeable cards with subtle haptic tick on advancement.
- **camera controls with physical hardware clamping**:
  - full-screen viewfinder powered by `react-native-vision-camera`.
  - hardware lens discovery: dynamically discovers physically available lenses (`1x`, `2x`, `3x`, `0.5x`) and clamps zoom pills strictly to hardware optics.
  - android single-lens fallback: provides smooth digital zoom crop `[1x, 2x]` with pinch-to-zoom if multi-lens hardware is unexposed.
  - exposure compensation slider, tap-to-focus gold ring, and grid lines.
- **free tier soft light & hands-free series**:
  - *soft light (free)*: full-screen neutral white glow at 80% fixed brightness for low-light selfie illumination.
  - *hands-free series (free)*: 3s or 10s single burst countdown (capturing up to 3 frames per burst) with visual and haptic pacing.
- **editorial looks editor**:
  - 16 gemstone-named color matrices (*citrine*, *sapphire*, *amber*, *emerald*, etc.) applied in real-time via skia shaders.
  - hold-to-compare overlay and intensity slider (0–100%).
  - direct high-resolution export to system photo library.

### 3.2 priority 1 (p1) — core monetization & ai curation
- **best shots ai curation**:
  - batch curation of up to 10 photos per credit.
  - sorting into three columns: `post` (top tier, best lighting/expression), `keep` (solid alternatives), and `delete` (blurry, closed eyes, unflattering angles).
  - plain-text lowercase reason for each verdict (e.g., `"flattering light on cheekbones"`, `"eyes closed mid-laugh"`).
  - zero storage bucket: in-memory streaming over tls to supabase edge functions, processed ephemerally, and immediately discarded.
  - automatic credit refund if vision processing or network fails.
- **pro tier subscriptions & in-app purchases**:
  - *soft light (pro)*: 3 calibrated color temperatures (3200k candlelight, 4500k golden hour, 6500k clean studio) with a 20–100% fine brightness slider.
  - *hands-free series (pro)*: recurring interval bursts (1 photo every 2s, 3s, or 5s up to 20 shots per session) with audio/haptic interval cues.
  - annual subscription ($39.99/yr with 7-day free trial) and monthly ($6.99/mo) managed via revenuecat.
  - consumable credit packs for best shots: 30 credits ($2.99), 120 credits ($9.99).
- **user accounts & sign-in**:
  - optional sign-in with apple and google (sign in with apple mandatory on ios alongside google).
  - required only for accessing best shots ai, managing subscriptions, and syncing credits across devices.

### 3.3 priority 2 (p2) — post-launch enhancements
- **custom pose creator**: save personal joint outlines from favorite camera roll photos.
- **remote catalog delta sync**: background sync of new seasonal pose collections without requiring app store updates.
- **batch export with presets**: apply a favorite look across an entire session simultaneously.

---

## 4. tier comparison, credit mechanics & unit economics

### 4.1 free vs. pro tier breakdown

| feature | free tier (guest & registered) | pro subscription ($39.99/yr or $6.99/mo) |
| :--- | :--- | :--- |
| **camera & viewfinder** | full access, hardware lens switching | full access, hardware lens switching |
| **parametric mannequin poses** | 30 core starter poses | full catalog (growing from 60–100 to 350+) |
| **dual cue cards** | full access for unlocked poses | full access across all poses |
| **soft light screen glow** | neutral white glow at 80% fixed brightness | 3 color temperatures (3200k, 4500k, 6500k) + 20–100% brightness slider |
| **hands-free series timer** | 3s / 10s countdown (1 burst of 3 photos) | recurring interval bursts (every 2s, 3s, 5s up to 20 photos) |
| **gem looks editor** | 4 core looks (*citrine*, *amber*, *pearl*, *onyx*) | all 16 premium gem looks + full slider range |
| **best shots ai curation** | 3 complimentary credits upon account creation | 30 monthly credits included + discounted pack refills |
| **offline mode** | 100% offline shooting & editing | 100% offline shooting & editing |

### 4.2 credit mechanics & unit economics
- **1 credit definition**: 1 credit pays for the automated curation of 1 batch of up to 10 photos submitted simultaneously.
- **ai processing cost**:
  - vision model inference (gemini 1.5 flash or gpt-4o mini via edge function): ~$0.0006 per 1024x1024 thumbnail evaluation.
  - total ai compute cost per 10-photo batch = **~$0.006 to $0.009**.
- **revenue per credit**:
  - consumable pack: 120 credits for $9.99 = $0.083 gross per credit.
  - after app store / google play commission (15% small business rate): **~$0.071 net revenue per credit**.
  - after 30% standard rate: **~$0.058 net revenue per credit**.
- **gross margin**:
  - net revenue ($0.071) - ai compute cost ($0.008) = **$0.063 net margin per credit (~88% gross profit margin)**.
- **atomic deduction & failure refund**:
  - credits are checked and held server-side via postgres transactions (`rpc_deduct_credits_for_curation`).
  - if the edge function or vision provider encounters a timeout or error, the transaction rolls back or issues an immediate refund credit to the user's ledger.

---

## 5. privacy, compliance & legal policies

### 5.1 zero data retention & ephemeral privacy model
- kandid guarantees that photos submitted for best shots curation are processed purely in-memory.
- photos are compressed to 1024px jpeg in client ram, transmitted over tls 1.3 to the edge function, parsed into memory buffers, analyzed by enterprise vision apis with zero data retention (zdr) agreements, and immediately discarded from ram.
- zero user photos are ever written to cloud storage buckets or server persistent storage.

### 5.2 minimum age policy
- **minimum age**: 13 years old (16 years old in the european union and jurisdictions governed by gdpr).
- terms of service require parental or guardian consent for users under the age of majority in their jurisdiction.

### 5.3 mandatory legal review items (prior to release)
before public app store and google play release, formal qualified legal counsel sign-off is required for:
1. **biometric & facial analysis laws**: compliance with state laws regarding facial geometry analysis (e.g., illinois bipa, texas cubi, washington state). note that kandid evaluates lighting, blur, and general pose orientation without extracting biometric facial identifiers.
2. **minor consent & child privacy**: compliance with coppa (us) and gdpr-k (eu) regarding teenage usage.
3. **terms of service & eula**: clear disclaimer that pose suggestions are general postural guides and users assume responsibility for their physical safety during shoots.
4. **privacy policy**: transparent disclosure of zero cloud photo storage and third-party vision processing.

### 5.4 store privacy classifications (to verify before submission)
- **apple app store privacy nutrition labels**:
  - *photos*: collected solely for app functionality (`user-selected only`, ephemeral processing, not linked to user identity, not tracked).
  - *contact info (email)*: collected only if user creates an account for best shots/subscriptions.
  - *user content*: not used for tracking or advertising.
- **google play data safety**:
  - *photos*: ephemeral processing disclosed; data is encrypted in transit over https/tls; data cannot be deleted on request because data is never stored on servers.

---

## 6. user stories & flows

### 6.1 guest shooting flow
1. user opens kandid for the first time.
2. taps `"continue as guest"` on welcome screen.
3. lands on home screen (`"pick a pose, we'll guide the shot"`).
4. selects a seated pose from the pose library.
5. camera opens: skia parametric mannequin outline aligns on screen; cue card docks in safe zone above shutter reading `"rest hand on chin"`.
6. user captures photo; photo saves directly to local photo library. no account, no prompts, no friction.

### 6.2 dual-guidance shoot flow (taking photo of a friend)
1. marcus taps `"pose camera"` and selects `"outdoor casual"`.
2. toggles cue card view to show both `subjectCues` and `photographerCues`.
3. marcus reads his cue: `"drop phone to waist height and tilt slightly upward"`.
4. marcus tells his friend the subject cue: `"cross left leg over right and look past camera"`.
5. framing guideline aligns; green alignment indicator pulses; marcus snaps the photo.

### 6.3 best shots curation flow
1. user selects 8 photos from a recent shoot.
2. prompt explains: `"kandid will curate your best shots in memory. no photos are stored on servers. costs 1 credit."`
3. user taps `"curate batch (1 credit)"`.
4. client compresses photos and transmits over tls to edge function.
5. in < 4 seconds, results appear: 2 photos in `post`, 4 in `keep`, 2 in `delete` with actionable tags (`"sharp focus"`, `"soft golden light"`, `"eyes closed"`).
6. user taps `"edit this one"` to open the top pick in looks editor.

---

## 7. onboarding & business kpis

### 7.1 onboarding flow & paywall step
1. **screen 1: welcome**: tilted photo collage, tagline `"effortless angles for every shot."`, social proof placeholders (`[stat_users_coached]`), gold `"get started"` button, and `"continue as guest"` link.
2. **screen 2: camera permission**: clear rationale explaining that camera access is needed purely to display pose guides and capture photos.
3. **screen 3: photo library permission**: explains that photos access is required to save photos and apply looks.
4. **screen 4: soft paywall**: highlights pro features (full catalog, interval series bursts, pro soft light, 30 best shots credits) with 7-day free trial toggle, prominent `"continue as guest"` / `"maybe later"` dismiss button.

### 7.2 success metrics & targets

| metric | target (30-day post-launch) | measurement definition |
| :--- | :--- | :--- |
| **guest to capture rate** | ≥ 70% | percentage of installs who take at least 1 photo within their first session. |
| **onboarding conversion** | ≥ 4.5% | percentage of users who start a 7-day trial or subscribe during onboarding. |
| **best shots adoption** | ≥ 25% | percentage of active shooters who curate at least 1 batch of best shots. |
| **credit pack repeat purchase** | ≥ 30% | percentage of credit buyers who purchase a second credit pack within 60 days. |
| **app store crash-free rate** | ≥ 99.5% | crash-free sessions across both ios and android devices. |

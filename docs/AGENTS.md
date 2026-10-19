# kandid — ai agents operational manual

> this document is the authoritative operational guide for all ai coding agents working on the **kandid** monorepo (`@kandid/*`, bundle id: `com.kandid.app`).

---

## 1. product context & mission

**kandid** is a cross-platform mobile application (ios 16+ & android 8+ / api 26+ built with expo react native) and next.js marketing/download website.
- **tagline**: `"effortless angles for every shot."`
- **core value proposition**: personal photo-pose and visual photo-coaching that eliminates camera anxiety through real-time text-based cues, parametric skia mannequin guides, framing guidelines, and serverless best-shots curation.
- **design theme**: `"warm editorial glass"` derived directly from the connected stitch mcp project (`931723337622910157`).
- **monorepo layout**:
  - `apps/mobile`: expo sdk 51 + expo router (`@kandid/mobile`)
  - `apps/web`: next.js 14 app router marketing site (`@kandid/web`)
  - `packages/ui-tokens`: design tokens generated from stitch mcp (`@kandid/ui-tokens`)
  - `packages/content`: pose schemas, cues, gem looks, and lowercase copy dictionary (`@kandid/content`)

---

## 2. non-negotiable architectural boundaries

1. **no voice coach in v1**:
   - absolutely no text-to-speech (tts), speech recognition (stt), audio recording, audio waveforms, or microphone permissions (`expo-speech` and `expo-speech-recognition` are strictly banned).
   - all guidance is delivered via **on-screen swipeable cue cards** docked in designated safe zones and **parametric skia mannequin overlays**.
2. **camera permissions only**:
   - permissions requested from the user are strictly limited to `camera` and `photo library`.
3. **guest mode by default**:
   - users can explore poses, use the visual camera guide, shoot photos, and edit with looks completely offline without creating an account.
   - an account (apple / google sign-in) is required only for cloud best shots curation, purchasing credits, and subscribing.
4. **in-memory zero-retention best shots**:
   - photo analysis occurs strictly in-memory inside supabase edge functions over tls; zero user photos are ever stored in supabase storage buckets or persisted to server disks.
   - credits are deducted atomically via postgres transactions and automatically refunded if vision processing fails.
5. **stitch mcp single source of truth**:
   - connected stitch mcp project (`931723337622910157`) is the sole source of truth for colors, typography, radii, and spacing.
   - any modification to design tokens requires updating `docs/DESIGN.md` in the exact same git commit.
   - a token drift check is run before any milestone is marked done.
6. **security & secret protection**:
   - `.agents/mcp_config.json` and all local environment files are ignored in `.gitignore`.
   - never hardcode api keys, tokens, or supabase service keys in repository code.

---

## 3. required reading & documentation index

before undertaking any task or writing code, review:
- [docs/PRD.md](file:///e:/Photogenik/docs/PRD.md): product scope, user personas, tier limits (soft light / hands-free), credits unit economics, and age policy.
- [docs/DESIGN.md](file:///e:/Photogenik/docs/DESIGN.md): warm editorial glass tokens, wcag aa contrast matrix, cue card safe zones, and stitch mappings.
- [docs/ARCHITECTURE.md](file:///e:/Photogenik/docs/ARCHITECTURE.md): system structure, dual cues model, parametric skia mannequin, zoom hardware clamp, and privacy labels.
- [docs/RULES.md](file:///e:/Photogenik/docs/RULES.md): coding standards, 150-line rule, lowercase rules with legal exceptions, and android blur fallbacks.
- [docs/DECISIONS.md](file:///e:/Photogenik/docs/DECISIONS.md): architectural decision records (adr-001 through adr-018).
- [docs/TESTING.md](file:///e:/Photogenik/docs/TESTING.md): testing pyramid, android test matrix, automated token drift check, and definition of done.
- [docs/MEMORY.md](file:///e:/Photogenik/docs/MEMORY.md): living project status, milestone roadmap, and completed work.

---

## 4. agent execution protocol

1. **documentation first**: never write application code without explicit user instruction (`"approved, start m1"`).
2. **verify contrast & tokens**: verify that all color pairings meet wcag aa (minimum 4.5:1 ratio for regular text, 12px min text size).
3. **strictly lowercase copy**: all user-facing copy must be lowercase with allowed exceptions for legal text, user-generated names, error codes, and platform trademarks.
4. **safe zone docking**: ensure cue cards are docked in the defined safe zone above the shutter and below the top bar, never occluding the central 70% subject view.

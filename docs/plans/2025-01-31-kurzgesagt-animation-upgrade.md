# Kurzgesagt-Style Animation Upgrade Design

**Date:** 2025-01-31
**Project:** remotion-animation - Kurzgesagt-style microservices explanation
**Goal:** Transform stiff animations into fluid, lively Kurzgesagt-style animations with new features

## Overview

This design outlines a comprehensive upgrade to the Remotion animation project to achieve true Kurzgesagt-style animation quality. The upgrade addresses stiffness through physics-based easing, secondary motion, and expressive characters, while adding audio support, subtitles, particle effects, and camera controls.

## Architecture

### New Directory Structure

```
/src
  /animation-engine          (NEW - core animation system)
    /easing                  (custom easing functions)
    /hooks                   (reusable animation hooks)
    /particles               (particle system)
    /camera                  (camera controls)
    /audio                   (audio & subtitle utilities)
  /components
    /kurzgesagt              (NEW - enhanced character components)
    /characters              (refactored - use kurzgesagt components)
    /ui                      (enhanced)
  /scenes                    (gradually updated with new system)
  /styles
    /easing.ts               (NEW)
    /presets.ts              (NEW - export configs)
```

## Part 1: Easing System & Animation Hooks

### Custom Easing Functions

Kurzgesagt's signature feel comes from custom easing beyond standard linear/easeInOut:

| Function | Description | Use Case |
|----------|-------------|----------|
| `spring(t, stiffness, damping)` | Oscillates and settles naturally | Most movements |
| `elasticOut(t)` | Overshoots with bouncy snap-back | Reveals, entrances |
| `bounceOut(t)` | Hits end and bounces like ball | Impacts, drops |
| `smoothStep(t)` | Gentle ease-in-out, zero velocity at ends | Camera moves |

### Core Animation Hooks

**`useSpring(frame, config)`**
- Physics-based spring animation
- Config: `{ from, to, delay, stiffness, damping, mass }`
- Returns interpolated value with natural oscillation

**`useSquashStretch(frame, scale, config)`**
- Adds squash on impact, stretch on fast motion
- Automatically applies inverse scaling on perpendicular axis
- Config: `{ squashAmount, stretchThreshold }`

**`useWiggle(frame, config)`**
- Continuous subtle oscillation for "alive" idle animations
- Config: `{ amount, frequency, phase }`

**`usePulse(frame, config)`**
- Breathing/glowing animation
- Config: `{ min, max, speed }`

**`useShake(frame, config)`**
- Violent shaking for impacts/chaos
- Config: `{ intensity, duration, startFrame }`

### Composition Pattern

```tsx
// Example: Expressive animation composition
const scale = useSpring(frame, { from: 0, to: 1, delay: 10, stiffness: 0.1 });
const squash = useSquashStretch(frame, scale);
const wiggle = useWiggle(frame, { amount: 0.05 * scale, frequency: 0.3 });
```

## Part 2: Enhanced Character Components

### Kurzgesagt Visual Style

- **Flat Design with Thick Outlines**: 3-4px strokes, rounded caps/joins
- **Rounded Corners**: Generous border-radius everywhere
- **Color Treatment**: Slight gradient overlays, inner shadows for depth
- **Expressive Features**: Eyes that blink, mouths that react, eyebrows that emote
- **Proportional Design**: Cute, slightly exaggerated proportions

### New Components

**`KurzgesagtStickFigure`** (replaces StickFigure)
- Bouncy walk cycle with heel-strike and toe-off
- Squash on landing, stretch on takeoff
- Animated arms with opposite phase to legs
- Blinking eyes (random interval)
- Optional hair/clothing with secondary motion

**`KurzgesagtCube`** (replaces Cube)
- Rounded corners with thick outline
- Face that blinks and looks around
- Breathing animation (subtle scale pulse)
- Squash/stretch when moving or impacted
- Shadow underneath that scales with height

**`KurzgesagtEnvelope`** (replaces Envelope)
- Flap that opens/closes with spring animation
- Wobble during flight (like paper in wind)
- Seal/stamp that animates on impact

**`KurzgesagtGateway`** (replaces Gateway)
- Glowing shield with pulse animation
- Columns with subtle gradient
- Particle effects when processing requests

## Part 3: Particle Effects System

### Particle Architecture

- Low counts (< 100): SVG for crisp rendering
- High counts (≥ 100): Canvas for performance

### Particle Types

| Component | Description | Use Case |
|-----------|-------------|----------|
| `DustParticles` | Slow drifting specks with varying opacity | Background atmosphere |
| `SparkParticles` | Fast radial explosion with decay | Electrical, ideas, magic |
| `StarField` | Parallax layers with twinkle | Intro/outro, space |
| `SmokeParticles` | Expanding circles, upward drift | Crashes, failures |
| `DataParticles` | Glowing dots following paths | Network activity |

### API Example

```tsx
<SparkParticles
  count={20}
  origin={{ x: 960, y: 540 }}
  burstFrame={frame}
  color={colors.accent}
/>
```

## Part 4: Camera Controls

Composable camera layer that wraps scene content with spring-based transforms.

| Component | Description | Use Case |
|-----------|-------------|----------|
| `CameraShake` | Violent screen shake with decay | Crashes, impacts |
| `CameraZoom` | Smooth zoom to target | Focus, reveals |
| `CameraPan` | Smooth movement with lag | Following characters |
| `CameraRotate` | Subtle tilt (±5°) | Tension, danger |

## Part 5: Audio & Subtitle System

### Audio Components

**`AudioWaveform`**
- Visualizes audio track for timing reference
- Preview/studio mode only

**`SubtitleTrack`**
- Array of `{ startFrame, endFrame, text }`
- Typewriter or fade-in effect
- Kurzgesagt-style rounded pill shape at bottom

### Audio Hooks

**`useAudioBeat(frame, bpm)`**
- Returns beat progress (0-1)

**`useAudioMarker(frame, markers)`**
- Returns active marker for frame-perfect events

## Part 6: Export Presets

### New Render Scripts

```json
"scripts": {
  "render:youtube-4k": "remotion render MainVideo output-4k.mp4 --frames 0-9000 --width=3840 --height=2160 --pixel-format=yuv420p",
  "render:youtube-1080p": "remotion render MainVideo output-1080p.mp4 --frames 0-9000 --width=1920 --height=1080 --pixel-format=yuv420p",
  "render:scene": "remotion render MainVideo output-scene.mp4 --frames=$FROM-$TO",
  "render:preview": "remotion render MainVideo output-preview.mp4 --frames=0-900 --jpeg-quality=80"
}
```

### Workflow Features

1. **Scene Isolation Mode** - Render single scenes for quick preview
2. **Quality Settings** - Preview (JPEG, fast) vs. Final (PNG, max quality)
3. **Progressive Render** - Render in chunks, auto-resume if interrupted

## Implementation Phases

1. **Phase 1: Foundation** - Easing functions, core hooks, directory structure
2. **Phase 2: Characters** - Enhanced Kurzgesagt-style components
3. **Phase 3: Particles** - Particle system implementation
4. **Phase 4: Camera** - Camera control system
5. **Phase 5: Audio** - Waveform, subtitles, sync utilities
6. **Phase 6: Export** - Render presets and workflow improvements
7. **Phase 7: Scene Updates** - Apply new system to existing scenes

## Success Criteria

- Animations feel fluid and alive (no linear movements)
- Characters have personality and expression
- Particle effects add depth and polish
- Camera movements feel cinematic
- Audio/subtitle system enables voiceover sync
- Export workflow supports YouTube delivery

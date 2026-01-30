# Kurzgesagt Animation Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform stiff Remotion animations into fluid, lively Kurzgesagt-style animations with physics-based easing, enhanced characters, particles, camera controls, and audio support.

**Architecture:** Create a new `/src/animation-engine` module with reusable easing functions and animation hooks. Enhance character components with squash/stretch, secondary motion, and expressive faces. Add particle system, camera controls, and audio utilities. Apply new system incrementally to existing scenes.

**Tech Stack:** Remotion 4.0, React 18, TypeScript 5.7, SVG/Canvas for rendering

---

## Task 1: Create Animation Engine Directory Structure

**Files:**
- Create: `src/animation-engine/easing/index.ts`
- Create: `src/animation-engine/easing/spring.ts`
- Create: `src/animation-engine/easing/elastic.ts`
- Create: `src/animation-engine/easing/bounce.ts`
- Create: `src/animation-engine/easing/smoothStep.ts`
- Create: `src/animation-engine/hooks/index.ts`
- Create: `src/animation-engine/hooks/useSpring.ts`
- Create: `src/animation-engine/hooks/useSquashStretch.ts`
- Create: `src/animation-engine/hooks/useWiggle.ts`
- Create: `src/animation-engine/hooks/usePulse.ts`
- Create: `src/animation-engine/hooks/useShake.ts`
- Create: `src/animation-engine/particles/index.ts`
- Create: `src/animation-engine/camera/index.ts`
- Create: `src/animation-engine/audio/index.ts`

**Step 1: Create directory structure**

```bash
mkdir -p src/animation-engine/{easing,hooks,particles,camera,audio}
```

**Step 2: Create placeholder index files**

```bash
touch src/animation-engine/easing/index.ts
touch src/animation-engine/hooks/index.ts
touch src/animation-engine/particles/index.ts
touch src/animation-engine/camera/index.ts
touch src/animation-engine/audio/index.ts
```

**Step 3: Commit**

```bash
git add src/animation-engine/
git commit -m "feat: create animation-engine directory structure"
```

---

## Task 2: Implement Spring Easing Function

**Files:**
- Modify: `src/animation-engine/easing/spring.ts`

**Step 1: Write spring easing function**

```typescript
/**
 * Spring easing function based on damped harmonic oscillator
 * @param t Progress (0-1)
 * @param stiffness Higher = more oscillation (0.1-0.5 recommended)
 * @param damping Higher = less oscillation (0.5-0.9 recommended)
 * @returns Eased value (may exceed 1 temporarily)
 */
export function spring(
  t: number,
  stiffness: number = 0.2,
  damping: number = 0.7
): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;

  const beta = Math.sqrt(1 - damping * damping);
  const angularFrequency = stiffness * 20;

  const envelope = Math.exp(-damping * angularFrequency * t);
  const oscillation = Math.cos(beta * angularFrequency * t);

  return 1 - envelope * oscillation;
}

/**
 * Calculate spring value for specific frame range
 * @param frame Current frame
 * @param startFrame When animation starts
 * @param endFrame When animation ends
 * @param stiffness Spring stiffness
 * @param damping Spring damping
 */
export function springForFrame(
  frame: number,
  startFrame: number,
  endFrame: number,
  stiffness: number = 0.2,
  damping: number = 0.7
): number {
  if (frame < startFrame) return 0;
  if (frame >= endFrame) return 1;

  const t = (frame - startFrame) / (endFrame - startFrame);
  return spring(t, stiffness, damping);
}
```

**Step 2: Export from easing index**

```typescript
// src/animation-engine/easing/index.ts
export { spring, springForFrame } from './spring';
```

**Step 3: Commit**

```bash
git add src/animation-engine/easing/
git commit -m "feat: add spring easing function"
```

---

## Task 3: Implement Elastic Out Easing

**Files:**
- Create: `src/animation-engine/easing/elastic.ts`

**Step 1: Write elastic out function**

```typescript
/**
 * Elastic easing - overshoots and snaps back like a rubber band
 * @param t Progress (0-1)
 * @param amplitude How much to overshoot (default 1)
 * @param period Oscillation frequency (default 0.4)
 */
export function elasticOut(
  t: number,
  amplitude: number = 1,
  period: number = 0.4
): number {
  if (t === 0) return 0;
  if (t >= 1) return 1;

  const decay = Math.exp(-amplitude * t);
  const oscillation = Math.cos((2 * Math.PI * t) / period);

  return 1 + decay * oscillation;
}

export function elasticOutForFrame(
  frame: number,
  startFrame: number,
  endFrame: number,
  amplitude: number = 1,
  period: number = 0.4
): number {
  if (frame < startFrame) return 0;
  if (frame >= endFrame) return 1;

  const t = (frame - startFrame) / (endFrame - startFrame);
  return elasticOut(t, amplitude, period);
}
```

**Step 2: Export from easing index**

Add to `src/animation-engine/easing/index.ts`:
```typescript
export { elasticOut, elasticOutForFrame } from './elastic';
```

**Step 3: Commit**

```bash
git add src/animation-engine/easing/
git commit -m "feat: add elastic out easing"
```

---

## Task 4: Implement Bounce Out Easing

**Files:**
- Create: `src/animation-engine/easing/bounce.ts`

**Step 1: Write bounce out function**

```typescript
/**
 * Bounce easing - hits target and bounces like a ball
 * @param t Progress (0-1)
 */
export function bounceOut(t: number): number {
  if (t < 1 / 2.75) {
    return 7.5625 * t * t;
  } else if (t < 2 / 2.75) {
    const t2 = t - 1.5 / 2.75;
    return 7.5625 * t2 * t2 + 0.75;
  } else if (t < 2.5 / 2.75) {
    const t2 = t - 2.25 / 2.75;
    return 7.5625 * t2 * t2 + 0.9375;
  } else {
    const t2 = t - 2.625 / 2.75;
    return 7.5625 * t2 * t2 + 0.984375;
  }
}

export function bounceOutForFrame(
  frame: number,
  startFrame: number,
  endFrame: number
): number {
  if (frame < startFrame) return 0;
  if (frame >= endFrame) return 1;

  const t = (frame - startFrame) / (endFrame - startFrame);
  return bounceOut(t);
}
```

**Step 2: Export from easing index**

Add to `src/animation-engine/easing/index.ts`:
```typescript
export { bounceOut, bounceOutForFrame } from './bounce';
```

**Step 3: Commit**

```bash
git add src/animation-engine/easing/
git commit -m "feat: add bounce out easing"
```

---

## Task 5: Implement Smooth Step Easing

**Files:**
- Create: `src/animation-engine/easing/smoothStep.ts`

**Step 1: Write smooth step function**

```typescript
/**
 * Smooth step easing - gentle ease-in-out with zero velocity at endpoints
 * Creates Hermite interpolation between 0 and 1
 * @param t Progress (0-1)
 * @param steepness Curve steepness (default 0.5, lower = smoother)
 */
export function smoothStep(t: number, steepness: number = 0.5): number {
  const t2 = Math.max(0, Math.min(1, (t - 0.5) / steepness + 0.5));
  return t2 * t2 * (3 - 2 * t2);
}

export function smoothStepForFrame(
  frame: number,
  startFrame: number,
  endFrame: number,
  steepness: number = 0.5
): number {
  if (frame < startFrame) return 0;
  if (frame >= endFrame) return 1;

  const t = (frame - startFrame) / (endFrame - startFrame);
  return smoothStep(t, steepness);
}
```

**Step 2: Export from easing index**

Add to `src/animation-engine/easing/index.ts`:
```typescript
export { smoothStep, smoothStepForFrame } from './smoothStep';
```

**Step 3: Commit**

```bash
git add src/animation-engine/easing/
git commit -m "feat: add smooth step easing"
```

---

## Task 6: Implement useSpring Hook

**Files:**
- Create: `src/animation-engine/hooks/useSpring.ts`

**Step 1: Write useSpring hook**

```typescript
import { useCurrentFrame, useVideoConfig } from "remotion";
import { springForFrame } from "../easing";

interface SpringConfig {
  from: number;
  to: number;
  startFrame?: number;
  duration?: number;
  stiffness?: number;
  damping?: number;
  delay?: number;
}

/**
 * Spring-based animation hook
 * Returns interpolated value with natural oscillation
 */
export function useSpring(config: SpringConfig): number {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const {
    from,
    to,
    startFrame = 0,
    duration = 30,
    stiffness = 0.2,
    damping = 0.7,
    delay = 0,
  } = config;

  const actualStart = startFrame + delay * fps;
  const endFrame = actualStart + duration;

  const springValue = springForFrame(frame, actualStart, endFrame, stiffness, damping);
  return from + (to - from) * springValue;
}
```

**Step 2: Export from hooks index**

```typescript
// src/animation-engine/hooks/index.ts
export { useSpring } from './useSpring';
```

**Step 3: Commit**

```bash
git add src/animation-engine/hooks/
git commit -m "feat: add useSpring hook"
```

---

## Task 7: Implement useSquashStretch Hook

**Files:**
- Create: `src/animation-engine/hooks/useSquashStretch.ts`

**Step 1: Write useSquashStretch hook**

```typescript
import { useCurrentFrame } from "remotion";

interface SquashStretchConfig {
  scale: number;
  velocity?: number;
  squashAmount?: number;
  stretchThreshold?: number;
}

/**
 * Adds squash/stretch effect based on scale change and velocity
 * Returns { scaleX, scaleY } for applying to SVG transforms
 *
 * When moving fast: stretch in direction of motion, squash perpendicular
 * When hitting ground: squash vertically, stretch horizontally
 */
export function useSquashStretch(config: SquashStretchConfig): {
  scaleX: number;
  scaleY: number;
} {
  const frame = useCurrentFrame();

  const {
    scale,
    velocity = 0,
    squashAmount = 0.3,
    stretchThreshold = 0.02,
  } = config;

  // Calculate stretch based on velocity
  const stretch = Math.abs(velocity) * 5;

  // Apply stretch when velocity is high
  const scaleX = scale * (1 + stretch * squashAmount);
  const scaleY = scale / (1 + stretch * squashAmount);

  // Apply squash when scale is near 1 (landing) and velocity is low
  const isLanding = Math.abs(scale - 1) < 0.1 && Math.abs(velocity) < stretchThreshold;

  if (isLanding) {
    const squashAmount = 1 - Math.abs(scale - 1);
    return {
      scaleX: scale * (1 + squashAmount * 0.2),
      scaleY: scale * (1 - squashAmount * 0.2),
    };
  }

  return { scaleX, scaleY };
}
```

**Step 2: Export from hooks index**

Add to `src/animation-engine/hooks/index.ts`:
```typescript
export { useSquashStretch } from './useSquashStretch';
```

**Step 3: Commit**

```bash
git add src/animation-engine/hooks/
git commit -m "feat: add useSquashStretch hook"
```

---

## Task 8: Implement useWiggle Hook

**Files:**
- Create: `src/animation-engine/hooks/useWiggle.ts`

**Step 1: Write useWiggle hook**

```typescript
import { useCurrentFrame } from "remotion";

interface WiggleConfig {
  amount?: number;
  frequency?: number;
  phase?: number;
}

/**
 * Continuous oscillation for "alive" idle animations
 * Returns value that oscillates around 0
 */
export function useWiggle(config: WiggleConfig = {}): number {
  const frame = useCurrentFrame();

  const {
    amount = 5,
    frequency = 0.1,
    phase = 0,
  } = config;

  const t = frame * frequency + phase;
  return Math.sin(t * Math.PI * 2) * amount;
}

/**
 * 2D wiggle for x/y offsets
 */
export function useWiggle2D(config: WiggleConfig & { offsetPhase?: number } = {}): {
  x: number;
  y: number;
} {
  const {
    amount = 5,
    frequency = 0.1,
    phase = 0,
    offsetPhase = Math.PI / 4, // 90 degrees offset for circular motion
  } = config;

  const x = Math.sin((phase) * Math.PI * 2) * amount;
  const y = Math.sin((phase + offsetPhase) * Math.PI * 2) * amount;

  return { x, y };
}
```

**Step 2: Export from hooks index**

Add to `src/animation-engine/hooks/index.ts`:
```typescript
export { useWiggle, useWiggle2D } from './useWiggle';
```

**Step 3: Commit**

```bash
git add src/animation-engine/hooks/
git commit -m "feat: add useWiggle hooks"
```

---

## Task 9: Implement usePulse Hook

**Files:**
- Create: `src/animation-engine/hooks/usePulse.ts`

**Step 1: Write usePulse hook**

```typescript
import { useCurrentFrame } from "remotion";

interface PulseConfig {
  min?: number;
  max?: number;
  speed?: number;
  phase?: number;
}

/**
 * Breathing/pulsing animation
 * Oscillates between min and max values
 */
export function usePulse(config: PulseConfig = {}): number {
  const frame = useCurrentFrame();

  const {
    min = 0.9,
    max = 1.1,
    speed = 0.05,
    phase = 0,
  } = config;

  // Sine wave oscillating between -1 and 1
  const sine = Math.sin((frame * speed + phase) * Math.PI * 2);

  // Map to min-max range
  const range = (max - min) / 2;
  const center = (max + min) / 2;

  return center + sine * range;
}
```

**Step 2: Export from hooks index**

Add to `src/animation-engine/hooks/index.ts`:
```typescript
export { usePulse } from './usePulse';
```

**Step 3: Commit**

```bash
git add src/animation-engine/hooks/
git commit -m "feat: add usePulse hook"
```

---

## Task 10: Implement useShake Hook

**Files:**
- Create: `src/animation-engine/hooks/useShake.ts`

**Step 1: Write useShake hook**

```typescript
import { useCurrentFrame } from "remotion";

interface ShakeConfig {
  intensity?: number;
  duration?: number;
  startFrame?: number;
  decay?: boolean;
}

/**
 * Violent shaking for impacts/chaos
 * Returns { x, y, rotation } offset values
 */
export function useShake(config: ShakeConfig = {}): {
  x: number;
  y: number;
  rotation: number;
} {
  const frame = useCurrentFrame();

  const {
    intensity = 10,
    duration = 30,
    startFrame = 0,
    decay = true,
  } = config;

  const progress = frame - startFrame;

  if (progress < 0 || progress >= duration) {
    return { x: 0, y: 0, rotation: 0 };
  }

  // Calculate decay multiplier
  const decayMultiplier = decay
    ? 1 - progress / duration
    : 1;

  // Random but smoothed shake
  const x = (Math.sin(progress * 1.5) * 0.5 + Math.sin(progress * 3.7) * 0.3 + Math.sin(progress * 7.1) * 0.2) * intensity * decayMultiplier;
  const y = (Math.cos(progress * 1.3) * 0.5 + Math.cos(progress * 4.3) * 0.3 + Math.cos(progress * 6.9) * 0.2) * intensity * decayMultiplier;
  const rotation = (Math.sin(progress * 2.1) * 0.3 + Math.sin(progress * 5.3) * 0.2) * 5 * decayMultiplier;

  return { x, y, rotation };
}
```

**Step 2: Export from hooks index**

Add to `src/animation-engine/hooks/index.ts`:
```typescript
export { useShake } from './useShake';
```

**Step 3: Commit**

```bash
git add src/animation-engine/hooks/
git commit -m "feat: add useShake hook"
```

---

## Task 11: Create Main Animation Engine Export

**Files:**
- Create: `src/animation-engine/index.ts`

**Step 1: Create main export file**

```typescript
// Easing
export * from './easing';

// Hooks
export * from './hooks';

// Particles
export * from './particles';

// Camera
export * from './camera';

// Audio
export * from './audio';
```

**Step 2: Commit**

```bash
git add src/animation-engine/index.ts
git commit -m "feat: add animation-engine main export"
```

---

## Task 12: Implement DustParticles Component

**Files:**
- Create: `src/animation-engine/particles/DustParticles.tsx`

**Step 1: Write DustParticles component**

```typescript
import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

interface DustParticlesProps {
  count?: number;
  size?: { min: number; max: number };
  opacity?: { min: number; max: number };
  speed?: number;
}

/**
 * Ambient floating dust particles
 * Adds depth and atmosphere to empty backgrounds
 */
export const DustParticles: React.FC<DustParticlesProps> = ({
  count = 30,
  size = { min: 1, max: 3 },
  opacity = { min: 0.1, max: 0.4 },
  speed = 0.3,
}) => {
  const frame = useCurrentFrame();

  // Generate static particle positions
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      size: size.min + Math.random() * (size.max - size.min),
      baseOpacity: opacity.min + Math.random() * (opacity.max - opacity.min),
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.5,
      driftY: (Math.random() - 0.5) * 0.5,
    }));
  }, [count, size, opacity]);

  return (
    <g>
      {particles.map((p) => {
        const t = frame * speed + p.phase;
        const currentOpacity = p.baseOpacity * (0.7 + 0.3 * Math.sin(t));
        const currentX = p.x + Math.sin(t * 0.5) * 10 * p.driftX;
        const currentY = p.y + Math.cos(t * 0.3) * 10 * p.driftY;

        return (
          <circle
            key={p.id}
            cx={currentX}
            cy={currentY}
            r={p.size}
            fill="white"
            opacity={currentOpacity}
          />
        );
      })}
    </g>
  );
};
```

**Step 2: Export from particles index**

```typescript
// src/animation-engine/particles/index.ts
export { DustParticles } from './DustParticles';
```

**Step 3: Commit**

```bash
git add src/animation-engine/particles/
git commit -m "feat: add DustParticles component"
```

---

## Task 13: Implement SparkParticles Component

**Files:**
- Create: `src/animation-engine/particles/SparkParticles.tsx`

**Step 1: Write SparkParticles component**

```typescript
import React, { useMemo } from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface SparkParticlesProps {
  count?: number;
  origin: { x: number; y: number };
  burstFrame: number;
  color?: string;
  speed?: number;
  lifetime?: number; // frames
}

/**
 * Energetic spark burst from a point
 * Use for: electrical effects, ideas appearing, magic moments
 */
export const SparkParticles: React.FC<SparkParticlesProps> = ({
  count = 15,
  origin,
  burstFrame,
  color = "#F6E05E",
  speed = 1,
  lifetime = 40,
}) => {
  const frame = useCurrentFrame();

  // Generate static particle data
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
      const distance = 50 + Math.random() * 100;
      const size = 2 + Math.random() * 4;

      return {
        id: i,
        angle,
        distance,
        size,
        phase: Math.random() * Math.PI * 2,
      };
    });
  }, [count]);

  const progress = (frame - burstFrame) / lifetime;

  if (progress < 0 || progress > 1) return null;

  const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [1, 1, 0.3, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <g>
      {particles.map((p) => {
        const currentDistance = p.distance * interpolate(progress, [0, 1], [0, 1], {
          easing: (t) => 1 - Math.pow(1 - t, 2), // Ease out quad
        });

        const x = origin.x + Math.cos(p.angle) * currentDistance;
        const y = origin.y + Math.sin(p.angle) * currentDistance;
        const currentSize = p.size * interpolate(progress, [0, 1], [1, 0.3]);

        return (
          <circle
            key={p.id}
            cx={x}
            cy={y}
            r={currentSize}
            fill={color}
            opacity={opacity}
          />
        );
      })}
    </g>
  );
};
```

**Step 2: Export from particles index**

Add to `src/animation-engine/particles/index.ts`:
```typescript
export { SparkParticles } from './SparkParticles';
```

**Step 3: Commit**

```bash
git add src/animation-engine/particles/
git commit -m "feat: add SparkParticles component"
```

---

## Task 14: Implement StarField Component

**Files:**
- Create: `src/animation-engine/particles/StarField.tsx`

**Step 1: Write StarField component**

```typescript
import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

interface StarFieldProps {
  count?: number;
  layers?: number;
  parallaxIntensity?: number;
}

/**
 * Parallax star field for space backgrounds
 * Multiple depth layers create 3D effect during camera movement
 */
export const StarField: React.FC<StarFieldProps> = ({
  count = 100,
  layers = 3,
  parallaxIntensity = 0.5,
}) => {
  const frame = useCurrentFrame();

  // Generate static star data
  const stars = useMemo(() => {
    const allStars: Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      layer: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }> = [];

    for (let layer = 0; layer < layers; layer++) {
      const layerCount = Math.floor(count / layers);
      for (let i = 0; i < layerCount; i++) {
        allStars.push({
          id: layer * 1000 + i,
          x: Math.random() * 1920,
          y: Math.random() * 1080,
          size: 1 + Math.random() * 2 * (1 - layer / layers), // Closer = bigger
          layer,
          twinkleSpeed: 0.02 + Math.random() * 0.05,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    }
    return allStars;
  }, [count, layers]);

  // Calculate parallax offset based on frame (simulating camera movement)
  const parallaxX = Math.sin(frame * 0.002) * 20 * parallaxIntensity;
  const parallaxY = Math.cos(frame * 0.003) * 10 * parallaxIntensity;

  return (
    <g>
      {stars.map((star) => {
        const layerDepth = 1 - star.layer / layers;
        const x = star.x + parallaxX * layerDepth;
        const y = star.y + parallaxY * layerDepth;
        const twinkle = 0.5 + 0.5 * Math.sin(frame * star.twinkleSpeed + star.twinklePhase);
        const opacity = (0.3 + 0.7 * layerDepth) * twinkle;

        return (
          <circle
            key={star.id}
            cx={x}
            cy={y}
            r={star.size}
            fill="white"
            opacity={opacity}
          />
        );
      })}
    </g>
  );
};
```

**Step 2: Export from particles index**

Add to `src/animation-engine/particles/index.ts`:
```typescript
export { StarField } from './StarField';
```

**Step 3: Commit**

```bash
git add src/animation-engine/particles/
git commit -m "feat: add StarField component"
```

---

## Task 15: Implement SmokeParticles Component

**Files:**
- Create: `src/animation-engine/particles/SmokeParticles.tsx`

**Step 1: Write SmokeParticles component**

```typescript
import React, { useMemo } from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface SmokeParticlesProps {
  count?: number;
  origin: { x: number; y: number };
  startFrame: number;
  color?: string;
  speed?: number;
}

/**
 * Rising smoke clouds
 * Use for: crashes, failures, rubble aftermath
 */
export const SmokeParticles: React.FC<SmokeParticlesProps> = ({
  count = 12,
  origin,
  startFrame,
  color = "#4A5568",
  speed = 1,
}) => {
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      delay: i * 5,
      xOffset: (Math.random() - 0.5) * 60,
      size: 20 + Math.random() * 40,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.02,
    }));
  }, [count]);

  const lifetime = 120; // 4 seconds at 30fps

  return (
    <g opacity={0.6}>
      {particles.map((p) => {
        const particleFrame = frame - startFrame - p.delay;

        if (particleFrame < 0 || particleFrame > lifetime) return null;

        const progress = particleFrame / lifetime;
        const yOffset = -progress * 200;
        const wobble = Math.sin(particleFrame * p.wobbleSpeed + p.wobblePhase) * 20;
        const currentSize = p.size * (1 + progress * 2);
        const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 0.4, 0.2, 0]);

        return (
          <circle
            key={p.id}
            cx={origin.x + p.xOffset + wobble}
            cy={origin.y + yOffset}
            r={currentSize}
            fill={color}
            opacity={opacity}
          />
        );
      })}
    </g>
  );
};
```

**Step 2: Export from particles index**

Add to `src/animation-engine/particles/index.ts`:
```typescript
export { SmokeParticles } from './SmokeParticles';
```

**Step 3: Commit**

```bash
git add src/animation-engine/particles/
git commit -m "feat: add SmokeParticles component"
```

---

## Task 16: Implement DataParticles Component

**Files:**
- Create: `src/animation-engine/particles/DataParticles.tsx`

**Step 1: Write DataParticles component**

```typescript
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface DataPoint {
  x: number;
  y: number;
  progress: number; // 0-1 along path
}

interface DataParticlesProps {
  path: DataPoint[];
  count?: number;
  startFrame: number;
  duration?: number;
  color?: string;
  size?: number;
  spacing?: number;
}

/**
 * Glowing data packets traveling along a path
 * Use for: network activity, request/response visualization
 */
export const DataParticles: React.FC<DataParticlesProps> = ({
  path,
  count = 5,
  startFrame,
  duration = 60,
  color = "#63B3ED",
  size = 6,
  spacing = 15,
}) => {
  const frame = useCurrentFrame();

  // Get position at progress point along path
  const getPositionAtProgress = (progress: number): { x: number; y: number } => {
    if (path.length === 0) return { x: 0, y: 0 };
    if (path.length === 1) return path[0];

    const totalSegments = path.length - 1;
    const exactPosition = progress * totalSegments;
    const segmentIndex = Math.floor(exactPosition);
    const segmentProgress = exactPosition - segmentIndex;

    const p1 = path[Math.min(segmentIndex, path.length - 1)];
    const p2 = path[Math.min(segmentIndex + 1, path.length - 1)];

    return {
      x: p1.x + (p2.x - p1.x) * segmentProgress,
      y: p1.y + (p2.y - p1.y) * segmentProgress,
    };
  };

  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const particleStartFrame = startFrame + i * spacing;
        const particleFrame = frame - particleStartFrame;

        if (particleFrame < 0 || particleFrame > duration) return null;

        const progress = particleFrame / duration;
        const pos = getPositionAtProgress(progress);
        const opacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

        // Glow effect
        return (
          <g key={i}>
            <circle cx={pos.x} cy={pos.y} r={size * 2} fill={color} opacity={opacity * 0.3} />
            <circle cx={pos.x} cy={pos.y} r={size} fill={color} opacity={opacity} />
          </g>
        );
      })}
    </g>
  );
};
```

**Step 2: Export from particles index**

Add to `src/animation-engine/particles/index.ts`:
```typescript
export { DataParticles } from './DataParticles';
```

**Step 3: Commit**

```bash
git add src/animation-engine/particles/
git commit -m "feat: add DataParticles component"
```

---

## Task 17: Implement CameraShake Component

**Files:**
- Create: `src/animation-engine/camera/CameraShake.tsx`

**Step 1: Write CameraShake component**

```typescript
import React from "react";
import { AbsoluteFill } from "remotion";
import { useShake } from "../hooks";

interface CameraShakeProps {
  children: React.ReactNode;
  startFrame: number;
  duration?: number;
  intensity?: number;
  decay?: boolean;
}

/**
 * Wraps content with camera shake effect
 * Screen shakes violently then settles (if decay enabled)
 */
export const CameraShake: React.FC<CameraShakeProps> = ({
  children,
  startFrame,
  duration = 30,
  intensity = 15,
  decay = true,
}) => {
  const { x, y, rotation } = useShake({ intensity, duration, startFrame, decay });

  // No shake if before/after duration
  if (x === 0 && y === 0 && rotation === 0) {
    return <>{children}</>;
  }

  return (
    <AbsoluteFill
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        transformOrigin: "center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
```

**Step 2: Export from camera index**

```typescript
// src/animation-engine/camera/index.ts
export { CameraShake } from './CameraShake';
```

**Step 3: Commit**

```bash
git add src/animation-engine/camera/
git commit -m "feat: add CameraShake component"
```

---

## Task 18: Implement CameraZoom Component

**Files:**
- Create: `src/animation-engine/camera/CameraZoom.tsx`

**Step 1: Write CameraZoom component**

```typescript
import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

interface CameraZoomProps {
  children: React.ReactNode;
  from?: number;
  to?: number;
  startFrame?: number;
  duration?: number;
  targetX?: number;
  targetY?: number;
}

/**
 * Smooth zoom with optional pan to target point
 * Uses spring-based easing for organic feel
 */
export const CameraZoom: React.FC<CameraZoomProps> = ({
  children,
  from = 1,
  to = 1.5,
  startFrame = 0,
  duration = 60,
  targetX = 960,
  targetY = 540,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Spring-like easing
  const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease out

  const scale = from + (to - from) * eased;

  // Calculate translation to keep target centered
  const centerX = 960;
  const centerY = 540;
  const translateX = (centerX - targetX) * (scale - 1);
  const translateY = (centerY - targetY) * (scale - 1);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`,
        transformOrigin: "center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
```

**Step 2: Export from camera index**

Add to `src/animation-engine/camera/index.ts`:
```typescript
export { CameraZoom } from './CameraZoom';
```

**Step 3: Commit**

```bash
git add src/animation-engine/camera/
git commit -m "feat: add CameraZoom component"
```

---

## Task 19: Implement SubtitleTrack Component

**Files:**
- Create: `src/animation-engine/audio/SubtitleTrack.tsx`

**Step 1: Write SubtitleTrack component**

```typescript
import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

interface Subtitle {
  startFrame: number;
  endFrame: number;
  text: string;
}

interface SubtitleTrackProps {
  subtitles: Subtitle[];
  style?: "typewriter" | "fade";
  backgroundColor?: string;
  textColor?: string;
}

/**
 * Animated subtitle track
 * Kurzgesagt-style rounded pill shape at bottom
 */
export const SubtitleTrack: React.FC<SubtitleTrackProps> = ({
  subtitles,
  style = "typewriter",
  backgroundColor = "rgba(10, 14, 39, 0.9)",
  textColor = "#FFFFFF",
}) => {
  const frame = useCurrentFrame();

  // Find active subtitle
  const active = subtitles.find(
    (s) => frame >= s.startFrame && frame < s.endFrame
  );

  if (!active) return null;

  const progress = (frame - active.startFrame) / (active.endFrame - active.startFrame);

  let displayText = active.text;

  if (style === "typewriter") {
    const charCount = Math.floor(active.text.length * interpolate(progress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }));
    displayText = active.text.slice(0, charCount);
  }

  const opacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor,
          color: textColor,
          padding: "16px 32px",
          borderRadius: 24,
          fontSize: 32,
          fontWeight: 600,
          opacity,
          maxWidth: 1400,
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {displayText}
        {style === "typewriter" && progress < 0.3 && (
          <span style={{ animation: "blink 1s infinite" }}>|</span>
        )}
      </div>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </AbsoluteFill>
  );
};
```

**Step 2: Export from audio index**

```typescript
// src/animation-engine/audio/index.ts
export { SubtitleTrack } from './SubtitleTrack';
```

**Step 3: Commit**

```bash
git add src/animation-engine/audio/
git commit -m "feat: add SubtitleTrack component"
```

---

## Task 20: Create Enhanced Color Palette

**Files:**
- Modify: `src/styles/colors.ts`

**Step 1: Update colors with Kurzgesagt-inspired palette**

```typescript
// Kurzgesagt-inspired color palette
export const colors = {
  // Backgrounds
  background: "#0A0E27", // Deep space
  backgroundLight: "#1A1E3E", // Lighter space variant

  // Monolith
  monolith: "#4A5568", // Grey
  monolithDark: "#2D3748", // Dark grey
  monolithLight: "#718096", // Light grey

  // Service colors - Kurzgesagt vibrant
  users: "#4299E1", // Blue
  usersDark: "#3182CE", // Dark blue
  usersLight: "#63B3ED", // Light blue

  orders: "#48BB78", // Green
  ordersDark: "#38A169", // Dark green
  ordersLight: "#68D391", // Light green

  inventory: "#ED8936", // Orange
  inventoryDark: "#DD6B20", // Dark orange
  inventoryLight: "#F6AD55", // Light orange

  products: "#9F7AEA", // Purple
  productsDark: "#805AD5", // Dark purple
  productsLight: "#B794F4", // Light purple

  payments: "#38B2AC", // Teal
  paymentsDark: "#319795", // Dark teal
  paymentsLight: "#4FD1C5", // Light teal

  // Accents
  accent: "#F6E05E", // Yellow
  accentDark: "#D69E2E", // Dark yellow

  danger: "#F56565", // Red
  dangerDark: "#E53E3E", // Dark red

  success: "#48BB78", // Green

  // Network
  network: "#63B3ED", // Light blue
  networkGlow: "rgba(99, 179, 237, 0.3)", // Glow effect

  // Text
  text: "#FFFFFF",
  textSecondary: "#A0AEC0",
  textTertiary: "#718096",

  // Effects
  shadow: "rgba(0, 0, 0, 0.3)",
  glow: "rgba(255, 255, 255, 0.2)",
  highlight: "rgba(255, 255, 255, 0.15)",
};
```

**Step 2: Commit**

```bash
git add src/styles/colors.ts
git commit -m "feat: enhance color palette with Kurzgesaat-inspired variants"
```

---

## Task 21: Create KurzgesagtStickFigure Component

**Files:**
- Create: `src/components/kurzgesagt/KurzgesagtStickFigure.tsx`

**Step 1: Write enhanced stick figure component**

```typescript
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useWiggle, usePulse } from "../../animation-engine/hooks";
import { colors } from "../../styles/colors";

interface KurzgesagtStickFigureProps {
  x: number;
  y: number;
  scale?: number;
  color?: string;
  walking?: boolean;
  walkSpeed?: number;
  facingRight?: boolean;
  blinking?: boolean;
}

/**
 * Enhanced stick figure with:
 * - Bouncy walk cycle
 * - Squash/stretch on movement
 * - Blinking eyes
 * - Expressive features
 */
export const KurzgesagtStickFigure: React.FC<KurzgesagtStickFigureProps> = ({
  x,
  y,
  scale = 1,
  color = colors.users,
  walking = false,
  walkSpeed = 15,
  facingRight = true,
  blinking = true,
}) => {
  const frame = useCurrentFrame();

  const headBob = useWiggle({ amount: 3 * scale, frequency: 0.15 });
  const breathe = usePulse({ min: 0.98, max: 1.02, speed: 0.03 });

  // Walk cycle calculations
  const walkCycle = (frame % walkSpeed) / walkSpeed;

  // Leg animations (out of phase)
  const leftLegAngle = walking
    ? Math.sin(walkCycle * Math.PI * 2) * 30
    : 0;
  const rightLegAngle = walking
    ? Math.sin((walkCycle + 0.5) * Math.PI * 2) * 30
    : 0;

  // Arm animations (opposite to legs)
  const leftArmAngle = walking
    ? Math.sin((walkCycle + 0.5) * Math.PI * 2) * 25
    : 0;
  const rightArmAngle = walking
    ? Math.sin(walkCycle * Math.PI * 2) * 25
    : 0;

  // Body bounce during walk
  const bodyBounce = walking
    ? Math.abs(Math.sin(walkCycle * Math.PI * 4)) * 5 * scale
    : 0;

  // Blinking
  const blinkState = blinking
    ? Math.sin(frame * 0.05) > 0.95
    : false;

  const s = scale * breathe;
  const dir = facingRight ? 1 : -1;

  return (
    <g transform={`translate(${x}, ${y + headBob}) scale(${dir}, 1)`}>
      {/* Shadow */}
      <ellipse
        cx={0}
        cy={45 * s}
        rx={25 * s}
        ry={8 * s}
        fill="rgba(0,0,0,0.2)"
      />

      {/* Right Leg */}
      <line
        x1={0}
        y1={0}
        x2={Math.sin((rightLegAngle * Math.PI) / 180) * 25 * s}
        y2={30 * s + Math.cos((rightLegAngle * Math.PI) / 180) * 10 * s}
        stroke={color}
        strokeWidth={6 * s}
        strokeLinecap="round"
      />

      {/* Left Leg */}
      <line
        x1={0}
        y1={0}
        x2={Math.sin((leftLegAngle * Math.PI) / 180) * 25 * s}
        y2={30 * s + Math.cos((leftLegAngle * Math.PI) / 180) * 10 * s}
        stroke={color}
        strokeWidth={6 * s}
        strokeLinecap="round"
      />

      {/* Body */}
      <line
        x1={0}
        y1={-30 * s - bodyBounce}
        x2={0}
        y2={0}
        stroke={color}
        strokeWidth={8 * s}
        strokeLinecap="round"
      />

      {/* Right Arm */}
      <line
        x1={0}
        y1={-25 * s}
        x2={Math.sin((rightArmAngle * Math.PI) / 180) * 22 * s}
        y2={-5 * s + Math.cos((rightArmAngle * Math.PI) / 180) * 8 * s}
        stroke={color}
        strokeWidth={5 * s}
        strokeLinecap="round"
      />

      {/* Left Arm */}
      <line
        x1={0}
        y1={-25 * s}
        x2={Math.sin((leftArmAngle * Math.PI) / 180) * 22 * s}
        y2={-5 * s + Math.cos((leftArmAngle * Math.PI) / 180) * 8 * s}
        stroke={color}
        strokeWidth={5 * s}
        strokeLinecap="round"
      />

      {/* Head */}
      <circle
        cx={0}
        cy={-42 * s - bodyBounce}
        r={16 * s}
        fill={color}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={2 * s}
      />

      {/* Eye whites */}
      <circle
        cx={5 * s}
        cy={-44 * s - bodyBounce}
        r={5 * s}
        fill="white"
      />

      {/* Pupil */}
      <circle
        cx={6 * s}
        cy={-44 * s - bodyBounce}
        r={2 * s}
        fill="black"
      />

      {/* Eyelid (when blinking) */}
      {blinkState && (
        <rect
          x={0 * s}
          y={-48 * s - bodyBounce}
          width={10 * s}
          height={8 * s}
          fill={color}
        />
      )}

      {/* Smile */}
      <path
        d={`M ${-3 * s} ${-38 * s - bodyBounce} Q 0 ${-35 * s - bodyBounce} ${3 * s} ${-38 * s - bodyBounce}`}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={2 * s}
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
};
```

**Step 2: Create kurzgesagt components index**

```typescript
// src/components/kurzgesagt/index.ts
export { KurzgesagtStickFigure } from './KurzgesagtStickFigure';
```

**Step 3: Commit**

```bash
git add src/components/kurzgesagt/
git commit -m "feat: add KurzgesagtStickFigure component"
```

---

## Task 22: Create KurzgesagtCube Component

**Files:**
- Create: `src/components/kurzgesagt/KurzgesagtCube.tsx`

**Step 1: Write enhanced cube component**

```typescript
import React from "react";
import { useCurrentFrame } from "remotion";
import { usePulse, useWiggle } from "../../animation-engine/hooks";
import { colors } from "../../styles/colors";

interface KurzgesagtCubeProps {
  x: number;
  y: number;
  size?: number;
  color?: string;
  label?: string;
  glowing?: boolean;
  shaking?: boolean;
  emotion?: "happy" | "worried" | "neutral" | "surprised";
}

/**
 * Enhanced cube with:
 * - Rounded corners with thick outline
 * - Expressive face (blinking, emotions)
 * - Breathing animation
 * - Squash/stretch support
 * - Shadow that scales with height
 */
export const KurzgesagtCube: React.FC<KurzgesagtCubeProps> = ({
  x,
  y,
  size = 80,
  color,
  label = "",
  glowing = false,
  shaking = false,
  emotion = "happy",
}) => {
  const frame = useCurrentFrame();

  const defaultColor = color || colors.orders;
  const breathe = usePulse({ min: 0.98, max: 1.02, speed: 0.02 });
  const wiggle = useWiggle({ amount: 2, frequency: 0.1 });

  // Blink state
  const isBlinking = Math.sin(frame * 0.03) > 0.97;

  // Apply breathing and wiggle
  const actualSize = size * breathe;
  const offsetX = shaking ? wiggle : 0;
  const offsetY = shaking ? wiggle * 0.5 : 0;

  const faceExpressions = {
    happy: { mouth: "smile", brow: 0 },
    worried: { mouth: "frown", brow: -3 },
    neutral: { mouth: "line", brow: 0 },
    surprised: { mouth: "o", brow: 5 },
  };

  const expression = faceExpressions[emotion];

  return (
    <g transform={`translate(${x + offsetX}, ${y + offsetY})`}>
      {/* Shadow */}
      <ellipse
        cx={actualSize / 2}
        cy={actualSize + 10}
        rx={actualSize * 0.5 * breathe}
        ry={actualSize * 0.1 * breathe}
        fill="rgba(0,0,0,0.3)"
      />

      {/* Glow effect */}
      {glowing && (
        <circle
          cx={actualSize / 2}
          cy={actualSize / 2}
          r={actualSize * 0.8}
          fill={defaultColor}
          opacity={0.3 + Math.sin(frame * 0.1) * 0.1}
        />
      )}

      {/* Main cube face */}
      <rect
        x={0}
        y={0}
        width={actualSize}
        height={actualSize}
        rx={12}
        fill={defaultColor}
        stroke="rgba(255,255,255,0.4)"
        strokeWidth={4}
      />

      {/* 3D effect - top side */}
      <path
        d={`M ${actualSize * 0.08} ${actualSize * 0.08} L ${actualSize * 0.2} 0 L ${actualSize * 0.92} 0 L ${actualSize * 0.8} ${actualSize * 0.08} Z`}
        fill={defaultColor}
        opacity={0.8}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={2}
      />

      {/* 3D effect - right side */}
      <path
        d={`M ${actualSize * 0.92} 0 L ${actualSize * 0.8} ${actualSize * 0.08} L ${actualSize * 0.8} ${actualSize} L ${actualSize} ${actualSize * 0.92} L ${actualSize} ${actualSize * 0.08} Z`}
        fill={defaultColor}
        opacity={0.6}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={2}
      />

      {/* Highlight */}
      <rect
        x={actualSize * 0.12}
        y={actualSize * 0.12}
        width={actualSize * 0.25}
        height={actualSize * 0.25}
        rx={6}
        fill="white"
        opacity={0.25}
      />

      {/* Face - Eyes */}
      {!isBlinking ? (
        <>
          <circle
            cx={actualSize * 0.35}
            cy={actualSize * 0.4}
            r={actualSize * 0.08}
            fill="white"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth={1}
          />
          <circle
            cx={actualSize * 0.65}
            cy={actualSize * 0.4}
            r={actualSize * 0.08}
            fill="white"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth={1}
          />
          {/* Pupils */}
          <circle
            cx={actualSize * 0.37}
            cy={actualSize * 0.4}
            r={actualSize * 0.04}
            fill="black"
          />
          <circle
            cx={actualSize * 0.67}
            cy={actualSize * 0.4}
            r={actualSize * 0.04}
            fill="black"
          />
        </>
      ) : (
        <>
          <line
            x1={actualSize * 0.3}
            y1={actualSize * 0.4}
            x2={actualSize * 0.4}
            y2={actualSize * 0.4}
            stroke="rgba(0,0,0,0.5)"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <line
            x1={actualSize * 0.6}
            y1={actualSize * 0.4}
            x2={actualSize * 0.7}
            y2={actualSize * 0.4}
            stroke="rgba(0,0,0,0.5)}"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </>
      )}

      {/* Eyebrows */}
      <line
        x1={actualSize * 0.3}
        y1={actualSize * 0.32 + expression.brow}
        x2={actualSize * 0.4}
        y2={actualSize * 0.3 + expression.brow}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <line
        x1={actualSize * 0.6}
        y1={actualSize * 0.3 + expression.brow}
        x2={actualSize * 0.7}
        y2={actualSize * 0.32 + expression.brow}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Mouth */}
      {expression.mouth === "smile" && (
        <path
          d={`M ${actualSize * 0.35} ${actualSize * 0.55} Q ${actualSize * 0.5} ${actualSize * 0.62} ${actualSize * 0.65} ${actualSize * 0.55}`}
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
        />
      )}
      {expression.mouth === "frown" && (
        <path
          d={`M ${actualSize * 0.35} ${actualSize * 0.58} Q ${actualSize * 0.5} ${actualSize * 0.52} ${actualSize * 0.65} ${actualSize * 0.58}`}
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
        />
      )}
      {expression.mouth === "line" && (
        <line
          x1={actualSize * 0.4}
          y1={actualSize * 0.58}
          x2={actualSize * 0.6}
          y2={actualSize * 0.58}
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={2}
          strokeLinecap="round"
        />
      )}
      {expression.mouth === "o" && (
        <circle
          cx={actualSize * 0.5}
          cy={actualSize * 0.58}
          r={actualSize * 0.06}
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={2}
          fill="none"
        />
      )}

      {/* Label */}
      {label && (
        <text
          x={actualSize / 2}
          y={actualSize * 0.8}
          textAnchor="middle"
          fill="white"
          fontSize={actualSize * 0.15}
          fontWeight="bold"
          opacity={0.9}
        >
          {label}
        </text>
      )}
    </g>
  );
};
```

**Step 2: Export from kurzgesagt index**

Add to `src/components/kurzgesagt/index.ts`:
```typescript
export { KurzgesagtCube } from './KurzgesagtCube';
```

**Step 3: Commit**

```bash
git add src/components/kurzgesagt/
git commit -m "feat: add KurzgesagtCube component"
```

---

## Task 23: Update Scene0 with New Animation System

**Files:**
- Modify: `src/scenes/Scene0_Monolith.tsx`

**Step 1: Rewrite Scene0 with spring easing and particles**

```typescript
import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame } from "../animation-engine/easing";
import { DustParticles, StarField } from "../animation-engine/particles";
import { colors } from "../styles/colors";

export const Scene0_Monolith: React.FC = () => {
  const frame = useCurrentFrame();

  // Spring-based rise (bouncy arrival)
  const riseProgress = springForFrame(frame, 0, 100, 0.3, 0.7);
  const monolithY = 540 + 400 * (1 - riseProgress);

  // Gentle zoom using smooth step
  const zoomScale = interpolate(
    frame,
    [100, 300],
    [1, 1.08],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Title fade with spring
  const titleOpacity = springForFrame(frame, 50, 100, 0.2, 0.8);
  const titleY = interpolate(
    frame,
    [50, 100],
    [200, 150],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Subtle wobble for monolith
  const wobble = frame > 100
    ? Math.sin((frame - 100) * 0.02) * 2
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg
        width={1920}
        height={1080}
        style={{
          transform: `scale(${zoomScale})`,
          transformOrigin: "center",
        }}
      >
        {/* Starfield background */}
        <StarField count={80} layers={3} parallaxIntensity={0.3} />

        {/* Dust particles */}
        <DustParticles count={40} opacity={{ min: 0.1, max: 0.3 }} />

        {/* Monolith */}
        <g transform={`translate(${960 + wobble}, ${monolithY})`}>
          {/* Shadow that grows as monolith rises */}
          <ellipse
            cx={0}
            cy={400}
            rx={180}
            ry={30 * riseProgress}
            fill="rgba(0,0,0,0.4)"
          />

          {/* Main structure */}
          <rect
            x={-150}
            y={-400}
            width={300}
            height={400}
            fill={colors.monolith}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={3}
            rx={4}
          />

          {/* Towers */}
          <rect x={-120} y={-480} width={40} height={80} fill={colors.monolithDark} rx={4} />
          <rect x={80} y={-480} width={40} height={80} fill={colors.monolithDark} rx={4} />
          <rect x={-30} y={-520} width={60} height={120} fill={colors.monolith} rx={4} />

          {/* Windows */}
          <rect x={-100} y={-360} width={30} height={50} fill={colors.background} opacity={0.9} rx={4} />
          <rect x={70} y={-360} width={30} height={50} fill={colors.background} opacity={0.9} rx={4} />
          <rect x={-15} y={-320} width={30} height={40} fill={colors.background} opacity={0.9} rx={4} />

          {/* Door */}
          <rect x={-40} y={-80} width={80} height={80} fill={colors.monolithDark} rx={4} />

          {/* Accent light */}
          <circle cx={20} cy={-40} r={5} fill={colors.accent}>
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Decorative lines */}
          <line x1={-150} y1={-400} x2={150} y2={-400} stroke="rgba(255,255,255,0.2)" strokeWidth={3} />
          <line x1={-150} y1={-200} x2={150} y2={-200} stroke="rgba(255,255,255,0.2)" strokeWidth={3} />
        </g>

        {/* Title */}
        <text
          x={960}
          y={titleY}
          textAnchor="middle"
          fill={colors.text}
          fontSize={56}
          fontWeight="bold"
          opacity={titleOpacity}
          style={{ textShadow: "0 0 20px rgba(66, 153, 225, 0.5)" }}
        >
          The Monolith
        </text>
      </svg>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**

```bash
git add src/scenes/Scene0_Monolith.tsx
git commit -m "feat: update Scene0 with spring easing and particles"
```

---

## Task 24: Update Scene1 with Enhanced StickFigure

**Files:**
- Modify: `src/scenes/Scene1_UsersArrive.tsx`

**Step 1: Rewrite Scene1 using KurzgesagtStickFigure**

```typescript
import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { elasticOutForFrame, springForFrame } from "../animation-engine/easing";
import { KurzgesagtStickFigure } from "../components/kurzgesagt";
import { colors } from "../styles/colors";

export const Scene1_UsersArrive: React.FC = () => {
  const frame = useCurrentFrame();

  // Users arrive with spring easing (bouncy)
  const user1X = springForFrame(frame, 0, 150, 0.25, 0.75) * 800 - 100;
  const user2X = springForFrame(frame, 30, 180, 0.25, 0.75) * 800 - 100;
  const user3X = springForFrame(frame, 60, 210, 0.25, 0.75) * 800 - 100;

  // Door opens with elastic easing (dramatic)
  const doorOpen = elasticOutForFrame(frame, 200, 250, 0.8, 0.3);

  // Title fade
  const titleOpacity = springForFrame(frame, 0, 50, 0.2, 0.8);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {/* Monolith */}
        <g transform="translate(960, 540)">
          <rect
            x={-150}
            y={-400}
            width={300}
            height={400}
            fill={colors.monolith}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={3}
            rx={4}
          />
          <rect x={-120} y={-480} width={40} height={80} fill={colors.monolithDark} rx={4} />
          <rect x={80} y={-480} width={40} height={80} fill={colors.monolithDark} rx={4} />
          <rect x={-30} y={-520} width={60} height={120} fill={colors.monolith} rx={4} />

          {/* Door with elastic opening */}
          <g
            transform={`rotate(${doorOpen * 70})`}
            style={{ transformOrigin: "-40px -80px" }}
          >
            <rect x={-40} y={-80} width={40} height={80} fill={colors.monolith} rx={4} />
          </g>

          {/* Door glow */}
          {doorOpen > 0 && (
            <ellipse
              cx={-20}
              cy={0}
              rx={30 + doorOpen * 50}
              ry={10 + doorOpen * 20}
              fill={colors.accent}
              opacity={doorOpen * 0.4}
            />
          )}
        </g>

        {/* Users with new component */}
        <KurzgesagtStickFigure
          x={user1X}
          y={700}
          scale={1.2}
          color={colors.users}
          walking={user1X < 700}
          walkSpeed={15}
          facingRight={true}
        />

        <KurzgesagtStickFigure
          x={user2X}
          y={720}
          scale={1}
          color={colors.users}
          walking={user2X < 700}
          walkSpeed={15}
          facingRight={true}
        />

        <KurzgesagtStickFigure
          x={user3X}
          y={680}
          scale={0.9}
          color={colors.users}
          walking={user3X < 700}
          walkSpeed={15}
          facingRight={true}
        />

        {/* Title */}
        <text
          x={960}
          y={150}
          textAnchor="middle"
          fill={colors.text}
          fontSize={48}
          fontWeight="bold"
          opacity={titleOpacity}
        >
          Users Arrive
        </text>
      </svg>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**

```bash
git add src/scenes/Scene1_UsersArrive.tsx
git commit -m "feat: update Scene1 with KurzgesagtStickFigure component"
```

---

## Task 25: Add Export Prescripts to package.json

**Files:**
- Modify: `package.json`

**Step 1: Add render scripts**

Add these scripts to the `"scripts"` section in `package.json`:

```json
"render:youtube-4k": "remotion render MainVideo output-4k.mp4 --frames 0-9000 --width=3840 --height=2160 --pixel-format=yuv420p",
"render:youtube-1080p": "remotion render MainVideo output-1080p.mp4 --frames 0-9000 --width=1920 --height=1080 --pixel-format=yuv420p",
"render:scene": "remotion render MainVideo output-scene.mp4 --frames=$FROM-$TO",
"render:preview": "remotion render MainVideo output-preview.mp4 --frames=0-900 --jpeg-quality=80"
```

**Step 2: Commit**

```bash
git add package.json
git commit -m "feat: add YouTube export presets"
```

---

## Task 26: Update Root.tsx to Export Animation Engine

**Files:**
- Modify: `src/Root.tsx`

**Step 1: Add animation-engine to exports**

Check current exports and add if needed.

**Step 2: Commit**

```bash
git add src/Root.tsx
git commit -m "chore: export animation-engine from Root"
```

---

## Summary

This implementation plan creates:

1. **Animation Engine** (`/src/animation-engine`)
   - 5 easing functions (spring, elastic, bounce, smoothStep)
   - 6 animation hooks (useSpring, useSquashStretch, useWiggle, usePulse, useShake, useWiggle2D)
   - 5 particle components (Dust, Sparks, Stars, Smoke, Data)
   - 2 camera components (CameraShake, CameraZoom)
   - 1 subtitle component (SubtitleTrack)

2. **Enhanced Components** (`/src/components/kurzgesagt`)
   - KurzgesagtStickFigure (bouncy walk, blinking, expressive)
   - KurzgesagtCube (expressive face, breathing, 3D effect)

3. **Scene Updates**
   - Scene0 and Scene1 as reference implementations
   - Other scenes can be updated incrementally

4. **Export Presets**
   - YouTube 4K and 1080p renders
   - Scene-by-scene preview renders
   - Fast preview mode

**Total Tasks: 26**
**Estimated Implementation Time: 2-3 hours with TDD approach**

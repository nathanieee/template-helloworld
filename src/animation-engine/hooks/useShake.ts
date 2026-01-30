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

  // Random but smoothed shake using layered sine waves
  const x = (Math.sin(progress * 1.5) * 0.5 + Math.sin(progress * 3.7) * 0.3 + Math.sin(progress * 7.1) * 0.2) * intensity * decayMultiplier;
  const y = (Math.cos(progress * 1.3) * 0.5 + Math.cos(progress * 4.3) * 0.3 + Math.cos(progress * 6.9) * 0.2) * intensity * decayMultiplier;
  const rotation = (Math.sin(progress * 2.1) * 0.3 + Math.sin(progress * 5.3) * 0.2) * 5 * decayMultiplier;

  return { x, y, rotation };
}

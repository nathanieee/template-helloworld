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
    const landingSquashAmount = 1 - Math.abs(scale - 1);
    return {
      scaleX: scale * (1 + landingSquashAmount * 0.2),
      scaleY: scale * (1 - landingSquashAmount * 0.2),
    };
  }

  return { scaleX, scaleY };
}

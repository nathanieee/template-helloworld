import { useCurrentFrame, useVideoConfig, spring } from "remotion";

/**
 * Kurzgesagt-style spring entrance animation
 */
export interface SpringInOptions {
  /** Frame to start the animation */
  delay?: number;
  /** Spring damping (lower = more bounce) */
  damping?: number;
  /** Spring stiffness (higher = snappier) */
  stiffness?: number;
  /** Mass of the object */
  mass?: number;
}

/**
 * Generates spring-based entrance animation values
 * Perfect for elements popping in with that characteristic Kurzgesagt bounce
 */
export const useSpringIn = (options: SpringInOptions = {}): number => {
  const {
    delay = 0,
    damping = 12,
    stiffness = 80,
    mass = 1,
  } = options;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < delay) return 0;

  const springValue = spring({
    frame: frame - delay,
    fps,
    config: {
      damping,
      stiffness,
      mass,
    },
  });

  return springValue;
};

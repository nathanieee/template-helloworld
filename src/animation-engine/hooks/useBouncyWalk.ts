import { useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Kurzgesagt-style bouncy walk cycle
 * Returns values for walk animation at current frame
 */
export interface BouncyWalkOptions {
  /** Frame offset to start the walk cycle */
  delay?: number;
  /** How bouncy the walk is (0-1) */
  bounce?: number;
  /** Speed multiplier */
  speed?: number;
}

export interface BouncyWalkResult {
  /** Vertical bob offset */
  bob: number;
  /** Left leg angle in radians */
  leftLegAngle: number;
  /** Right leg angle in radians */
  rightLegAngle: number;
  /** Left arm angle in radians */
  leftArmAngle: number;
  /** Right arm angle in radians */
  rightArmAngle: number;
  /** Progress through walk cycle (0-1) */
  progress: number;
}

/**
 * Generates bouncy walk cycle values for character animation
 * Uses sine waves for smooth, bouncy Kurzgesagt-style movement
 */
export const useBouncyWalk = (
  options: BouncyWalkOptions = {}
): BouncyWalkResult => {
  const { delay = 0, bounce = 1, speed = 1 } = options;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const effectiveFrame = Math.max(0, frame - delay);
  const cycleLength = 30; // frames per complete step
  const progress = (effectiveFrame * speed / cycleLength) % 1;

  // Bob up and down (twice per step)
  const bob = Math.sin(progress * Math.PI * 4) * 6 * bounce;

  // Leg swings (opposite each other)
  const leftLegAngle = Math.sin(progress * Math.PI * 2) * 0.5;
  const rightLegAngle = Math.sin(progress * Math.PI * 2 + Math.PI) * 0.5;

  // Arm swings (opposite to legs)
  const leftArmAngle = Math.sin(progress * Math.PI * 2 + Math.PI) * 0.4;
  const rightArmAngle = Math.sin(progress * Math.PI * 2) * 0.4;

  return {
    bob,
    leftLegAngle,
    rightLegAngle,
    leftArmAngle,
    rightArmAngle,
    progress,
  };
};

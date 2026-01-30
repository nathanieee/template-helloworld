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

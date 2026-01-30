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

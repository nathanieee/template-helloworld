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

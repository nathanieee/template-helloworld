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

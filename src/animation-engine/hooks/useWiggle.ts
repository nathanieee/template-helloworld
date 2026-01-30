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
  const frame = useCurrentFrame();

  const {
    amount = 5,
    frequency = 0.1,
    phase = 0,
    offsetPhase = Math.PI / 4, // 90 degrees offset for circular motion
  } = config;

  const t = frame * frequency + phase;
  const x = Math.sin(t * Math.PI * 2) * amount;
  const y = Math.sin((t + offsetPhase) * Math.PI * 2) * amount;

  return { x, y };
}

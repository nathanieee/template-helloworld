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

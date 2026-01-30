import { useCurrentFrame, useVideoConfig } from "remotion";
import { springForFrame } from "../easing";

interface SpringConfig {
  from: number;
  to: number;
  startFrame?: number;
  duration?: number;
  stiffness?: number;
  damping?: number;
  delay?: number;
}

/**
 * Spring-based animation hook
 * Returns interpolated value with natural oscillation
 */
export function useSpring(config: SpringConfig): number {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const {
    from,
    to,
    startFrame = 0,
    duration = 30,
    stiffness = 0.2,
    damping = 0.7,
    delay = 0,
  } = config;

  const actualStart = startFrame + delay * fps;
  const endFrame = actualStart + duration;

  const springValue = springForFrame(frame, actualStart, endFrame, stiffness, damping);
  return from + (to - from) * springValue;
}

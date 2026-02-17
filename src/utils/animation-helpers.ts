import {spring, interpolate, SpringConfig} from 'remotion';

export const smoothSpring = (frame: number, fps: number, delay = 0) => {
  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, stiffness: 100, mass: 1 },
  });
};

export const linearTransition = (
  frame: number,
  range: [number, number],
  output: [number, number]
) => {
  return interpolate(frame, range, output, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

export const pulsingOpacity = (frame: number, speed: number = 1) => {
  return 0.7 + Math.sin(frame / 10 * speed) * 0.3;
};

export const floatingOffset = (frame: number, phase: number = 0) => {
  return Math.sin((frame + phase) / 30) * 10;
};

export const scaleIn = (frame: number, fps: number, delay: number = 0) => {
  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, stiffness: 100, mass: 1 },
  });
};

export const fadeIn = (frame: number, fps: number, durationInSeconds: number = 1) => {
  return interpolate(frame, [0, durationInSeconds * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

export const easeOut = (frame: number, startFrame: number, duration: number) => {
  const progress = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  return 1 - Math.pow(1 - progress, 3);
};

import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

interface CameraZoomProps {
  children: React.ReactNode;
  from?: number;
  to?: number;
  startFrame?: number;
  duration?: number;
  targetX?: number;
  targetY?: number;
}

/**
 * Smooth zoom with optional pan to target point
 * Uses spring-based easing for organic feel
 */
export const CameraZoom: React.FC<CameraZoomProps> = ({
  children,
  from = 1,
  to = 1.5,
  startFrame = 0,
  duration = 60,
  targetX = 960,
  targetY = 540,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Spring-like easing (cubic ease out)
  const eased = 1 - Math.pow(1 - progress, 3);

  const scale = from + (to - from) * eased;

  // Calculate translation to keep target centered
  const centerX = 960;
  const centerY = 540;
  const translateX = (centerX - targetX) * (scale - 1);
  const translateY = (centerY - targetY) * (scale - 1);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`,
        transformOrigin: "center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

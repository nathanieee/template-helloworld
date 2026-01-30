import React from "react";
import { AbsoluteFill } from "remotion";
import { useShake } from "../hooks";

interface CameraShakeProps {
  children: React.ReactNode;
  startFrame: number;
  duration?: number;
  intensity?: number;
  decay?: boolean;
}

/**
 * Wraps content with camera shake effect
 * Screen shakes violently then settles (if decay enabled)
 */
export const CameraShake: React.FC<CameraShakeProps> = ({
  children,
  startFrame,
  duration = 30,
  intensity = 15,
  decay = true,
}) => {
  const { x, y, rotation } = useShake({ intensity, duration, startFrame, decay });

  // No shake if before/after duration
  if (x === 0 && y === 0 && rotation === 0) {
    return <>{children}</>;
  }

  return (
    <AbsoluteFill
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        transformOrigin: "center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

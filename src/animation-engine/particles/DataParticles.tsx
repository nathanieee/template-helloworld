import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface DataPoint {
  x: number;
  y: number;
  progress: number;
}

interface DataParticlesProps {
  path: DataPoint[];
  count?: number;
  startFrame: number;
  duration?: number;
  color?: string;
  size?: number;
  spacing?: number;
}

/**
 * Glowing data packets traveling along a path
 * Use for: network activity, request/response visualization
 */
export const DataParticles: React.FC<DataParticlesProps> = ({
  path,
  count = 5,
  startFrame,
  duration = 60,
  color = "#63B3ED",
  size = 6,
  spacing = 15,
}) => {
  const frame = useCurrentFrame();

  // Get position at progress point along path
  const getPositionAtProgress = (progress: number): { x: number; y: number } => {
    if (path.length === 0) return { x: 0, y: 0 };
    if (path.length === 1) return path[0];

    const totalSegments = path.length - 1;
    const exactPosition = progress * totalSegments;
    const segmentIndex = Math.floor(exactPosition);
    const segmentProgress = exactPosition - segmentIndex;

    const p1 = path[Math.min(segmentIndex, path.length - 1)];
    const p2 = path[Math.min(segmentIndex + 1, path.length - 1)];

    return {
      x: p1.x + (p2.x - p1.x) * segmentProgress,
      y: p1.y + (p2.y - p1.y) * segmentProgress,
    };
  };

  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const particleStartFrame = startFrame + i * spacing;
        const particleFrame = frame - particleStartFrame;

        if (particleFrame < 0 || particleFrame > duration) return null;

        const progress = particleFrame / duration;
        const pos = getPositionAtProgress(progress);
        const opacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

        return (
          <g key={i}>
            <circle cx={pos.x} cy={pos.y} r={size * 2} fill={color} opacity={opacity * 0.3} />
            <circle cx={pos.x} cy={pos.y} r={size} fill={color} opacity={opacity} />
          </g>
        );
      })}
    </g>
  );
};

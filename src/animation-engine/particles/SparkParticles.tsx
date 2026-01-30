import React, { useMemo } from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface SparkParticlesProps {
  count?: number;
  origin: { x: number; y: number };
  burstFrame: number;
  color?: string;
  speed?: number;
  lifetime?: number;
}

/**
 * Energetic spark burst from a point
 * Use for: electrical effects, ideas appearing, magic moments
 */
export const SparkParticles: React.FC<SparkParticlesProps> = ({
  count = 15,
  origin,
  burstFrame,
  color = "#F6E05E",
  speed = 1,
  lifetime = 40,
}) => {
  const frame = useCurrentFrame();

  // Generate static particle data
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
      const distance = 50 + Math.random() * 100;
      const size = 2 + Math.random() * 4;

      return {
        id: i,
        angle,
        distance,
        size,
        phase: Math.random() * Math.PI * 2,
      };
    });
  }, [count]);

  const progress = (frame - burstFrame) / lifetime;

  if (progress < 0 || progress > 1) return null;

  const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [1, 1, 0.3, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <g>
      {particles.map((p) => {
        const currentDistance = p.distance * interpolate(progress, [0, 1], [0, 1]);

        const x = origin.x + Math.cos(p.angle) * currentDistance;
        const y = origin.y + Math.sin(p.angle) * currentDistance;
        const currentSize = p.size * interpolate(progress, [0, 1], [1, 0.3]);

        return (
          <circle
            key={p.id}
            cx={x}
            cy={y}
            r={currentSize}
            fill={color}
            opacity={opacity}
          />
        );
      })}
    </g>
  );
};

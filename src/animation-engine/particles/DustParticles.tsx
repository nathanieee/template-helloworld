import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

interface DustParticlesProps {
  count?: number;
  size?: { min: number; max: number };
  opacity?: { min: number; max: number };
  speed?: number;
}

/**
 * Ambient floating dust particles
 * Adds depth and atmosphere to empty backgrounds
 */
export const DustParticles: React.FC<DustParticlesProps> = ({
  count = 30,
  size = { min: 1, max: 3 },
  opacity = { min: 0.1, max: 0.4 },
  speed = 0.3,
}) => {
  const frame = useCurrentFrame();

  // Generate static particle positions
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      size: size.min + Math.random() * (size.max - size.min),
      baseOpacity: opacity.min + Math.random() * (opacity.max - opacity.min),
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.5,
      driftY: (Math.random() - 0.5) * 0.5,
    }));
  }, [count, size, opacity]);

  return (
    <g>
      {particles.map((p) => {
        const t = frame * speed + p.phase;
        const currentOpacity = p.baseOpacity * (0.7 + 0.3 * Math.sin(t));
        const currentX = p.x + Math.sin(t * 0.5) * 10 * p.driftX;
        const currentY = p.y + Math.cos(t * 0.3) * 10 * p.driftY;

        return (
          <circle
            key={p.id}
            cx={currentX}
            cy={currentY}
            r={p.size}
            fill="white"
            opacity={currentOpacity}
          />
        );
      })}
    </g>
  );
};

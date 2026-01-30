import React, { useMemo } from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface SmokeParticlesProps {
  count?: number;
  origin: { x: number; y: number };
  startFrame: number;
  color?: string;
  speed?: number;
}

/**
 * Rising smoke clouds
 * Use for: crashes, failures, rubble aftermath
 */
export const SmokeParticles: React.FC<SmokeParticlesProps> = ({
  count = 12,
  origin,
  startFrame,
  color = "#4A5568",
  speed = 1,
}) => {
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      delay: i * 5,
      xOffset: (Math.random() - 0.5) * 60,
      size: 20 + Math.random() * 40,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.02,
    }));
  }, [count]);

  const lifetime = 120; // 4 seconds at 30fps

  return (
    <g opacity={0.6}>
      {particles.map((p) => {
        const particleFrame = (frame - startFrame - p.delay) * speed;

        if (particleFrame < 0 || particleFrame > lifetime) return null;

        const progress = particleFrame / lifetime;
        const yOffset = -progress * 200;
        const wobble = Math.sin(particleFrame * p.wobbleSpeed + p.wobblePhase) * 20;
        const currentSize = p.size * (1 + progress * 2);
        const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 0.4, 0.2, 0]);

        return (
          <circle
            key={p.id}
            cx={origin.x + p.xOffset + wobble}
            cy={origin.y + yOffset}
            r={currentSize}
            fill={color}
            opacity={opacity}
          />
        );
      })}
    </g>
  );
};

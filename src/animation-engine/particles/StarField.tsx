import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

interface StarFieldProps {
  count?: number;
  layers?: number;
  parallaxIntensity?: number;
}

/**
 * Parallax star field for space backgrounds
 * Multiple depth layers create 3D effect during camera movement
 */
export const StarField: React.FC<StarFieldProps> = ({
  count = 100,
  layers = 3,
  parallaxIntensity = 0.5,
}) => {
  const frame = useCurrentFrame();

  // Generate static star data
  const stars = useMemo(() => {
    const allStars: Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      layer: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }> = [];

    for (let layer = 0; layer < layers; layer++) {
      const layerCount = Math.floor(count / layers);
      for (let i = 0; i < layerCount; i++) {
        allStars.push({
          id: layer * 1000 + i,
          x: Math.random() * 1920,
          y: Math.random() * 1080,
          size: 1 + Math.random() * 2 * (1 - layer / layers),
          layer,
          twinkleSpeed: 0.02 + Math.random() * 0.05,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    }
    return allStars;
  }, [count, layers]);

  // Calculate parallax offset based on frame (simulating camera movement)
  const parallaxX = Math.sin(frame * 0.002) * 20 * parallaxIntensity;
  const parallaxY = Math.cos(frame * 0.003) * 10 * parallaxIntensity;

  return (
    <g>
      {stars.map((star) => {
        const layerDepth = 1 - star.layer / layers;
        const x = star.x + parallaxX * layerDepth;
        const y = star.y + parallaxY * layerDepth;
        const twinkle = 0.5 + 0.5 * Math.sin(frame * star.twinkleSpeed + star.twinklePhase);
        const opacity = (0.3 + 0.7 * layerDepth) * twinkle;

        return (
          <circle
            key={star.id}
            cx={x}
            cy={y}
            r={star.size}
            fill="white"
            opacity={opacity}
          />
        );
      })}
    </g>
  );
};

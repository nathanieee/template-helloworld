import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene3_InternalTangle: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const xrayOpacity = interpolate(frame, [0, 60], [0, 0.9], { extrapolateRight: "clamp" });
  const chaos = interpolate(frame, [60, 200], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform="translate(960, 540)" opacity={0.3}>
          <rect x={-150} y={-400} width={300} height={400} fill={colors.monolith} />
          <rect x={-120} y={-480} width={40} height={80} fill={colors.monolith} />
          <rect x={80} y={-480} width={40} height={80} fill={colors.monolith} />
          <rect x={-30} y={-520} width={60} height={120} fill={colors.monolith} />
        </g>

        <g opacity={xrayOpacity}>
          <g transform="translate(960, 540)">
            {Array.from({ length: 20 }).map((_, i) => {
              const startX = -100 + (i % 5) * 50;
              const startY = -200 + Math.floor(i / 5) * 100;
              const endX = 100 + Math.sin(i * 0.5) * 50 * chaos;
              const endY = -200 + Math.cos(i * 0.3) * 100 * chaos;
              return (
                <path
                  key={i}
                  d={`M ${startX} ${startY} Q ${(startX + endX) / 2 + Math.sin(frame / 20 + i) * 30 * chaos} ${(startY + endY) / 2} ${endX} ${endY}`}
                  stroke={i % 2 === 0 ? colors.orders : colors.inventory}
                  strokeWidth={3}
                  fill="none"
                  opacity={0.7}
                />
              );
            })}
            <rect x={-120} y={-250} width={60} height={50} rx={5} fill={colors.orders} />
            <rect x={60} y={-250} width={60} height={50} rx={5} fill={colors.inventory} />
            <rect x={-30} y={-100} width={60} height={50} rx={5} fill={colors.products} />
            <rect x={-80} y={100} width={60} height={50} rx={5} fill={colors.payments} />
          </g>
        </g>

        <text x={960} y={150} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>
          Inside the Monolith
        </text>
        <text x={960} y={900} textAnchor="middle" fill={colors.danger} fontSize={28} opacity={xrayOpacity}>
          X-RAY VIEW: Tangled Dependencies
        </text>
      </svg>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene0_Monolith: React.FC = () => {
  const frame = useCurrentFrame();

  const riseProgress = interpolate(frame, [0, 100], [1, 0], {
    extrapolateRight: "clamp",
  });

  const zoomScale = interpolate(frame, [100, 300], [1, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [50, 100], [0, 1], {
    extrapolateRight: "clamp",
  });

  const monolithY = 540 + 400 * riseProgress;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg
        width={1920}
        height={1080}
        style={{
          transform: `scale(${zoomScale})`,
          transformOrigin: "center",
        }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 1920}
            cy={Math.random() * 1080}
            r={Math.random() * 2 + 1}
            fill="white"
            opacity={Math.random() * 0.5 + 0.2}
          />
        ))}

        <g transform="translate(960, 540)">
          <rect
            x={-150}
            y={-400 + monolithY - 540}
            width={300}
            height={400}
            fill={colors.monolith}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={2}
          />
          <rect x={-120} y={-480 + monolithY - 540} width={40} height={80} fill={colors.monolith} />
          <rect x={80} y={-480 + monolithY - 540} width={40} height={80} fill={colors.monolith} />
          <rect x={-30} y={-520 + monolithY - 540} width={60} height={120} fill={colors.monolith} />
          <rect x={-100} y={-360 + monolithY - 540} width={30} height={50} fill={colors.background} opacity={0.8} />
          <rect x={70} y={-360 + monolithY - 540} width={30} height={50} fill={colors.background} opacity={0.8} />
          <rect x={-15} y={-320 + monolithY - 540} width={30} height={40} fill={colors.background} opacity={0.8} />
          <rect x={-40} y={-80 + monolithY - 540} width={80} height={80} fill={colors.background} opacity={0.9} />
          <circle cx={20} cy={-40 + monolithY - 540} r={5} fill={colors.accent} />
          <line x1={-150} y1={-400 + monolithY - 540} x2={150} y2={-400 + monolithY - 540} stroke="rgba(255,255,255,0.2)" strokeWidth={3} />
          <line x1={-150} y1={-200 + monolithY - 540} x2={150} y2={-200 + monolithY - 540} stroke="rgba(255,255,255,0.2)" strokeWidth={3} />
        </g>

        <text x={960} y={150} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>
          The Monolith
        </text>
      </svg>
    </AbsoluteFill>
  );
};

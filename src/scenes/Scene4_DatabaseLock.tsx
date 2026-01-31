import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { colors } from "../styles/colors";

export const Scene4_DatabaseLock: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const lockScale = spring({ frame, fps: 30, from: 0, to: 1, config: { damping: 10 } });
  const glowIntensity = (Math.sin((frame / 20) * Math.PI * 2) + 1) / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform="translate(960, 540)">
          <ellipse cx={0} cy={0} rx={150 + glowIntensity * 30} ry={150 + glowIntensity * 30} fill={colors.danger} opacity={0.2} />
          <ellipse cx={0} cy={-100} rx={100} ry={30} fill={colors.monolith} />
          <rect x={-100} y={-100} width={200} height={200} fill={colors.monolith} />
          <ellipse cx={0} cy={100} rx={100} ry={30} fill={colors.monolith} />
          <ellipse cx={0} cy={-50} rx={100} ry={30} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={2} />
          <ellipse cx={0} cy={0} rx={100} ry={30} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={2} />
          <ellipse cx={0} cy={50} rx={100} ry={30} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={2} />
          <g transform={`scale(${lockScale})`}>
            <rect x={-30} y={0} width={60} height={50} rx={5} fill={colors.danger} />
            <path d="M -20 0 L -20 -30 A 20 20 0 0 1 20 -30 L 20 0" fill="none" stroke={colors.danger} strokeWidth={8} />
            <circle cx={0} cy={25} r={10} fill={colors.background} />
            <rect x={-4} y={25} width={8} height={20} fill={colors.background} />
          </g>
        </g>
        <g opacity={lockScale}>
          <text x={700} y={540} textAnchor="end" fill={colors.danger} fontSize={36}>🚫 READ</text>
          <text x={700} y={600} textAnchor="end" fill={colors.danger} fontSize={36}>🚫 WRITE</text>
        </g>
        <text x={960} y={150} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>
          Database Lock
        </text>
        <text x={960} y={210} textAnchor="middle" fill={colors.danger} fontSize={32} opacity={titleOpacity}>
          Everything waits for the database
        </text>
      </svg>
    </AbsoluteFill>
  );
};

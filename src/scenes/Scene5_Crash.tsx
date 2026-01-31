import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene5_Crash: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const bugX = interpolate(frame, [0, 80], [-100, 960], { extrapolateRight: "clamp" });
  const bugY = interpolate(frame, [0, 80], [800, 600], { extrapolateRight: "clamp" });
  const snapFrame = 100;
  const wireBreak = interpolate(frame, [snapFrame, snapFrame + 10], [0, 50], { extrapolateRight: "clamp" });
  const collapse = interpolate(frame, [120, 180], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform={`translate(960, ${540 + collapse * 100})`}>
          <g style={{ transform: `rotate(${-collapse * 10}deg)`, transformOrigin: "center" }}>
            <rect x={-150} y={-400} width={300} height={400} fill={colors.monolith} opacity={1 - collapse * 0.5} />
            <rect x={-120} y={-480} width={40} height={80} fill={colors.monolith} />
            <rect x={80} y={-480} width={40} height={80} fill={colors.monolith} />
            {frame >= snapFrame && (
              <path d="M 0 -300 L 20 -200 L -10 -100 L 30 0 L 0 100" stroke={colors.background} strokeWidth={5 + collapse * 10} fill="none" />
            )}
          </g>
        </g>

        {frame >= snapFrame && (
          <g>
            <line x1={960} y1={200} x2={960} y2={400 - wireBreak} stroke={colors.network} strokeWidth={4} />
            <line x1={960} y1={400 + wireBreak} x2={960} y2={600} stroke={colors.network} strokeWidth={4} />
            <circle cx={960} cy={400} r={20} fill={colors.accent} opacity={1 - collapse} />
          </g>
        )}

        <g transform={`translate(${bugX}, ${bugY})`}>
          <ellipse cx={0} cy={0} rx={20} ry={12} fill={colors.danger} />
          <circle cx={10} cy={0} r={10} fill={colors.danger} />
          <circle cx={15} cy={-3} r={3} fill="white" />
          <circle cx={15} cy={-3} r={1.5} fill="black" />
        </g>

        <text x={960} y={150} textAnchor="middle" fill={colors.danger} fontSize={48} fontWeight="bold" opacity={titleOpacity}>
          💥 The Crash
        </text>
        {frame >= snapFrame + 20 && (
          <text x={960} y={900} textAnchor="middle" fill={colors.danger} fontSize={36} opacity={collapse}>
            ERROR: SYSTEM FAILURE
          </text>
        )}
      </svg>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene2_Queue: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const tapOffset = Math.sin((frame / 5) * Math.PI * 2) * 3;

  const queuePositions = [
    { x: 700, delay: 0 },
    { x: 620, delay: 30 },
    { x: 540, delay: 60 },
    { x: 460, delay: 90 },
    { x: 380, delay: 120 },
    { x: 300, delay: 150 },
    { x: 220, delay: 180 },
  ];

  const drawStickFigure = (x: number, y: number, scale: number) => {
    const s = scale;
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx={0} cy={-50 * s} r={15 * s} fill={colors.users} />
        <circle cx={5 * s} cy={-52 * s} r={3 * s} fill="white" />
        <circle cx={5 * s} cy={-52 * s} r={1 * s} fill="black" />
        <line x1={0} y1={-35 * s} x2={0} y2={0} stroke={colors.users} strokeWidth={6 * s} strokeLinecap="round" />
        <line x1={0} y1={-25 * s} x2={-25 * s} y2={5 * s} stroke={colors.users} strokeWidth={5 * s} strokeLinecap="round" />
        <line x1={0} y1={-25 * s} x2={25 * s} y2={5 * s} stroke={colors.users} strokeWidth={5 * s} strokeLinecap="round" />
        <line x1={0} y1={0} x2={-20 * s} y2={30 * s} stroke={colors.users} strokeWidth={5 * s} strokeLinecap="round" />
        <line x1={0} y1={0} x2={20 * s} y2={30 * s} stroke={colors.users} strokeWidth={5 * s} strokeLinecap="round" />
      </g>
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform="translate(960, 540)">
          <rect x={-150} y={-400} width={300} height={400} fill={colors.monolith} stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
          <rect x={-120} y={-480} width={40} height={80} fill={colors.monolith} />
          <rect x={80} y={-480} width={40} height={80} fill={colors.monolith} />
          <rect x={-30} y={-520} width={60} height={120} fill={colors.monolith} />
          <rect x={-40} y={-80} width={80} height={80} fill={colors.background} opacity={0.9} />
          <rect x={-40} y={-80} width={40} height={80} fill={colors.monolith} transform="rotate(70, -40, -80)" opacity={0.5} />
        </g>

        {queuePositions.map((pos, i) => {
          const opacity = frame >= pos.delay ? interpolate(frame, [pos.delay, pos.delay + 20], [0, 1], { extrapolateRight: "clamp" }) : 0;
          if (opacity === 0) return null;
          return (
            <g key={i} opacity={opacity} transform={`translate(0, ${i === 0 ? tapOffset : 0})`}>
              {drawStickFigure(pos.x, 700, 1 - i * 0.05)}
            </g>
          );
        })}

        <line x1={200} y1={750} x2={750} y2={750} stroke={colors.network} strokeWidth={2} strokeDasharray="10,5" opacity={0.5} />

        <text x={960} y={150} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>
          The Queue Forms
        </text>
        <text x={960} y={210} textAnchor="middle" fill={colors.textSecondary} fontSize={32} opacity={titleOpacity}>
          "Single Point of Entry"
        </text>
      </svg>
    </AbsoluteFill>
  );
};

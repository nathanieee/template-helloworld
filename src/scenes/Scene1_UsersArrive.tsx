import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene1_UsersArrive: React.FC = () => {
  const frame = useCurrentFrame();

  const user1X = interpolate(frame, [0, 150], [-100, 700], { extrapolateRight: "clamp" });
  const user2X = interpolate(frame, [30, 180], [-100, 700], { extrapolateRight: "clamp" });
  const user3X = interpolate(frame, [60, 210], [-100, 700], { extrapolateRight: "clamp" });

  const doorOpen = interpolate(frame, [200, 250], [0, 1], { extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });

  const drawStickFigure = (x: number, y: number, scale: number, walkCycle: number) => {
    const s = scale;
    const bob = Math.sin(walkCycle * Math.PI * 2) * 5 * s;
    return (
      <g transform={`translate(${x}, ${y + bob})`}>
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
          <g transform={`rotate(${doorOpen * 70})`} style={{ transformOrigin: "-40px -80px" }}>
            <rect x={-40} y={-80} width={40} height={80} fill={colors.monolith} />
          </g>
          {doorOpen > 0 && (
            <ellipse cx={-20} cy={0} rx={30 + doorOpen * 50} ry={10 + doorOpen * 20} fill={colors.accent} opacity={doorOpen * 0.3} />
          )}
        </g>

        {drawStickFigure(user1X, 700, 1.2, (frame / 15) % 1)}
        {drawStickFigure(user2X, 720, 1, ((frame - 30) / 15) % 1)}
        {drawStickFigure(user3X, 680, 0.9, ((frame - 60) / 15) % 1)}

        <text x={960} y={150} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>
          Users Arrive
        </text>
      </svg>
    </AbsoluteFill>
  );
};

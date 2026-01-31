import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene13_Processing: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const rotation = (frame / 2) * 360;
  const bubble1Opacity = interpolate(frame, [30, 80], [0, 1], { extrapolateRight: "clamp" });
  const bubble2Opacity = interpolate(frame, [80, 130], [0, 1], { extrapolateRight: "clamp" });
  const bubble3Opacity = interpolate(frame, [130, 180], [0, 1], { extrapolateRight: "clamp" });
  const bounce = Math.sin((frame / 15) * Math.PI * 2) * 10;
  const glowPulse = (Math.sin((frame / 20) * Math.PI * 2) + 1) / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform={`translate(960, ${540 + bounce})`}>
          <circle cx={0} cy={0} r={100 + glowPulse * 30} fill={colors.orders} opacity={0.2} />
          <rect x={-80} y={-60} width={160} height={120} rx={15} fill={colors.orders} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={24} fontWeight="bold">Orders</text>
          <circle cx={-25} cy={-15} r={12} fill="white" />
          <circle cx={25} cy={-15} r={12} fill="white" />
          <circle cx={-25} cy={-15} r={6} fill="black" />
          <circle cx={25} cy={-15} r={6} fill="black" />
        </g>
        <g opacity={bubble1Opacity} transform="translate(1100, 400)">
          <circle cx={0} cy={30} r={10} fill="rgba(255,255,255,0.3)" />
          <circle cx={25} cy={15} r={15} fill="rgba(255,255,255,0.3)" />
          <ellipse cx={60} cy={0} rx={70} ry={40} fill="rgba(255,255,255,0.9)" />
          <text x={60} y={5} textAnchor="middle" fill={colors.orders} fontSize={14}>Need user info...</text>
        </g>
        <g opacity={bubble2Opacity} transform="translate(800, 300)">
          <circle cx={0} cy={30} r={10} fill="rgba(255,255,255,0.3)" />
          <circle cx={25} cy={15} r={15} fill="rgba(255,255,255,0.3)" />
          <ellipse cx={60} cy={0} rx={80} ry={40} fill="rgba(255,255,255,0.9)" />
          <text x={60} y={5} textAnchor="middle" fill={colors.inventory} fontSize={14}>Check inventory!</text>
        </g>
        <g opacity={bubble3Opacity} transform="translate(1100, 250)">
          <circle cx={0} cy={30} r={10} fill="rgba(255,255,255,0.3)" />
          <circle cx={25} cy={15} r={15} fill="rgba(255,255,255,0.3)" />
          <ellipse cx={60} cy={0} rx={90} ry={40} fill="rgba(255,255,255,0.9)" />
          <text x={60} y={0} textAnchor="middle" fill={colors.orders} fontSize={14}>Build response</text>
          <text x={60} y={20} textAnchor="middle" fill={colors.orders} fontSize={14}>"Found 5 orders"</text>
        </g>
        <g transform={`translate(960, 750) rotate(${rotation})`}>
          <circle cx={0} cy={0} r={30} fill="none" stroke={colors.orders} strokeWidth={4} strokeDasharray="100" strokeOpacity={0.3} />
          <circle cx={0} cy={0} r={30} fill="none" stroke={colors.orders} strokeWidth={4} strokeDasharray="25" strokeDashoffset={25} />
        </g>
        <text x={960} y={150} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>Processing...</text>
        <text x={960} y={210} textAnchor="middle" fill={colors.textSecondary} fontSize={32} opacity={titleOpacity}>Thinking, checking, and building the answer 🤔</text>
      </svg>
    </AbsoluteFill>
  );
};

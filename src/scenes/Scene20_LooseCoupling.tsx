import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene20_LooseCoupling: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const plugGap = interpolate(frame, [0, 100], [0, 200], { extrapolateRight: "clamp" });
  const plugRotation = interpolate(frame, [100, 200], [0, 45], { extrapolateRight: "clamp" });
  const reconnectProgress = interpolate(frame, [200, 280], [0, 1], { extrapolateRight: "clamp" });
  const wiggle = Math.sin((frame / 5) * Math.PI * 2) * 5;
  const springScale = 1 + Math.sin((frame / 10) * Math.PI * 2) * 0.05;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform="translate(600, 540)">
          <rect x={-70} y={-50} width={140} height={100} rx={10} fill={colors.orders} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={20} fontWeight="bold">Orders</text>
          <rect x={60} y={-20} width={30} height={40} rx={5} fill={colors.monolith} />
          <circle cx={75} cy={-8} r={5} fill={colors.background} />
          <circle cx={75} cy={8} r={5} fill={colors.background} />
        </g>
        <g transform="translate(1320, 540)">
          <rect x={-70} y={-50} width={140} height={100} rx={10} fill={colors.inventory} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={20} fontWeight="bold">Inventory</text>
          <rect x={-90} y={-20} width={30} height={40} rx={5} fill={colors.monolith} />
          <circle cx={-75} cy={-8} r={5} fill={colors.background} />
          <circle cx={-75} cy={8} r={5} fill={colors.background} />
        </g>
        {reconnectProgress < 1 ? (
          <g transform={`translate(${600 + 90 + plugGap / 2}, ${540 + wiggle}) rotate(${plugRotation})`}>
            <rect x={-150} y={-15} width={300} height={30} rx={15} fill={colors.network} opacity={0.7} />
            <rect x={160} y={-25} width={40} height={50} rx={5} fill={colors.network} />
            <circle cx={175} cy={-10} r={6} fill={colors.accent} />
            <circle cx={175} cy={10} r={6} fill={colors.accent} />
            <path d={`M -30 0 Q -20 ${-15 - springScale * 10} -10 0 Q 0 ${15 - springScale * 10} 10 0 Q 20 ${-15 - springScale * 10} 30 0`} fill="none" stroke={colors.accent} strokeWidth={3} />
          </g>
        ) : (
          <g>
            <line x1={690} y1={540} x2={1230} y2={540} stroke={colors.network} strokeWidth={20} strokeOpacity={0.5} />
            <g transform="translate(960, 540)">
              <path d={`M -30 0 Q -20 ${-15 - springScale * 10} -10 0 Q 0 ${15 - springScale * 10} 10 0 Q 20 ${-15 - springScale * 10} 30 0`} fill="none" stroke={colors.accent} strokeWidth={4} />
            </g>
          </g>
        )}
        {frame >= 100 && frame < 200 && <text x={960} y={700} textAnchor="middle" fill={colors.accent} fontSize={24}>Can disconnect without breaking! 🔌</text>}
        <text x={960} y={150} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>Loose Coupling</text>
        <text x={960} y={210} textAnchor="middle" fill={colors.textSecondary} fontSize={32} opacity={titleOpacity}>Services can change without breaking others</text>
        <g transform="translate(960, 900)" opacity={interpolate(frame, [100, 150], [0, 1], { extrapolateRight: "clamp" })}>
          <text x={-200} y={0} textAnchor="middle" fill={colors.danger} fontSize={20} textDecoration="line-through">Tightly Coupled</text>
          <text x={200} y={0} textAnchor="middle" fill={colors.orders} fontSize={20}>✓ Loosely Coupled</text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};

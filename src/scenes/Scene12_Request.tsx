import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene12_Request: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const envelopeX = interpolate(frame, [50, 200], [400, 960], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [50, 100], [0.5, 1], { extrapolateRight: "clamp" });
  const arrivalGlow = interpolate(frame, [180, 200], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform="translate(400, 540)">
          <rect x={-70} y={-50} width={140} height={100} rx={10} fill={colors.users} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={20} fontWeight="bold">Users</text>
          <circle cx={70} cy={0} r={15} fill={colors.accent} opacity={0.8}>
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1s" repeatCount="indefinite" />
          </circle>
        </g>
        <g transform="translate(960, 540)">
          {arrivalGlow > 0 && <circle cx={0} cy={0} r={100} fill={colors.orders} opacity={arrivalGlow * 0.3} />}
          <rect x={-70} y={-50} width={140} height={100} rx={10} fill={colors.orders} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={20} fontWeight="bold">Orders</text>
          <circle cx={-70} cy={0} r={15} fill={colors.accent} opacity={arrivalGlow * 0.8} />
        </g>
        <line x1={400} y1={540} x2={960} y2={540} stroke={colors.network} strokeWidth={3} strokeDasharray="10,5" opacity={0.5} />
        <g transform={`translate(${envelopeX}, 540) scale(${scale})`}>
          <rect x={-25} y={-18} width={50} height={36} rx={4} fill={colors.network} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
          <path d="M -25 -18 L 0 5 L 25 -18" fill={colors.network} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
          <rect x={-20} y={-13} width={15} height={10} rx={2} fill="white" opacity={0.3} />
          <text x={0} y={40} textAnchor="middle" fill={colors.text} fontSize={14}>REQUEST</text>
        </g>
        <text x={960} y={150} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>The Request</text>
        <text x={960} y={210} textAnchor="middle" fill={colors.textSecondary} fontSize={32} opacity={titleOpacity}>User → Orders: "Get my order history"</text>
      </svg>
    </AbsoluteFill>
  );
};

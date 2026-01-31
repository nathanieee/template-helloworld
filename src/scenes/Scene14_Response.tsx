import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene14_Response: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const envelopeX = interpolate(frame, [50, 200], [1520, 960], { extrapolateRight: "clamp" });
  const envelopeScale = interpolate(frame, [50, 80], [0.5, 1], { extrapolateRight: "clamp" });
  const checkProgress = interpolate(frame, [100, 180], [0, 1], { extrapolateRight: "clamp" });
  const yesEnvelopeOpacity = interpolate(frame, [180, 230], [0, 1], { extrapolateRight: "clamp" });
  const yesEnvelopeScale = interpolate(frame, [180, 230], [0, 1], { extrapolateRight: "clamp" });
  const successGlow = interpolate(frame, [180, 250], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform="translate(960, 540)">
          <rect x={-70} y={-50} width={140} height={100} rx={10} fill={colors.orders} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={20} fontWeight="bold">Orders</text>
        </g>
        <g transform="translate(1520, 540)">
          {successGlow > 0 && <circle cx={0} cy={0} r={100} fill={colors.inventory} opacity={successGlow * 0.3} />}
          <rect x={-70} y={-50} width={140} height={100} rx={10} fill={colors.inventory} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={20} fontWeight="bold">Inventory</text>
          {checkProgress > 0 && (
            <g transform="translate(0, -80) scale(2)">
              <circle cx={0} cy={0} r={20} fill={colors.orders} opacity={checkProgress} />
              <path d="M -8 0 L -2 6 L 10 -6" stroke="white" strokeWidth={3} fill="none" opacity={checkProgress} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
        </g>
        <line x1={960} y1={540} x2={1520} y2={540} stroke={colors.network} strokeWidth={3} strokeDasharray="10,5" opacity={0.5} />
        <g transform={`translate(${envelopeX}, 540) scale(${envelopeScale})`}>
          <rect x={-25} y={-18} width={50} height={36} rx={4} fill={colors.network} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
          <path d="M -25 -18 L 0 5 L 25 -18" fill={colors.network} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
          <text x={0} y={40} textAnchor="middle" fill={colors.text} fontSize={12}>In Stock!</text>
        </g>
        <g transform={`translate(600, 540) scale(${yesEnvelopeScale})`} opacity={yesEnvelopeOpacity}>
          {successGlow > 0 && <circle cx={0} cy={0} r={60} fill={colors.orders} opacity={successGlow * 0.2} />}
          <rect x={-40} y={-28} width={80} height={56} rx={6} fill={colors.orders} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
          <path d="M -40 -28 L 0 8 L 40 -28" fill={colors.orders} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
          <text x={0} y={8} textAnchor="middle" fill="white" fontSize={20} fontWeight="bold">YES</text>
          <text x={0} y={50} textAnchor="middle" fill={colors.orders} fontSize={14}>Response</text>
        </g>
        <g opacity={yesEnvelopeOpacity}>
          <polygon points="780,510 780,570 740,540" fill={colors.orders} />
        </g>
        <text x={960} y={150} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>The Response</text>
        <text x={960} y={210} textAnchor="middle" fill={colors.orders} fontSize={32} opacity={titleOpacity}>✓ Inventory checks out → Orders responds YES</text>
      </svg>
    </AbsoluteFill>
  );
};

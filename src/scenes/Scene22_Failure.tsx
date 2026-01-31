import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene22_Failure: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const requestX = interpolate(frame, [0, 100], [600, 1100], { extrapolateRight: "clamp" });
  const serviceY = interpolate(frame, [100, 150], [540, 700], { extrapolateRight: "clamp" });
  const serviceRotation = interpolate(frame, [100, 150], [0, 20], { extrapolateRight: "clamp" });
  const bounceX = interpolate(frame, [120, 200], [1100, 600], { extrapolateRight: "clamp" });
  const bounceY = 540 + Math.sin(interpolate(frame, [120, 200], [0, Math.PI], { extrapolateRight: "clamp" })) * 100;
  const sadOpacity = interpolate(frame, [120, 170], [0, 1], { extrapolateRight: "clamp" });
  const errorOpacity = interpolate(frame, [150, 200], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform="translate(600, 540)">
          <rect x={-60} y={-40} width={120} height={80} rx={10} fill={colors.orders} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={18} fontWeight="bold">Orders</text>
          <g opacity={sadOpacity}>
            <circle cx={-15} cy={-55} r={6} fill="white" />
            <circle cx={15} cy={-55} r={6} fill="white" />
            <circle cx={-15} cy={-53} r={3} fill="black" />
            <circle cx={15} cy={-53} r={3} fill="black" />
            <path d="M -10 -45 Q 0 -50 10 -45" stroke="white" strokeWidth={2} fill="none" />
            <ellipse cx={20} cy={-48} rx={3} ry={5} fill={colors.network} opacity={0.7}>
              <animate attributeName="cy" values="-48;-40;-48" dur="1s" repeatCount="indefinite" />
            </ellipse>
          </g>
        </g>
        <g transform={`translate(1100, ${serviceY}) rotate(${serviceRotation})`}>
          <rect x={-60} y={-40} width={120} height={80} rx={10} fill={colors.inventory} opacity={0.4} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={18} fontWeight="bold" opacity={0.5}>Inventory</text>
          <line x1={-20} y1={-55} x2={-10} y2={-45} stroke={colors.background} strokeWidth={3} />
          <line x1={-10} y1={-55} x2={-20} y2={-45} stroke={colors.background} strokeWidth={3} />
          <line x1={10} y1={-55} x2={20} y2={-45} stroke={colors.background} strokeWidth={3} />
          <line x1={20} y1={-55} x2={10} y2={-45} stroke={colors.background} strokeWidth={3} />
          <path d="M 0 -30 Q 15 -20 15 -40 Q 0 -30 -15 -40" fill="white" opacity={0.2} />
        </g>
        {frame < 120 && <g transform={`translate(${requestX}, 540)`}><rect x={-20} y={-15} width={40} height={30} rx={4} fill={colors.network} /><path d="M -20 -15 L 0 3 L 20 -15" fill={colors.network} /><text x={0} y={35} textAnchor="middle" fill={colors.text} fontSize={10}>Request</text></g>}
        {frame >= 120 && <g transform={`translate(${bounceX}, ${bounceY})`}><rect x={-20} y={-15} width={40} height={30} rx={4} fill={colors.danger} /><path d="M -20 -15 L 0 3 L 20 -15" fill={colors.danger} /><line x1={-8} y1={0} x2={8} y2={0} stroke={colors.background} strokeWidth={3} /><text x={0} y={35} textAnchor="middle" fill={colors.danger} fontSize={10}>Error!</text></g>}
        <line x1={660} y1={540} x2={1040} y2={540} stroke={colors.network} strokeWidth={2} strokeDasharray="10,10" opacity={0.3} />
        {errorOpacity > 0 && (
          <g transform="translate(960, 750)" opacity={errorOpacity}>
            <rect x={-200} y={-40} width={400} height={80} rx={10} fill={colors.danger} opacity={0.9} />
            <text x={0} y={0} textAnchor="middle" fill="white" fontSize={24} fontWeight="bold">Connection Failed!</text>
            <text x={0} y={30} textAnchor="middle" fill="white" fontSize={16}>Inventory service is down</text>
          </g>
        )}
        <text x={960} y={100} textAnchor="middle" fill={colors.danger} fontSize={48} fontWeight="bold" opacity={titleOpacity}>Failure Happens</text>
        <text x={960} y={160} textAnchor="middle" fill={colors.textSecondary} fontSize={28} opacity={titleOpacity}>Services fail. What do we do? 🤷</text>
      </svg>
    </AbsoluteFill>
  );
};

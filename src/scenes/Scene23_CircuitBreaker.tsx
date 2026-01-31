import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene23_CircuitBreaker: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const switchAngle = interpolate(frame, [0, 80, 160, 240], [0, 90, 45, 0], { extrapolateRight: "clamp" });
  const stateIndex = Math.floor(frame / 80) % 4;
  const states = ["CLOSED", "OPEN", "HALF-OPEN", "CLOSED"];
  const stateColors = [colors.orders, colors.danger, colors.accent, colors.orders];
  const barrierOpacity = interpolate(frame, [80, 120], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const barrierFade = interpolate(frame, [240, 280], [1, 0], { extrapolateLeft: "clamp" });
  const testRequestX = interpolate(frame, [160, 200], [700, 1100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const successOpacity = interpolate(frame, [200, 240], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform="translate(700, 540)">
          <rect x={-60} y={-40} width={120} height={80} rx={10} fill={colors.orders} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={18} fontWeight="bold">Orders</text>
        </g>
        <g transform="translate(960, 540)">
          <rect x={-40} y={-60} width={80} height={120} rx={5} fill={colors.monolith} />
          <rect x={-30} y={-50} width={60} height={100} rx={3} fill={colors.background} />
          <circle cx={-20} cy={-40} r={8} fill={colors.network} />
          <circle cx={-20} cy={40} r={8} fill={colors.network} />
          <circle cx={20} cy={-40} r={8} fill={colors.network} />
          <circle cx={20} cy={40} r={8} fill={colors.network} />
          <g transform={`rotate(${switchAngle})`}>
            <rect x={-5} y={-50} width={10} height={80} rx={2} fill={stateColors[stateIndex]} />
          </g>
          <circle cx={0} cy={70} r={10} fill={stateColors[stateIndex]}>
            <animate attributeName="opacity" values="1;0.5;1" dur="0.5s" repeatCount="indefinite" />
          </circle>
        </g>
        <g transform="translate(1220, 480)" opacity={successOpacity}>
          <circle cx={0} cy={0} r={25} fill={colors.orders} />
          <path d="M -10 0 L -3 8 L 12 -8" stroke="white" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {frame >= 80 && frame < 280 && <g transform="translate(960, 540)" opacity={barrierOpacity * barrierFade}><rect x={-80} y={-100} width={160} height={200} rx={10} fill={colors.danger} opacity={0.8} /><text x={0} y={0} textAnchor="middle" fill="white" fontSize={24} fontWeight="bold">OPEN</text><text x={0} y={30} textAnchor="middle" fill="white" fontSize={14}>Blocking</text><text x={0} y={50} textAnchor="middle" fill="white" fontSize={14}>Requests</text></g>}
        {frame >= 160 && frame < 240 && <g transform={`translate(${testRequestX}, 540)`}><rect x={-15} y={-12} width={30} height={24} rx={3} fill={colors.accent} /><path d="M -15 -12 L 0 3 L 15 -12" fill={colors.accent} /><text x={0} y={25} textAnchor="middle" fill={colors.accent} fontSize={10}>Test?</text></g>}
        <g transform="translate(960, 750)">
          <rect x={-150} y={-30} width={300} height={60} rx={10} fill={stateColors[stateIndex]} opacity={0.9} />
          <text x={0} y={8} textAnchor="middle" fill="white" fontSize={24} fontWeight="bold">State: {states[stateIndex]}</text>
        </g>
        <g transform="translate(960, 850)">
          {stateIndex === 0 && <text x={0} y={0} textAnchor="middle" fill={colors.textSecondary} fontSize={18}>✓ Normal operation - requests flow through</text>}
          {stateIndex === 1 && <text x={0} y={0} textAnchor="middle" fill={colors.textSecondary} fontSize={18}>🚫 Service failing - blocking requests</text>}
          {stateIndex === 2 && <text x={0} y={0} textAnchor="middle" fill={colors.textSecondary} fontSize={18}>🧪 Testing one request...</text>}
          {stateIndex === 3 && <text x={0} y={0} textAnchor="middle" fill={colors.textSecondary} fontSize={18}>✅ Service recovered - back to normal</text>}
        </g>
        <text x={960} y={100} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>Circuit Breaker Pattern</text>
        <text x={960} y={160} textAnchor="middle" fill={colors.accent} fontSize={28} opacity={titleOpacity}>⚡ Preventing cascade failures</text>
      </svg>
    </AbsoluteFill>
  );
};

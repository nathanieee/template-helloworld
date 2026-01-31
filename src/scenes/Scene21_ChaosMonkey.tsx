import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene21_ChaosMonkey: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const monkeyX = interpolate(frame, [0, 100], [2100, 1400], { extrapolateRight: "clamp" });
  const plugPullProgress = interpolate(frame, [150, 200], [0, 1], { extrapolateRight: "clamp" });
  const serviceBrightness = interpolate(frame, [180, 230], [1, 0.2], { extrapolateRight: "clamp" });
  const tailRotation = Math.sin((frame / 5) * Math.PI * 2) * 30;
  const armX = interpolate(frame, [100, 150], [1400, 1300], { extrapolateRight: "clamp" });
  const armY = interpolate(frame, [100, 150], [540, 480], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform="translate(1100, 540)">
          <rect x={-60} y={-40} width={120} height={80} rx={10} fill={`rgb(${72 + serviceBrightness * 173}, ${187 - serviceBrightness * 86}, ${120 - serviceBrightness * 19})`} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={18} fontWeight="bold" opacity={serviceBrightness}>Inventory</text>
          <g>
            <line x1={0} y1={-40} x2={0} y2={-120 - plugPullProgress * 30} stroke={colors.monolith} strokeWidth={8} />
            <g transform={`translate(0, ${-120 - plugPullProgress * 30})`}>
              <rect x={-15} y={-10} width={30} height={20} rx={3} fill={colors.monolith} />
              <rect x={-8} y={-15} width={5} height={10} fill={colors.monolith} />
              <rect x={3} y={-15} width={5} height={10} fill={colors.monolith} />
            </g>
          </g>
          {serviceBrightness < 0.5 && (
            <g opacity={1 - serviceBrightness}>
              <line x1={-20} y1={-55} x2={-10} y2={-45} stroke={colors.background} strokeWidth={3} />
              <line x1={-10} y1={-55} x2={-20} y2={-45} stroke={colors.background} strokeWidth={3} />
              <line x1={10} y1={-55} x2={20} y2={-45} stroke={colors.background} strokeWidth={3} />
              <line x1={20} y1={-55} x2={10} y2={-45} stroke={colors.background} strokeWidth={3} />
            </g>
          )}
        </g>
        {[{ name: "Orders", color: colors.orders, x: 700, y: 540 }, { name: "Products", color: colors.products, x: 500, y: 350 }].map((service) => (
          <g key={service.name} transform={`translate(${service.x}, ${service.y})`}>
            <rect x={-50} y={-35} width={100} height={70} rx={8} fill={service.color} />
            <text x={0} y={5} textAnchor="middle" fill="white" fontSize={16} fontWeight="bold">{service.name}</text>
            <circle cx={-12} cy={-45} r={5} fill="white" />
            <circle cx={12} cy={-45} r={5} fill="white" />
          </g>
        ))}
        <g transform={`translate(${monkeyX}, 540)`}>
          <ellipse cx={0} cy={0} rx={50} ry={40} fill={colors.danger} />
          <ellipse cx={0} cy={-10} rx={35} ry={30} fill={colors.danger} opacity={0.8} />
          <path d={`M -20 ${5 + (1 + Math.sin((frame / 10) * Math.PI * 2)) * 10} Q 0 ${15 + (1 + Math.sin((frame / 10) * Math.PI * 2)) * 10} 20 ${5 + (1 + Math.sin((frame / 10) * Math.PI * 2)) * 10}`} stroke="white" strokeWidth={3} fill="none" />
          <circle cx={-12} cy={-15} r={8} fill="white" />
          <circle cx={12} cy={-15} r={8} fill="white" />
          <circle cx={-12} cy={-15} r={4} fill="black" />
          <circle cx={12} cy={-15} r={4} fill="black" />
          <circle cx={-45} cy={-25} r={15} fill={colors.danger} />
          <circle cx={45} cy={-25} r={15} fill={colors.danger} />
          <g transform={`rotate(${tailRotation})`}>
            <path d="M 45 20 Q 70 10 80 30 Q 70 40 50 30" fill={colors.danger} />
          </g>
          {frame >= 100 && <ellipse cx={armX - monkeyX} cy={armY - 540} rx={15} ry={10} fill={colors.danger} />}
        </g>
        <text x={960} y={100} textAnchor="middle" fill={colors.danger} fontSize={52} fontWeight="bold" opacity={titleOpacity}>🐵 Chaos Monkey</text>
        <text x={960} y={160} textAnchor="middle" fill={colors.textSecondary} fontSize={28} opacity={titleOpacity}>"What happens if we pull the plug?"</text>
        {frame >= 200 && <text x={1100} y={700} textAnchor="middle" fill={colors.danger} fontSize={24} opacity={interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" })}>💀 Service Down!</text>}
      </svg>
    </AbsoluteFill>
  );
};

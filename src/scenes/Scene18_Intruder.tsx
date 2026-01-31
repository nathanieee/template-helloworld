import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene18_Intruder: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const intruderX = interpolate(frame, [0, 100], [2100, 960], { extrapolateRight: "clamp" });
  const isBouncing = frame >= 150;
  const bouncedX = interpolate(frame, [150, 250], [960, 2100], { extrapolateRight: "clamp" });
  const detectionGlow = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" });
  const shieldScale = interpolate(frame, [110, 150], [0, 1], { extrapolateRight: "clamp" });
  const shieldOpacity = interpolate(frame, [150, 200], [1, 0.3], { extrapolateLeft: "clamp" });
  const warningPulse = (Math.sin((frame / 10) * Math.PI * 2) + 1) / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform="translate(960, 540)">
          {detectionGlow > 0 && <ellipse cx={0} cy={0} rx={120 + warningPulse * 30} ry={80 + warningPulse * 20} fill={colors.danger} opacity={detectionGlow * 0.4} />}
          <path d="M -80 60 L -80 -20 Q -80 -40 0 -40 Q 80 -40 80 -20 L 80 60 Z" fill={colors.accent} stroke="rgba(255,255,255,0.3)" strokeWidth={3} />
          <path d="M -60 60 L -60 -15 Q -60 -30 0 -30 Q 60 -30 60 -15 L 60 60 Z" fill={colors.background} />
          <rect x={-90} y={-50} width={180} height={15} rx={5} fill={colors.accent} />
        </g>
        {shieldScale > 0 && (
          <g transform="translate(960, 540)" opacity={shieldOpacity}>
            <g transform={`scale(${shieldScale})`}>
              <path d="M -70 -60 L 70 -60 L 70 -20 Q 70 60 0 80 Q -70 60 -70 -20 Z" fill={colors.accent} stroke="white" strokeWidth={4} opacity={0.8} />
              <line x1={-30} y1={-20} x2={30} y2={30} stroke={colors.danger} strokeWidth={6} strokeLinecap="round" />
              <line x1={30} y1={-20} x2={-30} y2={30} stroke={colors.danger} strokeWidth={6} strokeLinecap="round" />
            </g>
          </g>
        )}
        <g transform={`translate(${isBouncing ? bouncedX : intruderX}, 540)`}>
          <rect x={-30} y={-22} width={60} height={44} rx={5} fill={colors.danger} stroke="#300" strokeWidth={2} />
          <path d="M -30 -22 L 0 6 L 30 -22" fill="#600" stroke="#300" strokeWidth={1} />
          <circle cx={-10} cy={0} r={5} fill="yellow" />
          <circle cx={10} cy={0} r={5} fill="yellow" />
          <circle cx={-10} cy={0} r={2} fill="black" />
          <circle cx={10} cy={0} r={2} fill="black" />
          <line x1={-18} y1={-8} x2={-4} y2={-4} stroke="#300" strokeWidth={2} />
          <line x1={18} y1={-8} x2={4} y2={-4} stroke="#300" strokeWidth={2} />
        </g>
        {[{ name: "Orders", color: colors.orders, x: 400, y: 350 }, { name: "Inventory", color: colors.inventory, x: 1520, y: 350 }].map((service) => (
          <g key={service.name} transform={`translate(${service.x}, ${service.y})`}>
            <rect x={-60} y={-40} width={120} height={80} rx={10} fill={service.color} opacity={0.7} />
            <text x={0} y={5} textAnchor="middle" fill="white" fontSize={18} fontWeight="bold">{service.name}</text>
          </g>
        ))}
        {isBouncing && (
          <g opacity={interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" })}>
            <text x={960} y={750} textAnchor="middle" fill={colors.danger} fontSize={36} fontWeight="bold">ACCESS DENIED 🚫</text>
          </g>
        )}
        <text x={960} y={100} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>Security First</text>
        <text x={960} y={160} textAnchor="middle" fill={colors.danger} fontSize={28} opacity={titleOpacity}>Gateway blocks malicious requests 🛡️</text>
      </svg>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene16_GatewayArrives: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const gatewayY = interpolate(frame, [0, 150], [1200, 540], { extrapolateRight: "clamp" });
  const serviceReaction = interpolate(frame, [140, 180], [1, 1.1], { extrapolateRight: "clamp" });
  const glowPulse = (Math.sin((frame / 20) * Math.PI * 2) + 1) / 2;
  const dustOpacity = interpolate(frame, [130, 180], [0, 0.8], { extrapolateRight: "clamp" });
  const dustFade = interpolate(frame, [180, 250], [0.8, 0], { extrapolateLeft: "clamp" });

  const services = [
    { name: "Orders", color: colors.orders, x: 400, y: 300 },
    { name: "Inventory", color: colors.inventory, x: 960, y: 300 },
    { name: "Products", color: colors.products, x: 1520, y: 300 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {services.map((service) => (
          <g key={service.name} transform={`translate(${service.x}, ${service.y}) scale(${serviceReaction})`} style={{ transformOrigin: "center" }}>
            <rect x={-60} y={-40} width={120} height={80} rx={10} fill={service.color} />
            <text x={0} y={5} textAnchor="middle" fill="white" fontSize={18} fontWeight="bold">{service.name}</text>
            <circle cx={-15} cy={-50} r={8} fill="white" />
            <circle cx={15} cy={-50} r={8} fill="white" />
            <circle cx={-15} cy={-48} r={4} fill="black" />
            <circle cx={15} cy={-48} r={4} fill="black" />
          </g>
        ))}
        <g transform={`translate(960, ${gatewayY})`}>
          <ellipse cx={0} cy={0} rx={100 + glowPulse * 30} ry={60 + glowPulse * 20} fill={colors.accent} opacity={0.2} />
          <path d="M -80 60 L -80 -20 Q -80 -40 0 -40 Q 80 -40 80 -20 L 80 60 Z" fill={colors.accent} stroke="rgba(255,255,255,0.3)" strokeWidth={3} />
          <path d="M -60 60 L -60 -15 Q -60 -30 0 -30 Q 60 -30 60 -15 L 60 60 Z" fill={colors.background} />
          <rect x={-90} y={-50} width={180} height={15} rx={5} fill={colors.accent} />
          <text x={0} y={90} textAnchor="middle" fill={colors.accent} fontSize={20} fontWeight="bold">API Gateway</text>
        </g>
        {frame > 130 && frame < 260 && (
          <g transform="translate(960, gatewayY + 60)" opacity={dustOpacity * dustFade}>
            <ellipse cx={-50} cy={0} rx={40} ry={15} fill={colors.monolith} opacity={0.5} />
            <ellipse cx={50} cy={0} rx={40} ry={15} fill={colors.monolith} opacity={0.5} />
            <ellipse cx={0} cy={10} rx={60} ry={20} fill={colors.monolith} opacity={0.5} />
          </g>
        )}
        <text x={960} y={150} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>The Gateway Arrives</text>
        <text x={960} y={210} textAnchor="middle" fill={colors.accent} fontSize={32} opacity={titleOpacity}>🚪 "Let me handle that for you!"</text>
      </svg>
    </AbsoluteFill>
  );
};

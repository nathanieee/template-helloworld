import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene17_Routing: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const gatewayGlow = interpolate(frame, [80, 120], [0, 1], { extrapolateRight: "clamp" });

  const services = [
    { name: "Orders", color: colors.orders, x: 400, y: 350 },
    { name: "Inventory", color: colors.inventory, x: 960, y: 350 },
    { name: "Products", color: colors.products, x: 1520, y: 350 },
    { name: "Users", color: colors.users, x: 680, y: 600 },
  ];

  const routes = [
    { toX: 400, toY: 350, color: colors.orders, startFrame: 120, duration: 30 },
    { toX: 960, toY: 350, color: colors.inventory, startFrame: 140, duration: 30 },
    { toX: 1520, toY: 350, color: colors.products, startFrame: 160, duration: 30 },
    { toX: 680, toY: 600, color: colors.users, startFrame: 180, duration: 30 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {frame >= 100 && Array.from({ length: 5 }).map((_, i) => {
          const progress = ((frame * 3 + i * 20) % 100) / 100;
          const y = 100 + progress * 250;
          return <circle key={i} cx={960} cy={y} r={10} fill={colors.network} opacity={0.7} />;
        })}
        <g transform="translate(960, 540)">
          {gatewayGlow > 0 && <ellipse cx={0} cy={0} rx={120} ry={80} fill={colors.accent} opacity={gatewayGlow * 0.3} />}
          <path d="M -80 60 L -80 -20 Q -80 -40 0 -40 Q 80 -40 80 -20 L 80 60 Z" fill={colors.accent} stroke="rgba(255,255,255,0.3)" strokeWidth={3} />
          <path d="M -60 60 L -60 -15 Q -60 -30 0 -30 Q 60 -30 60 -15 L 60 60 Z" fill={colors.background} />
          <rect x={-90} y={-50} width={180} height={15} rx={5} fill={colors.accent} />
        </g>
        {services.map((service) => (
          <g key={service.name} transform={`translate(${service.x}, ${service.y})`}>
            <rect x={-60} y={-40} width={120} height={80} rx={10} fill={service.color} opacity={0.9} />
            <text x={0} y={5} textAnchor="middle" fill="white" fontSize={18} fontWeight="bold">{service.name}</text>
          </g>
        ))}
        {routes.map((route, i) => {
          const progress = interpolate(frame, [route.startFrame, route.startFrame + route.duration], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          if (progress <= 0) return null;
          const currentX = 960 + (route.toX - 960) * progress;
          const currentY = 540 + (route.toY - 540) * progress;
          return (
            <g key={i}>
              <line x1={960} y1={540} x2={currentX} y2={currentY} stroke={route.color} strokeWidth={3} opacity={0.7} />
              <circle cx={currentX} cy={currentY} r={10} fill={route.color} />
            </g>
          );
        })}
        <text x={960} y={100} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>Smart Routing</text>
        <text x={960} y={160} textAnchor="middle" fill={colors.accent} fontSize={28} opacity={titleOpacity}>⚡ Gateway knows exactly where each request goes</text>
      </svg>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene11_Network: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const bgBlue = interpolate(frame, [0, 150], [0, 0.3], { extrapolateRight: "clamp" });
  const pulse = (Math.sin((frame / 20) * Math.PI * 2) + 1) / 2;

  const services = [
    { name: "Orders", color: colors.orders, x: 400, y: 350 },
    { name: "Inventory", color: colors.inventory, x: 960, y: 280 },
    { name: "Products", color: colors.products, x: 1520, y: 350 },
    { name: "Payments", color: colors.payments, x: 680, y: 680 },
    { name: "Users", color: colors.users, x: 1240, y: 680 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <rect x={0} y={0} width={1920} height={1080} fill="#1a365d" opacity={bgBlue} />
        {services.map((service, i) => {
          const s = interpolate(frame, [i * 30, i * 30 + 30], [0, 1], { extrapolateRight: "clamp" });
          return (
            <g key={service.name} transform={`translate(${service.x}, ${service.y}) scale(${s})`} style={{ transformOrigin: "center" }}>
              <circle cx={0} cy={0} r={50 + pulse * 20} fill={service.color} opacity={0.2} />
              <rect x={-50} y={-35} width={100} height={70} rx={10} fill={service.color} />
              <text x={0} y={5} textAnchor="middle" fill="white" fontSize={16} fontWeight="bold">{service.name}</text>
            </g>
          );
        })}
        <text x={960} y={100} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>The Network Emerges</text>
        <text x={960} y={160} textAnchor="middle" fill={colors.network} fontSize={28} opacity={titleOpacity}>Services connected, talking to each other</text>
      </svg>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene27_ZoomOut: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const zoomScale = interpolate(frame, [0, 250], [3, 0.5], { extrapolateRight: "clamp" });
  const labelsOpacity = interpolate(frame, [150, 250], [0, 1], { extrapolateRight: "clamp" });

  const services = [
    { name: "Orders", color: colors.orders, x: 800, y: 400 },
    { name: "Orders 2", color: colors.orders, x: 800, y: 650 },
    { name: "Inventory", color: colors.inventory, x: 1100, y: 400 },
    { name: "Products", color: colors.products, x: 1100, y: 650 },
    { name: "Users", color: colors.users, x: 950, y: 250 },
    { name: "Payments", color: colors.payments, x: 950, y: 800 },
    { name: "API Gateway", color: colors.accent, x: 950, y: 525 },
  ];

  const connections = [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform={`translate(960, 540) scale(${zoomScale})`}>
          {connections.map(([from, to], i) => {
            const fromService = services[from];
            const toService = services[to];
            const lineOpacity = interpolate(frame, [100, 200], [0, 0.5], { extrapolateRight: "clamp" });
            return <line key={i} x1={fromService.x - 960} y1={fromService.y - 540} x2={toService.x - 960} y2={toService.y - 540} stroke={colors.network} strokeWidth={3 / zoomScale} opacity={lineOpacity} />;
          })}
          {services.map((service, i) => {
            const serviceOpacity = interpolate(frame, [i * 20, i * 20 + 50], [0, 1], { extrapolateRight: "clamp" });
            return <g key={service.name} transform={`translate(${service.x - 960}, ${service.y - 540})`} opacity={serviceOpacity}><rect x={-40} y={-30} width={80} height={60} rx={8} fill={service.color} /><text x={0} y={5} textAnchor="middle" fill="white" fontSize={14 / zoomScale} fontWeight="bold">{service.name}</text></g>;
          })}
        </g>
        {labelsOpacity > 0 && <g opacity={labelsOpacity}>
          <text x={100} y={900} textAnchor="start" fill={colors.textSecondary} fontSize={18}>• API Gateway: Routes requests</text>
          <text x={100} y={930} textAnchor="start" fill={colors.textSecondary} fontSize={18}>• Multiple service instances</text>
          <text x={100} y={960} textAnchor="start" fill={colors.textSecondary} fontSize={18}>• Independent databases</text>
          <text x={100} y={990} textAnchor="start" fill={colors.textSecondary} fontSize={18}>• Service discovery & load balancing</text>
        </g>}
        {labelsOpacity > 0 && <rect x={300} y={180} width={1320} height={720} fill="none" stroke={colors.accent} strokeWidth={3} strokeDasharray="20,10" opacity={0.5} rx={20} />}
        <text x={960} y={100} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>The Big Picture</text>
        <text x={960} y={160} textAnchor="middle" fill={colors.textSecondary} fontSize={28} opacity={titleOpacity}>All services working together in harmony 🎵</text>
      </svg>
    </AbsoluteFill>
  );
};

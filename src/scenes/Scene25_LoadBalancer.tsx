import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene25_LoadBalancer: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const lbScale = interpolate(frame, [0, 80], [0, 1], { extrapolateRight: "clamp" });
  const funnelOpacity = interpolate(frame, [80, 150], [0, 1], { extrapolateRight: "clamp" });
  const requestCount = Math.floor(interpolate(frame, [100, 200], [1, 3], { extrapolateRight: "clamp" }));

  const services = [
    { name: "Orders 1", color: colors.orders, x: 500, y: 650 },
    { name: "Orders 2", color: colors.orders, x: 960, y: 650 },
    { name: "Orders 3", color: colors.orders, x: 1420, y: 650 },
  ];

  const getRequestPos = (index: number) => {
    const startFrame = 150 + index * 30;
    const progress = interpolate(frame, [startFrame, startFrame + 50], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
    if (progress <= 0) return null;
    const serviceIndex = index % 3;
    const startX = 960, startY = 400;
    const endX = services[serviceIndex].x, endY = services[serviceIndex].y;
    const t = progress, invT = 1 - t;
    const x = invT * invT * startX + 2 * invT * t * (startX + endX) / 2 + t * t * endX;
    const y = invT * invT * startY + 2 * invT * t * (startY + 100) + t * t * endY;
    return { x, y, targetIndex: serviceIndex };
  };

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {frame >= 100 && Array.from({ length: 5 }).map((_, i) => {
          const progress = ((frame * 3 + i * 20) % 100) / 100;
          const y = 100 + progress * 250;
          return <circle key={i} cx={960} cy={y} r={10} fill={colors.network} opacity={0.7} />;
        })}
        <g transform="translate(960, 400)" opacity={funnelOpacity}>
          <g transform={`scale(${lbScale})`}>
            <path d="M -80 -50 L 80 -50 L 30 50 L -30 50 Z" fill={colors.accent} stroke="white" strokeWidth={3} />
            <path d="M -20 60 L -40 80 M 20 60 L 40 80 M 0 60 L 0 80" stroke={colors.accent} strokeWidth={4} />
            <text x={0} y={110} textAnchor="middle" fill={colors.accent} fontSize={20} fontWeight="bold">Load Balancer</text>
          </g>
        </g>
        {services.map((service, i) => {
          const scale = interpolate(frame, [50 + i * 20, 100 + i * 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <g key={service.name} transform={`translate(${service.x}, ${service.y}) scale(${scale})`} style={{ transformOrigin: "center" }}>
              <rect x={-70} y={-50} width={140} height={100} rx={10} fill={service.color} />
              <text x={0} y={5} textAnchor="middle" fill="white" fontSize={18} fontWeight="bold">{service.name}</text>
              <circle cx={-20} cy={-35} r={6} fill="white" />
              <circle cx={20} cy={-35} r={6} fill="white" />
              <path d="M -10 -25 Q 0 -20 10 -25" stroke="white" strokeWidth={2} fill="none" />
            </g>
          );
        })}
        {Array.from({ length: requestCount * 2 }).map((_, i) => {
          const pos = getRequestPos(i);
          if (!pos) return null;
          return <g key={i}><circle cx={pos.x} cy={pos.y} r={12} fill={colors.orders} /></g>;
        })}
        <text x={960} y={100} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>Load Balancer</text>
        <text x={960} y={160} textAnchor="middle" fill={colors.accent} fontSize={28} opacity={titleOpacity}>⚖️ Distributing requests evenly across instances</text>
        {frame >= 200 && <g transform="translate(960, 850)" opacity={interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" })}><text x={0} y={0} textAnchor="middle" fill={colors.textSecondary} fontSize={20}>Before: 1 service handling 1000 req/s</text><text x={0} y={30} textAnchor="middle" fill={colors.orders} fontSize={20}>After: 3 services handling ~333 req/s each</text></g>}
      </svg>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene19_ServiceDiscovery: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const breakProgress = interpolate(frame, [0, 80], [0, 1], { extrapolateRight: "clamp" });
  const searchAngle = interpolate(frame, [80, 200], [0, 360], { extrapolateRight: "clamp" });
  const searchLength = 100 + Math.sin((frame / 10) * Math.PI * 2) * 20;
  const reconnectProgress = interpolate(frame, [200, 280], [0, 1], { extrapolateRight: "clamp" });
  const registryOpacity = interpolate(frame, [100, 150], [0, 1], { extrapolateRight: "clamp" });
  const successPulse = interpolate(frame, [280, 300], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform="translate(960, 200)" opacity={registryOpacity}>
          <rect x={-100} y={-40} width={200} height={80} rx={10} fill={colors.monolith} stroke={colors.accent} strokeWidth={2} />
          <text x={0} y={5} textAnchor="middle" fill={colors.accent} fontSize={18} fontWeight="bold">Service Registry</text>
          <text x={0} y={30} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>"I know where everyone is!"</text>
        </g>
        <g transform="translate(400, 540)">
          <rect x={-60} y={-40} width={120} height={80} rx={10} fill={colors.orders} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={18} fontWeight="bold">Orders</text>
        </g>
        <g transform="translate(1500, 540)">
          <rect x={-60} y={-40} width={120} height={80} rx={10} fill={colors.inventory} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={18} fontWeight="bold">Inventory</text>
          <circle cx={40} cy={-30} r={15} fill={colors.accent} />
          <text x={40} y={-26} textAnchor="middle" fill="black" fontSize={12} fontWeight="bold">NEW</text>
        </g>
        <g opacity={1 - breakProgress}>
          <line x1={460} y1={540} x2={1440} y2={540} stroke={colors.network} strokeWidth={3} strokeDasharray="10,5" />
          <text x={960} y={530} textAnchor="middle" fill={colors.danger} fontSize={14}>?</text>
        </g>
        {frame >= 80 && frame < 200 && (
          <g transform="translate(460, 540)">
            <line x1={0} y1={0} x2={Math.cos((searchAngle * Math.PI) / 180) * searchLength} y2={Math.sin((searchAngle * Math.PI) / 180) * searchLength} stroke={colors.accent} strokeWidth={3} strokeDasharray="10,5" />
            <circle cx={Math.cos((searchAngle * Math.PI) / 180) * searchLength} cy={Math.sin((searchAngle * Math.PI) / 180) * searchLength} r={8} fill={colors.accent}>
              <animate attributeName="r" values="8;12;8" dur="0.5s" repeatCount="indefinite" />
            </circle>
            <text x={Math.cos((searchAngle * Math.PI) / 180) * (searchLength + 30)} y={Math.sin((searchAngle * Math.PI) / 180) * (searchLength + 30)} fill={colors.accent} fontSize={14}>Where's Inventory?</text>
          </g>
        )}
        {frame >= 120 && <g opacity={interpolate(frame, [120, 150], [0, 0.5], { extrapolateRight: "clamp" })}><line x1={400} y1={500} x2={860} y2={240} stroke={colors.accent} strokeWidth={2} strokeDasharray="5,5" opacity={0.5} /></g>}
        {reconnectProgress > 0 && (
          <g>
            <line x1={460} y1={540} x2={460 + (1440 - 460) * reconnectProgress} y2={540} stroke={colors.orders} strokeWidth={4} />
            {reconnectProgress >= 1 && <circle cx={960} cy={540} r={successPulse * 50} fill={colors.orders} opacity={0.3} />}
          </g>
        )}
        {reconnectProgress >= 1 && (
          <text x={960} y={620} textAnchor="middle" fill={colors.orders} fontSize={24} opacity={interpolate(frame, [280, 300], [0, 1], { extrapolateRight: "clamp" })}>Found! Connected at 1500:540</text>
        )}
        <text x={960} y={100} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>Service Discovery</text>
        <text x={960} y={160} textAnchor="middle" fill={colors.accent} fontSize={28} opacity={titleOpacity}>🔍 Services find each other dynamically</text>
      </svg>
    </AbsoluteFill>
  );
};

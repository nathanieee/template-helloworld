import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene24_Load: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const heatLevel = interpolate(frame, [0, 200], [0, 1], { extrapolateRight: "clamp" });
  const r = Math.floor(interpolate(frame, [0, 200], [72, 245], { extrapolateRight: "clamp" }));
  const g = Math.floor(interpolate(frame, [0, 200], [187, 101], { extrapolateRight: "clamp" }));
  const b = Math.floor(interpolate(frame, [0, 200], [120, 101], { extrapolateRight: "clamp" }));
  const serviceColor = `rgb(${r}, ${g}, ${b})`;
  const shakeIntensity = heatLevel * 8;
  const shakeX = Math.sin(frame / 3) * shakeIntensity;
  const shakeY = Math.cos(frame / 3) * shakeIntensity;
  const glowPulse = (Math.sin((frame / 15) * Math.PI * 2) + 1) / 2;
  const requestCount = Math.floor(heatLevel * 1000);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform={`translate(${960 + shakeX}, ${540 + shakeY})`}>
          <circle cx={0} cy={0} r={100 + glowPulse * 50 * heatLevel} fill={serviceColor} opacity={0.3} />
          <rect x={-80} y={-60} width={160} height={120} rx={15} fill={serviceColor} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={24} fontWeight="bold">Orders</text>
          <circle cx={-25} cy={-35} r={10} fill="white" />
          <circle cx={25} cy={-35} r={10} fill="white" />
          <circle cx={-25} cy={-33} r={5} fill="black" />
          <circle cx={25} cy={-33} r={5} fill="black" />
          {heatLevel > 0.3 && Array.from({ length: 5 }).map((_, i) => <ellipse key={i} cx={(i - 2) * 20} cy={-50 + (heatLevel * (frame % 60 + i * 10)) % 50} rx={5 / 2 + Math.random() * 5} ry={5 + Math.random() * 5} fill={colors.network} opacity={0.7} />)}
        </g>
        {heatLevel > 0.1 && Array.from({ length: Math.floor(heatLevel * 20) }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const dist = 200 + (frame * 5 + i * 30) % 300;
          return <circle key={i} cx={960 + Math.cos(angle) * dist} cy={540 + Math.sin(angle) * dist} r={8} fill={colors.network} opacity={1 - dist / 500} />;
        })}
        <g transform="translate(960, 800)">
          <rect x={-200} y={-20} width={400} height={40} rx={10} fill={colors.monolith} />
          <rect x={-195} y={-15} width={390 * heatLevel} height={30} rx={8} fill={heatLevel > 0.7 ? colors.danger : heatLevel > 0.4 ? colors.accent : colors.orders} />
          <text x={0} y={6} textAnchor="middle" fill="white" fontSize={18} fontWeight="bold">{requestCount} requests/sec</text>
        </g>
        <g transform="translate(1500, 200)">
          <text x={0} y={0} textAnchor="middle" fill={colors.text} fontSize={20}>Temperature</text>
          <rect x={-30} y={20} width={60} height={150} rx={5} fill={colors.monolith} />
          <rect x={-25} y={170 - heatLevel * 140} width={50} height={heatLevel * 140} fill={heatLevel > 0.7 ? colors.danger : colors.orders} />
          <text x={0} y={200} textAnchor="middle" fill={colors.text} fontSize={16}>{Math.floor(heatLevel * 100)}°C</text>
        </g>
        <text x={960} y={100} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>Under Load</text>
        <text x={960} y={160} textAnchor="middle" fill={heatLevel > 0.7 ? colors.danger : colors.textSecondary} fontSize={32} opacity={titleOpacity}>{heatLevel < 0.4 ? "Normal traffic" : heatLevel < 0.7 ? "Getting warm... 🌡️" : "OVERHEATING! 🔥🔥🔥"}</text>
      </svg>
    </AbsoluteFill>
  );
};

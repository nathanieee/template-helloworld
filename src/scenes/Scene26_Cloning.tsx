import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene26_Cloning: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const originalService = { x: 960, y: 400, scale: 1, heat: interpolate(frame, [0, 200], [1, 0.2], { extrapolateRight: "clamp" }) };
  const clone1X = interpolate(frame, [50, 150], [2100, 700], { extrapolateRight: "clamp" });
  const clone2X = interpolate(frame, [80, 180], [2100, 1220], { extrapolateRight: "clamp" });
  const clone1Scale = interpolate(frame, [50, 150], [0.5, 1], { extrapolateRight: "clamp" });
  const clone2Scale = interpolate(frame, [80, 180], [0.5, 1], { extrapolateRight: "clamp" });
  const beamOpacity = interpolate(frame, [30, 100], [0, 0.8], { extrapolateRight: "clamp" });
  const beamFade = interpolate(frame, [150, 200], [0.8, 0], { extrapolateLeft: "clamp" });

  const getServiceColor = (heat: number) => {
    const r = Math.floor(interpolate(heat, [0, 1], [72, 245], { extrapolateRight: "clamp" }));
    const g = Math.floor(interpolate(heat, [0, 1], [187, 101], { extrapolateRight: "clamp" }));
    const b = Math.floor(interpolate(heat, [0, 1], [120, 101], { extrapolateRight: "clamp" }));
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {beamOpacity * beamFade > 0 && (
          <g opacity={beamOpacity * beamFade}>
            <path d="M 960 400 Q 800 300 700 400" stroke={colors.accent} strokeWidth={20} fill="none" opacity={0.5} />
            <path d="M 960 400 Q 1100 300 1220 400" stroke={colors.accent} strokeWidth={20} fill="none" opacity={0.5} />
            {Array.from({ length: 10 }).map((_, i) => {
              const t = ((frame * 5 + i * 20) % 100) / 100;
              const x1 = interpolate(t, [0, 1], [960, 700]);
              const y1 = interpolate(t, [0, 1], [400, 400 - Math.sin(t * Math.PI) * 100]);
              return <circle key={i} cx={x1} cy={y1} r={8} fill={colors.accent} />;
            })}
          </g>
        )}
        {Array.from({ length: frame > 30 && frame < 180 ? 20 : 0 }).map((_, i) => {
          const x = 500 + (i * 50) % 1000;
          const y = 200 + (i * 30) % 200;
          const size = 5 + Math.sin(frame / 5 + i) * 3;
          const opacity = (Math.sin(frame / 10 + i) + 1) / 2;
          return <g key={i} opacity={opacity}><path d={`M ${x} ${y - size} L ${x + size * 0.3} ${y - size * 0.3} L ${x + size} ${y} L ${x + size * 0.3} ${y + size * 0.3} L ${x} ${y + size} L ${x - size * 0.3} ${y + size * 0.3} L ${x - size} ${y} L ${x - size * 0.3} ${y - size * 0.3} Z`} fill={colors.accent} /></g>;
        })}
        <g transform={`translate(${originalService.x}, ${originalService.y})`}>
          <rect x={-70} y={-50} width={140} height={100} rx={10} fill={getServiceColor(originalService.heat)} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={20} fontWeight="bold">Orders</text>
          {frame > 100 && <text x={0} y={75} textAnchor="middle" fill={colors.orders} fontSize={14} opacity={1 - originalService.heat}>❄️ Cooling...</text>}
        </g>
        {clone1X < 2000 && <g transform={`translate(${clone1X}, 650) scale(${clone1Scale})`} style={{ transformOrigin: "center" }}><rect x={-70} y={-50} width={140} height={100} rx={10} fill={colors.orders} /><text x={0} y={5} textAnchor="middle" fill="white" fontSize={20} fontWeight="bold">Orders 2</text><circle cx={50} cy={-40} r={20} fill={colors.accent} /><text x={50} y={-36} textAnchor="middle" fill="black" fontSize={12} fontWeight="bold">NEW</text><circle cx={-20} cy={-30} r={6} fill="white" /><circle cx={20} cy={-30} r={6} fill="white" /><path d="M -10 -20 Q 0 -15 10 -20" stroke="white" strokeWidth={2} fill="none" /></g>}
        {clone2X < 2000 && <g transform={`translate(${clone2X}, 650) scale(${clone2Scale})`} style={{ transformOrigin: "center" }}><rect x={-70} y={-50} width={140} height={100} rx={10} fill={colors.orders} /><text x={0} y={5} textAnchor="middle" fill="white" fontSize={20} fontWeight="bold">Orders 3</text><circle cx={50} cy={-40} r={20} fill={colors.accent} /><text x={50} y={-36} textAnchor="middle" fill="black" fontSize={12} fontWeight="bold">NEW</text><circle cx={-20} cy={-30} r={6} fill="white" /><circle cx={20} cy={-30} r={6} fill="white" /><path d="M -10 -20 Q 0 -15 10 -20" stroke="white" strokeWidth={2} fill="none" /></g>}
        {frame >= 180 && <g opacity={interpolate(frame, [180, 220], [0, 0.3], { extrapolateRight: "clamp" })}><line x1={960} y1={450} x2={700} y2={600} stroke={colors.orders} strokeWidth={3} /><line x1={960} y1={450} x2={1220} y2={600} stroke={colors.orders} strokeWidth={3} /><line x1={700} y1={600} x2={1220} y2={600} stroke={colors.orders} strokeWidth={3} /></g>}
        <text x={960} y={100} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>Horizontal Scaling</text>
        <text x={960} y={160} textAnchor="middle" fill={colors.accent} fontSize={28} opacity={titleOpacity}>✨ Clone services to handle more load</text>
        {frame >= 200 && <g transform="translate(960, 900)" opacity={interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" })}><text x={0} y={0} textAnchor="middle" fill={colors.orders} fontSize={24}>3 instances = 3x capacity! 📈</text></g>}
      </svg>
    </AbsoluteFill>
  );
};

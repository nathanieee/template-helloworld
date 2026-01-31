import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene29_TheEnd: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const starOpacity = interpolate(frame, [50, 150], [0, 1], { extrapolateRight: "clamp" });
  const duckX = interpolate(frame, [0, 100], [2100, 960], { extrapolateRight: "clamp" });
  const duckY = interpolate(frame, [0, 100], [200, 400], { extrapolateRight: "clamp" });
  const circleProgress = interpolate(frame, [100, 200], [0, 1], { extrapolateRight: "clamp" });
  const circleAngle = circleProgress * Math.PI * 2;
  const landY = interpolate(frame, [200, 250], [400, 540], { extrapolateRight: "clamp" });
  const fadeOpacity = interpolate(frame, [250, 300], [0, 1], { extrapolateRight: "clamp" });
  const textOpacity = interpolate(frame, [150, 200], [0, 1], { extrapolateRight: "clamp" });

  const getDuckPosition = () => {
    if (frame < 100) return { x: duckX, y: duckY, rotation: 0 };
    if (frame < 200) {
      return { x: 960 + Math.cos(circleAngle) * 200, y: 400 + Math.sin(circleAngle) * 200, rotation: circleAngle * (180 / Math.PI) + 90 };
    }
    return { x: 960, y: landY, rotation: 0 };
  };

  const duckPos = getDuckPosition();
  const wingFlap = Math.sin((frame / 5) * Math.PI * 2) * 20;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {starOpacity > 0 && <g opacity={starOpacity}>{Array.from({ length: 50 }).map((_, i) => <circle key={i} cx={Math.random() * 1920} cy={Math.random() * 1080} r={Math.random() * 2 + 1} fill="white" opacity={Math.random() * 0.5 + 0.3} />)}</g>}
        <g transform={`translate(${duckPos.x}, ${duckPos.y}) rotate(${duckPos.rotation})`}>
          <ellipse cx={0} cy={0} rx={50} ry={30} fill={colors.accent} />
          <circle cx={40} cy={-15} r={25} fill={colors.accent} />
          <circle cx={50} cy={-20} r={8} fill="white" />
          <circle cx={52} cy={-20} r={4} fill="black" />
          <polygon points="65,-15 85,-10 65,-5" fill={colors.inventory} />
          <ellipse cx={-10} cy={-20 + wingFlap / 2} rx={30} ry={15} fill={colors.accent} opacity={0.8} />
          {frame >= 200 && <ellipse cx={-15} cy={35} rx={15} ry={6} fill={colors.inventory} />}
          {frame >= 200 && <ellipse cx={15} cy={35} rx={15} ry={6} fill={colors.inventory} />}
        </g>
        <g opacity={textOpacity}>
          <text x={960} y={700} textAnchor="middle" fill={colors.text} fontSize={64} fontWeight="bold">Microservices!</text>
          <text x={960} y={770} textAnchor="middle" fill={colors.textSecondary} fontSize={36}>Complex, but powerful 🚀</text>
          <text x={960} y={830} textAnchor="middle" fill={colors.textSecondary} fontSize={28}>Thanks for watching! 🎬</text>
        </g>
        <rect x={0} y={0} width={1920} height={1080} fill="black" opacity={fadeOpacity} />
        {fadeOpacity > 0.5 && <text x={960} y={540} textAnchor="middle" fill="white" fontSize={96} fontWeight="bold" opacity={fadeOpacity}>The End</text>}
      </svg>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../styles/colors";

export const Scene28_Tradeoff: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const scaleAngle = interpolate(frame, [0, 150], [0, 20], { extrapolateRight: "clamp" });
  const simplicityWeight = 1;
  const flexibilityWeight = interpolate(frame, [50, 150], [0, 1], { extrapolateRight: "clamp" });
  const labelsOpacity = interpolate(frame, [150, 200], [0, 1], { extrapolateRight: "clamp" });
  const prosOpacity = interpolate(frame, [200, 250], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <g transform="translate(960, 500)">
          <rect x={-20} y={100} width={40} height={60} rx={5} fill={colors.monolith} />
          <polygon points="-40,100 40,100 0,60" fill={colors.monolith} />
          <g transform={`rotate(${-scaleAngle})`}>
            <rect x={-250} y={-5} width={500} height={10} rx={5} fill={colors.monolith} />
            <g transform="translate(-250, 0)">
              <line x1={0} y1={0} x2={0} y2={40} stroke={colors.monolith} strokeWidth={3} />
              <ellipse cx={0} cy={50} rx={80} ry={20} fill={colors.monolith} opacity={0.7} />
              <rect x={-30} y={30} width={60} height={40} rx={5} fill={colors.monolith} opacity={simplicityWeight} />
              <text x={0} y={55} textAnchor="middle" fill={colors.text} fontSize={12}>Monolith</text>
            </g>
            <g transform="translate(250, 0)">
              <line x1={0} y1={0} x2={0} y2={40} stroke={colors.monolith} strokeWidth={3} />
              <ellipse cx={0} cy={50} rx={80} ry={20} fill={colors.orders} opacity={0.7} />
              <g opacity={flexibilityWeight}>
                <rect x={-35} y={25} width={20} height={20} rx={3} fill={colors.orders} />
                <rect x={-10} y={20} width={25} height={25} rx={3} fill={colors.inventory} />
                <rect x={15} y={28} width={20} height={17} rx={3} fill={colors.products} />
              </g>
            </g>
          </g>
          <circle cx={0} cy={0} r={15} fill={colors.accent} />
        </g>
        <g opacity={labelsOpacity}>
          <text x={500} y={700} textAnchor="middle" fill={colors.text} fontSize={32} fontWeight="bold">Simplicity</text>
          <text x={1420} y={700} textAnchor="middle" fill={colors.text} fontSize={32} fontWeight="bold">Flexibility</text>
          <polygon points="1420,730 1400,770 1440,730" fill={colors.orders} />
        </g>
        <g opacity={prosOpacity}>
          <g transform="translate(200, 350)">
            <text x={0} y={0} fill={colors.text} fontSize={20} fontWeight="bold">Monolith:</text>
            <text x={0} y={30} fill={colors.orders} fontSize={16}>✓ Easy to develop</text>
            <text x={0} y={55} fill={colors.orders} fontSize={16}>✓ Simple to deploy</text>
            <text x={0} y={80} fill={colors.danger} fontSize={16}>✗ Hard to scale</text>
            <text x={0} y={105} fill={colors.danger} fontSize={16}>✗ Tightly coupled</text>
          </g>
          <g transform="translate(1200, 350)">
            <text x={0} y={0} fill={colors.text} fontSize={20} fontWeight="bold">Microservices:</text>
            <text x={0} y={30} fill={colors.orders} fontSize={16}>✓ Independent scaling</text>
            <text x={0} y={55} fill={colors.orders} fontSize={16}>✓ Flexible deployment</text>
            <text x={0} y={80} fill={colors.danger} fontSize={16}>✗ Complex architecture</text>
            <text x={0} y={105} fill={colors.danger} fontSize={16}>✗ More operational overhead</text>
          </g>
        </g>
        <text x={960} y={100} textAnchor="middle" fill={colors.text} fontSize={48} fontWeight="bold" opacity={titleOpacity}>The Trade-off</text>
        <text x={960} y={160} textAnchor="middle" fill={colors.textSecondary} fontSize={28} opacity={titleOpacity}>⚖️ Simplicity vs. Flexibility</text>
      </svg>
    </AbsoluteFill>
  );
};

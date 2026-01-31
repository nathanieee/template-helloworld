import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame, DustParticles, SparkParticles, useWiggle, usePulse } from "../animation-engine";
import { KurzgesagtStickFigure } from "../components/kurzgesagt/KurzgesagtStickFigure";
import { colors } from "../styles/colors";

export const Scene6_Decision: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const bulbScale = springForFrame(frame, 0, 60, 0.3, 0.7);
  const thoughtOpacity = interpolate(frame, [60, 120], [0, 1], { extrapolateRight: "clamp" });
  const option1Opacity = interpolate(frame, [100, 150], [0, 1], { extrapolateRight: "clamp" });
  const option2Opacity = interpolate(frame, [150, 200], [0, 1], { extrapolateRight: "clamp" });

  const questionY = interpolate(frame, [50, 100], [400, 200], { extrapolateRight: "clamp" });
  const glowPulse = usePulse({ min: 0.2, max: 0.5, speed: 0.04 });
  const glowSize = 80 + glowPulse * 40;
  const wiggleX = useWiggle({ amount: 3, frequency: 0.05 });
  const characterBreath = usePulse({ min: 0.98, max: 1.02, speed: 0.03 });
  const bulbGlow = usePulse({ min: 0.3, max: 0.6, speed: 0.08, phase: 1 });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <DustParticles count={25} speed={0.2} />
        <g transform={"translate(" + (960 + wiggleX) + ", 600) scale(" + characterBreath + ")"}>
          <KurzgesagtStickFigure x={0} y={0} scale={1.8} color={colors.users} facingRight={true} />
          <g opacity={thoughtOpacity}>
            <circle cx={50} cy={-180} r={12} fill="rgba(255,255,255,0.4)" />
            <circle cx={80} cy={-210} r={18} fill="rgba(255,255,255,0.5)" />
            <ellipse cx={150} cy={-260} rx={100} ry={80} fill="rgba(255,255,255,0.95)" />
            <g transform={"translate(150, " + questionY + ") scale(" + bulbScale + ")"}>
              <circle cx={0} cy={0} r={glowSize} fill={colors.accent} opacity={bulbGlow} />
              <circle cx={0} cy={0} r={50} fill={colors.accent} opacity={0.4} />
              <ellipse cx={0} cy={0} rx={45} ry={55} fill={colors.accent} />
              <rect x={-25} y={50} width={50} height={18} rx={4} fill={colors.monolithDark} />
              <rect x={-20} y={68} width={40} height={6} rx={2} fill={colors.monolithDark} />
              <rect x={-18} y={76} width={36} height={4} rx={2} fill={colors.monolithDark} />
              <ellipse cx={-18} cy={-15} rx={12} ry={25} fill="white" opacity={0.5} />
              <SparkParticles count={12} origin={{ x: 0, y: 0 }} burstFrame={60} color={colors.accent} lifetime={50} />
            </g>
          </g>
        </g>
        <g transform="translate(960, 750)">
          <g opacity={option1Opacity}>
            <rect x={-380} y={0} width={340} height={90} rx={15} fill={colors.monolith} opacity={0.85} />
            <rect x={-380} y={0} width={340} height={90} rx={15} fill="none" stroke={colors.monolithLight} strokeWidth={2} opacity={0.5} />
            <text x={-210} y={55} textAnchor="middle" fill={colors.text} fontSize={26} fontWeight="500">Keep Monolith</text>
          </g>
          <g opacity={option2Opacity}>
            <rect x={40} y={0} width={340} height={90} rx={15} fill={colors.orders} opacity={0.85} />
            <rect x={40} y={0} width={340} height={90} rx={15} fill="none" stroke={colors.ordersLight} strokeWidth={2} opacity={0.5} />
            <text x={210} y={55} textAnchor="middle" fill={colors.text} fontSize={26} fontWeight="500">Split to Services</text>
          </g>
        </g>
        <text x={960} y={150} textAnchor="middle" fill={colors.text} fontSize={52} fontWeight="bold" opacity={titleOpacity}>The Decision</text>
        <text x={960} y={215} textAnchor="middle" fill={colors.textSecondary} fontSize={32} opacity={titleOpacity}>"There must be a better way..."</text>
      </svg>
    </AbsoluteFill>
  );
};

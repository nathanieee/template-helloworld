import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame, CameraShake, DustParticles, SmokeParticles, SparkParticles, usePulse } from "../animation-engine";
import { KurzgesagtCube } from "../components/kurzgesagt/KurzgesagtCube";
import { colors } from "../styles/colors";

export const Scene9_SheddingSkin: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const crackProgress = springForFrame(frame, 60, 150, 0.3, 0.6);

  const shell1Y = interpolate(frame, [120, 250], [0, 400], { extrapolateRight: "clamp" });
  const shell1Rotation = interpolate(frame, [120, 250], [0, 60], { extrapolateRight: "clamp" });
  const shell1X = interpolate(frame, [120, 250], [0, -100], { extrapolateRight: "clamp" });

  const shell2Y = interpolate(frame, [140, 280], [0, 450], { extrapolateRight: "clamp" });
  const shell2Rotation = interpolate(frame, [140, 280], [0, -45], { extrapolateRight: "clamp" });
  const shell2X = interpolate(frame, [140, 280], [0, 120], { extrapolateRight: "clamp" });

  const glowIntensity = springForFrame(frame, 80, 180, 0.2, 0.7);
  const emergenceScale = elasticOutForFrame(frame, 160, 240, 1.3, 0.35);
  const emergenceOpacity = springForFrame(frame, 160, 220, 0.25, 0.8);
  const emergenceBreath = usePulse({ min: 0.97, max: 1.03, speed: 0.04, phase: 1 });

  const crack1Length = interpolate(frame, [100, 140], [0, 100], { extrapolateRight: "clamp" });
  const crack2Length = interpolate(frame, [110, 150], [0, 80], { extrapolateRight: "clamp" });
  const crack3Length = interpolate(frame, [105, 145], [0, 70], { extrapolateRight: "clamp" });

  return (
    <CameraShake startFrame={120} duration={50} intensity={12} decay={true}>
      <AbsoluteFill style={{ backgroundColor: colors.background }}>
        <svg width={1920} height={1080}>
          <DustParticles count={20} speed={0.15} />

          <g transform="translate(960, 540)">
            <circle cx={0} cy={0} r={180 + glowIntensity * 80} fill={colors.orders} opacity={glowIntensity * 0.25} />

            <g opacity={1 - crackProgress * 0.8}>
              <ellipse cx={0} cy={0} rx={140} ry={170} fill="none" stroke={colors.monolith} strokeWidth={6} />
              <ellipse cx={0} cy={0} rx={140} ry={170} fill={colors.monolith} opacity={0.6} />
              {crackProgress > 0 && (
                <g opacity={crackProgress}>
                  <line x1={0} y1={-170} x2={0} y2={-170 + crack1Length} stroke={colors.background} strokeWidth={4 + crackProgress * 8} />
                  <line x1={0} y1={-100} x2={-crack2Length * 0.7} y2={-50 + crack2Length * 0.5} stroke={colors.background} strokeWidth={3 + crackProgress * 6} />
                  <line x1={0} y1={-80} x2={crack3Length * 0.6} y2={-30 + crack3Length * 0.4} stroke={colors.background} strokeWidth={3 + crackProgress * 6} />
                </g>
              )}
            </g>

            <g transform={"translate(" + shell1X + ", " + shell1Y + ") rotate(" + shell1Rotation + ")"} opacity={crackProgress}>
              <path d="M -80 -100 Q 0 -130 80 -100 L 50 20 L -50 20 Z" fill={colors.monolith} stroke={colors.monolithDark} strokeWidth={3} />
            </g>
            <g transform={"translate(" + shell2X + ", " + shell2Y + ") rotate(" + shell2Rotation + ")"} opacity={crackProgress}>
              <path d="M -60 20 Q 0 40 60 20 L 40 100 L -40 100 Z" fill={colors.monolith} stroke={colors.monolithDark} strokeWidth={3} />
            </g>

            {frame >= 120 && <SmokeParticles count={15} origin={{ x: 0, y: -50 }} startFrame={120} color={colors.monolithLight} speed={1.2} />}

            <g transform={"scale(" + (emergenceScale * emergenceBreath) + ")"} opacity={emergenceOpacity}>
              <ellipse cx={0} cy={90} rx={75} ry={18} fill="rgba(0,0,0,0.2)" />
              <rect x={-75} y={-75} width={150} height={150} rx={20} fill={colors.orders} />
              <rect x={-70} y={-70} width={145} height={145} rx={18} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={3} />
              <rect x={-60} y={-60} width={50} height={50} rx={10} fill="white" opacity={0.25} />
              <text x={0} y={5} textAnchor="middle" fill="white" fontSize={28} fontWeight="bold">Orders</text>
              <text x={0} y={35} textAnchor="middle" fill="white" fontSize={18} opacity={0.9}>Service</text>
              <text x={0} y={60} textAnchor="middle" fill="white" fontSize={14} opacity={0.7}>Born Free!</text>
              {frame >= 180 && <SparkParticles count={12} origin={{ x: 0, y: 0 }} burstFrame={180} color={colors.accent} lifetime={50} />}
            </g>
          </g>

          <text x={960} y={150} textAnchor="middle" fill={colors.text} fontSize={52} fontWeight="bold" opacity={titleOpacity}>Shedding the Old Skin</text>
          <text x={960} y={215} textAnchor="middle" fill={colors.orders} fontSize={30} opacity={titleOpacity}>Like a butterfly emerging from its cocoon</text>

          <g opacity={interpolate(frame, [220, 270], [0, 1], { extrapolateRight: "clamp" })}>
            <text x={960} y={900} textAnchor="middle" fill={colors.success} fontSize={28} fontWeight="bold">A new beginning awaits...</text>
          </g>
        </svg>
      </AbsoluteFill>
    </CameraShake>
  );
};

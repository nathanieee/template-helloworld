import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame, DustParticles, useWiggle, usePulse } from "../animation-engine";
import { KurzgesagtStickFigure } from "../components/kurzgesagt/KurzgesagtStickFigure";
import { colors } from "../styles/colors";

export const Scene7_Blueprint: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });
  const unrollProgress = springForFrame(frame, 30, 130, 0.25, 0.65);
  const blueprintHeight = 650 * unrollProgress;
  const diagramOpacity = springForFrame(frame, 130, 200, 0.2, 0.8);

  const service1Scale = elasticOutForFrame(frame, 150, 190, 1.1, 0.35);
  const service2Scale = elasticOutForFrame(frame, 180, 220, 1.1, 0.35);
  const service3Scale = elasticOutForFrame(frame, 210, 250, 1.1, 0.35);

  const service1Opacity = interpolate(frame, [150, 190], [0, 1], { extrapolateRight: "clamp" });
  const service2Opacity = interpolate(frame, [180, 220], [0, 1], { extrapolateRight: "clamp" });
  const service3Opacity = interpolate(frame, [210, 250], [0, 1], { extrapolateRight: "clamp" });

  const blueprintGlow = usePulse({ min: 0.1, max: 0.2, speed: 0.03, phase: 2 });
  const characterBreath = usePulse({ min: 0.97, max: 1.03, speed: 0.025 });
  const headTilt = useWiggle({ amount: 2, frequency: 0.03 });

  const pencilX = interpolate(frame, [200, 280], [-300, 200], { extrapolateRight: "clamp" });
  const pencilY = interpolate(frame, [200, 280], [50, -50], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <DustParticles count={20} speed={0.15} opacity={{ min: 0.05, max: 0.2 }} />

        <g transform="translate(960, 540)">
          <rect x={-420} y={-blueprintHeight / 2} width={840} height={blueprintHeight} fill="#1a365d" opacity={0.92} rx={8} />
          <rect x={-420} y={-blueprintHeight / 2} width={840} height={blueprintHeight} fill={colors.accent} opacity={blueprintGlow} rx={8} />

          {Array.from({ length: 10 }).map((_, i) => (
            <line key={"h-" + i} x1={-420} y1={-blueprintHeight / 2 + (i * blueprintHeight) / 10} x2={420} y2={-blueprintHeight / 2 + (i * blueprintHeight) / 10} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={"v-" + i} x1={-420 + (i * 840) / 7} y1={-blueprintHeight / 2} x2={-420 + (i * 840) / 7} y2={blueprintHeight / 2} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          ))}

          <g opacity={diagramOpacity}>
            <text x={0} y={-blueprintHeight / 2 + 50} textAnchor="middle" fill={colors.accent} fontSize={26} fontWeight="bold">MICROSERVICES ARCHITECTURE</text>
            <text x={0} y={-blueprintHeight / 2 + 85} textAnchor="middle" fill={colors.textSecondary} fontSize={16}>Design v1.0 | System Decomposition Plan</text>
          </g>

          <g transform="translate(0, 50)">
            <g transform={"translate(-260, -150) scale(" + service1Scale + ")"} opacity={service1Opacity}>
              <rect x={-70} y={-50} width={140} height={100} rx={12} fill="rgba(66, 153, 225, 0.15)" stroke={colors.orders} strokeWidth={3} />
              <text x={0} y={-15} textAnchor="middle" fill={colors.orders} fontSize={18} fontWeight="bold">Order</text>
              <text x={0} y={10} textAnchor="middle" fill={colors.orders} fontSize={18} fontWeight="bold">Service</text>
              <text x={0} y={35} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>/api/orders</text>
            </g>
            <g transform={"translate(0, -150) scale(" + service2Scale + ")"} opacity={service2Opacity}>
              <rect x={-70} y={-50} width={140} height={100} rx={12} fill="rgba(237, 137, 54, 0.15)" stroke={colors.inventory} strokeWidth={3} />
              <text x={0} y={-15} textAnchor="middle" fill={colors.inventory} fontSize={18} fontWeight="bold">Inventory</text>
              <text x={0} y={10} textAnchor="middle" fill={colors.inventory} fontSize={18} fontWeight="bold">Service</text>
              <text x={0} y={35} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>/api/inventory</text>
            </g>
            <g transform={"translate(260, -150) scale(" + service3Scale + ")"} opacity={service3Opacity}>
              <rect x={-70} y={-50} width={140} height={100} rx={12} fill="rgba(159, 122, 234, 0.15)" stroke={colors.products} strokeWidth={3} />
              <text x={0} y={-15} textAnchor="middle" fill={colors.products} fontSize={18} fontWeight="bold">Product</text>
              <text x={0} y={10} textAnchor="middle" fill={colors.products} fontSize={18} fontWeight="bold">Service</text>
              <text x={0} y={35} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>/api/products</text>
            </g>
          </g>

          <g transform={"translate(" + pencilX + ", " + pencilY + ") rotate(" + ((frame * 2) % 20 - 10) + ")"} opacity={interpolate(frame, [200, 220], [0, 1], { extrapolateRight: "clamp" })}>
            <rect x={-3} y={-60} width={6} height={60} fill="#F6E05E" rx={1} />
            <rect x={-3} y={0} width={6} height={15} fill="#FFB366" rx={1} />
            <polygon points="-3,15 3,15 0,25" fill="#2D3748" />
          </g>
        </g>

        <g transform={"translate(250, " + (700 + headTilt) + ") scale(" + characterBreath + ")"}>
          <KurzgesagtStickFigure x={0} y={0} scale={1.5} color={colors.users} facingRight={true} />
        </g>

        <text x={960} y={100} textAnchor="middle" fill={colors.text} fontSize={52} fontWeight="bold" opacity={titleOpacity}>The Blueprint</text>
        <text x={960} y={160} textAnchor="middle" fill={colors.textSecondary} fontSize={28} opacity={titleOpacity}>A plan for transformation</text>
      </svg>
    </AbsoluteFill>
  );
};

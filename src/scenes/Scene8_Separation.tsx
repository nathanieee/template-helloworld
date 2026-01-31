import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame, DustParticles, SparkParticles, useWiggle, usePulse } from "../animation-engine";
import { colors } from "../styles/colors";

export const Scene8_Separation: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: "clamp" });

  const cube1Spring = springForFrame(frame, 60, 240, 0.15, 0.7);
  const cube2Spring = springForFrame(frame, 60, 240, 0.15, 0.7);
  const cube3Spring = springForFrame(frame, 60, 240, 0.15, 0.7);

  const startPos = 960;
  const currentCube1X = startPos + (400 - startPos) * cube1Spring;
  const currentCube2X = startPos + (960 - startPos) * cube2Spring;
  const currentCube3X = startPos + (1520 - startPos) * cube3Spring;

  const allY = interpolate(frame, [30, 180], [900, 540], { extrapolateRight: "clamp" });

  const rotation1 = useWiggle({ amount: 3, frequency: 0.02, phase: 0 });
  const rotation2 = useWiggle({ amount: 3, frequency: 0.02, phase: 1 });
  const rotation3 = useWiggle({ amount: 3, frequency: 0.02, phase: 2 });

  const breath1 = usePulse({ min: 0.95, max: 1.05, speed: 0.025, phase: 0 });
  const breath2 = usePulse({ min: 0.95, max: 1.05, speed: 0.025, phase: 0.5 });
  const breath3 = usePulse({ min: 0.95, max: 1.05, speed: 0.025, phase: 1 });

  const opacity = springForFrame(frame, 30, 100, 0.25, 0.7);
  const lineOpacity = interpolate(frame, [60, 180], [0.6, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <DustParticles count={25} speed={0.2} />

        <g opacity={lineOpacity}>
          <line x1={currentCube1X} y1={allY} x2={currentCube2X} y2={allY} stroke={colors.monolithLight} strokeWidth={4} strokeDasharray="10,5" />
          <line x1={currentCube2X} y1={allY} x2={currentCube3X} y2={allY} stroke={colors.monolithLight} strokeWidth={4} strokeDasharray="10,5" />
        </g>

        <g transform={"translate(" + currentCube1X + ", " + allY + ") rotate(" + rotation1 + ") scale(" + breath1 + ")"} opacity={opacity}>
          <ellipse cx={0} cy={75} rx={65} ry={15} fill="rgba(0,0,0,0.2)" />
          <rect x={-65} y={-65} width={130} height={130} rx={18} fill={colors.orders} />
          <rect x={-55} y={-55} width={40} height={40} rx={8} fill="white" opacity={0.2} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={24} fontWeight="bold">Orders</text>
          <text x={0} y={30} textAnchor="middle" fill="white" fontSize={14} opacity={0.8}>Service</text>
          {frame > 200 && <SparkParticles count={8} origin={{ x: 0, y: 0 }} burstFrame={200} color={colors.orders} lifetime={40} />}
        </g>

        <g transform={"translate(" + currentCube2X + ", " + allY + ") rotate(" + rotation2 + ") scale(" + breath2 + ")"} opacity={opacity}>
          <ellipse cx={0} cy={75} rx={65} ry={15} fill="rgba(0,0,0,0.2)" />
          <rect x={-65} y={-65} width={130} height={130} rx={18} fill={colors.inventory} />
          <rect x={-55} y={-55} width={40} height={40} rx={8} fill="white" opacity={0.2} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={24} fontWeight="bold">Inventory</text>
          <text x={0} y={30} textAnchor="middle" fill="white" fontSize={14} opacity={0.8}>Service</text>
          {frame > 210 && <SparkParticles count={8} origin={{ x: 0, y: 0 }} burstFrame={210} color={colors.inventory} lifetime={40} />}
        </g>

        <g transform={"translate(" + currentCube3X + ", " + allY + ") rotate(" + rotation3 + ") scale(" + breath3 + ")"} opacity={opacity}>
          <ellipse cx={0} cy={75} rx={65} ry={15} fill="rgba(0,0,0,0.2)" />
          <rect x={-65} y={-65} width={130} height={130} rx={18} fill={colors.products} />
          <rect x={-55} y={-55} width={40} height={40} rx={8} fill="white" opacity={0.2} />
          <text x={0} y={5} textAnchor="middle" fill="white" fontSize={24} fontWeight="bold">Products</text>
          <text x={0} y={30} textAnchor="middle" fill="white" fontSize={14} opacity={0.8}>Service</text>
          {frame > 220 && <SparkParticles count={8} origin={{ x: 0, y: 0 }} burstFrame={220} color={colors.products} lifetime={40} />}
        </g>

        {frame > 230 && <g opacity={interpolate(frame, [230, 250], [0, 1], { extrapolateRight: "clamp" })}>
          <SparkParticles count={15} origin={{ x: 960, y: 540 }} burstFrame={230} color={colors.accent} lifetime={60} />
        </g>}

        <text x={960} y={150} textAnchor="middle" fill={colors.text} fontSize={52} fontWeight="bold" opacity={titleOpacity}>The Separation</text>
        <text x={960} y={215} textAnchor="middle" fill={colors.textSecondary} fontSize={30} opacity={titleOpacity}>Breaking free, one piece at a time</text>

        <g opacity={interpolate(frame, [200, 250], [0, 1], { extrapolateRight: "clamp" })}>
          <text x={960} y={270} textAnchor="middle" fill={colors.orders} fontSize={22}>Each service finds its independence...</text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};

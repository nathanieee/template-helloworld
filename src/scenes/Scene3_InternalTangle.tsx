import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtStickFigure } from "../components/kurzgesagt/KurzgesagtStickFigure";
import { DustParticles, SparkParticles } from "../animation-engine/particles";
import { CameraShake } from "../animation-engine/camera";
import { useWiggle, usePulse } from "../animation-engine/hooks";
import { colors } from "../styles/colors";

interface WireSegment {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  label: string;
  controlPoints: { x: number; y: number }[];
}

export const Scene3_InternalTangle: React.FC = () => {
  const frame = useCurrentFrame();

  // X-ray reveal animation
  const revealProgress = springForFrame(frame, 0, 90, 0.2, 0.7);

  // Wire tangle animation
  const tangleProgress = elasticOutForFrame(frame, 60, 150, 1.1, 0.3);

  // Spark burst when wire is pulled
  const sparkBurstFrame = 180;
  const sparkTriggered = frame >= sparkBurstFrame;

  // Wiggle for the tangled mess
  const tangleWiggle = useWiggle({ amount: 3, frequency: 0.08 });

  // Pulse for the labels
  const labelPulse = usePulse({ min: 0.95, max: 1.05, speed: 0.03 });

  // Wire colors
  const frontendColor = colors.users;
  const logicColor = colors.orders;
  const databaseColor = colors.products;

  // Generate tangled wire path
  const generateTanglePath = (seed: number): string => {
    const centerX = 960;
    const centerY = 540;
    const tangleAmount = tangleProgress * 150;

    let path = `M ${centerX - 200} ${centerY - 250}`;

    // Create a complex tangle
    const controlPoints = [
      { x: centerX - 150 + Math.sin(seed) * tangleAmount, y: centerY - 150 },
      { x: centerX - 100 + Math.cos(seed * 1.5) * tangleAmount, y: centerY - 50 },
      { x: centerX - 50 + Math.sin(seed * 2) * tangleAmount, y: centerY + 50 },
      { x: centerX + Math.cos(seed * 2.5) * tangleAmount, y: centerY },
      { x: centerX + 50 + Math.sin(seed * 3) * tangleAmount, y: centerY - 100 },
      { x: centerX + 100 + Math.cos(seed * 3.5) * tangleAmount, y: centerY },
      { x: centerX + 150 + Math.sin(seed * 4) * tangleAmount, y: centerY + 100 },
      { x: centerX + 200, y: centerY + 200 },
    ];

    for (let i = 0; i < controlPoints.length; i++) {
      const cp = controlPoints[i];
      const nextCp = controlPoints[i + 1] || controlPoints[i];
      const midX = (cp.x + nextCp.x) / 2;
      const midY = (cp.y + nextCp.y) / 2;
      path += ` Q ${cp.x + tangleWiggle} ${cp.y + tangleWiggle} ${midX} ${midY}`;
    }

    return path;
  };

  // Monolith outline (X-ray view)
  const monolithOpacity = revealProgress * 0.3;

  // Small user trying to pull the wire
  const userPullProgress = springForFrame(frame, 150, 200, 0.3, 0.7);
  const userX = 600 + userPullProgress * 100;
  const userY = 400;

  // Wire pull animation
  const wirePullAmount = springForFrame(frame, 170, 200, 0.4, 0.6);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Ambient dust */}
      <DustParticles count={35} size={{ min: 1, max: 2 }} opacity={{ min: 0.1, max: 0.25 }} speed={0.15} />

      {/* Camera shake when sparks fly */}
      {sparkTriggered && (
        <CameraShake startFrame={sparkBurstFrame} duration={40} intensity={12} decay={true} />
      )}

      {/* Spark particles burst */}
      {sparkTriggered && (
        <SparkParticles
          count={20}
          origin={{ x: 960, y: 540 }}
          burstFrame={sparkBurstFrame}
          color={colors.accent}
          speed={1.2}
          lifetime={50}
        />
      )}

      <svg width={1920} height={1080}>
        {/* Monolith X-ray outline */}
        <g opacity={monolithOpacity}>
          <rect
            x={760}
            y={140}
            width={400}
            height={500}
            fill="none"
            stroke={colors.monolithLight}
            strokeWidth={3}
            rx={12}
            strokeDasharray="10,5"
          />
          <text
            x={960}
            y={120}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={18}
            letterSpacing={4}
          >
            X-RAY VIEW
          </text>
        </g>

        {/* Tangled wires */}
        <g opacity={revealProgress}>
          {/* Frontend wire */}
          <path
            d={generateTanglePath(1)}
            stroke={frontendColor}
            strokeWidth={8}
            fill="none"
            strokeLinecap="round"
            opacity={0.9}
          />
          <path
            d={generateTanglePath(1)}
            stroke={colors.usersLight}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            opacity={0.5}
            transform="translate(3, 3)"
          />

          {/* Logic wire */}
          <path
            d={generateTanglePath(2)}
            stroke={logicColor}
            strokeWidth={8}
            fill="none"
            strokeLinecap="round"
            opacity={0.9}
          />
          <path
            d={generateTanglePath(2)}
            stroke={colors.ordersLight}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            opacity={0.5}
            transform="translate(3, 3)"
          />

          {/* Database wire */}
          <path
            d={generateTanglePath(3)}
            stroke={databaseColor}
            strokeWidth={8}
            fill="none"
            strokeLinecap="round"
            opacity={0.9}
          />
          <path
            d={generateTanglePath(3)}
            stroke={colors.productsLight}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            opacity={0.5}
            transform="translate(3, 3)"
          />

          {/* Knot highlight in center */}
          {tangleProgress > 0.5 && (
            <circle
              cx={960 + tangleWiggle}
              cy={540 + tangleWiggle}
              r={30 + Math.sin(frame * 0.1) * 5}
              fill={colors.danger}
              opacity={0.2 * (tangleProgress - 0.5) * 2}
            />
          )}

          {/* Wire labels */}
          {tangleProgress > 0.3 && (
            <>
              <g transform={`translate(700, 280) scale(${labelPulse})`}>
                <rect x={-5} y={-15} width={80} height={24} fill={frontendColor} rx={4} />
                <text x={35} y={0} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold">
                  Frontend
                </text>
              </g>
              <g transform={`translate(700, 340) scale(${labelPulse})`}>
                <rect x={-5} y={-15} width={60} height={24} fill={logicColor} rx={4} />
                <text x={25} y={0} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold">
                  Logic
                </text>
              </g>
              <g transform={`translate(700, 400) scale(${labelPulse})`}>
                <rect x={-5} y={-15} width={75} height={24} fill={databaseColor} rx={4} />
                <text x={32} y={0} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold">
                  Database
                </text>
              </g>
            </>
          )}
        </g>

        {/* User pulling wire */}
        {userPullProgress > 0 && (
          <g transform={`translate(${userX}, ${userY})`}>
            <KurzgesagtStickFigure
              x={0}
              y={0}
              scale={0.8}
              color={colors.users}
              facingRight={true}
              walking={false}
            />
            {/* Pulling arm motion */}
            <line
              x1={20}
              y1={-20}
              x2={60 + wirePullAmount * 30}
              y2={-30}
              stroke={colors.users}
              strokeWidth={4}
              strokeLinecap="round"
            />
          </g>
        )}

        {/* "Tangled!" text appears with sparks */}
        {sparkTriggered && (
          <text
            x={960}
            y={850}
            textAnchor="middle"
            fill={colors.danger}
            fontSize={48}
            fontWeight="bold"
            opacity={springForFrame(frame, sparkBurstFrame, sparkBurstFrame + 30, 0.3, 0.8)}
          >
            HOPELESSLY TANGLED!
          </text>
        )}

        {/* Title */}
        <text
          x={960}
          y={100}
          textAnchor="middle"
          fill={colors.text}
          fontSize={48}
          fontWeight="bold"
          opacity={springForFrame(frame, 0, 50, 0.3, 0.8)}
        >
          Internal Tangle
        </text>

        {/* Subtitle */}
        <text
          x={960}
          y={950}
          textAnchor="middle"
          fill={colors.textSecondary}
          fontSize={22}
          opacity={springForFrame(frame, 30, 80, 0.3, 0.8)}
        >
          Everything is connected to everything
        </text>
      </svg>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtStickFigure } from "../components/kurzgesagt/KurzgesagtStickFigure";
import { DustParticles } from "../animation-engine/particles";
import { CameraShake } from "../animation-engine/camera";
import { useWiggle, usePulse } from "../animation-engine/hooks";
import { colors } from "../styles/colors";

export const Scene2_Queue: React.FC = () => {
  const frame = useCurrentFrame();

  // Ambient wiggle for the monolith
  const monolithWiggle = useWiggle({ amount: 2, frequency: 0.05 });

  // Pulse for the "Single Point of Entry" text
  const textPulse = usePulse({ min: 0.95, max: 1.05, speed: 0.04 });

  // Users arrive and form queue
  const user1Progress = springForFrame(frame, 0, 120, 0.25, 0.7);
  const user2Progress = springForFrame(frame, 30, 150, 0.25, 0.7);
  const user3Progress = springForFrame(frame, 60, 180, 0.25, 0.7);
  const user4Progress = springForFrame(frame, 90, 210, 0.25, 0.7);
  const user5Progress = springForFrame(frame, 120, 240, 0.25, 0.7);

  // Queue positions
  const queueSpacing = 80;
  const queueStartX = 450;
  const queueY = 700;

  const user1X = queueStartX + user1Progress * queueSpacing * 0;
  const user2X = queueStartX + user2Progress * queueSpacing * 1;
  const user3X = queueStartX + user3Progress * queueSpacing * 2;
  const user4X = queueStartX + user4Progress * queueSpacing * 3;
  const user5X = queueStartX + user5Progress * queueSpacing * 4;

  // Monolith shake intensity (increases as more users arrive)
  const shakeIntensity = interpolate(frame, [0, 240], [0, 8], { extrapolateRight: "clamp" });
  const monolithShake = frame > 100 ? (Math.sin(frame * 0.3) * shakeIntensity) : 0;

  // Title fade in
  const titleOpacity = springForFrame(frame, 150, 200, 0.3, 0.8);

  // Foot tapping animation (impatient users)
  const tapCycle = (frame / 20) % 1;
  const tapOffset = Math.sin(tapCycle * Math.PI * 2) * 5;

  // Door glow (warning sign)
  const doorGlowPulse = usePulse({ min: 0.3, max: 0.6, speed: 0.08 });
  const doorGlowOpacity = springForFrame(frame, 180, 220, 0.2, 0.6);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Ambient dust for atmosphere */}
      <DustParticles count={40} size={{ min: 1, max: 3 }} opacity={{ min: 0.1, max: 0.3 }} speed={0.2} />

      {/* Camera shake when monolith gets stressed */}
      {frame > 180 && (
        <CameraShake startFrame={180} duration={120} intensity={5} decay={false} />
      )}

      <svg width={1920} height={1080}>
        <g transform={`translate(${960 + monolithShake}, ${540 + monolithWiggle})`}>
          {/* Main monolith body */}
          <rect
            x={-150}
            y={-400}
            width={300}
            height={400}
            fill={colors.monolithDark}
            stroke={colors.monolithLight}
            strokeWidth={2}
            rx={12}
          />

          {/* Warning light on top of monolith */}
          {frame > 180 && (
            <>
              <circle
                cx={0}
                cy={-420}
                r={15}
                fill={colors.danger}
                opacity={doorGlowPulse}
              />
              <circle
                cx={0}
                cy={-420}
                r={25}
                fill={colors.danger}
                opacity={doorGlowPulse * 0.3}
              />
            </>
          )}

          {/* Top decorations - antennas */}
          <rect x={-120} y={-480} width={40} height={80} fill={colors.monolith} rx={4} />
          <rect x={80} y={-480} width={40} height={80} fill={colors.monolith} rx={4} />
          <rect x={-30} y={-520} width={60} height={120} fill={colors.monolith} rx={6} />

          {/* Door frame */}
          <rect x={-40} y={-80} width={80} height={80} fill={colors.background} opacity={0.95} rx={4} />

          {/* Closed door with glow */}
          <rect
            x={-40}
            y={-80}
            width={80}
            height={80}
            fill={colors.monolith}
            rx={4}
          />

          {/* Door warning glow */}
          {doorGlowOpacity > 0 && (
            <ellipse
              cx={0}
              cy={-40}
              rx={40}
              ry={35}
              fill={colors.danger}
              opacity={doorGlowOpacity * 0.2}
            />
          )}

          {/* Highlight on monolith */}
          <rect
            x={-130}
            y={-390}
            width={20}
            height={380}
            fill={colors.monolithLight}
            opacity={0.2}
            rx={4}
          />

          {/* "Single Point of Entry" label */}
          {titleOpacity > 0 && (
            <text
              x={0}
              y={-280}
              textAnchor="middle"
              fill={colors.danger}
              fontSize={24}
              fontWeight="bold"
              opacity={titleOpacity}
              transform={`scale(${textPulse})`}
              style={{ transformOrigin: "0px -280px" }}
            >
              SINGLE POINT OF ENTRY
            </text>
          )}
        </g>

        {/* Queue of users */}
        <KurzgesagtStickFigure
          x={user1X}
          y={queueY + tapOffset * (user1Progress > 0.9 ? 1 : 0)}
          scale={1.1}
          color={colors.users}
          facingRight={true}
          walking={user1Progress < 1}
          walkCycle={(frame / 15) % 1}
        />

        <KurzgesagtStickFigure
          x={user2X}
          y={queueY + tapOffset * (user2Progress > 0.9 ? 1 : 0)}
          scale={1}
          color={colors.orders}
          facingRight={true}
          walking={user2Progress < 1}
          walkCycle={((frame - 30) / 15) % 1}
        />

        <KurzgesagtStickFigure
          x={user3X}
          y={queueY + tapOffset * (user3Progress > 0.9 ? 1 : 0)}
          scale={0.95}
          color={colors.products}
          facingRight={true}
          walking={user3Progress < 1}
          walkCycle={((frame - 60) / 15) % 1}
        />

        <KurzgesagtStickFigure
          x={user4X}
          y={queueY + tapOffset * (user4Progress > 0.9 ? 1 : 0)}
          scale={1.05}
          color={colors.usersDark}
          facingRight={true}
          walking={user4Progress < 1}
          walkCycle={((frame - 90) / 15) % 1}
        />

        <KurzgesagtStickFigure
          x={user5X}
          y={queueY + tapOffset * (user5Progress > 0.9 ? 1 : 0)}
          scale={0.9}
          color={colors.ordersDark}
          facingRight={true}
          walking={user5Progress < 1}
          walkCycle={((frame - 120) / 15) % 1}
        />

        {/* Title */}
        <text
          x={960}
          y={150}
          textAnchor="middle"
          fill={colors.text}
          fontSize={56}
          fontWeight="bold"
          opacity={springForFrame(frame, 0, 50, 0.3, 0.8)}
        >
          The Queue Forms
        </text>

        {/* Subtitle */}
        <text
          x={960}
          y={200}
          textAnchor="middle"
          fill={colors.textSecondary}
          fontSize={24}
          opacity={springForFrame(frame, 30, 80, 0.3, 0.8)}
        >
          Too many requests, not enough room
        </text>
      </svg>
    </AbsoluteFill>
  );
};

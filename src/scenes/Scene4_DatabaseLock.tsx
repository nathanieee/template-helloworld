import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtStickFigure } from "../components/kurzgesagt/KurzgesagtStickFigure";
import { DustParticles, SparkParticles } from "../animation-engine/particles";
import { CameraShake } from "../animation-engine/camera";
import { useWiggle, usePulse } from "../animation-engine/hooks";
import { colors } from "../styles/colors";

export const Scene4_DatabaseLock: React.FC = () => {
  const frame = useCurrentFrame();

  // X-ray view reveal
  const revealProgress = springForFrame(frame, 0, 60, 0.2, 0.7);

  // Lock appearance with elastic snap
  const lockProgress = elasticOutForFrame(frame, 60, 110, 1.3, 0.35);

  // Red glow pulse
  const redGlowPulse = usePulse({ min: 0.4, max: 0.8, speed: 0.06 });

  // User trying to access
  const userApproachProgress = springForFrame(frame, 120, 180, 0.25, 0.7);
  const userBounceProgress = springForFrame(frame, 200, 250, 0.4, 0.6);
  const userBounceAmount = Math.sin((frame - 200) * 0.15) * 30 * userBounceProgress;

  // Lock shake when user tries to open
  const lockShake = frame > 190 && frame < 260 ? useWiggle({ amount: 8, frequency: 0.3 }) : 0;

  // Sections stopping (grey out animation)
  const frontendStopProgress = springForFrame(frame, 130, 160, 0.3, 0.7);
  const logicStopProgress = springForFrame(frame, 145, 175, 0.3, 0.7);

  // "Access Denied" stamp
  const stampProgress = springForFrame(frame, 220, 260, 0.5, 0.6);

  // Spark when bouncing off lock
  const bounceSparkFrame = 250;

  // Monolith X-ray outline
  const monolithOpacity = revealProgress * 0.3;

  // Section positions
  const sections = [
    { name: "Frontend", color: colors.users, y: 250, stopped: false },
    { name: "Logic", color: colors.orders, y: 400, stopped: false },
    { name: "Database", color: colors.products, y: 550, stopped: true },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Ambient dust */}
      <DustParticles count={35} size={{ min: 1, max: 2 }} opacity={{ min: 0.1, max: 0.25 }} speed={0.15} />

      {/* Camera shake on bounce */}
      {frame > 240 && frame < 280 && (
        <CameraShake startFrame={240} duration={50} intensity={8} decay={true} />
      )}

      {/* Spark particles when bouncing off lock */}
      {frame >= bounceSparkFrame && (
        <SparkParticles
          count={12}
          origin={{ x: 960, y: 580 }}
          burstFrame={bounceSparkFrame}
          color={colors.danger}
          speed={0.8}
          lifetime={40}
        />
      )}

      <svg width={1920} height={1080}>
        {/* Monolith X-ray outline */}
        <g opacity={monolithOpacity}>
          <rect
            x={710}
            y={140}
            width={500}
            height={600}
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

        {/* Internal sections */}
        <g opacity={revealProgress}>
          {/* Frontend section */}
          <g>
            <rect
              x={760}
              y={sections[0].y}
              width={400}
              height={100}
              fill={sections[0].color}
              opacity={frontendStopProgress > 0.5 ? 0.3 : 0.8}
              rx={8}
            />
            <text
              x={960}
              y={sections[0].y + 60}
              textAnchor="middle"
              fill="white"
              fontSize={24}
              fontWeight="bold"
              opacity={frontendStopProgress > 0.5 ? 0.5 : 1}
            >
              Frontend
            </text>
            {/* Stopped indicator */}
            {frontendStopProgress > 0.5 && (
              <circle cx={820} cy={sections[0].y + 50} r={15} fill={colors.monolithDark} opacity={0.8} />
            )}
          </g>

          {/* Logic section */}
          <g>
            <rect
              x={760}
              y={sections[1].y}
              width={400}
              height={100}
              fill={sections[1].color}
              opacity={logicStopProgress > 0.5 ? 0.3 : 0.8}
              rx={8}
            />
            <text
              x={960}
              y={sections[1].y + 60}
              textAnchor="middle"
              fill="white"
              fontSize={24}
              fontWeight="bold"
              opacity={logicStopProgress > 0.5 ? 0.5 : 1}
            >
              Logic
            </text>
            {/* Stopped indicator */}
            {logicStopProgress > 0.5 && (
              <circle cx={820} cy={sections[1].y + 50} r={15} fill={colors.monolithDark} opacity={0.8} />
            )}
          </g>

          {/* Database section with lock */}
          <g>
            <rect
              x={760}
              y={sections[2].y}
              width={400}
              height={100}
              fill={sections[2].color}
              opacity={0.8}
              rx={8}
            />
            <text
              x={960}
              y={sections[2].y + 60}
              textAnchor="middle"
              fill="white"
              fontSize={24}
              fontWeight="bold"
            >
              Database
            </text>

            {/* Red glow on database */}
            {lockProgress > 0.5 && (
              <rect
                x={760}
                y={sections[2].y}
                width={400}
                height={100}
                fill={colors.danger}
                opacity={redGlowPulse * 0.3}
                rx={8}
              />
            )}

            {/* Giant padlock */}
            {lockProgress > 0 && (
              <g transform={`translate(${960 + lockShake}, ${sections[2].y + 50}) scale(${lockProgress})`}>
                {/* Lock body */}
                <rect x={-40} y={-10} width={80} height={60} fill={colors.monolithDark} rx={8} />
                <rect x={-35} y={-5} width={70} height={50} fill={colors.danger} rx={6} />

                {/* Lock shackle */}
                <path
                  d="M -25 -10 L -25 -40 Q -25 -60 0 -60 Q 25 -60 25 -40 L 25 -10"
                  stroke={colors.monolithDark}
                  strokeWidth={12}
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M -25 -10 L -25 -40 Q -25 -60 0 -60 Q 25 -60 25 -40 L 25 -10"
                  stroke={colors.danger}
                  strokeWidth={8}
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Keyhole */}
                <circle cx={0} cy={15} r={10} fill="black" />
                <rect x={-4} y={15} width={8} height={20} fill="black" rx={2} />

                {/* Lock glow */}
                <circle cx={0} cy={20} r={45} fill={colors.danger} opacity={redGlowPulse * 0.2} />
              </g>
            )}
          </g>
        </g>

        {/* User approaching and bouncing off lock */}
        {userApproachProgress > 0 && (
          <g transform={`translate(${700 + userApproachProgress * 180}, ${sections[2].y + 80 + userBounceAmount})`}>
            <KurzgesagtStickFigure
              x={0}
              y={0}
              scale={0.9}
              color={colors.users}
              facingRight={true}
              walking={userApproachProgress < 1}
              walkCycle={((frame - 120) / 15) % 1}
            />
          </g>
        )}

        {/* "Access Denied" stamp */}
        {stampProgress > 0 && (
          <g
            transform={`translate(960, 800) rotate(${Math.sin(frame * 0.2) * 3}) scale(${stampProgress})`}
            style={{ transformOrigin: "960px 800px" }}
          >
            <rect x={-180} y={-35} width={360} height={70} fill={colors.danger} rx={4} />
            <rect x={-175} y={-30} width={350} height={60} fill="none" stroke="white" strokeWidth={3} rx={2} />
            <text x={0} y={10} textAnchor="middle" fill="white" fontSize={36} fontWeight="bold">
              ACCESS DENIED
            </text>
          </g>
        )}

        {/* Title */}
        <text
          x={960}
          y={80}
          textAnchor="middle"
          fill={colors.text}
          fontSize={48}
          fontWeight="bold"
          opacity={springForFrame(frame, 0, 50, 0.3, 0.8)}
        >
          Database Locked
        </text>

        {/* Warning subtitle */}
        <text
          x={960}
          y={920}
          textAnchor="middle"
          fill={colors.danger}
          fontSize={24}
          opacity={springForFrame(frame, 100, 140, 0.3, 0.8)}
        >
          All requests blocked - single point of failure
        </text>
      </svg>
    </AbsoluteFill>
  );
};

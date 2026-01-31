import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { CameraShake } from "../animation-engine/camera";
import { DustParticles, SparkParticles, SmokeParticles } from "../animation-engine/particles";
import { usePulse, useWiggle } from "../animation-engine/hooks";
import { colors } from "../styles/colors";

/**
 * Scene9: Shedding the Old Skin
 * A service emerges from its monolith shell like a butterfly
 * Features: Crack effect, CameraShake, SmokeParticles, elastic emergence animation,
 * shell pieces falling off, glowing reveal
 */
export const Scene9_SheddingSkin: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animation
  const titleOpacity = springForFrame(frame, 0, 50, 0.3, 0.7);
  const titleScale = elasticOutForFrame(frame, 0, 60, 1.1, 0.35);

  // Crack effect timing
  const crackStartFrame = 80;
  const crackEndFrame = 150;
  const crackProgress = springForFrame(frame, crackStartFrame, crackEndFrame, 0.3, 0.6);

  // Camera shake during crack
  const shakeStartFrame = crackStartFrame + 40;
  const shakeDuration = 60;
  const shakeIntensity = 15;

  // Shell pieces falling off
  const shellFallStartFrame = crackStartFrame + 50;

  const shell1FallProgress = springForFrame(frame, shellFallStartFrame, shellFallStartFrame + 80, 0.25, 0.7);
  const shell1Y = shell1FallProgress * 500;
  const shell1Rotation = shell1FallProgress * 45;
  const shell1X = -shell1FallProgress * 80;

  const shell2FallProgress = springForFrame(frame, shellFallStartFrame + 10, shellFallStartFrame + 90, 0.25, 0.7);
  const shell2Y = shell2FallProgress * 450;
  const shell2Rotation = -shell2FallProgress * 35;
  const shell2X = shell2FallProgress * 100;

  const shell3FallProgress = springForFrame(frame, shellFallStartFrame + 20, shellFallStartFrame + 100, 0.25, 0.7);
  const shell3Y = shell3FallProgress * 480;
  const shell3Rotation = shell3FallProgress * 25;
  const shell3X = -shell3FallProgress * 50;

  // Shell opacity fade
  const shellOpacity = 1 - crackProgress * 0.8;

  // Glow intensifies as crack progresses
  const glowIntensity = springForFrame(frame, crackStartFrame + 20, crackStartFrame + 80, 0.2, 0.8);
  const glowPulse = usePulse({ min: 0.8, max: 1.2, speed: 0.08, phase: 1 });

  // Emerging service animation
  const emergenceStartFrame = shellFallStartFrame + 60;
  const emergenceProgress = springForFrame(frame, emergenceStartFrame, emergenceStartFrame + 80, 0.25, 0.7);
  const emergenceScale = elasticOutForFrame(frame, emergenceStartFrame + 20, emergenceStartFrame + 80, 1.3, 0.4);
  const emergenceOpacity = springForFrame(frame, emergenceStartFrame, emergenceStartFrame + 50, 0.3, 0.8);

  // Breathing animation for emerged service
  const emergenceBreath = usePulse({ min: 0.97, max: 1.03, speed: 0.04, phase: 1 });
  const emergenceWiggle = useWiggle({ amount: 2, frequency: 0.03 });

  // Crack lines
  const crack1Length = interpolate(frame, [crackStartFrame, crackStartFrame + 40], [0, 120], { extrapolateRight: "clamp" });
  const crack2Length = interpolate(frame, [crackStartFrame + 10, crackStartFrame + 50], [0, 90], { extrapolateRight: "clamp" });
  const crack3Length = interpolate(frame, [crackStartFrame + 5, crackStartFrame + 45], [0, 70], { extrapolateRight: "clamp" });
  const crack4Length = interpolate(frame, [crackStartFrame + 15, crackStartFrame + 55], [0, 80], { extrapolateRight: "clamp" });

  // Crack width increases
  const crackWidth = 2 + crackProgress * 8;

  // Smoke particles
  const smokeStartFrame = shellFallStartFrame + 30;

  // Spark celebration when fully emerged
  const sparkBurstFrame = emergenceStartFrame + 80;

  // Subtitle animations
  const subtitle1Opacity = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });
  const subtitle2Opacity = interpolate(frame, [emergenceStartFrame + 60, emergenceStartFrame + 100], [0, 1], { extrapolateRight: "clamp" });
  const subtitle3Opacity = interpolate(frame, [sparkBurstFrame + 20, sparkBurstFrame + 60], [0, 1], { extrapolateRight: "clamp" });

  // Background glow
  const backgroundGlowOpacity = interpolate(frame, [emergenceStartFrame, emergenceStartFrame + 60], [0, 0.3], { extrapolateRight: "clamp" });

  // Particle effects
  const particleOpacity = interpolate(frame, [0, 60], [0, 0.3], { extrapolateRight: "clamp" });

  // Service that emerges (Orders service as example)
  const emergingService = {
    name: "Orders",
    color: colors.orders,
    icon: "📦",
  };

  return (
    <CameraShake startFrame={shakeStartFrame} duration={shakeDuration} intensity={shakeIntensity} decay={true}>
      <AbsoluteFill style={{ backgroundColor: colors.background }}>
        {/* Ambient dust particles */}
        <DustParticles count={25} speed={0.15} />

        {/* Smoke particles when shell breaks */}
        {frame >= smokeStartFrame && (
          <SmokeParticles
            count={20}
            origin={{ x: 960, y: 540 }}
            startFrame={smokeStartFrame}
            color={colors.monolithLight}
            speed={1.5}
          />
        )}

        {/* Secondary smoke - darker */}
        {frame >= smokeStartFrame + 20 && (
          <SmokeParticles
            count={12}
            origin={{ x: 960, y: 600 }}
            startFrame={smokeStartFrame + 20}
            color={colors.monolithDark}
            speed={1.2}
          />
        )}

        {/* Spark burst when service fully emerges */}
        {frame >= sparkBurstFrame && frame < sparkBurstFrame + 80 && (
          <SparkParticles
            count={30}
            origin={{ x: 960, y: 540 }}
            burstFrame={sparkBurstFrame}
            color={colors.accent}
            speed={1.5}
            lifetime={80}
          />
        )}

        {/* Secondary sparks - service color */}
        {frame >= sparkBurstFrame + 10 && frame < sparkBurstFrame + 90 && (
          <SparkParticles
            count={20}
            origin={{ x: 960, y: 540 }}
            burstFrame={sparkBurstFrame + 10}
            color={emergingService.color}
            speed={1.3}
            lifetime={70}
          />
        )}

        <svg width={1920} height={1080}>
          {/* Background glow when service emerges */}
          {backgroundGlowOpacity > 0 && (
            <circle
              cx={960}
              cy={540}
              r={400}
              fill={emergingService.color}
              opacity={backgroundGlowOpacity * 0.15}
            />
          )}

          {/* Title */}
          <g
            transform={`translate(960, 100) scale(${titleScale})`}
            style={{ transformOrigin: "960px 100px" }}
          >
            <text
              x={0}
              y={0}
              textAnchor="middle"
              fill={colors.text}
              fontSize={56}
              fontWeight="bold"
              opacity={titleOpacity}
            >
              Shedding the Old Skin
            </text>
            <text
              x={0}
              y={50}
              textAnchor="middle"
              fill={colors.textSecondary}
              fontSize={28}
              opacity={titleOpacity * 0.8}
            >
              Like a butterfly emerging from its cocoon
            </text>
          </g>

          {/* Subtitle 1 - Before crack */}
          {subtitle1Opacity > 0 && (
            <text
              x={960}
              y={200}
              textAnchor="middle"
              fill={colors.textSecondary}
              fontSize={24}
              opacity={subtitle1Opacity}
            >
              Something is about to break free...
            </text>
          )}

          {/* Main container */}
          <g transform="translate(960, 540)">
            {/* Inner glow */}
            <circle
              cx={0}
              cy={0}
              r={100 + glowIntensity * 80 * glowPulse}
              fill={emergingService.color}
              opacity={glowIntensity * 0.3}
            />

            {/* Outer glow ring */}
            <circle
              cx={0}
              cy={0}
              r={140 + glowIntensity * 60}
              fill={emergingService.color}
              opacity={glowIntensity * 0.15}
            />

            {/* Monolith shell (before it cracks) */}
            {shellOpacity > 0 && (
              <g opacity={shellOpacity}>
                {/* Main shell body */}
                <ellipse
                  cx={0}
                  cy={0}
                  rx={150}
                  ry={180}
                  fill={colors.monolith}
                  stroke={colors.monolithLight}
                  strokeWidth={4}
                />

                {/* Shell highlight */}
                <ellipse
                  cx={-40}
                  cy={-60}
                  rx={30}
                  ry={50}
                  fill={colors.monolithLight}
                  opacity={0.3}
                />

                {/* Shell shadow */}
                <ellipse
                  cx={50}
                  cy={70}
                  rx={40}
                  ry={60}
                  fill={colors.monolithDark}
                  opacity={0.3}
                />

                {/* Crack lines */}
                {crackProgress > 0 && (
                  <g opacity={crackProgress}>
                    {/* Main vertical crack */}
                    <line
                      x1={0}
                      y1={-180}
                      x2={0}
                      y2={-180 + crack1Length}
                      stroke={colors.background}
                      strokeWidth={crackWidth}
                      strokeLinecap="round"
                    />

                    {/* Left diagonal crack */}
                    <line
                      x1={0}
                      y1={-100}
                      x2={-crack2Length * 0.6}
                      y2={-50 + crack2Length * 0.4}
                      stroke={colors.background}
                      strokeWidth={crackWidth * 0.8}
                      strokeLinecap="round"
                    />

                    {/* Right diagonal crack */}
                    <line
                      x1={0}
                      y1={-80}
                      x2={crack3Length * 0.5}
                      y2={-30 + crack3Length * 0.3}
                      stroke={colors.background}
                      strokeWidth={crackWidth * 0.8}
                      strokeLinecap="round"
                    />

                    {/* Bottom crack */}
                    <line
                      x1={0}
                      y1={20}
                      x2={0}
                      y2={20 + crack4Length}
                      stroke={colors.background}
                      strokeWidth={crackWidth * 0.7}
                      strokeLinecap="round"
                    />

                    {/* Crack glow effect */}
                    <line
                      x1={0}
                      y1={-180}
                      x2={0}
                      y2={-180 + crack1Length}
                      stroke={emergingService.color}
                      strokeWidth={crackWidth * 0.5}
                      opacity={0.8}
                      strokeLinecap="round"
                    />
                  </g>
                )}
              </g>
            )}

            {/* Falling shell pieces */}
            {shell1FallProgress > 0 && (
              <g
                transform={`translate(${shell1X}, ${shell1Y}) rotate(${shell1Rotation})`}
                opacity={1 - shell1FallProgress * 0.5}
              >
                <path
                  d="M -100 -80 Q 0 -120 100 -80 L 80 20 L -80 20 Z"
                  fill={colors.monolith}
                  stroke={colors.monolithDark}
                  strokeWidth={3}
                />
              </g>
            )}

            {shell2FallProgress > 0 && (
              <g
                transform={`translate(${shell2X}, ${shell2Y}) rotate(${shell2Rotation})`}
                opacity={1 - shell2FallProgress * 0.5}
              >
                <path
                  d="M -80 40 Q 0 70 80 40 L 60 120 L -60 120 Z"
                  fill={colors.monolith}
                  stroke={colors.monolithDark}
                  strokeWidth={3}
                />
              </g>
            )}

            {shell3FallProgress > 0 && (
              <g
                transform={`translate(${shell3X}, ${shell3Y}) rotate(${shell3Rotation})`}
                opacity={1 - shell3FallProgress * 0.5}
              >
                <path
                  d="M -70 -60 Q -20 0 30 -50 L 50 30 L -50 50 Z"
                  fill={colors.monolith}
                  stroke={colors.monolithDark}
                  strokeWidth={3}
                />
              </g>
            )}

            {/* Emerging service */}
            {emergenceProgress > 0 && (
              <g
                transform={`translate(${emergenceWiggle}, ${emergenceWiggle * 0.5}) scale(${emergenceScale * emergenceBreath})`}
                opacity={emergenceOpacity}
                style={{ transformOrigin: "0px 0px" }}
              >
                {/* Shadow */}
                <ellipse
                  cx={0}
                  cy={90}
                  rx={85}
                  ry={18}
                  fill="rgba(0,0,0,0.25)"
                />

                {/* Service box */}
                <rect
                  x={-80}
                  y={-80}
                  width={160}
                  height={160}
                  rx={25}
                  fill={emergingService.color}
                />

                {/* 3D depth effect */}
                <rect
                  x={-75}
                  y={-75}
                  width={150}
                  height={150}
                  rx={22}
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth={3}
                />

                {/* Highlight */}
                <rect
                  x={-70}
                  y={-70}
                  width={60}
                  height={60}
                  rx={12}
                  fill="white"
                  opacity={0.25}
                />

                {/* Service icon */}
                <text
                  x={0}
                  y={-20}
                  textAnchor="middle"
                  fontSize={48}
                >
                  {emergingService.icon}
                </text>

                {/* Service name */}
                <text
                  x={0}
                  y={20}
                  textAnchor="middle"
                  fill="white"
                  fontSize={32}
                  fontWeight="bold"
                >
                  {emergingService.name}
                </text>

                {/* "Service" label */}
                <text
                  x={0}
                  y={50}
                  textAnchor="middle"
                  fill="white"
                  fontSize={20}
                  opacity={0.9}
                >
                  Service
                </text>

                {/* "Born Free!" text */}
                {emergenceProgress > 0.7 && (
                  <text
                    x={0}
                    y={105}
                    textAnchor="middle"
                    fill={colors.success}
                    fontSize={22}
                    fontWeight="bold"
                    opacity={(emergenceProgress - 0.7) * 3}
                  >
                    Born Free! ✓
                  </text>
                )}

                {/* Decorative dots */}
                {emergenceProgress > 0.5 && (
                  <>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                      const angle = (i / 8) * Math.PI * 2 + frame * 0.02;
                      const radius = 55;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r={3}
                          fill="white"
                          opacity={0.6}
                        />
                      );
                    })}
                  </>
                )}
              </g>
            )}

            {/* Light rays from emerged service */}
            {emergenceProgress > 0.8 && (
              <g opacity={(emergenceProgress - 0.8) * 5}>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                  const rayLength = 100 + Math.sin(frame * 0.08 + i) * 30;
                  return (
                    <g
                      key={angle}
                      transform={`rotate(${angle})`}
                    >
                      <line
                        x1={90}
                        y1={0}
                        x2={90 + rayLength}
                        y2={0}
                        stroke={emergingService.color}
                        strokeWidth={3}
                        strokeLinecap="round"
                        opacity={0.4}
                      />
                    </g>
                  );
                })}
              </g>
            )}
          </g>

          {/* Subtitle 2 - During emergence */}
          {subtitle2Opacity > 0 && (
            <text
              x={960}
              y={900}
              textAnchor="middle"
              fill={emergingService.color}
              fontSize={26}
              fontWeight="bold"
              opacity={subtitle2Opacity}
            >
              A new beginning awaits...
            </text>
          )}

          {/* Subtitle 3 - Celebration */}
          {subtitle3Opacity > 0 && (
            <text
              x={960}
              y={950}
              textAnchor="middle"
              fill={colors.success}
              fontSize={24}
              fontWeight="bold"
              opacity={subtitle3Opacity}
            >
              Independent, scalable, and ready to grow! 🦋
            </text>
          )}
        </svg>
      </AbsoluteFill>
    </CameraShake>
  );
};

import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { DustParticles, SparkParticles, DataParticles } from "../animation-engine/particles";
import { useWiggle, usePulse, useSquashStretch } from "../animation-engine/hooks";
import { colors } from "../styles/colors";

/**
 * Scene8: The Separation
 * Services break free from the monolith and float apart
 * Features: Spring easing animations, services floating to their positions,
 * connecting lines breaking apart, spark effects, shadow scaling
 */
export const Scene8_Separation: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animation
  const titleOpacity = springForFrame(frame, 0, 50, 0.3, 0.7);
  const titleScale = elasticOutForFrame(frame, 0, 60, 1.1, 0.35);

  // Monolith center position
  const centerX = 960;
  const centerY = 540;

  // Services start at center and float apart
  const separationStartFrame = 60;
  const separationEndFrame = 240;

  const cube1Spring = springForFrame(frame, separationStartFrame, separationEndFrame, 0.15, 0.7);
  const cube2Spring = springForFrame(frame, separationStartFrame + 10, separationEndFrame + 10, 0.15, 0.7);
  const cube3Spring = springForFrame(frame, separationStartFrame + 20, separationEndFrame + 20, 0.15, 0.7);
  const cube4Spring = springForFrame(frame, separationStartFrame + 30, separationEndFrame + 30, 0.15, 0.7);
  const cube5Spring = springForFrame(frame, separationStartFrame + 40, separationEndFrame + 40, 0.15, 0.7);

  // Target positions for each service
  const targetPositions = [
    { x: 400, y: 540 },   // Orders - left
    { x: 960, y: 350 },   // Inventory - top center
    { x: 1520, y: 540 },  // Products - right
    { x: 680, y: 730 },   // Payments - bottom left
    { x: 1240, y: 730 },  // Users - bottom right
  ];

  const currentPositions = targetPositions.map((pos, i) => {
    const spring = [cube1Spring, cube2Spring, cube3Spring, cube4Spring, cube5Spring][i];
    return {
      x: centerX + (pos.x - centerX) * spring,
      y: centerY + (pos.y - centerY) * spring,
    };
  });

  // Opacity fade in for services
  const opacity = springForFrame(frame, separationStartFrame, separationStartFrame + 60, 0.25, 0.8);

  // Connection lines that fade out
  const lineOpacity = interpolate(frame, [separationStartFrame, separationStartFrame + 120], [0.6, 0], { extrapolateRight: "clamp" });

  // Rotation/wiggle for floating effect
  const rotation1 = useWiggle({ amount: 3, frequency: 0.02, phase: 0 });
  const rotation2 = useWiggle({ amount: 3, frequency: 0.02, phase: 1 });
  const rotation3 = useWiggle({ amount: 3, frequency: 0.02, phase: 2 });
  const rotation4 = useWiggle({ amount: 3, frequency: 0.02, phase: 3 });
  const rotation5 = useWiggle({ amount: 3, frequency: 0.02, phase: 4 });

  // Breathing/pulse animation for each service
  const breath1 = usePulse({ min: 0.95, max: 1.05, speed: 0.025, phase: 0 });
  const breath2 = usePulse({ min: 0.95, max: 1.05, speed: 0.025, phase: 0.5 });
  const breath3 = usePulse({ min: 0.95, max: 1.05, speed: 0.025, phase: 1 });
  const breath4 = usePulse({ min: 0.95, max: 1.05, speed: 0.025, phase: 1.5 });
  const breath5 = usePulse({ min: 0.95, max: 1.05, speed: 0.025, phase: 2 });

  // Squash and stretch when services land
  const squash1 = useSquashStretch({ stretchX: 1, stretchY: 1, speed: 0.02, phase: 0 });
  const squash2 = useSquashStretch({ stretchX: 1, stretchY: 1, speed: 0.02, phase: 0.5 });
  const squash3 = useSquashStretch({ stretchX: 1, stretchY: 1, speed: 0.02, phase: 1 });
  const squash4 = useSquashStretch({ stretchX: 1, stretchY: 1, speed: 0.02, phase: 1.5 });
  const squash5 = useSquashStretch({ stretchX: 1, stretchY: 1, speed: 0.02, phase: 2 });

  // Service data
  const services = [
    { name: "Orders", shortName: "ORD", color: colors.orders, icon: "📦" },
    { name: "Inventory", shortName: "INV", color: colors.inventory, icon: "📊" },
    { name: "Products", shortName: "PRD", color: colors.products, icon: "🏷️" },
    { name: "Payments", shortName: "PAY", color: colors.payments, icon: "💳" },
    { name: "Users", shortName: "USR", color: colors.users, icon: "👤" },
  ];

  // Spark bursts when services reach their positions
  const sparkBursts = [
    separationEndFrame,
    separationEndFrame + 10,
    separationEndFrame + 20,
    separationEndFrame + 30,
    separationEndFrame + 40,
  ];

  // Central glow that fades as services separate
  const centralGlowOpacity = interpolate(frame, [separationStartFrame, separationEndFrame], [0.5, 0], { extrapolateRight: "clamp" });

  // Subtitle animations
  const subtitle1Opacity = interpolate(frame, [separationStartFrame + 50, separationStartFrame + 100], [0, 1], { extrapolateRight: "clamp" });
  const subtitle2Opacity = interpolate(frame, [separationEndFrame + 30, separationEndFrame + 70], [0, 1], { extrapolateRight: "clamp" });

  // Connection lines that "break"
  const breakProgress = springForFrame(frame, separationStartFrame + 60, separationStartFrame + 120, 0.3, 0.7);

  // Data particles in background
  const dataParticleOpacity = interpolate(frame, [0, 60], [0, 0.3], { extrapolateRight: "clamp" });

  // Orbiting particles around freed services
  const orbitProgress = springForFrame(frame, separationEndFrame + 50, separationEndFrame + 100, 0.3, 0.7);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Ambient dust particles */}
      <DustParticles count={30} speed={0.2} />

      {/* Data particles */}
      <DataParticles count={20} opacity={dataParticleOpacity} speed={0.15} />

      {/* Spark bursts when services reach their positions */}
      {sparkBursts.map((burstFrame, i) => {
        const pos = targetPositions[i];
        return (
          frame >= burstFrame && frame < burstFrame + 60 && (
            <SparkParticles
              key={i}
              count={12}
              origin={{ x: pos.x, y: pos.y }}
              burstFrame={burstFrame}
              color={services[i].color}
              speed={1.3}
              lifetime={60}
            />
          )
        );
      })}

      {/* Final celebration sparks */}
      {frame >= separationEndFrame + 60 && frame < separationEndFrame + 140 && (
        <SparkParticles
          count={25}
          origin={{ x: 960, y: 540 }}
          burstFrame={separationEndFrame + 60}
          color={colors.accent}
          speed={1.5}
          lifetime={80}
        />
      )}

      <svg width={1920} height={1080}>
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
            The Separation
          </text>
          <text
            x={0}
            y={50}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={28}
            opacity={titleOpacity * 0.8}
          >
            Breaking free, one piece at a time
          </text>
        </g>

        {/* Central glow (monolith energy that disperses) */}
        {centralGlowOpacity > 0 && (
          <g opacity={centralGlowOpacity}>
            <circle cx={centerX} cy={centerY} r={150} fill={colors.monolith} opacity={0.2} />
            <circle cx={centerX} cy={centerY} r={100} fill={colors.monolith} opacity={0.3} />
            <circle cx={centerX} cy={centerY} r={50} fill={colors.monolithLight} opacity={0.4} />
          </g>
        )}

        {/* Connection lines that break */}
        {lineOpacity > 0 && (
          <g opacity={lineOpacity}>
            {/* Lines from center to each service position */}
            <line
              x1={centerX}
              y1={centerY}
              x2={currentPositions[0].x}
              y2={currentPositions[0].y}
              stroke={colors.monolithLight}
              strokeWidth={4}
              strokeDasharray="10,5"
            />
            <line
              x1={centerX}
              y1={centerY}
              x2={currentPositions[1].x}
              y2={currentPositions[1].y}
              stroke={colors.monolithLight}
              strokeWidth={4}
              strokeDasharray="10,5"
            />
            <line
              x1={centerX}
              y1={centerY}
              x2={currentPositions[2].x}
              y2={currentPositions[2].y}
              stroke={colors.monolithLight}
              strokeWidth={4}
              strokeDasharray="10,5"
            />
            <line
              x1={centerX}
              y1={centerY}
              x2={currentPositions[3].x}
              y2={currentPositions[3].y}
              stroke={colors.monolithLight}
              strokeWidth={4}
              strokeDasharray="10,5"
            />
            <line
              x1={centerX}
              y1={centerY}
              x2={currentPositions[4].x}
              y2={currentPositions[4].y}
              stroke={colors.monolithLight}
              strokeWidth={4}
              strokeDasharray="10,5"
            />

            {/* Breaking effect - dashed lines becoming more sparse */}
            {breakProgress > 0 && (
              <>
                {[0, 1, 2, 3, 4].map((i) => {
                  const pos = currentPositions[i];
                  const midX = (centerX + pos.x) / 2;
                  const midY = (centerY + pos.y) / 2;
                  return (
                    <g key={i} opacity={breakProgress}>
                      <circle cx={midX} cy={midY} r={5 + breakProgress * 10} fill={colors.monolithLight} opacity={0.5} />
                    </g>
                  );
                })}
              </>
            )}
          </g>
        )}

        {/* Services floating apart */}
        {services.map((service, i) => {
          const pos = currentPositions[i];
          const rotation = [rotation1, rotation2, rotation3, rotation4, rotation5][i];
          const breath = [breath1, breath2, breath3, breath4, breath5][i];
          const squash = [squash1, squash2, squash3, squash4, squash5][i];
          const spring = [cube1Spring, cube2Spring, cube3Spring, cube4Spring, cube5Spring][i];

          // Scale increases as it moves away
          const targetScale = 1 + spring * 0.3;
          const currentScale = breath * targetScale;

          return (
            <g
              key={service.name}
              transform={`translate(${pos.x}, ${pos.y}) rotate(${rotation}) scale(${currentScale})`}
              opacity={opacity}
              style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
            >
              {/* Shadow that grows with distance */}
              <ellipse
                cx={0}
                cy={80}
                rx={70}
                ry={15}
                fill="rgba(0,0,0,0.2)"
              />

              {/* Service box */}
              <rect
                x={-65}
                y={-65}
                width={130}
                height={130}
                rx={20}
                fill={service.color}
              />

              {/* Highlight */}
              <rect
                x={-55}
                y={-55}
                width={50}
                height={50}
                rx={10}
                fill="white"
                opacity={0.2}
              />

              {/* Service icon */}
              <text
                x={0}
                y={-20}
                textAnchor="middle"
                fontSize={36}
              >
                {service.icon}
              </text>

              {/* Service short name */}
              <text
                x={0}
                y={15}
                textAnchor="middle"
                fill="white"
                fontSize={20}
                fontWeight="bold"
              >
                {service.shortName}
              </text>

              {/* Service full name */}
              <text
                x={0}
                y={38}
                textAnchor="middle"
                fill="white"
                fontSize={14}
                opacity={0.9}
              >
                {service.name}
              </text>

              {/* "FREE" badge when fully separated */}
              {spring > 0.9 && (
                <g
                  transform={`translate(40, -50) scale(${(spring - 0.9) * 10})`}
                  style={{ transformOrigin: "40px -50px" }}
                >
                  <rect x={-25} y={-15} width={50} height={30} rx={8} fill={colors.success} />
                  <text x={0} y={5} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold">FREE</text>
                </g>
              )}

              {/* Orbiting particles when free */}
              {spring > 0.95 && orbitProgress > 0 && (
                <>
                  {[0, 1, 2].map((j) => {
                    const angle = (frame * 0.05) + (j * Math.PI * 2 / 3);
                    const orbitRadius = 50;
                    const ox = Math.cos(angle) * orbitRadius;
                    const oy = Math.sin(angle) * orbitRadius;
                    return (
                      <circle
                        key={j}
                        cx={ox}
                        cy={oy}
                        r={3}
                        fill={colors.accent}
                        opacity={orbitProgress * 0.8}
                      />
                    );
                  })}
                </>
              )}
            </g>
          );
        })}

        {/* Subtitle 1 - During separation */}
        {subtitle1Opacity > 0 && (
          <text
            x={960}
            y={220}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={24}
            opacity={subtitle1Opacity}
          >
            Each service finds its independence...
          </text>
        )}

        {/* Subtitle 2 - Separation complete */}
        {subtitle2Opacity > 0 && (
          <text
            x={960}
            y={920}
            textAnchor="middle"
            fill={colors.success}
            fontSize={28}
            fontWeight="bold"
            opacity={subtitle2Opacity}
          >
            Free at last! No more tangles! 🎉
          </text>
        )}

        {/* Decorative elements */}
        {frame > separationEndFrame && (
          <g opacity={interpolate(frame, [separationEndFrame, separationEndFrame + 30], [0, 1], { extrapolateRight: "clamp" })}>
            {/* Small celebratory dots */}
            {[200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800].map((x, i) => (
              <circle
                key={i}
                cx={x}
                cy={Math.sin(i) * 50 + 500}
                r={4}
                fill={colors.accent}
                opacity={0.5}
              />
            ))}
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtCube } from "../components/kurzgesagt/KurzgesagtCube";
import { DustParticles, SparkParticles, DataParticles } from "../animation-engine/particles";
import { usePulse, useWiggle } from "../animation-engine/hooks";
import { colors } from "../styles/colors";

/**
 * Scene10: The Reveal
 * All colorful microservices are revealed with celebration
 * Features: Orbiting services, pulse animations, spark particles,
 * central hub, colorful reveal, celebration effects
 */
export const Scene10_Reveal: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animation with dramatic flash
  const titleOpacity = springForFrame(frame, 0, 50, 0.3, 0.7);
  const titleScale = elasticOutForFrame(frame, 0, 70, 1.2, 0.35);

  // Flash effect at start
  const flashOpacity = interpolate(frame, [20, 60, 100], [0, 0.9, 0], { extrapolateRight: "clamp" });

  // Center pulse for the hub
  const centerPulse = usePulse({ min: 0.97, max: 1.03, speed: 0.025 });

  // Services data - arranged in a circle
  const services = [
    { name: "Orders", color: colors.orders, angle: 0, delay: 0, icon: "📦" },
    { name: "Inventory", color: colors.inventory, angle: 60, delay: 10, icon: "📊" },
    { name: "Products", color: colors.products, angle: 120, delay: 20, icon: "🏷️" },
    { name: "Payments", color: colors.payments, angle: 180, delay: 30, icon: "💳" },
    { name: "Users", color: colors.users, angle: 240, delay: 40, icon: "👤" },
    { name: "Auth", color: colors.danger, angle: 300, delay: 50, icon: "🔐" },
  ];

  const orbitRadius = 280;
  const centerX = 960;
  const centerY = 540;

  // Hub reveal animation
  const hubRevealProgress = springForFrame(frame, 60, 120, 0.3, 0.7);
  const hubScale = elasticOutForFrame(frame, 70, 130, 1.2, 0.35);
  const hubOpacity = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });

  // Service reveals with staggered timing
  const serviceReveals = services.map((service, i) => {
    const revealFrame = 80 + service.delay;
    const revealProgress = springForFrame(frame, revealFrame, revealFrame + 50, 0.25, 0.65);
    const elasticScale = elasticOutForFrame(frame, revealFrame + 10, revealFrame + 50, 1.2, 0.35);
    const opacity = interpolate(frame, [revealFrame, revealFrame + 40], [0, 1], { extrapolateRight: "clamp" });

    return { revealFrame, revealProgress, elasticScale, opacity };
  });

  // Orbit animation
  const orbitProgress = springForFrame(frame, 200, 280, 0.3, 0.7);

  // Connection lines draw animation
  const lineDrawProgress = springForFrame(frame, 150, 220, 0.3, 0.7);

  // Spark bursts
  const sparkBursts = [100, 180, 260];

  // Celebration particles
  const celebrationStartFrame = 280;
  const celebrationProgress = springForFrame(frame, celebrationStartFrame, celebrationStartFrame + 60, 0.3, 0.7);

  // Subtitle animations
  const subtitle1Opacity = interpolate(frame, [80, 120], [0, 1], { extrapolateRight: "clamp" });
  const subtitle2Opacity = interpolate(frame, [220, 260], [0, 1], { extrapolateRight: "clamp" });
  const subtitle3Opacity = interpolate(frame, [celebrationStartFrame + 40, celebrationStartFrame + 80], [0, 1], { extrapolateRight: "clamp" });

  // Background particles
  const particleOpacity = interpolate(frame, [0, 60], [0, 0.3], { extrapolateRight: "clamp" });

  // Orbiting dots around each service
  const orbitDotsProgress = springForFrame(frame, 180, 250, 0.3, 0.7);

  // Celebrating animation for services (they jump/wiggle)
  const celebrateFrame = 280;
  const celebrateProgress = springForFrame(frame, celebrateFrame, celebrateFrame + 30, 0.4, 0.7);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Ambient dust particles */}
      <DustParticles count={35} speed={0.2} />

      {/* Data particles */}
      <DustParticles count={25} />

      {/* Initial flash */}
      {flashOpacity > 0 && (
        <rect
          x={0}
          y={0}
          width={1920}
          height={1080}
          fill="white"
          opacity={flashOpacity}
        />
      )}

      {/* Spark bursts */}
      {sparkBursts.map((burstFrame, i) => {
        return (
          frame >= burstFrame && frame < burstFrame + 70 && (
            <SparkParticles
              key={i}
              count={20 + i * 5}
              origin={{ x: centerX, y: centerY }}
              burstFrame={burstFrame}
              color={i === 0 ? colors.accent : i === 1 ? colors.orders : colors.products}
              speed={1.5}
              lifetime={70}
            />
          )
        );
      })}

      {/* Celebration spark bursts */}
      {frame >= celebrationStartFrame && frame < celebrationStartFrame + 100 && (
        <>
          <SparkParticles
            count={30}
            origin={{ x: centerX, y: centerY }}
            burstFrame={celebrationStartFrame}
            color={colors.accent}
            speed={1.8}
            lifetime={100}
          />
          <SparkParticles
            count={20}
            origin={{ x: centerX - 300, y: centerY }}
            burstFrame={celebrationStartFrame + 10}
            color={colors.orders}
            speed={1.5}
            lifetime={80}
          />
          <SparkParticles
            count={20}
            origin={{ x: centerX + 300, y: centerY }}
            burstFrame={celebrationStartFrame + 10}
            color={colors.products}
            speed={1.5}
            lifetime={80}
          />
        </>
      )}

      <svg width={1920} height={1080}>
        {/* Title */}
        <g
          transform={`translate(${centerX}, 100) scale(${titleScale})`}
          style={{ transformOrigin: `${centerX}px 100px` }}
        >
          <text
            x={0}
            y={0}
            textAnchor="middle"
            fill={colors.text}
            fontSize={60}
            fontWeight="bold"
            opacity={titleOpacity}
          >
            The Reveal
          </text>
          <text
            x={0}
            y={55}
            textAnchor="middle"
            fill={colors.accent}
            fontSize={32}
            opacity={titleOpacity * 0.9}
          >
            Meet the new microservices!
          </text>
        </g>

        {/* Subtitle 1 */}
        {subtitle1Opacity > 0 && (
          <text
            x={centerX}
            y={200}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={24}
            opacity={subtitle1Opacity}
          >
            Each service independent, scalable, and free to evolve...
          </text>
        )}

        {/* Main scene container */}
        <g transform={`translate(${centerX}, ${centerY}) scale(${centerPulse})`}>
          {/* Connection lines */}
          {lineDrawProgress > 0 && (
            <g opacity={lineDrawProgress}>
              {services.map((service) => {
                const angleRad = (service.angle - 90) * (Math.PI / 180);
                const x = Math.cos(angleRad) * orbitRadius;
                const y = Math.sin(angleRad) * orbitRadius;

                return (
                  <line
                    key={service.name}
                    x1={0}
                    y1={0}
                    x2={x}
                    y2={y}
                    stroke={service.color}
                    strokeWidth={2}
                    strokeDasharray="8,4"
                    opacity={0.4}
                  />
                );
              })}

              {/* Central hub circle */}
              <circle
                cx={0}
                cy={0}
                r={50}
                fill="none"
                stroke={colors.accent}
                strokeWidth={3}
                strokeDasharray="5,5"
                opacity={0.6}
              />
            </g>
          )}

          {/* Central Hub - API Gateway */}
          {hubOpacity > 0 && (
            <g
              transform={`scale(${hubScale})`}
              opacity={hubOpacity}
              style={{ transformOrigin: "0px 0px" }}
            >
              {/* Hub glow */}
              <circle
                cx={0}
                cy={0}
                r={70}
                fill={colors.accent}
                opacity={0.2}
              />

              {/* Hub circle */}
              <ellipse
                cx={0}
                cy={0}
                rx={80}
                ry={45}
                fill={colors.monolith}
                opacity={0.9}
              />

              {/* Hub text */}
              <text
                x={0}
                y={5}
                textAnchor="middle"
                fill={colors.text}
                fontSize={16}
                fontWeight="bold"
              >
                API Gateway
              </text>
              <text
                x={0}
                y={22}
                textAnchor="middle"
                fill={colors.textSecondary}
                fontSize={12}
              >
                Microservices
              </text>
            </g>
          )}

          {/* Services arranged in a circle */}
          {services.map((service, i) => {
            const angleRad = (service.angle - 90) * (Math.PI / 180);
            const reveal = serviceReveals[i];

            // Orbit animation - services slowly rotate
            const orbitOffset = orbitProgress * 15; // degrees
            const finalAngle = service.angle + orbitOffset;
            const finalAngleRad = (finalAngle - 90) * (Math.PI / 180);

            const x = Math.cos(finalAngleRad) * orbitRadius;
            const y = Math.sin(finalAngleRad) * orbitRadius;

            // Celebration jump
            const jumpY = frame >= celebrateFrame ? celebrateProgress * -30 : 0;

            return (
              <g
                key={service.name}
                transform={`translate(${x}, ${y + jumpY}) scale(${reveal.elasticScale})`}
                opacity={reveal.opacity}
              >
                {/* Shadow */}
                <ellipse
                  cx={0}
                  cy={55}
                  rx={50}
                  ry={12}
                  fill="rgba(0,0,0,0.2)"
                />

                {/* Connection dot */}
                <circle
                  cx={0}
                  cy={0}
                  r={6}
                  fill={service.color}
                  opacity={0.6}
                />

                {/* Service cube using KurzgesagtCube component */}
                <KurzgesagtCube
                  x={-50}
                  y={-50}
                  size={100}
                  color={service.color}
                  emotion="happy"
                  glow={true}
                  pulseConfig={{ min: 0.95, max: 1.05, speed: 0.03, phase: i * 0.7 }}
                />

                {/* Service name */}
                <text
                  x={0}
                  y={5}
                  textAnchor="middle"
                  fill="white"
                  fontSize={18}
                  fontWeight="bold"
                >
                  {service.name}
                </text>

                {/* Orbiting dots around service */}
                {reveal.revealProgress > 0.8 && orbitDotsProgress > 0 && (
                  <g opacity={orbitDotsProgress}>
                    {[0, 1, 2].map((j) => {
                      const dotAngle = (frame * 0.05) + (j * Math.PI * 2 / 3);
                      const dotRadius = 60;
                      const dx = Math.cos(dotAngle) * dotRadius;
                      const dy = Math.sin(dotAngle) * dotRadius;
                      return (
                        <circle
                          key={j}
                          cx={dx}
                          cy={dy}
                          r={4}
                          fill={colors.accent}
                          opacity={0.8}
                        />
                      );
                    })}
                  </g>
                )}

                {/* Spark effect when service appears */}
                {frame >= reveal.revealFrame && frame < reveal.revealFrame + 50 && (
                  <SparkParticles
                    count={8}
                    origin={{ x: 0, y: 0 }}
                    burstFrame={reveal.revealFrame}
                    color={service.color}
                    speed={1.2}
                    lifetime={40}
                  />
                )}
              </g>
            );
          })}

          {/* Central orbiting particles */}
          {orbitProgress > 0.5 && (
            <g opacity={orbitProgress}>
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2 + frame * 0.02;
                const orbitR = 180;
                const px = Math.cos(angle) * orbitR;
                const py = Math.sin(angle) * orbitR;
                return (
                  <circle
                    key={i}
                    cx={px}
                    cy={py}
                    r={4}
                    fill={colors.accent}
                    opacity={0.6}
                  />
                );
              })}
            </g>
          )}
        </g>

        {/* Subtitle 2 */}
        {subtitle2Opacity > 0 && (
          <text
            x={centerX}
            y={900}
            textAnchor="middle"
            fill={colors.orders}
            fontSize={26}
            fontWeight="bold"
            opacity={subtitle2Opacity}
          >
            The future is scalable! 🚀
          </text>
        )}

        {/* Subtitle 3 - Celebration complete */}
        {subtitle3Opacity > 0 && (
          <text
            x={centerX}
            y={950}
            textAnchor="middle"
            fill={colors.success}
            fontSize={24}
            fontWeight="bold"
            opacity={subtitle3Opacity}
          >
            Welcome to the world of microservices! 🎉
          </text>
        )}

        {/* Decorative celebration elements */}
        {celebrationProgress > 0 && (
          <g opacity={celebrationProgress}>
            {/* Confetti-like circles */}
            {[...Array(20)].map((_, i) => {
              const x = 100 + (i * 90);
              const y = 300 + (i % 3) * 150;
              const color = [colors.accent, colors.orders, colors.products, colors.users, colors.payments][i % 5];
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={6}
                  fill={color}
                  opacity={0.7}
                />
              );
            })}

            {/* Celebration arcs */}
            {[0, 1, 2, 3].map((i) => {
              const angle = i * 45;
              return (
                <g
                  key={i}
                  transform={`translate(${centerX}, ${centerY}) rotate(${angle})`}
                >
                  <path
                    d="M 200 0 Q 250 -50 300 0"
                    stroke={colors.accent}
                    strokeWidth={3}
                    fill="none"
                    opacity={0.5}
                  />
                </g>
              );
            })}
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};

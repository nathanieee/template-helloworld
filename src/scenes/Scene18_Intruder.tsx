import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtGateway } from "../components/kurzgesagt/KurzgesagtGateway";
import { KurzgesagtCube } from "../components/kurzgesagt/KurzgesagtCube";
import { CameraShake } from "../animation-engine/camera/CameraShake";
import { colors } from "../styles/colors";

export const Scene18_Intruder: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animations
  const titleOpacity = springForFrame(frame, 0, 50, 0.3, 0.8);
  const titleShake = frame < 100 ? (Math.sin(frame / 3) * 2) : 0;

  // Intruder approaches from right
  const intruderProgress = springForFrame(frame, 40, 130, 0.3, 0.7);
  const intruderX = 2100 - intruderProgress * 1140;

  // Detection and shield activation
  const detectionGlow = interpolate(frame, [120, 150], [0, 1], {
    extrapolateRight: "clamp",
  });
  const shieldScale = springForFrame(frame, 130, 170, 0.4, 0.6);
  const shieldFlash = (Math.sin((frame / 8) * Math.PI * 2) + 1) / 2;

  // Rejection bounce
  const bounceProgress = springForFrame(frame, 170, 220, 0.35, 0.55);
  const bouncedX = frame >= 170 ? 960 + bounceProgress * 1140 : intruderX;

  // Camera shake during rejection
  const shakeStartFrame = 165;
  const shakeDuration = 40;

  // Intruder envelope dark/red color
  const intruderColor = colors.danger;

  // Service cubes - looking worried
  const services = [
    { name: "Orders", color: colors.orders, x: 400, y: 380, emotion: "worried" as const },
    { name: "Inventory", color: colors.inventory, x: 1520, y: 380, emotion: "worried" as const },
  ];

  // Warning pulse intensity
  const warningPulse = frame >= 120
    ? (Math.sin(((frame - 120) / 10) * Math.PI * 2) + 1) / 2
    : 0;

  // Access denied text appearance
  const deniedOpacity = interpolate(frame, [180, 210], [0, 1], {
    extrapolateRight: "clamp",
  });
  const deniedScale = elasticOutForFrame(frame, 180, 230, 1.5, 0.35);

  return (
    <CameraShake
      startFrame={shakeStartFrame}
      duration={shakeDuration}
      intensity={20}
      decay={true}
    >
      <AbsoluteFill style={{ backgroundColor: colors.background }}>
        <svg width={1920} height={1080}>
          {/* Background alert effect */}
          {frame >= 120 && (
            <rect
              x={0}
              y={0}
              width={1920}
              height={1080}
              fill={colors.danger}
              opacity={detectionGlow * 0.08}
            />
          )}

          {/* Title with slight shake initially */}
          <g
            transform={`translate(${titleShake}, 0)`}
          >
            <text
              x={960}
              y={120}
              textAnchor="middle"
              fill={colors.text}
              fontSize={52}
              fontWeight="bold"
              opacity={titleOpacity}
            >
              Security First
            </text>
            <text
              x={960}
              y={170}
              textAnchor="middle"
              fill={colors.danger}
              fontSize={26}
              opacity={titleOpacity * 0.9}
            >
              Gateway blocks malicious requests
            </text>
          </g>

          {/* Service cubes - worried expression */}
          {services.map((service, i) => (
            <g key={service.name} transform={`translate(${service.x}, ${service.y})`}>
              <KurzgesagtCube
                x={-50}
                y={-50}
                size={100}
                color={service.color}
                emotion={frame >= 120 ? "worried" : "neutral"}
                pulseConfig={{
                  min: 0.96,
                  max: 1.04,
                  speed: 0.03,
                  phase: i * 2,
                }}
              />
              <text
                x={0}
                y={75}
                textAnchor="middle"
                fill={colors.textSecondary}
                fontSize={16}
                fontWeight="bold"
              >
                {service.name}
              </text>
            </g>
          ))}

          {/* Central Gateway with shield */}
          <g transform="translate(960, 540)">
            {/* Danger glow when detecting intruder */}
            {detectionGlow > 0 && (
              <>
                <ellipse
                  cx={0}
                  cy={0}
                  rx={140 + warningPulse * 40}
                  ry={100 + warningPulse * 30}
                  fill={colors.danger}
                  opacity={detectionGlow * 0.35}
                />
                <ellipse
                  cx={0}
                  cy={0}
                  rx={100 + warningPulse * 20}
                  ry={70 + warningPulse * 15}
                  fill={colors.danger}
                  opacity={detectionGlow * 0.25}
                />
              </>
            )}

            {/* Gateway with shield active */}
            <KurzgesagtGateway
              x={0}
              y={0}
              width={140}
              height={120}
              color={colors.accent}
              glow={frame >= 120}
              glowIntensity={0.7 + shieldFlash * 0.3}
              shieldActive={frame >= 130 && frame < 200}
              shieldColor={colors.danger}
            />

            {/* Shield overlay effect */}
            {frame >= 130 && frame < 200 && (
              <g
                transform={`scale(${shieldScale})`}
                opacity={interpolate(frame, [130, 150, 180, 200], [0, 1, 1, 0.3], {
                  extrapolateRight: "clamp",
                })}
              >
                {/* Extra shield ring */}
                <circle
                  cx={0}
                  cy={0}
                  r={90}
                  stroke={colors.danger}
                  strokeWidth={4}
                  fill="none"
                  opacity={0.6}
                  strokeDasharray="10,5"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 0 0"
                    to="360 0 0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            )}
          </g>

          {/* Intruder envelope - dark and menacing */}
          <g transform={`translate(${bouncedX}, 540)`}>
            {/* Shadow */}
            <ellipse
              cx={0}
              cy={35}
              rx={35}
              ry={10}
              fill="black"
              opacity={0.3}
            />

            {/* Dark envelope body */}
            <rect
              x={-35}
              y={-25}
              width={70}
              height={50}
              rx={6}
              fill={intruderColor}
              stroke="#300"
              strokeWidth={3}
            />

            {/* Menacing envelope flap */}
            <path
              d="M -35 -25 L 0 0 L 35 -25"
              fill="#600"
              stroke="#300"
              strokeWidth={2}
            />

            {/* Menacing eyes */}
            <g transform="translate(0, -5)">
              {/* Left angry eye */}
              <g transform="translate(-12, 0)">
                <ellipse
                  cx={0}
                  cy={0}
                  rx={8}
                  ry={6}
                  fill="#300"
                />
                <circle
                  cx={2}
                  cy={0}
                  r={4}
                  fill="yellow"
                />
                <circle
                  cx={3}
                  cy={0}
                  r={2}
                  fill="black"
                />
                {/* Angry eyebrow */}
                <line
                  x1={-10}
                  y1={-10}
                  x2={-4}
                  y2={-8}
                  stroke="#300"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              </g>

              {/* Right angry eye */}
              <g transform="translate(12, 0)">
                <ellipse
                  cx={0}
                  cy={0}
                  rx={8}
                  ry={6}
                  fill="#300"
                />
                <circle
                  cx={-2}
                  cy={0}
                  r={4}
                  fill="yellow"
                />
                <circle
                  cx={-3}
                  cy={0}
                  r={2}
                  fill="black"
                />
                {/* Angry eyebrow */}
                <line
                  x1={10}
                  y1={-10}
                  x2={4}
                  y2={-8}
                  stroke="#300"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              </g>
            </g>

            {/* Evil smirk */}
            <path
              d="M -10 12 Q 0 8 10 12"
              stroke="#300"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
            />

            {/* Glow effect for intruder */}
            <ellipse
              cx={0}
              cy={0}
              rx={45}
              ry={35}
              fill={colors.danger}
              opacity={0.2}
            />
          </g>

          {/* Access Denied text */}
          {deniedOpacity > 0 && (
            <g
              transform={`translate(960, 750) scale(${0.5 + deniedScale * 0.5})`}
              style={{ transformOrigin: "960px 750px" }}
            >
              <text
                x={0}
                y={0}
                textAnchor="middle"
                fill={colors.danger}
                fontSize={48}
                fontWeight="bold"
                opacity={deniedOpacity}
              >
                ACCESS DENIED
              </text>
              <text
                x={0}
                y={50}
                textAnchor="middle"
                fill={colors.textSecondary}
                fontSize={24}
                opacity={deniedOpacity * 0.8}
              >
                Malicious request blocked by gateway
              </text>
            </g>
          )}

          {/* Scanning effect lines */}
          {frame >= 100 && frame < 180 && (
            <g opacity={interpolate(frame, [100, 120], [0, 0.5], { extrapolateRight: "clamp" })}>
              {Array.from({ length: 5 }).map((_, i) => {
                const y = 400 + i * 60;
                const scanX = interpolate(frame, [100, 170], [1800, 200], {
                  extrapolateRight: "clamp",
                });
                return (
                  <line
                    key={i}
                    x1={scanX}
                    y1={y}
                    x2={scanX + 100}
                    y2={y}
                    stroke={colors.danger}
                    strokeWidth={2}
                    opacity={0.5}
                  />
                );
              })}
            </g>
          )}
        </svg>
      </AbsoluteFill>
    </CameraShake>
  );
};

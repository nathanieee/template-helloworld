import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame } from "../animation-engine/easing";
import { KurzgesagtCube, CubeEmotion } from "../components/kurzgesagt/KurzgesagtCube";
import { CameraShake } from "../animation-engine/camera";
import { useWiggle } from "../animation-engine/hooks";
import { colors } from "../styles/colors";

interface Scene15ChaosProps {
  titleText?: string;
}

/**
 * Scene15: Chaos
 * HUNDREDS of envelopes overwhelm the server, camera shake, cubes panic
 * Features: Dramatic chaos, CameraShake, worried emotions, overwhelming volume
 */
export const Scene15Chaos: React.FC<Scene15ChaosProps> = ({
  titleText = "CHAOS",
}) => {
  const frame = useCurrentFrame();

  // Animation timing
  const sceneStart = 0;
  const chaosStart = 60;
  const overwhelmStart = 100;
  const panicStart = 140;
  const shakeStart = 120;

  // Envelope generation - create hundreds
  const envelopeCount = 150;
  const envelopes = React.useMemo(() => {
    return Array.from({ length: envelopeCount }, (_, i) => ({
      id: i,
      startX: 1920 + Math.random() * 500,
      startY: 200 + Math.random() * 700,
      targetX: 850 + (Math.random() - 0.5) * 200,
      targetY: 450 + (Math.random() - 0.5) * 200,
      speed: 0.003 + Math.random() * 0.005,
      delay: Math.random() * 60,
      size: 0.5 + Math.random() * 0.5,
      rotationSpeed: (Math.random() - 0.5) * 10,
      color: [colors.users, colors.orders, colors.products, colors.payments, colors.inventory][
        Math.floor(Math.random() * 5)
      ],
    }));
  }, []);

  // Chaos intensity ramps up
  const chaosIntensity = springForFrame(frame, chaosStart, overwhelmStart + 60, 0.2, 0.5);
  const overwhelmFactor = Math.min(1, (frame - overwhelmStart) / 60);

  // Cube wiggle intensifies with chaos
  const wiggleIntensity = 5 + chaosIntensity * 15;
  const wiggleX = useWiggle({ amount: wiggleIntensity, frequency: 0.15, phase: 0 });
  const wiggleY = useWiggle({ amount: wiggleIntensity * 0.7, frequency: 0.2, phase: Math.PI / 4 });

  // Cube emotion progresses from neutral to worried to panicked
  const getCubeEmotion = (): CubeEmotion => {
    if (frame < panicStart) return "worried";
    return "worried"; // Can add "panicked" emotion later
  };

  // Pulse speeds up dramatically
  const panicPulseSpeed = frame < panicStart ? 0.05 : 0.15;
  const pulsePhase = frame * panicPulseSpeed;

  // Title and warning text
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const warningOpacity = interpolate(frame, [panicStart, panicStart + 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const warningBlink = Math.sin(frame * 0.3) > 0;

  // Background gets darker/redder as chaos increases
  const bgRed = interpolate(frame, [chaosStart, panicStart + 60], [0, 30], {
    extrapolateRight: "clamp",
  });
  const bgColor = `rgb(${10 + bgRed}, ${14 - bgRed * 0.3}, ${39 - bgRed * 0.5})`;

  // Server queue indicator fills up
  const queueFill = Math.min(100, ((frame - chaosStart) / 120) * 100);

  // Error count spirals
  const errorCount = Math.floor(Math.max(0, (frame - overwhelmStart) / 5));

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      <CameraShake
        startFrame={shakeStart}
        duration={300}
        intensity={5 + chaosIntensity * 20}
        decay={false}
      >
        <svg width={1920} height={1080}>
          {/* Chaotic background elements */}
          <g opacity={chaosIntensity * 0.3}>
            {Array.from({ length: 10 }, (_, i) => {
              const offset = (frame * 2 + i * 50) % 200;
              return (
                <line
                  key={i}
                  x1={offset}
                  y1={i * 108}
                  x2={offset + 100}
                  y2={i * 108}
                  stroke={colors.danger}
                  strokeWidth={1}
                  opacity={0.5}
                />
              );
            })}
          </g>

          {/* Central Server Cube - overwhelmed */}
          <g
            transform={`translate(${960 - 75 + wiggleX}, ${540 - 75 + wiggleY})`}
          >
            {/* Intense stressed glow - red warning */}
            <ellipse
              cx={75}
              cy={75}
              rx={150 * (1 + chaosIntensity)}
              ry={150 * (1 + chaosIntensity) * 0.7}
              fill={colors.danger}
              opacity={chaosIntensity * 0.3}
            />

            {/* Secondary pulse rings */}
            {frame >= panicStart && (
              <>
                <ellipse
                  cx={75}
                  cy={75}
                  rx={120 + ((frame - panicStart) * 2) % 100}
                  ry={90 + ((frame - panicStart) * 1.5) % 80}
                  fill="none"
                  stroke={colors.danger}
                  strokeWidth={3}
                  opacity={0.3 * (1 - ((frame - panicStart) * 2) % 100 / 100)}
                />
              </>
            )}

            {/* The stressed cube */}
            <KurzgesagtCube
              x={0}
              y={0}
              size={150}
              color={colors.monolith}
              emotion={getCubeEmotion()}
              glow={true}
              pulseConfig={{
                min: 0.9,
                max: 1.1,
                speed: panicPulseSpeed,
                phase: pulsePhase,
              }}
            />
          </g>

          {/* HUNDREDS of envelopes swarming */}
          {envelopes.map((env) => {
            const envFrame = frame - env.delay;
            if (envFrame < 0) return null;

            const progress = Math.min(1, envFrame * env.speed);
            const x = env.startX + (env.targetX - env.startX) * progress;
            const y = env.startY + Math.sin(envFrame * 0.05 + env.id) * 50 * chaosIntensity;
            const rotation = envFrame * env.rotationSpeed * chaosIntensity;
            const scale = env.size * (1 - progress * 0.3);
            const opacity = progress < 0.1 ? progress * 10 : progress > 0.8 ? (1 - progress) * 5 : 1;

            return (
              <g
                key={env.id}
                transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}
                opacity={opacity}
              >
                {/* Mini envelope */}
                <rect
                  x={-15}
                  y={-10}
                  width={30}
                  height={20}
                  fill={env.color}
                  rx={3}
                  stroke="rgba(0,0,0,0.3)"
                  strokeWidth={1}
                />
                <path
                  d="M -15 -10 L 0 2 L 15 -10"
                  fill={env.color}
                  stroke="rgba(0,0,0,0.3)"
                  strokeWidth={1}
                  strokeLinejoin="round"
                />
              </g>
            );
          })}

          {/* Multiple server cubes appearing - being overwhelmed */}
          {frame >= overwhelmStart && (
            <>
              {[0, 1, 2].map((i) => {
                const appearProgress = springForFrame(
                  frame,
                  overwhelmStart + i * 20,
                  overwhelmStart + i * 20 + 40,
                  0.3,
                  0.7
                );
                const angle = (i * 120 * Math.PI) / 180;
                const distance = 250 * appearProgress;
                const x = 960 + Math.cos(angle) * distance;
                const y = 540 + Math.sin(angle) * distance;

                return (
                  <g
                    key={i}
                    transform={`translate(${x - 40}, ${y - 40}) scale(${appearProgress})`}
                  >
                    <KurzgesagtCube
                      x={0}
                      y={0}
                      size={80}
                      color={colors.monolith}
                      emotion="worried"
                      glow={true}
                      pulseConfig={{
                        min: 0.95,
                        max: 1.08,
                        speed: 0.1,
                        phase: pulsePhase + i,
                      }}
                    />
                  </g>
                );
              })}
            </>
          )}

          {/* Queue visualization - filling up rapidly */}
          {frame >= chaosStart && (
            <g transform="translate(1650, 200)">
              <rect
                x={0}
                y={0}
                width={200}
                height={400}
                fill={colors.monolithDark}
                opacity={0.8}
                rx={10}
              />

              {/* Queue fill */}
              <rect
                x={5}
                y={400 - queueFill * 3.9}
                width={190}
                height={queueFill * 3.9}
                fill={queueFill > 80 ? colors.danger : queueFill > 50 ? colors.accent : colors.orders}
                opacity={0.7}
                rx={8}
              />

              {/* Queue label */}
              <text
                x={100}
                y={-15}
                textAnchor="middle"
                fill={colors.text}
                fontSize={18}
                fontFamily="Arial, sans-serif"
              >
                Request Queue
              </text>

              {/* Queue count */}
              <text
                x={100}
                y={380}
                textAnchor="middle"
                fill={colors.text}
                fontSize={24}
                fontWeight="bold"
                fontFamily="monospace"
              >
                {Math.floor(queueFill * 100)}
              </text>
            </g>
          )}

          {/* Error counter spinning */}
          {frame >= overwhelmStart && (
            <g transform="translate(150, 200)">
              <rect
                x={0}
                y={0}
                width={180}
                height={80}
                fill={colors.danger}
                opacity={0.8}
                rx={10}
              />
              <text
                x={90}
                y={35}
                textAnchor="middle"
                fill={colors.text}
                fontSize={14}
                fontFamily="Arial, sans-serif"
              >
                ERRORS
              </text>
              <text
                x={90}
                y={65}
                textAnchor="middle"
                fill={colors.text}
                fontSize={28}
                fontWeight="bold"
                fontFamily="monospace"
              >
                {errorCount}
              </text>
            </g>
          )}

          {/* WARNING banner - blinking */}
          {frame >= panicStart && (
            <g opacity={warningBlink ? warningOpacity : 0}>
              <rect
                x={560}
                y={920}
                width={800}
                height={80}
                fill={colors.danger}
                rx={10}
              />
              <text
                x={960}
                y={970}
                textAnchor="middle"
                fill={colors.text}
                fontSize={36}
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
                letterSpacing={4}
              >
                ⚠️ SYSTEM OVERWHELMED ⚠️
              </text>
            </g>
          )}

          {/* Title - gets shakier */}
          <text
            x={960 + wiggleX * 0.3}
            y={120 + wiggleY * 0.2}
            textAnchor="middle"
            fill={colors.danger}
            fontSize={80}
            fontWeight="bold"
            opacity={titleOpacity}
            fontFamily="Arial, sans-serif"
            letterSpacing={10}
          >
            {titleText}
          </text>

          {/* Subtitle */}
          <text
            x={960}
            y={190}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={24}
            opacity={titleOpacity * 0.9}
            fontFamily="Arial, sans-serif"
          >
            Too many requests. The system struggles to keep up.
          </text>

          {/* Processing indicator going crazy */}
          {frame >= chaosStart && (
            <g transform="translate(960, 800)">
              <text
                x={0}
                y={0}
                textAnchor="middle"
                fill={colors.textTertiary}
                fontSize={16}
                fontFamily="monospace"
              >
                {frame % 3 === 0 ? "Processing..." : frame % 3 === 1 ? "Processing.." : "Processing."}
              </text>
            </g>
          )}
        </svg>
      </CameraShake>
    </AbsoluteFill>
  );
};

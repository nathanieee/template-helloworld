import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame } from "../animation-engine/easing";
import { KurzgesagtStickFigure } from "../components/kurzgesagt/KurzgesagtStickFigure";
import { KurzgesagtCube, CubeEmotion } from "../components/kurzgesagt/KurzgesagtCube";
import { DataParticles } from "../animation-engine/particles";
import { usePulse } from "../animation-engine/hooks";
import { colors } from "../styles/colors";

interface Scene11NetworkProps {
  titleText?: string;
}

/**
 * Scene11: The Network
 * Users connect to the monolith server with glowing data packets
 * Features: DataParticles for network visualization, glowing pulse effects
 */
export const Scene11Network: React.FC<Scene11NetworkProps> = ({
  titleText = "THE NETWORK",
}) => {
  const frame = useCurrentFrame();

  // Animation timing
  const serverAppearStart = 15;
  const serverAppearEnd = 60;
  const usersArriveStart = 30;
  const usersArriveEnd = 120;
  const connectionsStart = 90;
  const dataFlowStart = 100;
  const titleFadeStart = 0;
  const titleFadeEnd = 45;

  // Server cube appearance with spring
  const serverProgress = springForFrame(frame, serverAppearStart, serverAppearEnd, 0.15, 0.65);
  const serverScale = serverProgress;
  const serverY = 540 - (1 - serverProgress) * 200;

  // User figures walking in from sides with staggered spring
  const user1Progress = springForFrame(frame, usersArriveStart, usersArriveEnd - 30, 0.25, 0.7);
  const user2Progress = springForFrame(frame, usersArriveStart + 20, usersArriveEnd - 10, 0.25, 0.7);
  const user3Progress = springForFrame(frame, usersArriveStart + 40, usersArriveEnd, 0.25, 0.7);

  const user1X = -150 + user1Progress * 600;
  const user2X = 2070 - user2Progress * 600;
  const user3X = -150 + user3Progress * 450;

  // Connection lines fade in
  const lineOpacity = frame < connectionsStart
    ? 0
    : frame >= connectionsStart + 30
      ? 1
      : (frame - connectionsStart) / 30;

  // Pulse effect for server glow
  const pulsePhase = frame * 0.03;
  const glowIntensity = usePulse({ min: 0.3, max: 1, speed: 0.05, phase: pulsePhase });

  // Network path points for data particles
  const networkPaths = [
    // Path from user1 to server
    [
      { x: 300, y: 720 },
      { x: 500, y: 650 },
      { x: 700, y: 580 },
      { x: 960, y: 540 },
    ],
    // Path from user2 to server
    [
      { x: 1620, y: 720 },
      { x: 1420, y: 650 },
      { x: 1220, y: 580 },
      { x: 960, y: 540 },
    ],
    // Path from user3 to server
    [
      { x: 250, y: 500 },
      { x: 450, y: 500 },
      { x: 650, y: 520 },
      { x: 960, y: 540 },
    ],
  ];

  // Title fade
  const titleOpacity = frame < titleFadeStart
    ? 0
    : frame >= titleFadeEnd
      ? 1
      : (frame - titleFadeStart) / (titleFadeEnd - titleFadeStart);

  // Background grid with subtle animation
  const gridOffset = (frame * 0.5) % 40;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {/* Background grid - tech network feel */}
        <g opacity={0.1}>
          {Array.from({ length: 49 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 40 + gridOffset - 20}
              y1={0}
              x2={i * 40 + gridOffset - 20}
              y2={1080}
              stroke={colors.network}
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: 28 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * 40}
              x2={1920}
              y2={i * 40}
              stroke={colors.network}
              strokeWidth={1}
            />
          ))}
        </g>

        {/* Connection lines with gradient */}
        <g opacity={lineOpacity * 0.6}>
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.users} stopOpacity={0.8} />
              <stop offset="100%" stopColor={colors.accent} stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={colors.orders} stopOpacity={0.8} />
              <stop offset="100%" stopColor={colors.accent} stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.products} stopOpacity={0.8} />
              <stop offset="100%" stopColor={colors.accent} stopOpacity={0.3} />
            </linearGradient>
          </defs>

          {/* Connection lines - curved paths */}
          <path
            d="M 300 720 Q 500 650 960 540"
            stroke="url(#lineGradient1)"
            strokeWidth={4}
            fill="none"
            strokeDasharray="8 4"
            strokeLinecap="round"
          />
          <path
            d="M 1620 720 Q 1420 650 960 540"
            stroke="url(#lineGradient2)"
            strokeWidth={4}
            fill="none"
            strokeDasharray="8 4"
            strokeLinecap="round"
          />
          <path
            d="M 250 500 Q 450 500 960 540"
            stroke="url(#lineGradient3)"
            strokeWidth={4}
            fill="none"
            strokeDasharray="8 4"
            strokeLinecap="round"
          />
        </g>

        {/* Data particles flowing along network paths */}
        {frame >= dataFlowStart && (
          <>
            <DataParticles
              path={networkPaths[0]}
              count={6}
              startFrame={dataFlowStart}
              duration={80}
              color={colors.usersLight}
              size={8}
              spacing={20}
            />
            <DataParticles
              path={networkPaths[1]}
              count={6}
              startFrame={dataFlowStart + 10}
              duration={80}
              color={colors.ordersLight}
              size={8}
              spacing={20}
            />
            <DataParticles
              path={networkPaths[2]}
              count={5}
              startFrame={dataFlowStart + 20}
              duration={80}
              color={colors.productsLight}
              size={8}
              spacing={20}
            />
          </>
        )}

        {/* Server Cube - the central monolith */}
        <g transform={`translate(960 - 60, ${serverY - 60}) scale(${serverScale})`}>
          {/* Glow effect behind server */}
          {serverProgress > 0.5 && (
            <ellipse
              cx={60}
              cy={60}
              rx={100 * glowIntensity}
              ry={100 * glowIntensity * 0.6}
              fill={colors.accent}
              opacity={0.15 * glowIntensity}
            />
          )}

          <KurzgesagtCube
            x={0}
            y={0}
            size={120}
            color={colors.monolith}
            emotion="neutral"
            glow={serverProgress > 0.8}
            pulseConfig={{
              min: 0.98,
              max: 1.02,
              speed: 0.04,
              phase: pulsePhase,
            }}
          />
        </g>

        {/* User 1 - Left side */}
        <KurzgesagtStickFigure
          x={user1X}
          y={720}
          scale={1.3}
          color={colors.users}
          facingRight={true}
          walking={user1Progress < 1}
          walkCycle={(frame / 15) % 1}
        />

        {/* User 2 - Right side */}
        <KurzgesagtStickFigure
          x={user2X}
          y={720}
          scale={1.3}
          color={colors.orders}
          facingRight={false}
          walking={user2Progress < 1}
          walkCycle={((frame - 20) / 15) % 1}
        />

        {/* User 3 - Left side, lower */}
        <KurzgesagtStickFigure
          x={user3X}
          y={500}
          scale={1.1}
          color={colors.products}
          facingRight={true}
          walking={user3Progress < 1}
          walkCycle={((frame - 40) / 15) % 1}
        />

        {/* Title */}
        <text
          x={960}
          y={120}
          textAnchor="middle"
          fill={colors.text}
          fontSize={64}
          fontWeight="bold"
          opacity={titleOpacity}
          fontFamily="Arial, sans-serif"
          letterSpacing={6}
        >
          {titleText}
        </text>

        {/* Subtitle */}
        <text
          x={960}
          y={180}
          textAnchor="middle"
          fill={colors.textSecondary}
          fontSize={24}
          opacity={titleOpacity * 0.9}
          fontFamily="Arial, sans-serif"
        >
          Users connect across the distributed system
        </text>

        {/* Network status indicator */}
        {frame >= dataFlowStart && (
          <g transform="translate(960, 900)">
            <rect
              x={-100}
              y={-20}
              width={200}
              height={40}
              fill={colors.monolithDark}
              opacity={0.8}
              rx={20}
            />
            <circle
              cx={-70}
              cy={0}
              r={8}
              fill={colors.success}
              opacity={glowIntensity}
            >
              <animate
                attributeName="opacity"
                values={`${glowIntensity * 0.5};${glowIntensity};${glowIntensity * 0.5}`}
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
            <text
              x={10}
              y={8}
              textAnchor="middle"
              fill={colors.text}
              fontSize={16}
              fontFamily="Arial, sans-serif"
            >
              CONNECTED
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};

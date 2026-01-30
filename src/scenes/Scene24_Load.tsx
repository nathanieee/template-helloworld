import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
} from "remotion";
import { colors } from "../styles/colors";
import { KurzgesagtCube, CubeEmotion } from "../components/kurzgesagt";
import { useWiggle, useShake, usePulse } from "../animation-engine";
import { springForFrame } from "../animation-engine/easing";

/**
 * Scene24_Load - Shows service under heavy load
 * Cube glows red hot, sweats, vibrates with useShake
 */
export const Scene24_Load: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animations
  const titleOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 40], [50, 100], {
    extrapolateRight: "clamp",
  });

  // Load level increases over time
  const loadLevel = interpolate(frame, [60, 280], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Service shake based on load
  const shakeIntensity = loadLevel * 15;
  const serviceShake = useShake({
    startFrame: 100,
    duration: 200,
    intensity: shakeIntensity,
    decay: false,
  });

  // Additional wiggle for vibration effect
  const vibWiggle = useWiggle({ amount: loadLevel * 8, frequency: 0.3 });

  // Heat color transition
  const heatR = Math.floor(interpolate(loadLevel, [0, 0.5, 1], [72, 180, 255]));
  const heatG = Math.floor(interpolate(loadLevel, [0, 0.5, 1], [187, 120, 80]));
  const heatB = Math.floor(interpolate(loadLevel, [0, 0.5, 1], [120, 60, 60]));
  const serviceColor = `rgb(${heatR}, ${heatG}, ${heatB})`;

  // Glow pulse increases with load
  const glowPulse = usePulse({
    min: 1,
    max: 1 + loadLevel * 0.5,
    speed: 0.05 + loadLevel * 0.1,
    phase: 0,
  });

  // Glow color
  const glowOpacity = 0.2 + loadLevel * 0.4;

  // Emotion changes with load
  const getEmotion = (): CubeEmotion => {
    if (loadLevel < 0.3) return "happy";
    if (loadLevel < 0.6) return "worried";
    return "surprised";
  };

  // Sweat drops
  const sweatDrops = React.useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const startFrame = 120 + i * 20;
      const progress = interpolate(
        frame,
        [startFrame, startFrame + 40],
        [0, 1],
        { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
      );
      return {
        x: 40 + (i % 3) * 30 - 30,
        y: progress * 80,
        opacity: loadLevel > 0.3 ? interpolate(progress, [0, 0.7, 1], [0, 1, 0]) : 0,
        scale: 1 - progress * 0.3,
      };
    });
  }, [frame, loadLevel]);

  // Incoming requests swarm
  const requestCount = Math.floor(loadLevel * 30);
  const requests = React.useMemo(() => {
    return Array.from({ length: requestCount }, (_, i) => {
      const angle = (i / 30) * Math.PI * 2;
      const speed = 0.02 + Math.random() * 0.02;
      const offset = (i * 37) % 100;
      const dist = ((frame * 8 + offset) % 400);
      const opacity = dist > 50 ? 1 - dist / 400 : dist / 50;
      return {
        x: Math.cos(angle) * (dist + 80),
        y: Math.sin(angle) * (dist + 80),
        opacity: opacity * loadLevel,
        scale: 0.6 + opacity * 0.4,
      };
    });
  }, [frame, loadLevel, requestCount]);

  // Load meter
  const meterWidth = 400;
  const meterFill = meterWidth * loadLevel;
  const meterColor =
    loadLevel < 0.4 ? colors.orders : loadLevel < 0.7 ? colors.accent : colors.danger;

  // Temperature gauge
  const tempHeight = interpolate(loadLevel, [0, 1], [20, 200]);
  const tempRotation = interpolate(loadLevel, [0, 1], [0, -90]);

  // Status text changes
  const statusText = React.useMemo(() => {
    if (loadLevel < 0.3) return "Normal traffic";
    if (loadLevel < 0.6) return "Getting warm...";
    if (loadLevel < 0.8) return "High load detected!";
    return "OVERHEATING! 🚨";
  }, [loadLevel]);

  // Warning flash
  const warningFlash =
    loadLevel > 0.8 && Math.sin(frame * 0.3) > 0;

  // Steam/smoke particles when overheating
  const steamParticles = React.useMemo(() => {
    if (loadLevel < 0.6) return [];
    return Array.from({ length: 6 }, (_, i) => {
      const startFrame = 150 + i * 15;
      const progress = interpolate(
        frame,
        [startFrame, startFrame + 60],
        [0, 1],
        { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
      );
      return {
        x: (Math.random() - 0.5) * 80,
        y: -progress * 100,
        opacity: (1 - progress) * loadLevel * 0.6,
        scale: 0.5 + progress * 1.5,
      };
    });
  }, [frame, loadLevel]);

  // Requests per second counter
  const rps = Math.floor(loadLevel * 2500);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <defs>
          {/* Heat glow gradient */}
          <radialGradient id="heatGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor={colors.danger} stopOpacity={glowOpacity} />
            <stop offset="50%" stopColor={colors.danger} stopOpacity={glowOpacity * 0.5} />
            <stop offset="100%" stopColor={colors.danger} stopOpacity={0} />
          </radialGradient>
          {/* Glow filter */}
          <filter id="hotGlow">
            <feGaussianBlur stdDeviation={8} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Incoming requests swarming */}
        {requests.map((req, i) => (
          <g
            key={i}
            transform={`translate(${960 + req.x}, ${540 + req.y}) scale(${req.scale})`}
            opacity={req.opacity}
          >
            <circle r={10} fill={colors.network} />
          </g>
        ))}

        {/* Steam particles */}
        {steamParticles.map((p, i) => (
          <g
            key={i}
            transform={`translate(${960 + p.x}, ${540 + p.y}) scale(${p.scale})`}
            opacity={p.opacity}
          >
            <circle r={15} fill="rgba(255,255,255,0.3)" />
            <circle r={10} fill="rgba(255,255,255,0.2)" />
          </g>
        ))}

        {/* Main service cube with all effects */}
        <g
          transform={`translate(${
            960 + serviceShake.x + vibWiggle
          }, ${540 + serviceShake.y}) scale(${glowPulse})`}
        >
          {/* Heat glow behind */}
          {loadLevel > 0.2 && (
            <circle cx={0} cy={0} r={120} fill="url(#heatGlow)" />
          )}

          {/* Service cube */}
          <KurzgesagtCube
            x={-70}
            y={-70}
            size={140}
            color={serviceColor}
            emotion={getEmotion()}
            glow={loadLevel > 0.5}
            pulseConfig={{
              min: 0.95,
              max: 1.05 + loadLevel * 0.1,
              speed: 0.03 + loadLevel * 0.05,
              phase: 0,
            }}
          />

          {/* Service label */}
          <text
            x={0}
            y={95}
            textAnchor="middle"
            fill="white"
            fontSize={24}
            fontWeight="bold"
          >
            Orders Service
          </text>

          {/* Sweat drops */}
          {sweatDrops.map((drop, i) => (
            <g
              key={i}
              transform={`translate(${drop.x}, ${-50 + drop.y}) scale(${drop.scale})`}
              opacity={drop.opacity}
            >
              <ellipse rx={6} ry={10} fill={colors.network} />
            </g>
          ))}
        </g>

        {/* Warning flash overlay */}
        {warningFlash && (
          <rect
            x={0}
            y={0}
            width={1920}
            height={1080}
            fill={colors.danger}
            opacity={0.1}
          />
        )}

        {/* Load meter */}
        <g transform="translate(960, 800)">
          <rect
            x={-meterWidth / 2 - 10}
            y={-25}
            width={meterWidth + 20}
            height={50}
            rx={12}
            fill={colors.monolith}
          />
          <rect
            x={-meterWidth / 2 - 5}
            y={-20}
            width={meterWidth}
            height={40}
            rx={10}
            fill="rgba(0,0,0,0.5)"
          />
          <rect
            x={-meterWidth / 2 - 5}
            y={-20}
            width={meterFill}
            height={40}
            rx={10}
            fill={meterColor}
          />
          {/* RPS counter */}
          <text
            x={0}
            y={8}
            textAnchor="middle"
            fill="white"
            fontSize={22}
            fontWeight="bold"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
          >
            {rps} requests/sec
          </text>
        </g>

        {/* Temperature gauge */}
        <g transform="translate(1600, 300)">
          {/* Gauge background */}
          <path
            d="M -80 80 A 80 80 0 1 1 80 80"
            fill="none"
            stroke={colors.monolith}
            strokeWidth={20}
            strokeLinecap="round"
          />
          {/* Temperature fill */}
          <path
            d={`M -80 80 A 80 80 0 1 1 ${-80 + 160 * loadLevel} ${
              80 - Math.sqrt(6400 - Math.pow(-80 + 160 * loadLevel, 2))
            }`}
            fill="none"
            stroke={meterColor}
            strokeWidth={20}
            strokeLinecap="round"
            filter="url(#hotGlow)"
          />
          {/* Temperature display */}
          <text
            x={0}
            y={100}
            textAnchor="middle"
            fill={meterColor}
            fontSize={32}
            fontWeight="bold"
          >
            {Math.floor(loadLevel * 100)}°C
          </text>
          <text
            x={0}
            y={130}
            textAnchor="middle"
            fill={colors.textSecondary}
            fontSize={18}
          >
            Temperature
          </text>
        </g>

        {/* Status text */}
        <g transform="translate(960, 250)">
          <text
            x={0}
            y={0}
            textAnchor="middle"
            fill={loadLevel > 0.7 ? colors.danger : colors.textSecondary}
            fontSize={36}
            fontWeight="bold"
            opacity={titleOpacity}
          >
            {statusText}
          </text>
        </g>

        {/* Title */}
        <text
          x={960}
          y={titleY}
          textAnchor="middle"
          fill={colors.text}
          fontSize={52}
          fontWeight="bold"
          opacity={titleOpacity}
        >
          Under Load
        </text>
        <text
          x={960}
          y={titleY + 50}
          textAnchor="middle"
          fill={colors.textSecondary}
          fontSize={28}
          opacity={titleOpacity}
        >
          How microservices handle traffic spikes
        </text>
      </svg>
    </AbsoluteFill>
  );
};

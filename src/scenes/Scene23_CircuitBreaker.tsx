import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
} from "remotion";
import { colors } from "../styles/colors";
import { KurzgesagtCube, CubeEmotion } from "../components/kurzgesagt";
import { useWiggle, useShake } from "../animation-engine";
import { elasticOut, springForFrame } from "../animation-engine/easing";

/**
 * Scene23_CircuitBreaker - Shows circuit breaker pattern
 * Switch flips open, barrier goes up, fallback message shown
 */
export const Scene23_CircuitBreaker: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animations
  const titleOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 40], [50, 100], {
    extrapolateRight: "clamp",
  });

  // Circuit states with durations
  const STATE_CLOSED = 0;
  const STATE_OPEN = 1;
  const STATE_HALF_OPEN = 2;

  // Calculate current state based on frame
  const getState = () => {
    if (frame < 90) return STATE_CLOSED;
    if (frame < 210) return STATE_OPEN;
    if (frame < 330) return STATE_HALF_OPEN;
    return STATE_CLOSED;
  };

  const currentState = getState();

  // State transition progress
  const closedToOpenProgress = interpolate(frame, [80, 110], [0, 1], {
    extrapolateRight: "clamp",
  });
  const openToHalfProgress = interpolate(frame, [200, 230], [0, 1], {
    extrapolateRight: "clamp",
  });
  const halfToClosedProgress = interpolate(frame, [320, 350], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Switch angle animation
  const switchAngle = interpolate(
    frame,
    [0, 80, 110, 200, 230, 320, 350],
    [0, 0, 90, 90, 45, 45, 0],
    { extrapolateRight: "clamp" }
  );

  // Orders service (client)
  const ordersScale = springForFrame(frame, 20, 70, 0.3, 0.8);

  // Circuit breaker box
  const cbScale = springForFrame(frame, 30, 80, 0.4, 0.7);

  // Inventory service (backend)
  const inventoryScale = springForFrame(frame, 40, 90, 0.3, 0.8);

  // Barrier animation
  const barrierHeight = interpolate(
    frame,
    [100, 140],
    [0, 200],
    extrapolateRight: "clamp"
  );
  const barrierOpacity = interpolate(
    frame,
    [100, 130],
    [0, 0.9],
    extrapolateRight: "clamp"
  );
  const barrierFadeOut = interpolate(
    frame,
    [210, 250],
    [1, 0],
    extrapolateLeft: "clamp"
  );

  // State indicator color
  const getStateColor = () => {
    switch (currentState) {
      case STATE_CLOSED:
        return colors.orders;
      case STATE_OPEN:
        return colors.danger;
      case STATE_HALF_OPEN:
        return colors.accent;
      default:
        return colors.orders;
    }
  };

  // State label
  const getStateLabel = () => {
    switch (currentState) {
      case STATE_CLOSED:
        return "CLOSED";
      case STATE_OPEN:
        return "OPEN";
      case STATE_HALF_OPEN:
        return "HALF-OPEN";
      default:
        return "CLOSED";
    }
  };

  // Requests animation
  const requests = React.useMemo(() => {
    if (currentState === STATE_CLOSED) {
      // Normal requests flowing through
      return Array.from({ length: 3 }, (_, i) => {
        const startFrame = 120 + i * 30;
        const progress = interpolate(
          frame,
          [startFrame, startFrame + 50],
          [0, 1],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );
        const x = interpolate(progress, [0, 0.5, 1], [650, 960, 1450]);
        const y = interpolate(progress, [0, 0.5, 1], [540, 540, 540]);
        return { x, y, visible: progress > 0 && progress < 1, success: true };
      });
    } else if (currentState === STATE_OPEN) {
      // Requests blocked
      return Array.from({ length: 3 }, (_, i) => {
        const startFrame = 140 + i * 25;
        const progress = interpolate(
          frame,
          [startFrame, startFrame + 35],
          [0, 1],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );
        const x = interpolate(progress, [0, 0.7, 1], [650, 920, 920]);
        const bounce = elasticOut(Math.min(1, progress * 1.5), 0.5, 0.3);
        const y = interpolate(progress, [0, 0.5, 1], [540, 540, 540 - bounce * 30]);
        return { x, y, visible: progress > 0 && progress < 1, success: false, blocked: true };
      });
    } else {
      // Test request in half-open state
      const progress = interpolate(frame, [240, 290], [0, 1], {
        extrapolateRight: "clamp",
      });
      const x = interpolate(progress, [0, 0.5, 1], [650, 960, 1450]);
      return [{ x, y: 540, visible: progress > 0 && progress < 1, success: true, test: true }];
    }
  }, [frame, currentState]);

  // Fallback message animation
  const fallbackOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fallbackY = interpolate(frame, [150, 180], [600, 580], {
    extrapolateRight: "clamp",
  });
  const fallbackFade = interpolate(frame, [210, 250], [1, 0], {
    extrapolateLeft: "clamp",
  });

  // Test request success indicator
  const testSuccessScale = interpolate(frame, [280, 310], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Success checkmark animation
  const checkmarkPath = interpolate(frame, [280, 310], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Description text animation
  const descOpacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateRight: "clamp",
  });

  // State description
  const getStateDescription = () => {
    switch (currentState) {
      case STATE_CLOSED:
        return "Normal operation - requests flow through";
      case STATE_OPEN:
        return "Service failing - blocking requests to prevent cascade";
      case STATE_HALF_OPEN:
        return "Testing if service recovered...";
      default:
        return "";
    }
  };

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <defs>
          {/* Glow effect */}
          <filter id="cbGlow">
            <feGaussianBlur stdDeviation={6} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Circuit pattern */}
          <pattern id="circuitPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.1)" />
          </pattern>
        </defs>

        {/* Connection line */}
        <line
          x1={650}
          y1={540}
          x2={1450}
          y2={540}
          stroke={colors.network}
          strokeWidth={4}
          strokeDasharray="15,10"
          opacity={0.3}
        />

        {/* Orders Service (Client) */}
        <g transform={`translate(650, 540) scale(${ordersScale})`}>
          <KurzgesagtCube
            x={-60}
            y={-50}
            size={120}
            color={colors.orders}
            emotion={currentState === STATE_OPEN ? "worried" : "happy"}
          />
          <text
            x={0}
            y={80}
            textAnchor="middle"
            fill="white"
            fontSize={20}
            fontWeight="bold"
          >
            Orders
          </text>
        </g>

        {/* Circuit Breaker */}
        <g transform={`translate(960, 540) scale(${cbScale})`}>
          {/* Main box */}
          <rect
            x={-60}
            y={-80}
            width={120}
            height={160}
            rx={15}
            fill={colors.monolith}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={3}
          />
          <rect
            x={-55}
            y={-75}
            width={110}
            height={150}
            rx={12}
            fill="url(#circuitPattern)"
          />

          {/* Circuit terminals */}
          <circle cx={-25} cy={-60} r={10} fill={colors.network} />
          <circle cx={-25} cy={60} r={10} fill={colors.network} />
          <circle cx={25} cy={-60} r={10} fill={colors.network} />
          <circle cx={25} cy={60} r={10} fill={colors.network} />

          {/* Switch */}
          <g transform={`rotate(${switchAngle})`}>
            <rect
              x={-8}
              y={-55}
              width={16}
              height={110}
              rx={4}
              fill={getStateColor()}
              filter="url(#cbGlow)"
            />
            {/* Switch handle detail */}
            <rect
              x={-10}
              y={-50}
              width={20}
              height={20}
              rx={3}
              fill="rgba(255,255,255,0.3)"
            />
          </g>

          {/* State indicator LED */}
          <circle cx={0} cy={95} r={12} fill={getStateColor()} filter="url(#cbGlow)">
            <animate
              attributeName="opacity"
              values="1;0.6;1"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Label */}
          <text
            x={0}
            y={130}
            textAnchor="middle"
            fill={getStateColor()}
            fontSize={14}
            fontWeight="bold"
          >
            {getStateLabel()}
          </text>
        </g>

        {/* Barrier when OPEN */}
        {currentState === STATE_OPEN && (
          <g
            transform="translate(960, 540)"
            opacity={barrierOpacity * barrierFadeOut}
          >
            {/* Rising barrier */}
            <rect
              x={-100}
              y={-barrierHeight / 2}
              width={200}
              height={barrierHeight}
              rx={15}
              fill={colors.danger}
              opacity={0.85}
            />
            {/* Striped pattern */}
            {Array.from({ length: Math.ceil(barrierHeight / 30) }).map((_, i) => (
              <line
                key={i}
                x1={-100}
                y1={-barrierHeight / 2 + i * 30 + 15}
                x2={100}
                y2={-barrierHeight / 2 + i * 30}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={20}
              />
            ))}
            {/* Lock icon */}
            <g transform="translate(0, -20)">
              <rect x={-15} y={0} width={30} height={25} rx={4} fill="white" />
              <path
                d="M -10 0 V -10 A 10 10 0 0 1 10 -10 V 0"
                stroke="white"
                strokeWidth={4}
                fill="none"
              />
            </g>
            <text
              x={0}
              y={30}
              textAnchor="middle"
              fill="white"
              fontSize={20}
              fontWeight="bold"
            >
              BLOCKING
            </text>
          </g>
        )}

        {/* Inventory Service (Backend) */}
        <g transform={`translate(1450, 540) scale(${inventoryScale})`}>
          <KurzgesagtCube
            x={-60}
            y={-50}
            size={120}
            color={colors.inventory}
            emotion={currentState === STATE_OPEN ? "neutral" : "happy"}
          />
          <text
            x={0}
            y={80}
            textAnchor="middle"
            fill="white"
            fontSize={20}
            fontWeight="bold"
          >
            Inventory
          </text>
        </g>

        {/* Test request success indicator */}
        {currentState === STATE_HALF_OPEN && testSuccessScale > 0 && (
          <g
            transform={`translate(1450, 450) scale(${testSuccessScale})`}
          >
            <circle r={30} fill={colors.orders} filter="url(#cbGlow)" />
            <path
              d={`M -12 0 L -3 10 L 15 -8`}
              stroke="white"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray={`${50 * checkmarkPath}, 50`}
            />
          </g>
        )}

        {/* Requests */}
        {requests.map(
          (req, i) =>
            req.visible && (
              <g key={i} transform={`translate(${req.x}, ${req.y})`}>
                <circle
                  r={req.test ? 18 : 15}
                  fill={req.test ? colors.accent : req.blocked ? colors.danger : colors.network}
                  opacity={0.9}
                />
                {req.test && (
                  <text
                    x={0}
                    y={5}
                    textAnchor="middle"
                    fill="white"
                    fontSize={10}
                    fontWeight="bold"
                  >
                    ?
                  </text>
                )}
                {req.blocked && (
                  <g stroke="white" strokeWidth={3} strokeLinecap="round">
                    <line x1={-6} y1={-6} x2={6} y2={6} />
                    <line x1={6} y1={-6} x2={-6} y2={6} />
                  </g>
                )}
              </g>
            )
        )}

        {/* Fallback message */}
        {currentState === STATE_OPEN && fallbackOpacity > 0 && (
          <g
            transform={`translate(960, ${fallbackY})`}
            opacity={fallbackOpacity * fallbackFade}
          >
            <rect
              x={-180}
              y={-40}
              width={360}
              height={80}
              rx={15}
              fill={colors.accent}
              opacity={0.95}
            />
            <text
              x={0}
              y={-5}
              textAnchor="middle"
              fill="#1a1a1a"
              fontSize={22}
              fontWeight="bold"
            >
              Fallback Response
            </text>
            <text
              x={0}
              y={25}
              textAnchor="middle"
              fill="#1a1a1a"
              fontSize={16}
            >
              Using cached data
            </text>
          </g>
        )}

        {/* State description box */}
        <g
          transform="translate(960, 800)"
          opacity={descOpacity}
        >
          <rect
            x={-300}
            y={-30}
            width={600}
            height={60}
            rx={15}
            fill={getStateColor()}
            opacity={0.2}
          />
          <text
            x={0}
            y={8}
            textAnchor="middle"
            fill={getStateColor()}
            fontSize={22}
            fontWeight="bold"
          >
            {getStateDescription()}
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
          Circuit Breaker Pattern
        </text>
        <text
          x={960}
          y={titleY + 50}
          textAnchor="middle"
          fill={colors.accent}
          fontSize={28}
          opacity={titleOpacity}
        >
          Preventing cascade failures
        </text>
      </svg>
    </AbsoluteFill>
  );
};

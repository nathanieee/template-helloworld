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

/**
 * Scene21_ChaosMonkey - A mischievous red imp character unplugs the power
 * Shows Chaos Monkey testing resilience
 */
export const Scene21_ChaosMonkey: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animations
  const titleOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 40], [50, 100], {
    extrapolateRight: "clamp",
  });

  // Chaos imp entrance - springs in from right
  const impEnterSpring = spring({
    frame: frame - 20,
    fps: 30,
    config: { stiffness: 100, damping: 10 },
  });
  const impX = interpolate(
    impEnterSpring,
    [0, 1],
    [2200, 1350],
    extrapolateRight: "clamp"
  );

  // Imp wiggle animation (mischievous)
  const impWiggle = useWiggle({ amount: 8, frequency: 0.15, phase: 0 });
  const impWiggleY = useWiggle({ amount: 5, frequency: 0.2, phase: 1 });

  // Tail wagging
  const tailRotation = useWiggle({ amount: 25, frequency: 0.2, phase: 2 });

  // Arm extension to grab the plug
  const armProgress = interpolate(frame, [60, 100], [0, 1], {
    extrapolateRight: "clamp",
  });
  const armX = interpolate(armProgress, [0, 1], [1350, 1250]);
  const armY = interpolate(armProgress, [0, 1], [540, 450]);

  // Plug pulling animation
  const plugPullProgress = interpolate(frame, [100, 140], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Service dimming and shake when unplugged
  const serviceBrightness = interpolate(frame, [120, 160], [1, 0.3], {
    extrapolateRight: "clamp",
  });

  // Shake when unplugged
  const unplugShake = useShake({
    startFrame: 120,
    duration: 40,
    intensity: 15,
    decay: true,
  });

  // X eyes animation for service
  const xEyesOpacity = interpolate(frame, [130, 160], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Sparks on unplugging
  const sparkOpacity = interpolate(
    frame,
    [130, 150, 170],
    [1, 0.8, 0],
    { extrapolateRight: "clamp" }
  );

  // Imp smile gets bigger after unplugging
  const smileWidth = interpolate(frame, [140, 180], [0.7, 1.3], {
    extrapolateRight: "clamp",
  });

  // "Service Down" message
  const downMsgOpacity = interpolate(frame, [160, 200], [0, 1], {
    extrapolateRight: "clamp",
  });
  const downMsgScale = interpolate(frame, [160, 180], [0.5, 1], {
    extrapolateRight: "clamp",
  });

  // Imp body color - vibrant red
  const impColor = colors.danger;
  const impDarkColor = colors.dangerDark;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        <defs>
          {/* Gradient for imp body */}
          <radialGradient id="impBodyGrad" cx="40%" cy="30%">
            <stop offset="0%" stopColor={colors.danger} stopOpacity={1} />
            <stop offset="100%" stopColor={colors.dangerDark} stopOpacity={1} />
          </radialGradient>
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation={4} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background elements - other services */}
        <g opacity={0.6}>
          {[
            { name: "Orders", color: colors.orders, x: 600, y: 400 },
            { name: "Products", color: colors.products, x: 600, y: 650 },
          ].map((service, i) => (
            <g
              key={service.name}
              transform={`translate(${service.x}, ${service.y})`}
            >
              <rect
                x={-55}
                y={-40}
                width={110}
                height={80}
                rx={15}
                fill={service.color}
                opacity={0.7}
              />
              <text
                x={0}
                y={5}
                textAnchor="middle"
                fill="white"
                fontSize={16}
                fontWeight="bold"
              >
                {service.name}
              </text>
            </g>
          ))}
        </g>

        {/* Service that gets unplugged */}
        <g
          transform={`translate(${1250}, ${500 + unplugShake.y}) rotate(${
            unplugShake.rotation
          })`}
        >
          {/* Service cube with Kurzgesagt style */}
          <rect
            x={-70}
            y={-50}
            width={140}
            height={100}
            rx={20}
            fill={`rgb(${72 + serviceBrightness * 150}, ${
              187 - serviceBrightness * 70
            }, ${120 - serviceBrightness * 20})`}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={3}
          />

          {/* Face - changes to X eyes when unplugged */}
          <g opacity={serviceBrightness}>
            {/* Normal eyes */}
            <circle cx={-20} cy={-20} r={10} fill="white" />
            <circle cx={20} cy={-20} r={10} fill="white" />
            <circle cx={-20} cy={-18} r={5} fill="black" />
            <circle cx={20} cy={-18} r={5} fill="black" />
          </g>

          {/* X eyes when dead */}
          <g opacity={xEyesOpacity}>
            <g stroke="#333" strokeWidth={4} strokeLinecap="round">
              <line x1={-28} y1={-28} x2={-12} y2={-12} />
              <line x1={-12} y1={-28} x2={-28} y2={-12} />
              <line x1={12} y1={-28} x2={28} y2={-12} />
              <line x1={28} y1={-28} x2={12} y2={-12} />
            </g>
          </g>

          {/* Mouth - worried then flat */}
          <path
            d={`M ${-15 * smileWidth} 10 Q 0 ${5 + (1 - serviceBrightness) * 5} ${
              15 * smileWidth
            } 10`}
            stroke="rgba(255,255,255,0.8)"
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />

          {/* Sweat drop when stressed */}
          {serviceBrightness < 0.8 && serviceBrightness > 0.4 && (
            <ellipse
              cx={45}
              cy={-15}
              rx={6}
              ry={10}
              fill={colors.network}
              opacity={1 - serviceBrightness}
            >
              <animate
                attributeName="cy"
                values="-15;-5;-15"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </ellipse>
          )}

          {/* Power cord */}
          <g>
            <line
              x1={0}
              y1={-50}
              x2={0}
              y2={-100 - plugPullProgress * 50}
              stroke={colors.monolith}
              strokeWidth={10}
              strokeLinecap="round"
            />
            {/* Plug */}
            <g
              transform={`translate(0, ${-100 - plugPullProgress * 50})`}
              rotation={plugPullProgress * 30}
            >
              <rect
                x={-18}
                y={-15}
                width={36}
                height={30}
                rx={6}
                fill={colors.monolith}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={2}
              />
              {/* Prongs */}
              <rect x={-10} y={-22} width={6} height={12} rx={2} fill={colors.monolithLight} />
              <rect x={4} y={-22} width={6} height={12} rx={2} fill={colors.monolithLight} />
            </g>

            {/* Sparks when unplugged */}
            {sparkOpacity > 0 && (
              <g opacity={sparkOpacity}>
                {[-1, 0, 1].map((i) => (
                  <g key={i} transform={`translate(${i * 20}, ${-110})`}>
                    <path
                      d={`M 0 0 L ${5 + Math.random() * 5} ${-15 - Math.random() * 10} L ${
                        -5 - Math.random() * 5
                      } ${-15 - Math.random() * 10} Z`}
                      fill={colors.accent}
                      filter="url(#glow)"
                    />
                  </g>
                ))}
              </g>
            )}

            {/* Electric zap lines */}
            {serviceBrightness < 0.5 && (
              <g opacity={1 - serviceBrightness}>
                <path
                  d={`M -15 ${-70} L ${-5} ${-85} L ${-10} ${-95}`}
                  stroke={colors.background}
                  strokeWidth={4}
                  fill="none"
                />
                <path
                  d={`M 15 ${-70} L ${5} ${-85} L ${10} ${-95}`}
                  stroke={colors.background}
                  strokeWidth={4}
                  fill="none"
                />
              </g>
            )}
          </g>

          {/* Service label */}
          <text
            x={0}
            y={35}
            textAnchor="middle"
            fill="white"
            fontSize={18}
            fontWeight="bold"
            opacity={serviceBrightness}
          >
            Inventory
          </text>
        </g>

        {/* Chaos Imp Character */}
        <g
          transform={`translate(${impX + impWiggle}, ${540 + impWiggleY})`}
        >
          {/* Shadow */}
          <ellipse
            cx={0}
            cy={60}
            rx={50}
            ry={12}
            fill="black"
            opacity={0.2}
          />

          {/* Tail */}
          <g transform={`rotate(${tailRotation})`}>
            <path
              d="M 40 20 Q 70 5 85 25 Q 70 40 45 30"
              fill={impColor}
              stroke={impDarkColor}
              strokeWidth={2}
            />
            {/* Tail tip */}
            <path
              d="M 82 20 Q 90 25 82 30"
              fill="none"
              stroke={impDarkColor}
              strokeWidth={3}
              strokeLinecap="round"
            />
          </g>

          {/* Body - rounded imp shape */}
          <ellipse
            cx={0}
            cy={10}
            rx={55}
            ry={45}
            fill="url(#impBodyGrad)"
            stroke={impDarkColor}
            strokeWidth={3}
          />

          {/* Head */}
          <ellipse
            cx={0}
            cy={-30}
            rx={40}
            ry={35}
            fill={impColor}
            stroke={impDarkColor}
            strokeWidth={3}
          />

          {/* Ears/Horns */}
          <ellipse cx={-38} cy={-55} rx={18} ry={12} fill={impColor} stroke={impDarkColor} strokeWidth={2} />
          <ellipse cx={38} cy={-55} rx={18} ry={12} fill={impColor} stroke={impDarkColor} strokeWidth={2} />

          {/* Mischievous eyes */}
          <g>
            {/* Eye whites */}
            <ellipse cx={-14} cy={-30} rx={12} ry={10} fill="white" />
            <ellipse cx={14} cy={-30} rx={12} ry={10} fill="white" />

            {/* Pupils - looking at plug */}
            <circle
              cx={-14 + (armX > 1300 ? 4 : 0)}
              cy={-30}
              r={6}
              fill="#1a1a1a"
            />
            <circle
              cx={14 + (armX > 1300 ? 4 : 0)}
              cy={-30}
              r={6}
              fill="#1a1a1a"
            />

            {/* Eye highlights */}
            <circle
              cx={-11 + (armX > 1300 ? 4 : 0)}
              cy={-33}
              r={3}
              fill="white"
            />
            <circle
              cx={17 + (armX > 1300 ? 4 : 0)}
              cy={-33}
              r={3}
              fill="white"
            />
          </g>

          {/* Mischievous grin */}
          <path
            d={`M ${-20 * smileWidth} -12 Q 0 ${5 * smileWidth} ${
              20 * smileWidth
            } -12`}
            stroke="#1a1a1a"
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />

          {/* Arm reaching for plug */}
          {frame >= 60 && (
            <g>
              {/* Upper arm */}
              <line
                x1={40}
                y1={5}
                x2={armX - impX}
                y2={armY - 540}
                stroke={impColor}
                strokeWidth={18}
                strokeLinecap="round"
              />
              {/* Hand/paw */}
              <ellipse
                cx={armX - impX}
                cy={armY - 540}
                rx={15}
                ry={12}
                fill={impColor}
                stroke={impDarkColor}
                strokeWidth={2}
              />
            </g>
          )}

          {/* Small legs */}
          <ellipse cx={-20} cy={50} rx={12} ry={8} fill={impColor} stroke={impDarkColor} strokeWidth={2} />
          <ellipse cx={20} cy={50} rx={12} ry={8} fill={impColor} stroke={impDarkColor} strokeWidth={2} />
        </g>

        {/* Service Down message */}
        {downMsgOpacity > 0 && (
          <g
            transform={`translate(1250, 620) scale(${downMsgScale})`}
            opacity={downMsgOpacity}
          >
            <rect
              x={-100}
              y={-25}
              width={200}
              height={50}
              rx={12}
              fill={colors.danger}
              opacity={0.9}
            />
            <text
              x={0}
              y={8}
              textAnchor="middle"
              fill="white"
              fontSize={22}
              fontWeight="bold"
            >
              Service Down!
            </text>
          </g>
        )}

        {/* Title */}
        <text
          x={960}
          y={titleY}
          textAnchor="middle"
          fill={colors.danger}
          fontSize={52}
          fontWeight="bold"
          opacity={titleOpacity}
        >
          Chaos Monkey
        </text>
        <text
          x={960}
          y={titleY + 50}
          textAnchor="middle"
          fill={colors.textSecondary}
          fontSize={28}
          opacity={titleOpacity}
        >
          "What happens if we pull the plug?"
        </text>
      </svg>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtCube } from "../components/kurzgesagt/KurzgesagtCube";
import { SparkParticles } from "../animation-engine/particles/SparkParticles";
import { StarField } from "../animation-engine/particles/StarField";
import { colors } from "../styles/colors";

/**
 * Kurzgesagt-style bird/mascot component
 * Simple rounded duck-like character that can fly and land
 */
interface DuckBirdProps {
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
  wingFlap?: number;
  landed?: boolean;
  color?: string;
}

const DuckBird: React.FC<DuckBirdProps> = ({
  x,
  y,
  scale = 1,
  rotation = 0,
  wingFlap = 0,
  landed = false,
  color = colors.accent,
}) => {
  const s = scale;

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${s})`}>
      {/* Shadow */}
      <ellipse
        cx={0}
        cy={45}
        rx={35 * s}
        ry={10 * s}
        fill="rgba(0,0,0,0.2)"
        opacity={landed ? 0.3 : 0}
      />

      {/* Body - rounded rectangle */}
      <ellipse cx={0} cy={0} rx={45} ry={30} fill={color} />
      {/* Body highlight */}
      <ellipse cx={-20} cy={-10} rx={15} ry={8} fill="white" opacity={0.3} />

      {/* Wing - animated flapping */}
      <g transform={`translate(-15, -5) rotate(${wingFlap})`}>
        <ellipse cx={0} cy={0} rx={25} ry={15} fill={color} opacity={0.9} />
        <ellipse cx={-8} cy={3} rx={12} ry={6} fill="white" opacity={0.2} />
      </g>

      {/* Neck */}
      <ellipse cx={30} cy={-15} rx={12} ry={20} fill={color} />

      {/* Head */}
      <circle cx={35} cy={-35} r={22} fill={color} />
      {/* Head highlight */}
      <circle cx={28} cy={-42} r={8} fill="white" opacity={0.3} />

      {/* Eye - large and expressive */}
      <circle cx={42} cy={-38} r={8} fill="white" />
      <circle cx={44} cy={-38} r={4} fill={colors.monolithDark} />
      <circle cx={46} cy={-40} r={1.5} fill="white" />

      {/* Beak - orange */}
      <polygon
        points="55,-32 75,-30 55,-26"
        fill={colors.inventory}
      />
      <ellipse cx={58} cy="-30" rx={3} ry={1.5} fill={colors.inventoryDark} />

      {/* Feet - only visible when landed */}
      {landed && (
        <>
          <g transform="translate(-10, 35)">
            <ellipse cx={0} cy={0} rx={12} ry={5} fill={colors.inventory} />
            <line x1={0} y1={0} x2="-8" y2={8} stroke={colors.inventory} strokeWidth={2} />
            <line x1={0} y1={0} x2="0" y2={10} stroke={colors.inventory} strokeWidth={2} />
            <line x1={0} y1={0} x2={8} y2={8} stroke={colors.inventory} strokeWidth={2} />
          </g>
          <g transform="translate(10, 35)">
            <ellipse cx={0} cy={0} rx={12} ry={5} fill={colors.inventory} />
            <line x1={0} y1={0} x2="-8" y2={8} stroke={colors.inventory} strokeWidth={2} />
            <line x1={0} y1={0} x2="0" y2={10} stroke={colors.inventory} strokeWidth={2} />
            <line x1={0} y1={0} x2={8} y2={8} stroke={colors.inventory} strokeWidth={2} />
          </g>
        </>
      )}

      {/* Tail feathers */}
      <g transform="translate(-40, 0)">
        <ellipse cx={0} cy="-8" rx={12} ry={6} fill={color} />
        <ellipse cx={0} cy="0" rx={15} ry={6} fill={color} />
        <ellipse cx={0} cy="8" rx={12} ry={6} fill={color} />
      </g>
    </>
  );
};

export const Scene29_TheEnd: React.FC = () => {
  const frame = useCurrentFrame();

  // Star field fade in
  const starOpacity = springForFrame(frame, 0, 100, 0.3, 0.8);

  // Bird flight phases
  const flyInProgress = springForFrame(frame, 30, 120, 0.25, 0.7);
  const circleProgress = springForFrame(frame, 120, 240, 0.2, 0.75);
  const landProgress = springForFrame(frame, 240, 300, 0.3, 0.8);

  // Bird position calculations
  const getBirdState = () => {
    // Phase 1: Fly in from right
    if (frame < 120) {
      const x = 2100 - flyInProgress * 1200; // From 2100 to 900
      const y = 200 + flyInProgress * 200; // From 200 to 400
      const wingFlap = Math.sin((frame / 5) * Math.PI * 2) * 25;
      return { x, y, rotation: 0, wingFlap, landed: false, phase: 'flyIn' };
    }

    // Phase 2: Circle around the system
    if (frame < 240) {
      const angle = circleProgress * Math.PI * 2 - Math.PI / 2;
      const radius = 200;
      const x = 960 + Math.cos(angle) * radius;
      const y = 450 + Math.sin(angle) * radius * 0.6;
      const rotation = Math.atan2(Math.cos(angle) * radius * 0.6, -Math.sin(angle) * radius) * (180 / Math.PI);
      const wingFlap = Math.sin((frame / 6) * Math.PI * 2) * 20;
      return { x, y, rotation, wingFlap, landed: false, phase: 'circling' };
    }

    // Phase 3: Land on top
    const targetY = 380;
    const y = 450 + (targetY - 450) * landProgress;
    const x = 960;
    const wingFlap = Math.sin((frame / 8) * Math.PI * 2) * 5 * (1 - landProgress);
    return { x, y, rotation: 0, wingFlap, landed: landProgress > 0.9, phase: 'landing' };
  };

  const birdState = getBirdState();

  // System cubes fade in
  const systemOpacity = springForFrame(frame, 60, 150, 0.3, 0.8);

  // Title text animations
  const textOpacity = springForFrame(frame, 150, 200, 0.3, 0.8);
  const textY = interpolate(frame, [150, 200], [30, 0]);

  // Final fade out
  const fadeOpacity = springForFrame(frame, 320, 380, 0.3, 0.8);
  const theEndOpacity = springForFrame(frame, 360, 420, 0.25, 0.7);

  // Sparkle effects
  const sparkle1 = frame === 120;
  const sparkle2 = frame === 240;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {/* Star field background */}
        <g opacity={starOpacity}>
          <StarField count={100} />
        </g>

        {/* System of cubes - representing the microservices */}
        <g opacity={systemOpacity} transform="translate(960, 520)">
          {/* Central cluster */}
          <g transform="translate(-80, 0)">
            <KurzgesagtCube
              x={-40}
              y={-40}
              size={80}
              color={colors.orders}
              emotion="happy"
              pulseConfig={{ min: 0.98, max: 1.02, speed: 0.03, phase: 0 }}
              shadowScale={true}
            />
          </g>
          <g transform="translate(0, -50)">
            <KurzgesagtCube
              x={-35}
              y={-35}
              size={70}
              color={colors.inventory}
              emotion="happy"
              pulseConfig={{ min: 0.98, max: 1.02, speed: 0.03, phase: 1 }}
              shadowScale={true}
            />
          </g>
          <g transform="translate(80, 0)">
            <KurzgesagtCube
              x={-35}
              y={-35}
              size={70}
              color={colors.products}
              emotion="happy"
              pulseConfig={{ min: 0.98, max: 1.02, speed: 0.03, phase: 2 }}
              shadowScale={true}
            />
          </g>
          <g transform="translate(0, 60)">
            <KurzgesagtCube
              x={-30}
              y={-30}
              size={60}
              color={colors.payments}
              emotion="happy"
              pulseConfig={{ min: 0.98, max: 1.02, speed: 0.03, phase: 3 }}
              shadowScale={true}
            />
          </g>
        </g>

        {/* Connection glow between services */}
        <g opacity={systemOpacity * 0.3}>
          <ellipse cx={960} cy={520} rx={150} ry={100} fill={colors.accent} opacity={0.2} />
        </g>

        {/* The bird/mascot */}
        <DuckBird
          x={birdState.x}
          y={birdState.y}
          scale={1.2}
          rotation={birdState.rotation}
          wingFlap={birdState.wingFlap}
          landed={birdState.landed}
        />

        {/* Sparkles when bird completes each phase */}
        {sparkle1 && (
          <SparkParticles
            count={15}
            origin={{ x: 960, y: 250 }}
            burstFrame={120}
            color={colors.accent}
            speed={0.7}
            lifetime={40}
          />
        )}
        {sparkle2 && (
          <SparkParticles
            count={12}
            origin={{ x: 960, y: 380 }}
            burstFrame={240}
            color={colors.orders}
            speed={0.5}
            lifetime={35}
          />
        )}

        {/* Title text */}
        <g transform={`translate(960, ${720 + textY})`} opacity={textOpacity}>
          <text x={0} y={0} textAnchor="middle" fill={colors.text} fontSize={64} fontWeight="bold">
            Microservices!
          </text>
          <text x={0} y={50} textAnchor="middle" fill={colors.textSecondary} fontSize={32}>
            Complex, but powerful {"🚀"}
          </text>
          <text x={0} y={90} textAnchor="middle" fill={colors.textTertiary} fontSize={24}>
            Thanks for watching! {"🎬"}
          </text>
        </g>

        {/* Final fade to black */}
        <rect x={0} y={0} width={1920} height={1080} fill="black" opacity={fadeOpacity} />

        {/* "The End" text */}
        {theEndOpacity > 0 && (
          <text
            x={960}
            y={540}
            textAnchor="middle"
            fill="white"
            fontSize={96}
            fontWeight="bold"
            opacity={theEndOpacity}
          >
            The End
          </text>
        )}

        {/* Small bird silhouette in corner at the end */}
        {fadeOpacity > 0.5 && (
          <g transform="translate(1700, 900)" opacity={fadeOpacity}>
            <ellipse cx={0} cy={0} rx={30} ry={20} fill={colors.accent} />
            <circle cx={25} cy="-15" r={15} fill={colors.accent} />
            <polygon
              points="38,-12 50,-10 38,-8"
              fill={colors.inventory}
            />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};

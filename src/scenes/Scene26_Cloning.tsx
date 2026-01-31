import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtCube } from "../components/kurzgesagt/KurzgesagtCube";
import { SparkParticles } from "../animation-engine/particles/SparkParticles";
import { DataParticles } from "../animation-engine/particles/DataParticles";
import { colors } from "../styles/colors";

export const Scene26_Cloning: React.FC = () => {
  const frame = useCurrentFrame();

  // Title animations
  const titleOpacity = springForFrame(frame, 0, 50, 0.3, 0.8);
  const titleY = interpolate(frame, [0, 50], [-30, 0]);

  // Original service (monolith being cloned)
  const originalHeat = springForFrame(frame, 100, 250, 0.15, 0.8);
  const originalScale = 1 + (1 - originalHeat) * 0.1; // Shrinks slightly as it cools
  const originalPulse = interpolate(frame, [0, 300], [0.05, 0.02]);

  // Clone 1 slides in with spring
  const clone1Progress = springForFrame(frame, 60, 160, 0.3, 0.7);
  const clone1X = -200 + clone1Progress * 960;
  const clone1Scale = elasticOutForFrame(frame, 60, 160, 0.3, 0.4);
  const clone1Rotation = interpolate(frame, [60, 100], [-15, 0]);

  // Clone 2 slides in with spring (delayed)
  const clone2Progress = springForFrame(frame, 90, 190, 0.3, 0.7);
  const clone2X = 2120 + (clone2Progress - 1) * 960;
  const clone2Scale = elasticOutForFrame(frame, 90, 190, 0.3, 0.4);
  const clone2Rotation = interpolate(frame, [90, 130], [15, 0]);

  // Connection lines drawing
  const connectionOpacity = springForFrame(frame, 180, 230, 0.2, 0.8);
  const connectionDash = interpolate(frame, [180, 230], [0, 200]);

  // Clone beam effect
  const beamOpacity = interpolate(frame, [40, 100, 150], [0, 1, 0], { extrapolateRight: "clamp" });

  // Floating particles in background
  const particleOpacity = interpolate(frame, [0, 60], [0, 0.6]);

  // Labels fade in
  const labelsOpacity = springForFrame(frame, 200, 250, 0.3, 0.8);

  // Capacity meter
  const capacityProgress = springForFrame(frame, 220, 280, 0.25, 0.7);
  const capacityWidth = capacityProgress * 400;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <svg width={1920} height={1080}>
        {/* Background floating particles */}
        <g opacity={particleOpacity}>
          {Array.from({ length: 15 }).map((_, i) => {
            const angle = (i / 15) * Math.PI * 2;
            const radius = 300 + Math.sin(frame / 30 + i) * 50;
            const x = 960 + Math.cos(angle + frame / 100) * radius;
            const y = 540 + Math.sin(angle + frame / 100) * radius;
            const size = 3 + Math.sin(frame / 20 + i * 2) * 2;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={size}
                fill={colors.accent}
                opacity={0.2 + Math.sin(frame / 15 + i) * 0.1}
              />
            );
          })}
        </g>

        {/* Clone beam effects */}
        {beamOpacity > 0 && (
          <g opacity={beamOpacity}>
            {/* Left beam arc */}
            <path
              d="M 960 400 Q 700 250 460 400"
              stroke={colors.orders}
              strokeWidth={3}
              fill="none"
              strokeDasharray="10,10"
              opacity={0.5}
            />
            {/* Right beam arc */}
            <path
              d="M 960 400 Q 1220 250 1460 400"
              stroke={colors.orders}
              strokeWidth={3}
              fill="none"
              strokeDasharray="10,10"
              opacity={0.5}
            />
            {/* Spark particles at clone positions */}
            <SparkParticles
              count={8}
              origin={{ x: 460, y: 400 }}
              burstFrame={100}
              color={colors.orders}
              speed={0.8}
              lifetime={30}
            />
            <SparkParticles
              count={8}
              origin={{ x: 1460, y: 400 }}
              burstFrame={130}
              color={colors.orders}
              speed={0.8}
              lifetime={30}
            />
          </g>
        )}

        {/* Connection lines between services */}
        <g opacity={connectionOpacity}>
          <line
            x1={960}
            y1={450}
            x2={460}
            y2={450}
            stroke={colors.ordersLight}
            strokeWidth={3}
            strokeDasharray={connectionDash}
            opacity={0.5}
          />
          <line
            x1={960}
            y1={450}
            x2={1460}
            y2={450}
            stroke={colors.ordersLight}
            strokeWidth={3}
            strokeDasharray={connectionDash}
            opacity={0.5}
          />
          {/* Data flowing between services */}
          <DataParticles
            path={[
              { x: 960, y: 450, progress: 0 },
              { x: 460, y: 450, progress: 1 },
            ]}
            count={3}
            startFrame={200}
            duration={40}
            color={colors.ordersLight}
            size={5}
            spacing={20}
          />
          <DataParticles
            path={[
              { x: 960, y: 450, progress: 0 },
              { x: 1460, y: 450, progress: 1 },
            ]}
            count={3}
            startFrame={200}
            duration={40}
            color={colors.ordersLight}
            size={5}
            spacing={20}
          />
        </g>

        {/* Original service (cools down from hot to cool) */}
        <g transform={`translate(960, 400)`}>
          <KurzgesagtCube
            x={-60}
            y={-50}
            size={120}
            color={interpolateColor(
              colors.danger,
              colors.orders,
              originalHeat
            )}
            emotion={originalHeat > 0.5 ? "worried" : "happy"}
            glow={originalHeat > 0.3}
            pulseConfig={{
              min: 1 - originalPulse,
              max: 1 + originalPulse,
              speed: 0.03,
            }}
            shadowScale={true}
          />
          {/* "Original" badge */}
          <g opacity={labelsOpacity}>
            <rect x={-40} y={80} width={80} height={24} rx={12} fill={colors.monolithDark} />
            <text x={0} y={97} textAnchor="middle" fill={colors.textSecondary} fontSize={12} fontWeight="bold">
              ORIGINAL
            </text>
          </g>
          {/* Cooling indicator */}
          {originalHeat < 0.5 && (
            <g opacity={1 - originalHeat * 2}>
              <text x={0} y={130} textAnchor="middle" fill={colors.ordersLight} fontSize={14}>
                {"❄️".repeat(Math.floor((1 - originalHeat) * 3))} Cooling...
              </text>
            </g>
          )}
        </g>

        {/* Clone 1 - slides in from left */}
        {clone1Progress > 0 && (
          <g transform={`translate(${clone1X}, 400) rotate(${clone1Rotation})`}>
            <g transform={`scale(${clone1Scale})`} style={{ transformOrigin: "center" }}>
              <KurzgesagtCube
                x={-60}
                y={-50}
                size={120}
                color={colors.orders}
                emotion="happy"
                pulseConfig={{ min: 0.98, max: 1.02, speed: 0.04, phase: 1 }}
                shadowScale={true}
              />
            </g>
            {/* "NEW" badge pops in */}
            {clone1Progress > 0.8 && (
              <g transform={`translate(50, -80)`}>
                <rect x={-25} y={-12} width={50} height={24} rx={12} fill={colors.accent} />
                <text x={0} y={5} textAnchor="middle" fill={colors.monolithDark} fontSize={12} fontWeight="bold">
                  NEW
                </text>
              </g>
            )}
            {/* Clone label */}
            <g opacity={labelsOpacity}>
              <rect x={-40} y={80} width={80} height={24} rx={12} fill={colors.ordersDark} />
              <text x={0} y={97} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold">
                CLONE 1
              </text>
            </g>
          </g>
        )}

        {/* Clone 2 - slides in from right */}
        {clone2Progress > 0 && (
          <g transform={`translate(${clone2X}, 400) rotate(${-clone2Rotation})`}>
            <g transform={`scale(${clone2Scale})`} style={{ transformOrigin: "center" }}>
              <KurzgesagtCube
                x={-60}
                y={-50}
                size={120}
                color={colors.orders}
                emotion="happy"
                pulseConfig={{ min: 0.98, max: 1.02, speed: 0.04, phase: 2 }}
                shadowScale={true}
              />
            </g>
            {/* "NEW" badge pops in */}
            {clone2Progress > 0.8 && (
              <g transform={`translate(50, -80)`}>
                <rect x={-25} y={-12} width={50} height={24} rx={12} fill={colors.accent} />
                <text x={0} y={5} textAnchor="middle" fill={colors.monolithDark} fontSize={12} fontWeight="bold">
                  NEW
                </text>
              </g>
            )}
            {/* Clone label */}
            <g opacity={labelsOpacity}>
              <rect x={-40} y={80} width={80} height={24} rx={12} fill={colors.ordersDark} />
              <text x={0} y={97} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold">
                CLONE 2
              </text>
            </g>
          </g>
        )}

        {/* Title */}
        <g transform={`translate(960, ${100 + titleY})`}>
          <text x={0} y={0} textAnchor="middle" fill={colors.text} fontSize={56} fontWeight="bold" opacity={titleOpacity}>
            Horizontal Scaling
          </text>
          <text x={0} y={45} textAnchor="middle" fill={colors.ordersLight} fontSize={28} opacity={titleOpacity * 0.9}>
            {"✨"} Clone services to handle more load
          </text>
        </g>

        {/* Capacity meter */}
        <g transform="translate(960, 850)" opacity={labelsOpacity}>
          <rect x={-200} y={0} width={400} height={20} rx={10} fill={colors.monolithDark} />
          <rect x={-200} y={0} width={capacityWidth} height={20} rx={10} fill={colors.orders}>
            <animate
              attributeName="width"
              values="0;400"
              dur="0.5s"
              begin={`${frame / 30}s`}
              fill="freeze"
            />
          </rect>
          <text x={0} y={45} textAnchor="middle" fill={colors.text} fontSize={24} fontWeight="bold">
            3 instances = 3x capacity! {"📈"}
          </text>
          {/* Capacity markers */}
          <g opacity={0.6}>
            <text x={-200} y={-10} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>1x</text>
            <text x={0} y={-10} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>2x</text>
            <text x={200} y={-10} textAnchor="middle" fill={colors.textSecondary} fontSize={12}>3x</text>
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  );
};

/**
 * Interpolate between two hex colors
 */
function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  const r = Math.round(c1.r + (c2.r - c1.r) * factor);
  const g = Math.round(c1.g + (c2.g - c1.g) * factor);
  const b = Math.round(c1.b + (c2.b - c1.b) * factor);

  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

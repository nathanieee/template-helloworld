import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { springForFrame, elasticOutForFrame } from "../animation-engine/easing";
import { KurzgesagtStickFigure } from "../components/kurzgesagt/KurzgesagtStickFigure";
import { DustParticles, SparkParticles, SmokeParticles } from "../animation-engine/particles";
import { CameraShake } from "../animation-engine/camera";
import { useWiggle, usePulse } from "../animation-engine/hooks";
import { colors } from "../styles/colors";

export const Scene5_Crash: React.FC = () => {
  const frame = useCurrentFrame();

  // Bug crawl animation
  const bugCrawlProgress = interpolate(frame, [0, 120], [0, 1], { extrapolateRight: "clamp" });
  const bugX = 700 + bugCrawlProgress * 200;
  const bugY = 400 + Math.sin(bugCrawlProgress * Math.PI * 4) * 20;

  // Bug wiggle
  const bugWiggle = Math.sin(frame * 0.3) * 5;

  // Monolith shake before crash
  const preCrashShake = frame > 100 && frame < 150 ? useWiggle({ amount: 5, frequency: 0.2 }) : 0;

  // Wire snap animation
  const snapFrame = 150;
  const snapProgress = springForFrame(frame, snapFrame, snapFrame + 20, 0.5, 0.5);

  // Monolith collapse
  const collapseProgress = springForFrame(frame, snapFrame + 10, snapFrame + 90, 0.2, 0.6);
  const collapseRotation = collapseProgress * 15;
  const collapseY = collapseProgress * 200;
  const collapseScale = 1 - collapseProgress * 0.2;

  // Monolith darken (turning grey/dead)
  const monolithDarken = springForFrame(frame, snapFrame, snapFrame + 60, 0.3, 0.7);
  const monolithColor = `rgb(${76 - monolithDarken * 50}, ${85 - monolithDarken * 60}, ${104 - monolithDarken * 80})`;

  // Dust cloud on collapse
  const dustOpacity = springForFrame(frame, snapFrame + 30, snapFrame + 80, 0.4, 0.6);

  // Users running away
  const user1RunProgress = springForFrame(frame, snapFrame, snapFrame + 60, 0.4, 0.7);
  const user2RunProgress = springForFrame(frame, snapFrame + 10, snapFrame + 70, 0.4, 0.7);
  const user3RunProgress = springForFrame(frame, snapFrame + 20, snapFrame + 80, 0.4, 0.7);

  // Spark burst at snap
  const snapSparks = frame >= snapFrame && frame < snapFrame + 40;

  // "CRASH!" text
  const crashTextOpacity = springForFrame(frame, snapFrame + 20, snapFrame + 50, 0.3, 0.8);
  const crashTextScale = elasticOutForFrame(frame, snapFrame + 20, snapFrame + 60, 1.5, 0.3);

  // Broken wire hanging
  const wireDangleAmount = springForFrame(frame, snapFrame, snapFrame + 40, 0.3, 0.7);
  const wireDangleWiggle = frame > snapFrame ? Math.sin((frame - snapFrame) * 0.2) * 20 * wireDangleAmount : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Ambient dust increases after crash */}
      <DustParticles
        count={frame > snapFrame ? 80 : 40}
        size={{ min: 1, max: frame > snapFrame ? 5 : 3 }}
        opacity={{ min: 0.1, max: frame > snapFrame ? 0.5 : 0.3 }}
        speed={frame > snapFrame ? 0.4 : 0.15}
      />

      {/* Smoke particles after crash */}
      {frame > snapFrame + 30 && (
        <SmokeParticles
          count={15}
          origin={{ x: 960, y: 700 }}
          emitStartFrame={snapFrame + 30}
          color={colors.monolithDark}
          lifetime={120}
          speed={1.5}
        />
      )}

      {/* Violent camera shake at crash */}
      {frame >= snapFrame && frame < snapFrame + 60 && (
        <CameraShake startFrame={snapFrame} duration={60} intensity={25} decay={true} />
      )}

      {/* Spark burst when wire snaps */}
      {snapSparks && (
        <SparkParticles
          count={25}
          origin={{ x: 850, y: 400 }}
          burstFrame={snapFrame}
          color={colors.accent}
          speed={1.5}
          lifetime={50}
        />
      )}

      {/* Secondary sparks - more dramatic */}
      {snapSparks && (
        <SparkParticles
          count={15}
          origin={{ x: 960, y: 540 }}
          burstFrame={snapFrame + 5}
          color={colors.danger}
          speed={1.2}
          lifetime={40}
        />
      )}

      <svg width={1920} height={1080}>
        {/* Collapsing monolith */}
        <g
          transform={`translate(${960 + preCrashShake}, ${540 + collapseY}) rotate(${collapseRotation}) scale(${collapseScale})`}
          style={{ transformOrigin: "960px 540px" }}
        >
          {/* Main monolith body */}
          <rect
            x={-150}
            y={-400}
            width={300}
            height={400}
            fill={monolithColor}
            stroke={colors.monolithLight}
            strokeWidth={2}
            opacity={1 - monolithDarken * 0.5}
            rx={12}
          />

          {/* Top decorations */}
          <rect x={-120} y={-480} width={40} height={80} fill={monolithColor} rx={4} />
          <rect x={80} y={-480} width={40} height={80} fill={monolithColor} rx={4} />
          <rect x={-30} y={-520} width={60} height={120} fill={monolithColor} rx={6} />

          {/* Door */}
          <rect x={-40} y={-80} width={80} height={80} fill={colors.monolithDark} opacity={0.9} rx={4} />

          {/* X mark on door (dead system) */}
          {monolithDarken > 0.3 && (
            <g opacity={monolithDarken}>
              <line x1={-30} y1={-70} x2={10} y2={-30} stroke={colors.danger} strokeWidth={6} strokeLinecap="round" />
              <line x1={10} y1={-70} x2={-30} y2={-30} stroke={colors.danger} strokeWidth={6} strokeLinecap="round" />
            </g>
          )}

          {/* Broken wire hanging from side */}
          {frame > snapFrame && (
            <path
              d={`M ${-150} ${-100} Q ${-180 + wireDangleWiggle} ${0} ${-160 + wireDangleWiggle * 0.5} ${100}`}
              stroke={colors.orders}
              strokeWidth={8}
              fill="none"
              strokeLinecap="round"
              opacity={0.8}
            />
          )}

          {/* Frayed wire end */}
          {frame > snapFrame && (
            <g transform={`translate(${-160 + wireDangleWiggle * 0.5}, ${100})`}>
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1={0}
                  y1={0}
                  x2={Math.sin(i * 0.5) * 15}
                  y2={20 + i * 3}
                  stroke={colors.orders}
                  strokeWidth={2}
                  strokeLinecap="round"
                  transform={`rotate(${(i - 2) * 10})`}
                />
              ))}
            </g>
          )}

          {/* Highlight */}
          <rect
            x={-130}
            y={-390}
            width={20}
            height={380}
            fill={colors.monolithLight}
            opacity={0.2 * (1 - monolithDarken)}
            rx={4}
          />
        </g>

        {/* The bug (cute beetle) */}
        {frame < snapFrame + 30 && (
          <g transform={`translate(${bugX}, ${bugY}) rotate(${bugWiggle})`}>
            {/* Bug body */}
            <ellipse cx={0} cy={0} rx={25} ry={18} fill={colors.danger} opacity={frame < snapFrame ? 1 : 0.5} />
            <ellipse cx={0} cy={0} rx={18} ry={12} fill={colors.dangerDark} opacity={frame < snapFrame ? 1 : 0.5} />

            {/* Bug head */}
            <circle cx={22} cy={-5} r={12} fill={colors.danger} opacity={frame < snapFrame ? 1 : 0.5} />
            <circle cx={22} cy={-5} r={8} fill={colors.dangerDark} opacity={frame < snapFrame ? 1 : 0.5} />

            {/* Eyes */}
            <circle cx={26} cy={-8} r={4} fill="white" opacity={frame < snapFrame ? 1 : 0.5} />
            <circle cx={26} cy={-8} r={2} fill="black" opacity={frame < snapFrame ? 1 : 0.5} />

            {/* Antennae */}
            <path d="M 28 -12 Q 35 -20 32 -28" stroke={colors.danger} strokeWidth={2} fill="none" opacity={frame < snapFrame ? 1 : 0.5} />
            <path d="M 30 -10 Q 38 -18 36 -26" stroke={colors.danger} strokeWidth={2} fill="none" opacity={frame < snapFrame ? 1 : 0.5} />

            {/* Legs */}
            {frame < snapFrame && [0, 1, 2].map((i) => {
              const legWiggle = Math.sin(frame * 0.3 + i) * 5;
              return (
                <g key={i}>
                  <line
                    x1={-15 + i * 15}
                    y1={10}
                    x2={-25 + i * 15 + legWiggle}
                    y2={30}
                    stroke={colors.dangerDark}
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                  <line
                    x1={-15 + i * 15}
                    y1={-10}
                    x2={-25 + i * 15 - legWiggle}
                    y2={-30}
                    stroke={colors.dangerDark}
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                </g>
              );
            })}

            {/* Cute spots */}
            {frame < snapFrame && (
              <>
                <circle cx={-8} cy={3} r={4} fill="black" opacity={0.3} />
                <circle cx={5} cy={-5} r={3} fill="black" opacity={0.3} />
                <circle cx={8} cy={8} r={2} fill="black" opacity={0.3} />
              </>
            )}
          </g>
        )}

        {/* Users running away */}
        {frame > snapFrame && (
          <>
            <KurzgesagtStickFigure
              x={800 - user1RunProgress * 300}
              y={750}
              scale={1}
              color={colors.users}
              facingRight={false}
              walking={true}
              walkCycle={(frame / 10) % 1}
            />
            <KurzgesagtStickFigure
              x={850 - user2RunProgress * 280}
              y={780}
              scale={0.9}
              color={colors.orders}
              facingRight={false}
              walking={true}
              walkCycle={((frame + 10) / 10) % 1}
            />
            <KurzgesagtStickFigure
              x={900 - user3RunProgress * 260}
              y={760}
              scale={1.1}
              color={colors.products}
              facingRight={false}
              walking={true}
              walkCycle={((frame + 20) / 10) % 1}
            />
          </>
        )}

        {/* Dust cloud effect */}
        {dustOpacity > 0 && (
          <g opacity={dustOpacity}>
            <ellipse cx={960} cy={800} rx={300} ry={80} fill={colors.monolithDark} opacity={0.3} />
            <ellipse cx={900} cy={780} rx={150} ry={50} fill={colors.monolith} opacity={0.2} />
            <ellipse cx={1020} cy={790} rx={180} ry={60} fill={colors.monolithLight} opacity={0.15} />
          </g>
        )}

        {/* "CRASH!" text */}
        {crashTextOpacity > 0 && (
          <g
            transform={`translate(960, 300) scale(${crashTextScale})`}
            style={{ transformOrigin: "960px 300px" }}
          >
            <text
              x={0}
              y={0}
              textAnchor="middle"
              fill={colors.danger}
              fontSize={96}
              fontWeight="bold"
              opacity={crashTextOpacity}
              stroke={colors.dangerDark}
              strokeWidth={4}
            >
              CRASH!
            </text>
          </g>
        )}

        {/* Title */}
        <text
          x={960}
          y={100}
          textAnchor="middle"
          fill={colors.text}
          fontSize={48}
          fontWeight="bold"
          opacity={springForFrame(frame, 0, 50, 0.3, 0.8)}
        >
          The Crash
        </text>

        {/* Subtitle */}
        <text
          x={960}
          y={920}
          textAnchor="middle"
          fill={colors.textSecondary}
          fontSize={22}
          opacity={springForFrame(frame, 30, 80, 0.3, 0.8)}
        >
          One bug brings down everything
        </text>
      </svg>
    </AbsoluteFill>
  );
};

import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Background} from '../shared/Background';
import {Icon} from '../shared/Icon';
import {COLORS} from '../../config/colors';
import {scaleIn} from '../../utils/animation-helpers';

export const Scene2MonolithExplained: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const localFrame = frame; // This scene runs from frame 300-750
  
  // Title fade in
  const titleOpacity = interpolate(localFrame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Server box scale-in
  const serverScale = scaleIn(localFrame, fps, 30);
  
  // Bug drops at frame 100 (local time, frame 400 global)
  const bugY = interpolate(localFrame, [100, 140], [-100, 300], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const bugOpacity = interpolate(localFrame, [100, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Ripple effect from bug impact
  const rippleRadius = interpolate(localFrame, [140, 200], [0, 400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const rippleOpacity = interpolate(localFrame, [140, 220], [0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // System-wide red flash at frame 200-220 (global 500-520)
  const redFlashOpacity = interpolate(
    localFrame,
    [200, 210, 220],
    [0, 0.5, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // All modules turn red
  const moduleRedProgress = interpolate(localFrame, [200, 250], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const moduleColor = interpolate(
    localFrame,
    [200, 250],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill>
      <Background />
      
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 'bold',
            color: COLORS.white,
            textShadow: `0 4px 12px ${COLORS.background}80`,
          }}
        >
          TIGHTLY COUPLED
        </div>
        <div
          style={{
            fontSize: 32,
            color: COLORS.white,
            opacity: 0.8,
            marginTop: 16,
          }}
        >
          Everything is connected
        </div>
      </div>
      
      {/* Server box with tangled connections */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${serverScale})`,
        }}
      >
        <svg width={500} height={400} viewBox="0 0 500 400">
          {/* Server background */}
          <rect
            x={50}
            y={50}
            width={400}
            height={300}
            rx={16}
            fill={COLORS.primaryBlue}
            fillOpacity={0.2}
            stroke={COLORS.primaryBlue}
            strokeWidth="3"
          />
          
          {/* Tangled connection lines */}
          <g stroke={COLORS.white} strokeOpacity={0.3} strokeWidth="2">
            <line x1="100" y1="100" x2="400" y2="100" />
            <line x1="100" y1="100" x2="400" y2="300" />
            <line x1="100" y1="200" x2="400" y2="100" />
            <line x1="100" y1="200" x2="400" y2="200" />
            <line x1="100" y1="200" x2="400" y2="300" />
            <line x1="100" y1="300" x2="400" y2="100" />
            <line x1="100" y1="300" x2="400" y2="200" />
            <line x1="100" y1="300" x2="400" y2="300" />
            <line x1="250" y1="100" x2="250" y2="300" />
          </g>
          
          {/* Module icons */}
          <g opacity={1 - moduleRedProgress * 0.5}>
            <foreignObject x="120" y="110" width="40" height="40">
              <Icon type="lock" size={40} color={COLORS.white} />
            </foreignObject>
            <foreignObject x="340" y="110" width="40" height="40">
              <Icon type="creditCard" size={40} color={COLORS.white} />
            </foreignObject>
            <foreignObject x="120" y="210" width="40" height="40">
              <Icon type="bell" size={40} color={COLORS.white} />
            </foreignObject>
            <foreignObject x="340" y="210" width="40" height="40">
              <Icon type="user" size={40} color={COLORS.white} />
            </foreignObject>
            <foreignObject x="230" y="280" width="40" height="40">
              <Icon type="database" size={40} color={COLORS.white} />
            </foreignObject>
          </g>
          
          {/* Red overlay on modules when failing */}
          {moduleRedProgress > 0 && (
            <rect
              x={50}
              y={50}
              width={400}
              height={300}
              rx={16}
              fill={COLORS.error}
              fillOpacity={moduleRedProgress * 0.4}
            />
          )}
        </svg>
      </div>
      
      {/* Bug icon */}
      {localFrame >= 100 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: bugY,
            transform: 'translateX(-50%)',
            opacity: bugOpacity,
          }}
        >
          <Icon type="bug" size={80} />
        </div>
      )}
      
      {/* Ripple effect */}
      {localFrame >= 140 && localFrame < 250 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 300,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: rippleRadius * 2,
              height: rippleRadius * 2,
              borderRadius: '50%',
              border: `4px solid ${COLORS.error}`,
              opacity: rippleOpacity,
            }}
          />
        </div>
      )}
      
      {/* Red flash */}
      {redFlashOpacity > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: COLORS.error,
            opacity: redFlashOpacity,
          }}
        />
      )}
      
      {/* Failure message */}
      {localFrame >= 220 && (
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            width: '100%',
            textAlign: 'center',
            opacity: interpolate(localFrame, [220, 250], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 'bold',
              color: COLORS.error,
              textShadow: `0 2px 8px ${COLORS.error}40`,
            }}
          >
            CATASTROPHIC FAILURE
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

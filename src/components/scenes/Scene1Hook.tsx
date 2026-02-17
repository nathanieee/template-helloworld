import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Background} from '../shared/Background';
import {MonolithCube} from '../shared/MonolithCube';
import {COLORS} from '../../config/colors';
import {scaleIn} from '../../utils/animation-helpers';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  
  // Title text fade in
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Title slide up
  const titleY = interpolate(frame, [0, 40], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Monolith scale-in
  const monolithScale = scaleIn(frame, fps, 20);
  
  // Crack animation starts at frame 200
  const crackProgress = interpolate(frame, [200, 250], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Dramatic zoom at frame 250-300
  const zoomScale = interpolate(frame, [250, 300], [1, 1.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Shake effect when cracking
  const shakeIntensity = interpolate(frame, [200, 250], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const shake = frame >= 200 && frame < 250;

  return (
    <AbsoluteFill>
      <Background />
      
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 100 + titleY,
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: COLORS.white,
            textShadow: `0 4px 12px ${COLORS.background}80`,
            letterSpacing: '2px',
          }}
        >
          MONOLITHIC ARCHITECTURE
        </div>
      </div>
      
      {/* Monolith */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${monolithScale * zoomScale})`,
        }}
      >
        <MonolithCube
          crackProgress={crackProgress}
          shake={shake}
          scale={1}
          x={100} // Relative to the centered container
          y={80}
        />
      </div>
      
      {/* Warning text appears with crack */}
      {frame >= 230 && (
        <div
          style={{
            position: 'absolute',
            bottom: 200,
            width: '100%',
            textAlign: 'center',
            opacity: interpolate(frame, [230, 260], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 'bold',
              color: COLORS.error,
              textShadow: `0 2px 8px ${COLORS.error}40`,
            }}
          >
            ONE BUG. EVERYTHING FAILS.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

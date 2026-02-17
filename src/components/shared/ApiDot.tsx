import React from 'react';
import {useCurrentFrame} from 'remotion';

interface ApiDotProps {
  progress: number;
  color?: string;
  x: number;
  y: number;
  size?: number;
}

export const ApiDot: React.FC<ApiDotProps> = ({
  progress,
  color = '#2D6CDF',
  x,
  y,
  size = 12,
}) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: 'absolute',
          left: -size / 2,
          top: -size / 2,
          width: size * 3,
          height: size * 3,
          borderRadius: '50%',
          backgroundColor: color,
          opacity: clampedProgress * 0.3,
          filter: 'blur(4px)',
        }}
      />
      
      {/* Main dot */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 ${size}px ${color}`,
          opacity: clampedProgress,
        }}
      />
    </div>
  );
};

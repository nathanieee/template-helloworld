import React from 'react';
import {useCurrentFrame} from 'remotion';

interface NetworkLineProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  active?: boolean;
  color?: string;
  delay?: number;
  showPackets?: boolean;
}

export const NetworkLine: React.FC<NetworkLineProps> = ({
  fromX,
  fromY,
  toX,
  toY,
  active = false,
  color = '#2D6CDF',
  delay = 0,
  showPackets = true,
}) => {
  const frame = useCurrentFrame();
  
  // Bezier curve control point (slight curve for visual interest)
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2 - 30;
  
  // Animated dots traveling along the path
  const packetCount = 3;
  const packets = showPackets && active ? Array.from({length: packetCount}) : [];
  
  const pulseOpacity = active ? 0.7 + Math.sin((frame - delay) / 10) * 0.3 : 0.3;
  const pulseWidth = active ? 2 + Math.sin((frame - delay) / 10) * 1 : 1;

  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <defs>
        <linearGradient id={`gradient-${fromX}-${fromY}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="50%" stopColor={color} stopOpacity={pulseOpacity} />
          <stop offset="100%" stopColor={color} stopOpacity={0.3} />
        </linearGradient>
      </defs>
      
      {/* Connection line */}
      <path
        d={`M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`}
        stroke={`url(#gradient-${fromX}-${fromY})`}
        strokeWidth={pulseWidth}
        fill="none"
        strokeDasharray={active ? '0' : '8,4'}
        style={{
          filter: active ? `drop-shadow(0 0 6px ${color})` : 'none',
        }}
      />
      
      {/* Animated data packets */}
      {packets.map((_, i) => {
        const progress = ((frame - delay) / 60 + i / packetCount) % 1;
        
        // Calculate position on quadratic bezier curve
        const t = progress;
        const x = (1 - t) * (1 - t) * fromX + 2 * (1 - t) * t * midX + t * t * toX;
        const y = (1 - t) * (1 - t) * fromY + 2 * (1 - t) * t * midY + t * t * toY;
        
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="4"
            fill={color}
            style={{
              filter: `drop-shadow(0 0 4px ${color})`,
              opacity: 0.8 - Math.abs(progress - 0.5) * 0.4,
            }}
          />
        );
      })}
    </svg>
  );
};

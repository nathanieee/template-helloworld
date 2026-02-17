import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../../config/colors';
import {Icon} from './Icon';
import {scaleIn} from '../../utils/animation-helpers';

interface MonolithCubeProps {
  crackProgress?: number;
  shake?: boolean;
  scale?: number;
  x?: number;
  y?: number;
}

export const MonolithCube: React.FC<MonolithCubeProps> = ({
  crackProgress = 0,
  shake = false,
  scale = 1,
  x = 960,
  y = 540,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const springScale = scaleIn(frame, fps);
  const appliedScale = springScale * scale;
  
  // Shake effect when failing
  const shakeX = shake ? Math.sin(frame / 2) * 5 : 0;
  const shakeY = shake ? Math.cos(frame / 2) * 5 : 0;
  
  // Subtle rotation
  const rotation = Math.sin(frame / 100) * 2;
  
  const cubeSize = 200;
  const isometricAngle = 30;
  
  // Calculate crack lines
  const renderCracks = () => {
    if (crackProgress <= 0) return null;
    
    const maxCracks = 5;
    const visibleCracks = Math.floor(crackProgress * maxCracks);
    
    return (
      <>
        {Array.from({length: visibleCracks}).map((_, i) => {
          const angle = (i / maxCracks) * Math.PI * 2;
          const length = 40 + crackProgress * 60;
          const startX = cubeSize / 2;
          const startY = cubeSize / 2;
          const endX = startX + Math.cos(angle) * length;
          const endY = startY + Math.sin(angle) * length;
          
          return (
            <line
              key={i}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke={COLORS.error}
              strokeWidth="2"
              strokeDasharray="4,2"
              style={{opacity: crackProgress}}
            />
          );
        })}
      </>
    );
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: x + shakeX - cubeSize / 2,
        top: y + shakeY - cubeSize / 2,
        transform: `scale(${appliedScale}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
      }}
    >
      <svg width={cubeSize} height={cubeSize} viewBox={`0 0 ${cubeSize} ${cubeSize}`}>
        {/* Shadow */}
        <ellipse
          cx={cubeSize / 2 + 15}
          cy={cubeSize / 2 + 15}
          rx={cubeSize / 2 - 10}
          ry={cubeSize / 4}
          fill="rgba(0, 0, 0, 0.2)"
          filter="blur(4px)"
        />
        
        {/* Front face */}
        <rect
          x={20}
          y={40}
          width={cubeSize - 40}
          height={cubeSize - 60}
          fill={COLORS.primaryBlue}
          stroke={COLORS.white}
          strokeWidth="3"
          rx="8"
          opacity={0.9}
        />
        
        {/* Top face */}
        <polygon
          points={`${cubeSize / 2},10 ${cubeSize - 20},40 ${cubeSize - 20 - (cubeSize - 40) / 2},20 ${cubeSize / 2 - (cubeSize - 40) / 2},0`}
          fill={COLORS.primaryBlue}
          stroke={COLORS.white}
          strokeWidth="3"
          opacity={1}
        />
        
        {/* Side face */}
        <polygon
          points={`${cubeSize - 20},40 ${cubeSize - 20},180 ${cubeSize - 20 - (cubeSize - 40) / 2},160 ${cubeSize - 20 - (cubeSize - 40) / 2},20`}
          fill={COLORS.primaryBlue}
          stroke={COLORS.white}
          strokeWidth="3"
          opacity={0.7}
        />
        
        {/* Internal modules (trapped appearance) */}
        <g opacity={0.6}>
          <Icon type="lock" size={32} color={COLORS.white} />
          <Icon type="creditCard" size={32} color={COLORS.white} />
          <Icon type="bell" size={32} color={COLORS.white} />
          <Icon type="user" size={32} color={COLORS.white} />
          <Icon type="database" size={32} color={COLORS.white} />
        </g>
        
        {/* Crack lines */}
        {renderCracks()}
        
        {/* Trapped grid lines overlay */}
        <g opacity={0.2} stroke={COLORS.white} strokeWidth="1">
          <line x1="40" y1="60" x2={cubeSize - 40} y2="60" />
          <line x1="40" y1="100" x2={cubeSize - 40} y2="100" />
          <line x1="40" y1="140" x2={cubeSize - 40} y2="140" />
          <line x1="70" y1="60" x2="70" y2="180" />
          <line x1="110" y1="60" x2="110" y2="180" />
          <line x1="150" y1="60" x2="150" y2="180" />
        </g>
      </svg>
    </div>
  );
};

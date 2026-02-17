import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../../config/colors';
import {Icon} from './Icon';
import {scaleIn} from '../../utils/animation-helpers';

interface ServiceBoxProps {
  name: string;
  color: string;
  status?: 'healthy' | 'warning' | 'error';
  scale?: number;
  x: number;
  y: number;
  floatingOffset?: number;
  delay?: number;
  iconType: 'lock' | 'creditCard' | 'bell' | 'user' | 'database';
}

export const ServiceBox: React.FC<ServiceBoxProps> = ({
  name,
  color,
  status = 'healthy',
  scale = 1,
  x,
  y,
  floatingOffset = 0,
  delay = 0,
  iconType,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const springScale = scaleIn(frame, fps, delay) * scale;
  const statusColor = status === 'healthy' ? COLORS.healthy : 
                      status === 'warning' ? COLORS.warning : 
                      COLORS.error;
  
  const boxSize = 140;
  const iconSize = 48;
  const shadowOffset = 8;
  
  const statusPulse = status === 'error' 
    ? 0.7 + Math.sin(frame / 5) * 0.3
    : 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: x - boxSize / 2,
        top: y + floatingOffset - boxSize / 2,
        width: boxSize,
        height: boxSize,
        transform: `scale(${springScale})`,
        transformOrigin: 'center center',
      }}
    >
      {/* Shadow */}
      <div
        style={{
          position: 'absolute',
          left: shadowOffset,
          top: shadowOffset,
          width: boxSize,
          height: boxSize,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 16,
          filter: 'blur(4px)',
        }}
      />
      
      {/* Main box */}
      <div
        style={{
          position: 'relative',
          width: boxSize,
          height: boxSize,
          backgroundColor: color,
          borderRadius: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: `3px solid ${COLORS.white}`,
          boxShadow: `0 0 20px ${color}40`,
        }}
      >
        {/* Icon area */}
        <div style={{marginBottom: 8}}>
          <Icon type={iconType} size={iconSize} color={COLORS.white} />
        </div>
        
        {/* Label */}
        <div
          style={{
            color: COLORS.white,
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {name}
        </div>
        
        {/* Status indicator */}
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: statusColor,
            opacity: statusPulse,
            boxShadow: `0 0 8px ${statusColor}`,
          }}
        />
      </div>
    </div>
  );
};

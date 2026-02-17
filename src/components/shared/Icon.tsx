import React from 'react';
import {COLORS} from '../../config/colors';

export type IconType = 'lock' | 'creditCard' | 'bell' | 'user' | 'database' | 'server' | 'bug' | 'robot';

interface IconProps {
  type: IconType;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({type, size = 48, color = COLORS.white}) => {
  const viewBox = `0 0 ${size} ${size}`;
  
  const renderIcon = () => {
    switch (type) {
      case 'lock':
        return (
          <svg viewBox={viewBox} width={size} height={size} fill="none">
            <rect x="12" y="24" width="24" height="18" rx="2" fill={color} />
            <path d="M18 24V18C18 14.6863 20.6863 12 24 12C27.3137 12 30 14.6863 30 18V24" 
                  stroke={color} strokeWidth="3" strokeLinecap="round"/>
          </svg>
        );
      
      case 'creditCard':
        return (
          <svg viewBox={viewBox} width={size} height={size} fill="none">
            <rect x="4" y="12" width="40" height="26" rx="3" fill={color} opacity="0.2" stroke={color} strokeWidth="2"/>
            <rect x="4" y="20" width="40" height="6" fill={color} opacity="0.5"/>
            <circle cx="12" cy="32" r="3" fill={color}/>
          </svg>
        );
      
      case 'bell':
        return (
          <svg viewBox={viewBox} width={size} height={size} fill="none">
            <path d="M24 6C18 6 14 10 14 16V20L10 24V26H38V24L34 20V16C34 10 30 6 24 6Z" 
                  fill={color} opacity="0.3"/>
            <path d="M24 6C18 6 14 10 14 16V20L10 24V26H38V24L34 20V16C34 10 30 6 24 6Z" 
                  stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="24" cy="34" r="4" fill={color} opacity="0.5"/>
          </svg>
        );
      
      case 'user':
        return (
          <svg viewBox={viewBox} width={size} height={size} fill="none">
            <circle cx="24" cy="14" r="8" fill={color} opacity="0.3"/>
            <circle cx="24" cy="14" r="8" stroke={color} strokeWidth="2"/>
            <path d="M8 42C8 32 14 26 24 26C34 26 40 32 40 42" 
                  stroke={color} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      
      case 'database':
        return (
          <svg viewBox={viewBox} width={size} height={size} fill="none">
            <ellipse cx="24" cy="10" rx="16" ry="6" fill={color} opacity="0.2" stroke={color} strokeWidth="2"/>
            <path d="M8 10V18C8 22 40 22 40 18V10" stroke={color} strokeWidth="2"/>
            <path d="M8 18V26C8 30 40 30 40 26V18" stroke={color} strokeWidth="2"/>
            <path d="M8 26V34C8 38 40 38 40 34V26" stroke={color} strokeWidth="2"/>
            <ellipse cx="24" cy="34" rx="16" ry="6" fill={color} opacity="0.2" stroke={color} strokeWidth="2"/>
          </svg>
        );
      
      case 'server':
        return (
          <svg viewBox={viewBox} width={size} height={size} fill="none">
            <rect x="8" y="6" width="32" height="36" rx="3" fill={color} opacity="0.1" stroke={color} strokeWidth="2"/>
            <circle cx="14" cy="14" r="2" fill={color}/>
            <circle cx="20" cy="14" r="2" fill={color}/>
            <circle cx="14" cy="24" r="2" fill={color}/>
            <circle cx="20" cy="24" r="2" fill={color}/>
            <circle cx="14" cy="34" r="2" fill={color}/>
            <circle cx="20" cy="34" r="2" fill={color}/>
          </svg>
        );
      
      case 'bug':
        return (
          <svg viewBox={viewBox} width={size} height={size} fill="none">
            <circle cx="20" cy="20" r="10" fill={COLORS.error} opacity="0.3"/>
            <circle cx="20" cy="20" r="10" stroke={COLORS.error} strokeWidth="2"/>
            <circle cx="17" cy="18" r="2" fill={COLORS.error}/>
            <circle cx="23" cy="18" r="2" fill={COLORS.error}/>
            <path d="M16 24L20 22L24 24" stroke={COLORS.error} strokeWidth="2" strokeLinecap="round"/>
            <path d="M10 20L14 18M10 24L14 24M10 28L14 28" stroke={COLORS.error} strokeWidth="2" strokeLinecap="round"/>
            <path d="M30 20L26 18M30 24L26 24M30 28L26 28" stroke={COLORS.error} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      
      case 'robot':
        return (
          <svg viewBox={viewBox} width={size} height={size} fill="none">
            <rect x="14" y="18" width="20" height="16" rx="3" fill={COLORS.primaryBlue} opacity="0.3"/>
            <rect x="14" y="18" width="20" height="16" rx="3" stroke={COLORS.primaryBlue} strokeWidth="2"/>
            <circle cx="19" cy="24" r="2" fill={COLORS.primaryBlue}/>
            <circle cx="29" cy="24" r="2" fill={COLORS.primaryBlue}/>
            <rect x="20" y="28" width="8" height="2" fill={COLORS.primaryBlue} opacity="0.5"/>
            <path d="M14 22L10 18M14 26L10 26M14 30L10 34" stroke={COLORS.primaryBlue} strokeWidth="2" strokeLinecap="round"/>
            <path d="M34 22L38 18M34 26L38 26M34 30L38 34" stroke={COLORS.primaryBlue} strokeWidth="2" strokeLinecap="round"/>
            <path d="M20 18V14M24 18V12M28 18V14" stroke={COLORS.primaryBlue} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      
      default:
        return null;
    }
  };

  return <>{renderIcon()}</>;
};

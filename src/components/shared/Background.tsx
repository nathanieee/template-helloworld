import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from '../../config/colors';

interface BackgroundProps {
  opacity?: number;
}

export const Background: React.FC<BackgroundProps> = ({opacity = 1}) => {
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.background, opacity}} />
  );
};

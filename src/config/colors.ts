export const COLORS = {
  background: '#0B1026',
  primaryBlue: '#2D6CDF',
  accentYellow: '#FFD166',
  accentRed: '#EF476F',
  accentGreen: '#06D6A0',
  accentPurple: '#9B5DE5',
  white: '#F8F9FA',
  // Service-specific colors
  auth: '#9B5DE5',
  payment: '#EF476F',
  notification: '#FFD166',
  user: '#06D6A0',
  database: '#2D6CDF',
  // Status colors
  healthy: '#06D6A0',
  warning: '#FFD166',
  error: '#EF476F',
} as const;

export type ColorKey = keyof typeof COLORS;

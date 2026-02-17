export const SPRING_CONFIG = {
  damping: 200,
  stiffness: 100,
  mass: 1,
} as const;

export const SERVICE_NAMES = ['Auth', 'Payment', 'Notification', 'User', 'Database'] as const;

export const TRANSITION_DURATION = 30;
export const EXPLOSION_DURATION = 45;

export const SERVICE_COLORS = {
  Auth: '#9B5DE5',
  Payment: '#EF476F',
  Notification: '#FFD166',
  User: '#06D6A0',
  Database: '#2D6CDF',
} as const;

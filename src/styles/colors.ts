// Kurzgesagt-inspired color palette
export const colors = {
  // Backgrounds
  background: "#0A0E27", // Deep space
  backgroundLight: "#1A1E3E", // Lighter space variant

  // Monolith
  monolith: "#4A5568", // Grey
  monolithDark: "#2D3748", // Dark grey
  monolithLight: "#718096", // Light grey

  // Service colors - Kurzgesagt vibrant
  users: "#4299E1", // Blue
  usersDark: "#3182CE", // Dark blue
  usersLight: "#63B3ED", // Light blue

  orders: "#48BB78", // Green
  ordersDark: "#38A169", // Dark green
  ordersLight: "#68D391", // Light green

  inventory: "#ED8936", // Orange
  inventoryDark: "#DD6B20", // Dark orange
  inventoryLight: "#F6AD55", // Light orange

  products: "#9F7AEA", // Purple
  productsDark: "#805AD5", // Dark purple
  productsLight: "#B794F4", // Light purple

  payments: "#38B2AC", // Teal
  paymentsDark: "#319795", // Dark teal
  paymentsLight: "#4FD1C5", // Light teal

  // Accents
  accent: "#F6E05E", // Yellow
  accentDark: "#D69E2E", // Dark yellow

  danger: "#F56565", // Red
  dangerDark: "#E53E3E", // Dark red

  success: "#48BB78", // Green

  // Network
  network: "#63B3ED", // Light blue
  networkGlow: "rgba(99, 179, 237, 0.3)", // Glow effect

  // Text
  text: "#FFFFFF",
  textSecondary: "#A0AEC0",
  textTertiary: "#718096",

  // Effects
  shadow: "rgba(0, 0, 0, 0.3)",
  glow: "rgba(255, 255, 255, 0.2)",
  highlight: "rgba(255, 255, 255, 0.15)",
};

// Kurzgesagt Official Color Palette (from production guide)
export const kurzgesagtColors = {
  // Backgrounds
  deepBlue: '#001372',
  darkPurple: '#0b0054',
  black: '#000000',

  // Accents
  brightPink: '#e30050',
  orangeRed: '#e32e01',
  goldenYellow: '#fbbe00',

  // Brand
  birdOrange: '#e47212',
  birdYellow: '#f6be39',

  // Services (matching production guide exactly)
  usersBlue: '#4a90d9',
  usersBlueLight: '#6aa8e3',
  usersBlueDark: '#3a7ac9',

  ordersGreen: '#4cd964',
  ordersGreenLight: '#6ce97f',
  ordersGreenDark: '#3cb954',

  inventoryOrange: '#ff9500',
  inventoryOrangeLight: '#ffb533',
  inventoryOrangeDark: '#e68500',

  gatewayPurple: '#9b59b6',
  gatewayPurpleLight: '#b579c9',
  gatewayPurpleDark: '#8b4996',

  // Status
  errorRed: '#e74c3c',
  successGreen: '#2ecc71',

  // Neutral
  darkGrey: '#2c3e50',
  white: '#ffffff',
};

// Service color mapping for easy access
export const serviceColors = {
  users: kurzgesagtColors.usersBlue,
  orders: kurzgesagtColors.ordersGreen,
  inventory: kurzgesagtColors.inventoryOrange,
  gateway: kurzgesagtColors.gatewayPurple,
} as const;

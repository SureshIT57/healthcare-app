export const COLORS = {
  primary: '#004D6E',
  primaryDark: '#004564',
  primaryHeader: '#004b5f',
  white: '#FFFFFF',
  black: '#000000',
  background: '#F5F7F9',
  backgroundAlt: '#F8F9FA',
  screenBg: '#F3F4F6',
  paymentBg: '#F9F9F9',
  text: '#000000',
  textDark: '#1A1A2E',
  textSecondary: '#333333',
  textMuted: '#666666',
  textLight: '#4A4A4A',
  textLabel: '#6B7280',
  border: '#E5E7EB',
  borderLight: '#D9D9D9',
  inputBg: '#F7F8F9',
  inputBgAlt: '#F7F7F7',
  otpBox: '#E5E5E5',
  skipBg: '#F0F5F9',
  verified: '#3B82F6',
  link: '#1A7A91',
  star: '#FBBF24',
  success: '#1A9106',
  successLight: '#10B981',
  successBg: '#D1FAE5',
  error: '#DC2626',
  locationPin: '#EF4444',
  priceBlueBg: '#E0F2FE',
  pricePeachBg: '#FFEDD5',
  pricePeachText: '#EA580C',
  badgeTealBg: '#D4F1F4',
  tabInactive: '#9CA3AF',
  cardShadow: '#000000',
  primaryLight: '#14A3A8',
  lightBlue: '#E8F4F8',
  lightTeal: '#D4F1F4',
  badgeBlue: '#DBEAFE',
  badgeBlueText: '#1D4ED8',
  priceBadge: '#E0F2FE',
  priceBadgeText: '#0369A1',
  available: '#22C55E',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
} as const;

export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  xxl: 20,
  pill: 999,
} as const;

export const TYPOGRAPHY = {
  hero: { fontSize: 32, fontWeight: '700' as const, lineHeight: 40 },
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
  h2: { fontSize: 24, fontWeight: '600' as const, lineHeight: 30 },
  h3: { fontSize: 20, fontWeight: '700' as const, lineHeight: 26 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodySm: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  button: { fontSize: 16, fontWeight: '700' as const, lineHeight: 22 },
  tab: { fontSize: 11, fontWeight: '600' as const, lineHeight: 14 },
} as const;

export const SHADOWS = {
  card: {
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  soft: {
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
} as const;

/** @deprecated Use COLORS from constants/theme */
export const colors = COLORS;
export const spacing = SPACING;
export const radius = RADIUS;

import { createStyles } from '@crossed/styled';

export const shadowStyles = createStyles(({ colors }) => ({
  'xs': {
    base: {
      shadowColor: colors.shadow.xs,
      shadowOffset: { width: 0, height: 1 },
      // shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 2,
    },
    web: { base: { boxShadow: `0 1px 2px 0 ${colors.shadow.xs}` } },
  },
  'sm': {
    base: {
      shadowColor: colors.shadow.sm,
      shadowOffset: { width: 0, height: 1 },
      // shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 3,
    },
    web: {
      base: { boxShadow: `0 1px 2px 0 ${colors.shadow.sm}` },
    },
  },
  'md': {
    base: {
      shadowColor: colors.shadow.md,
      shadowOffset: { width: 0, height: 4 },
      // shadowOpacity: 0.35,
      shadowRadius: 5,
      elevation: 6,
    },
    web: {
      base: { boxShadow: `0 1px 2px 0 ${colors.shadow.md}` },
    },
  },
  'lg': {
    base: {
      shadowColor: colors.shadow.lg,
      shadowOffset: { width: 0, height: 12 },
      // shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 12,
    },
    web: {
      base: {
        boxShadow: `0 12px 16px -4px ${colors.shadow.lg}`,
      },
    },
  },
  'xl': {
    base: {
      shadowColor: colors.shadow['xl'],
      shadowOffset: { width: 0, height: 20 },
      // shadowOpacity: 0.25,
      shadowRadius: 14,
      elevation: 16,
    },
    web: {
      base: { boxShadow: `0 20px 24px -4px ${colors.shadow['xl']}` },
    },
  },
  '2xl': {
    base: {
      shadowColor: colors.shadow['2xl'],
      shadowOffset: { width: 0, height: 24 },
      // shadowOpacity: 0.2,
      shadowRadius: 36,
      elevation: 24,
    },
    web: {
      base: { boxShadow: `0 24px 48px -12px ${colors.shadow['2xl']}` },
    },
  },
  '3xl': {
    base: {
      shadowColor: colors.shadow['3xl'],
      shadowOffset: { width: 0, height: 32 },
      // shadowOpacity: 0.18,
      shadowRadius: 48,
      elevation: 32,
    },
    web: {
      base: { boxShadow: `0 32px 64px -12px ${colors.shadow['3xl']}` },
    },
  },
}));

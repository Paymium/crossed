import { createStyles } from '@crossed/styled';

export const radiusStyles = createStyles(({ radius }) => ({
  'none': { base: { borderRadius: radius.none } },
  'xxs': { base: { borderRadius: radius.xxs } },
  'xs': { base: { borderRadius: radius.xs } },
  'sm': { base: { borderRadius: radius.sm } },
  'md': { base: { borderRadius: radius.md } },
  'lg': { base: { borderRadius: radius.lg } },
  'xl': { base: { borderRadius: radius.xl } },
  '2xl': { base: { borderRadius: radius['2xl'] } },
  '3xl': { base: { borderRadius: radius['3xl'] } },
  '4xl': { base: { borderRadius: radius['4xl'] } },
  'full': { base: { borderRadius: radius.full } },
}));

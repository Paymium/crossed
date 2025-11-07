import { composeStyles, createStyles } from '@crossed/styled';

export const paddingVerticalStyles = createStyles(({ space }) => ({
  'none': { base: { paddingHorizontal: space.none } },
  'xxs': { base: { paddingHorizontal: space.xxs } },
  'xs': { base: { paddingHorizontal: space.xs } },
  'sm': { base: { paddingHorizontal: space.sm } },
  'md': { base: { paddingHorizontal: space.md } },
  'lg': { base: { paddingHorizontal: space.lg } },
  'xl': { base: { paddingHorizontal: space.xl } },
  '2xl': { base: { paddingHorizontal: space['2xl'] } },
  '3xl': { base: { paddingHorizontal: space['3xl'] } },
  '4xl': { base: { paddingHorizontal: space['4xl'] } },
  '5xl': { base: { paddingHorizontal: space['5xl'] } },
  '6xl': { base: { paddingHorizontal: space['6xl'] } },
  '7xl': { base: { paddingHorizontal: space['7xl'] } },
  '8xl': { base: { paddingHorizontal: space['8xl'] } },
  '9xl': { base: { paddingHorizontal: space['9xl'] } },
  '10xl': { base: { paddingHorizontal: space['10xl'] } },
  '11xl': { base: { paddingHorizontal: space['11xl'] } },
}));

export const paddingHorizontalStyles = createStyles(({ space }) => ({
  'none': { base: { paddingVertical: space.none } },
  'xxs': { base: { paddingVertical: space.xxs } },
  'xs': { base: { paddingVertical: space.xs } },
  'sm': { base: { paddingVertical: space.sm } },
  'md': { base: { paddingVertical: space.md } },
  'lg': { base: { paddingVertical: space.lg } },
  'xl': { base: { paddingVertical: space.xl } },
  '2xl': { base: { paddingVertical: space['2xl'] } },
  '3xl': { base: { paddingVertical: space['3xl'] } },
  '4xl': { base: { paddingVertical: space['4xl'] } },
  '5xl': { base: { paddingVertical: space['5xl'] } },
  '6xl': { base: { paddingVertical: space['6xl'] } },
  '7xl': { base: { paddingVertical: space['7xl'] } },
  '8xl': { base: { paddingVertical: space['8xl'] } },
  '9xl': { base: { paddingVertical: space['9xl'] } },
  '10xl': { base: { paddingVertical: space['10xl'] } },
  '11xl': { base: { paddingVertical: space['11xl'] } },
}));

export const paddingTopStyles = createStyles(({ space }) => ({
  'none': { base: { paddingTop: space.none } },
  'xxs': { base: { paddingTop: space.xxs } },
  'xs': { base: { paddingTop: space.xs } },
  'sm': { base: { paddingTop: space.sm } },
  'md': { base: { paddingTop: space.md } },
  'lg': { base: { paddingTop: space.lg } },
  'xl': { base: { paddingTop: space.xl } },
  '2xl': { base: { paddingTop: space['2xl'] } },
  '3xl': { base: { paddingTop: space['3xl'] } },
  '4xl': { base: { paddingTop: space['4xl'] } },
  '5xl': { base: { paddingTop: space['5xl'] } },
  '6xl': { base: { paddingTop: space['6xl'] } },
  '7xl': { base: { paddingTop: space['7xl'] } },
  '8xl': { base: { paddingTop: space['8xl'] } },
  '9xl': { base: { paddingTop: space['9xl'] } },
  '10xl': { base: { paddingTop: space['10xl'] } },
  '11xl': { base: { paddingTop: space['11xl'] } },
}));

export const paddingStyles = {
  'none': composeStyles(
    paddingVerticalStyles.none,
    paddingHorizontalStyles.none
  ),
  'xxs': composeStyles(
    paddingVerticalStyles.xxs,
    paddingHorizontalStyles.xxs
  ),
  'xs': composeStyles(paddingVerticalStyles.xs, paddingHorizontalStyles.xs),
  'sm': composeStyles(paddingVerticalStyles.sm, paddingHorizontalStyles.sm),
  'md': composeStyles(paddingVerticalStyles.md, paddingHorizontalStyles.md),
  'lg': composeStyles(paddingVerticalStyles.lg, paddingHorizontalStyles.lg),
  'xl': composeStyles(paddingVerticalStyles.xl, paddingHorizontalStyles.xl),
  '2xl': composeStyles(
    paddingVerticalStyles['2xl'],
    paddingHorizontalStyles['2xl']
  ),
  '3xl': composeStyles(
    paddingVerticalStyles['3xl'],
    paddingHorizontalStyles['3xl']
  ),
  '4xl': composeStyles(
    paddingVerticalStyles['4xl'],
    paddingHorizontalStyles['4xl']
  ),
  '5xl': composeStyles(
    paddingVerticalStyles['5xl'],
    paddingHorizontalStyles['5xl']
  ),
  '6xl': composeStyles(
    paddingVerticalStyles['6xl'],
    paddingHorizontalStyles['6xl']
  ),
  '7xl': composeStyles(
    paddingVerticalStyles['7xl'],
    paddingHorizontalStyles['7xl']
  ),
  '8xl': composeStyles(
    paddingVerticalStyles['8xl'],
    paddingHorizontalStyles['8xl']
  ),
  '9xl': composeStyles(
    paddingVerticalStyles['9xl'],
    paddingHorizontalStyles['9xl']
  ),
  '10xl': composeStyles(
    paddingVerticalStyles['10xl'],
    paddingHorizontalStyles['10xl']
  ),
  '11xl': composeStyles(
    paddingVerticalStyles['11xl'],
    paddingHorizontalStyles['11xl']
  ),
};

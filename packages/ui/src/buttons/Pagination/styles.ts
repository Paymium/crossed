import { inlineStyle } from '@crossed/styled';

export const pagePressableStyles = inlineStyle(({ colors }) => ({
  'base': {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.primary.base.transparent,
  },
  ':active': {
    borderColor: colors.background.brand.solid.default,
  },
}));

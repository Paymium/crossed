import { styled } from '@mergeui/core';
import { Pressable } from 'react-native';
import { colorVariants } from '../variants/colors';
import { sizeVariants } from '../variants/size';

export const [SelectRoot] = styled(Pressable, {
  base: { styles: ['rounded'], props: { as: 'select' } },

  variants: {
    color: colorVariants,
    size: sizeVariants,
  },
  defaultVariants: {
    size: 'md',
    color: 'zinc',
  },
});

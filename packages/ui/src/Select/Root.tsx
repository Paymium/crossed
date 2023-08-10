import { styled } from '@mergeui/core';
import { Pressable } from 'react-native';
import { colorVariants } from '../variants/colors';
import { sizeVariants } from '../variants/size';

export const [SelectRoot] = styled(Pressable, {
  'className': ['rounded-md', 'flex', 'flex-row', 'items-center', 'border-2'],
  ':disabled': {
    className: ['opacity-50', 'pointer-events-none'],
  },
  'props': { as: 'select' },

  'variants': {
    color: colorVariants,
    size: sizeVariants,
    variant: {
      filled: { className: ['border-transparent dark:border-transparent'] },
      outlined: {},
    },
  },
  'defaultVariants': {
    size: 'md',
    color: 'zinc',
    variant: 'outlined',
  },
  'compoundVariants': [
    { variant: 'filled', className: ['text-white dark:text-white'] },
    {
      'variant': 'outlined',
      'className': ['dark:bg-zinc-950 bg-zinc-100'],
      ':hover': {
        className: ['dark:bg-zinc-900 bg-zinc-300'],
      },
      ':active': {
        className: ['dark:bg-zinc-800 bg-zinc-200'],
      },
    },
  ],
});

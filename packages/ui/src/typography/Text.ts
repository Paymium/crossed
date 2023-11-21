'use client';

import { Text as TextNative } from 'react-native';
import type { GetProps } from '@crossed/styled';
import { styled } from '@crossed/styled';

export const Text = styled(TextNative, {
  variants: {
    color: {
      default: {
        className: ['text-black dark:text-white'],
      },
      white: { className: ['text-white'] },
      black: { className: ['text-black'] },
      slate: {
        className: ['text-slate-800 dark:text-slate-500'],
      },
      gray: {
        className: ['text-gray-800 dark:text-gray-500'],
      },
      zinc: {
        className: ['text-zinc-800 dark:text-zinc-500'],
      },
      neutral: {
        className: ['text-neutral-500'],
      },
      stone: {
        className: ['text-stone-800 dark:text-stone-500'],
      },
      red: {
        className: ['text-red-700 dark:text-red-500'],
      },
      orange: { className: ['text-orange-800'] },
      amber: { className: ['text-amber-800'] },
      yellow: { className: ['text-yellow-800'] },
      lime: { className: ['text-lime-800'] },
      green: { className: ['text-green-800'] },
      emerald: { className: ['text-emerald-800'] },
      teal: { className: ['text-teal-800'] },
      cyan: { className: ['text-cyan-800'] },
      sky: { className: ['text-sky-800'] },
      blue: { className: ['text-blue-500'] },
      indigo: { className: ['text-indigo-500'] },
      violet: { className: ['text-violet-500'] },
      purple: { className: ['text-purple-500'] },
      fuchsia: { className: ['text-fuchsia-500'] },
      pink: {
        className: ['text-pink-800 dark:text-pink-500'],
      },
      rose: {
        className: ['text-rose-800 dark:text-rose-500'],
      },
    },
    variant: { link: { className: ['text-blue-500'] } },
    weight: {
      thin: { className: ['font-thin'] },
      extralight: { className: ['font-extralight'] },
      light: { className: ['font-light'] },
      normal: { className: ['font-normal'] },
      medium: { className: ['font-medium'] },
      semibold: { className: ['font-semibold'] },
      bold: { className: ['font-bold'] },
      extrabold: { className: ['font-extrabold'] },
      black: { className: ['font-black'] },
    },
    size: {
      false: {},
      xs: { className: ['text-xs'] },
      sm: { className: ['text-sm'] },
      md: { className: ['text-md'] },
      lg: { className: ['text-lg'] },
      xl: { className: ['text-xl'] },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
  },
});

export type TextProps = GetProps<typeof Text>;

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { colorsDark, colorsLight } from './colors';
import type {
  Colors,
  Entries,
  Theme,
  VariantBackgroundColor,
  VariantColor,
} from './types';

const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  100: 100,
};

const size: Theme['size'] = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

export const fontSize: Theme['fontSize'] = {
  'xxs': 10,
  'xs': 12,
  'sm': 14,
  'default': 14,
  'md': 16,
  'lg': 18,
  'xl': 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
};

const utils: Theme['utils'] = {
  shadeColor: (col, amt) => {
    col = col.replace(/^#/, '');
    if (col.length === 3)
      col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];

    let [r, g, b]: any[] = col.match(/.{2}/g) || [];

    [r, g, b] = [
      parseInt(r, 16) + amt,
      parseInt(g, 16) + amt,
      parseInt(b, 16) + amt,
    ];

    if ((!r && r !== 0) || (!g && g !== 0) || (!b && b !== 0)) {
      throw new Error();
    }

    r = Math.max(Math.min(255, r), 0).toString(16);
    g = Math.max(Math.min(255, g), 0).toString(16);
    b = Math.max(Math.min(255, b), 0).toString(16);

    const rr = (r.length < 2 ? '0' : '') + r;
    const gg = (g.length < 2 ? '0' : '') + g;
    const bb = (b.length < 2 ? '0' : '') + b;

    return `#${rr}${gg}${bb}`;
  },
  hexToRgbA: (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  },
  select: ({ hover, active, focus, base }, state) => {
    return (
      (state.active
        ? active
        : state.hover
        ? hover
        : state.focus
        ? focus
        : base) || base
    );
  },
  createVariants: (type, t) => {
    if (type === 'color') {
      return (Object.entries(t.colors) as Entries<Colors>).reduce<VariantColor>(
        (acc, [key, value]) => {
          if (
            key !== 'background' &&
            key !== 'backgroundSoft' &&
            key !== 'backgroundStrong'
          ) {
            acc[key] = { base: { color: value } };
          }
          return acc;
        },
        {} as VariantColor
      ) as any;
    }
    if (type === 'backgroundColor') {
      return (
        Object.entries(t.colors) as Entries<Colors>
      ).reduce<VariantBackgroundColor>((acc, [key, value]) => {
        if (
          key !== 'background' &&
          key !== 'backgroundSoft' &&
          key !== 'backgroundStrong' &&
          key !== 'black' &&
          key !== 'default' &&
          key !== 'white'
        ) {
          acc[key] = { base: { backgroundColor: value } };
        }
        return acc;
      }, {} as any);
    }
    throw new Error(`createVariants not allowed type "${type}"`);
  },
};

export const lightTheme = {
  colors: colorsLight,
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
  space,
  // padding,
  size,
  utils,
  fontSize,
} satisfies Theme;

export const darkTheme = {
  colors: colorsDark,
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
  space,
  // padding,
  size,
  utils,
  fontSize,
} as const;

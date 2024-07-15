/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import '@/style.config';
import { className, createStyles } from '@crossed/styled';
import * as stylex from '@stylexjs/stylex';

const stylesOf = stylex.create({
  base: {
    fontSize: 16,
    lineHeight: 1.5,
    color: {
      'default': 'rgb(60,60,60)',
      ':hover': 'red',
    },
  },
  highlighted: {
    color: 'rebeccapurple',
  },
  dynamic: (color: string) => ({ backgroundColor: color }),
});

const styles = createStyles(({}) => ({
  text: {
    'base': {
      color: 'black',
    },
    ':hover': {
      color: 'violet',
    },
  },
  v: {
    'base': {
      color: 'red',
    },
    ':hover': {
      color: 'green',
    },
  },
}));

export default function Home() {
  return (
    <div>
      <div {...className(styles.text)}>Hello</div>
      <a {...stylex.props(stylesOf.base, stylesOf.dynamic('orange'))}>Hello</a>
      <button>change</button>
    </div>
  );
}

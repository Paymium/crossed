/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { benchmarkSuite } from 'jest-bench';
import { createStyles } from '../src/createStyles';

const empty = createStyles(() => ({ base: {} }));
const all = createStyles(() => ({
  base: {
    'base': {},
    ':active': {},
    ':disabled': {},
    ':focus': {},
    ':focus-visible': {},
    ':hover': {},
    'media': {},
    'variants': {},
    'web': {},
  },
}));
const base = createStyles(() => ({ base: { base: {} } }));
const active = createStyles(() => ({ base: { ':active': {} } }));
const disabled = createStyles(() => ({ base: { ':disabled': {} } }));
const focus = createStyles(() => ({ base: { ':focus': {} } }));
const focusVisible = createStyles(() => ({ base: { ':focus-visible': {} } }));
const hover = createStyles(() => ({ base: { ':hover': {} } }));
const media = createStyles(() => ({ base: { media: {} } }));
const variants = createStyles(() => ({ base: { variants: {} } }));
const web = createStyles(() => ({ base: { web: {} } }));
const button = createStyles(
  () =>
    ({
      root: {
        base: {
          display: 'flex',
          paddingHorizontal: 't.space.md',
          borderRadius: 7,
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'transparent',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          gap: 8,
        },
        web: {
          'base': {
            boxSizing: 'border-box',
          },
          ':focus': {
            outlineWidth: '2px',
            outlineOffset: '2px',
            outlineStyle: 'solid',
            outlineColor: 't.components.Action.primary.default.background',
          },
        },
        variants: {
          size: {
            false: { base: { height: 'auto' } },
            true: { base: { height: 44 } },
          },
          variant: {
            primary: {
              'base': {
                backgroundColor:
                  't.components.Action.primary.default.background',
                borderColor: 't.components.Action.primary.default.background',
              },
              ':active': {
                backgroundColor:
                  't.components.Action.primary.active.background',
                borderColor: 't.components.Action.primary.active.background',
              },
              ':hover': {
                backgroundColor: 't.components.Action.primary.hover.background',
                borderColor: 't.components.Action.primary.hover.background',
              },
              ':disabled': {
                backgroundColor:
                  't.components.Action.primary.disabled.background',
                borderColor: 't.components.Action.primary.disabled.background',
              },
            },
            secondary: {
              'base': {
                borderColor: 't.components.Action.secondary.default.border',
                backgroundColor:
                  't.components.Action.secondary.default.background',
              },
              ':hover': {
                borderColor: 't.components.Action.secondary.hover.border',
                backgroundColor:
                  't.components.Action.secondary.hover.background',
              },
              ':active': {
                borderColor: 't.components.Action.secondary.active.border',
                backgroundColor:
                  't.components.Action.secondary.active.background',
              },
              ':disabled': {
                borderColor: 't.components.Action.secondary.disabled.border',
                backgroundColor:
                  't.components.Action.secondary.disabled.background',
              },
            },
            tertiary: {
              'base': {
                borderColor: 't.components.Action.tertiary.default.border',
                backgroundColor:
                  't.components.Action.tertiary.default.background',
              },
              ':hover': {
                borderColor: 't.components.Action.tertiary.hover.border',
                backgroundColor:
                  't.components.Action.tertiary.hover.background',
              },
              ':active': {
                borderColor: 't.components.Action.tertiary.active.border',
                backgroundColor:
                  't.components.Action.tertiary.active.background',
              },
              ':disabled': {
                borderColor: 't.components.Action.tertiary.disabled.border',
                backgroundColor:
                  't.components.Action.tertiary.disabled.background',
              },
            },
            false: {},
          },
        },
      },
    }) as const
);

const generateTestSuite = (method: 'style' | 'className' | 'rnw') => ({
  ['empty']: () => {
    empty.base[method]();
  },
  ['all']: () => {
    all.base[method]();
  },
  ['base']: () => {
    base.base[method]();
  },
  ['active']: () => {
    active.base[method]();
  },
  ['disabled']: () => {
    disabled.base[method]();
  },
  ['focus']: () => {
    focus.base[method]();
  },
  ['focusVisible']: () => {
    focusVisible.base[method]();
  },
  ['hover']: () => {
    hover.base[method]();
  },
  ['media']: () => {
    media.base[method]();
  },
  ['variants']: () => {
    variants.base[method]();
  },
  ['web']: () => {
    web.base[method]();
  },
});

const generateTestSuite2 = ({ base }) => ({
  ['className']: () => {
    base.className();
  },
  // ['classNameCached']: () => {
  //   base.classNameCached();
  // },
  ['style']: () => {
    base.style();
  },
  // ['styleCached']: () => {
  //   base.styleCached();
  // },
  ['rnw']: () => {
    base.rnw();
  },
  // ['rnwCached']: () => {
  //   base.rnwCached();
  // },
});

// benchmarkSuite('empty', generateTestSuite2(empty));
// benchmarkSuite('base', generateTestSuite2(base));
// benchmarkSuite('all', generateTestSuite2(all));
benchmarkSuite('button', generateTestSuite2({ base: button.root }), {
  minSamples: 50,
});

// benchmarkSuite('styleCached', generateTestSuite('styleCached'));
// benchmarkSuite('style', generateTestSuite('style'));
// benchmarkSuite('rnw', generateTestSuite('rnw'));
// benchmarkSuite('rnwCached', generateTestSuite('rnwCached'));
// benchmarkSuite('className', generateTestSuite('className'));
// benchmarkSuite('classNameCached', generateTestSuite('classNameCached'));

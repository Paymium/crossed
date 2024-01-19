/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createElement, forwardRef } from 'react';

const Decorated = Symbol();

export const withStaticProperties = function <A extends Function, B>(
  component: A,
  staticProps: B
): A & B {
  // clone component if already wrapped once
  const next = (() => {
    if ((component as any)[Decorated]) {
      const _ = forwardRef((props, ref) =>
        createElement(component as any, { ...props, ref })
      );
      // attach existing things again
      for (const key in component) {
        const v = component[key];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _[key] = v && typeof v === 'object' ? { ...v } : v;
      }
    }
    return component;
  })();

  // add new things
  Object.assign(next, staticProps);
  (next as any)[Decorated] = true;

  return next as any as A & B;
};

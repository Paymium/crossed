/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createMethods } from './createMethods';
import { CrossedMethods } from './types';
import merge from 'deepmerge';

export type ExtractStyle<S extends CrossedMethods<any>> =
  S extends CrossedMethods<infer D, any> ? D : never;

export const composeStyles = <
  F extends CrossedMethods<any> | false,
  S extends CrossedMethods<any> | false
>(
  style1: F,
  style2: S
): ReturnType<
  typeof createMethods<
    ExtractStyle<Exclude<typeof style1, false>> &
      ExtractStyle<Exclude<typeof style2, false>>
  >
> => {
  if (!style1 && style2) {
    return createMethods<typeof style2>(style2.original);
  }
  if (style1 && !style2) {
    return createMethods<typeof style1>(style1.original);
  }
  if (style1 && style2) {
    const styleMerged = merge<
      ExtractStyle<Exclude<typeof style1, false>>,
      ExtractStyle<Exclude<typeof style2, false>>
    >(style1.original, style2.original);
    return createMethods<typeof styleMerged>(styleMerged);
  }
  return createMethods<{}>({});
};

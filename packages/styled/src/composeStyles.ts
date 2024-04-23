/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createMethods } from './createMethods';
import { CrossedMethods } from './types';
import { merge } from 'ts-deepmerge';

type AllKeys<T> = T extends any ? keyof T : never;
// eslint-disable-next-line no-unused-vars
type PickType<T, K extends AllKeys<T>> = T extends { [k in K]?: any }
  ? T[K]
  : undefined;
type Merge<T extends object> = {
  [k in AllKeys<T>]: PickType<T, k>;
};

export type ExtractStyle<S extends CrossedMethods<any>> =
  S extends CrossedMethods<infer D, any> ? D : never;
export const composeStyles = <
  T extends (CrossedMethods<any> | false)[],
  P extends Exclude<T[number], false>
>(
  ...styles: T
) => {
  const stylesVerified = styles.filter((e) => !!e && e.original) as P[];
  const styleMerged = merge(...stylesVerified.map((e) => e.original)) as Merge<
    P['original']
  >;
  return createMethods<typeof styleMerged>(styleMerged);
};

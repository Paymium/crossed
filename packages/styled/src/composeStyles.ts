/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createMethods } from './createMethods';
import { AllAvailableStyles, CrossedMethods } from './types';
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
  T extends (CrossedMethods<any> | AllAvailableStyles | false | void)[],
  P extends Exclude<T[number], false | void | AllAvailableStyles>,
>(
  ...styles: T
) => {
  // console.log(styles);
  let stylesNative = {};
  const stylesVerified = styles.flat(Infinity).reduce((acc, e: any) => {
    if (!e) return acc;
    if ('original' in e && e.original) {
      acc.push(e.original);
    }
    if ('stylesParent' in e && e.stylesParent) {
      stylesNative = { ...stylesNative, ...e.stylesParent };
      return acc;
    }
    if (typeof e !== 'function' && typeof e === 'object' && !e.style) {
      stylesNative = { ...stylesNative, ...e };
    }
    return acc;
  }, []) as P[];

  const styleMerged = merge(...stylesVerified) as Merge<P['original']>;

  return createMethods(styleMerged, stylesNative);
};

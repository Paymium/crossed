/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '../Registry';
import type { Plugin, StyleSheet } from '../types';

interface Variants
  extends Record<string, Record<string, Omit<StyleSheet, 'variants'>>> {}

export interface CrossedVariantsPlugin {
  variants?: Variants;
}

type HasBooleanVariants<T> = T extends 'true'
  ? true
  : T extends 'false'
  ? true
  : false;

type AllKeys<T> = T extends any ? keyof T : never;
// eslint-disable-next-line no-unused-vars
type PickType<T, K extends AllKeys<T>> = T extends { [k in K]?: any }
  ? T[K]
  : undefined;
type Merge<T extends object> = {
  [k in AllKeys<T>]: PickType<T, k>;
};

export interface CrossedVariantsPluginProps<
  V extends Variants | undefined,
  MV = Merge<V>
> {
  variants?: {
    [key in keyof MV]?: HasBooleanVariants<keyof MV[key]> extends false
      ? keyof MV[key]
      : keyof MV[key] | boolean;
  };
}

export const VariantsPlugin: Plugin<CrossedVariantsPlugin> = {
  name: 'VariantsPlugin',
  test: '^variants$',
  apply: ({ styles, addClassname, props, isWeb }) => {
    Object.entries(styles).forEach(([variantName, variantValues]) => {
      if (props && props.variants?.[variantName] === undefined) {
        return;
      }
      Object.entries(variantValues).forEach(([variantValue, style]) => {
        if (
          props &&
          props.variants?.[variantName] &&
          props.variants?.[variantName].toString() !== variantValue
        ) {
          return;
        }
        Registry.apply(() => style, {
          isWeb,
          props,
          addClassname,
        });
      });
    });
  },
};

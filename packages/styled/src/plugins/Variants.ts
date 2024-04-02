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

type HasBooleanVariants<T> = T extends Record<'true', any>
  ? true
  : T extends Record<'false', any>
  ? true
  : false;

export interface CrossedVariantsPluginProps<V extends Variants | undefined> {
  variants?: {
    [key in keyof V]?: HasBooleanVariants<keyof V[key]> extends true
      ? keyof V[key] | boolean
      : keyof V[key];
  };
}

export const VariantsPlugin: Plugin<CrossedVariantsPlugin> = {
  name: 'VariantsPlugin',
  test: '^variants$',
  apply: ({ styles, addClassname, props, isWeb }) => {
    Object.entries(styles).forEach(([variantName, variantValues]) => {
      if (props && !props[variantName]) {
        return;
      }
      Object.entries(variantValues).forEach(([variantValue, style]) => {
        if (
          props &&
          props[variantName] &&
          props[variantName].toString() !== variantValue
        ) {
          return;
        }
        Registry.apply(() => style, {
          isWeb,
          props,
          addClassname: ({ suffix, prefix, body }) => {
            Object.entries(body).forEach(([e, obj]) => {
              addClassname({
                suffix,
                prefix,
                body: {
                  [`${variantName}-${variantValue}:${e}`]: obj,
                },
              });
            });
          },
        });
      });
    });
  },
};

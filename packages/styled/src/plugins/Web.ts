/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '../Registry';
import type { CrossedstyleValues, Plugin, StyleSheet } from '../types';
import type * as CSS from 'csstype';

export interface CrossedWebPlugin {
  web?: {
    [key in keyof StyleSheet]?: StyleSheet[key] extends CrossedstyleValues
      ? CSS.Properties
      : StyleSheet[key];
  };
}

export const WebPlugin: Plugin<CrossedWebPlugin> = {
  name: 'WebPlugin',
  test: '^web$',
  apply: ({ addClassname, styles, isWeb, props }) => {
    if (isWeb) {
      Registry.apply(() => styles, {
        isWeb,
        props,
        addClassname,
      });
    }
  },
};

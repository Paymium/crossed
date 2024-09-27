/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { merge } from 'ts-deepmerge';
import { CrossedStyle } from './types';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export const rnw = (
  ...styles: CrossedStyle[]
): { style: StyleProp<ViewStyle | TextStyle> } => {
  const styleOriginal: any[] = [];
  const stylesRnw = styles.flat(Infinity as 10).reduce((acc, e) => {
    if (!e || e === true) return acc;

    if ('base' in e) {
      acc.push(e.base);
    } else if (typeof e === 'object') {
      if ('$$css' in e) {
        acc.push(e);
      } else {
        styleOriginal.push(e as any);
      }
    }
    return acc;
  }, []);
  const style = merge(...stylesRnw);
  return { style: [style, ...styleOriginal] };
};

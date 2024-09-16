/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { CrossedStyle, ParamComposeIntern } from './types';
import { rnw } from './rnw';
import { PressableProps } from 'react-native';

export const pressable = (
  ...styles: CrossedStyle[]
): { style: PressableProps['style'] } => {
  return {
    style: ({
      hovered,
      pressed,
      focused,
    }: {
      hovered?: boolean;
      pressed: boolean;
      focused?: boolean;
    }) => {
      const stylesMapped = (
        styles.flat(Infinity as 10) as ParamComposeIntern[]
      ).reduce((acc, e) => {
        if (!e || e === true) return acc;

        if ('$$css' in e) {
          acc.push(e);
        }
        if ('base' in e) {
          const accTmp = [];
          accTmp.push(e.base);
          if (':hover' in e && hovered) {
            accTmp.push(e[':hover']);
          }
          if (':active' in e && pressed) {
            accTmp.push(e[':active']);
          }
          if (':focus' in e && focused) {
            accTmp.push(e[':focus']);
          }
          acc.push(...accTmp.map((base) => ({ base })));
        }

        acc.push({ base: e });

        return acc;
      }, []);
      const { style } = rnw(...stylesMapped);
      return style as any;
    },
  };
};

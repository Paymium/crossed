/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ColorPaths } from './types';
import { useTheme } from '@crossed/styled';

export const useColor = (
  color: ColorPaths = 'text.primary.default'
): string => {
  const { colors } = useTheme();

  // On split le path en segments
  const keys = color.split('.');

  // On descend dans l'objet colors dynamiquement
  let value: any = colors;
  for (const key of keys) {
    if (value[key] === undefined) {
      return color;
    }
    value = value[key];
  }

  return value;
};

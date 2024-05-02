/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useWindowDimensions } from 'react-native';
import { cacheBreakpoints } from '@crossed/styled/plugins';

export const useMedia = () => {
  const { width } = useWindowDimensions();
  return {
    xs: cacheBreakpoints.xs < width,
    sm: cacheBreakpoints.sm < width,
    md: cacheBreakpoints.md < width,
    lg: cacheBreakpoints.lg < width,
    xl: cacheBreakpoints.xl < width,
  };
};

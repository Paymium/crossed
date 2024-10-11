/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useSheetContext } from '@crossed/primitive';
import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export const useMaxHeight = () => {
  const { offset } = useSheetContext();
  const { height: heightDimensions } = useWindowDimensions();
  return useMemo(() => heightDimensions - offset, [heightDimensions, offset]);
};

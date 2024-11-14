/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo, ReactNode, useMemo } from 'react';
import { Text } from '../../typography/Text';
import { useSelectContext } from './context';

export const SelectValue = memo(
  ({ children }: { children?: (_value: string) => ReactNode }) => {
    const { value, selectedValueRef } = useSelectContext();
    return useMemo(() => {
      return children ? children(value) : <Text>{selectedValueRef}</Text>;
    }, [value, selectedValueRef]);
  }
);

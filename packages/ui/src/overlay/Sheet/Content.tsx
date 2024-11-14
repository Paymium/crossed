/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo } from 'react';
import { Frame } from './Frame';
import { sheetStyles } from '../styles';
import type { FloatingContentProps } from '../Floating/Content';
import { useSheetContext } from './context';
import { composeStyles } from '@crossed/styled';
import { useAnimateLogic } from './useAnimateLogic';

export const SheetContent = memo(({ children }: FloatingContentProps) => {
  const { animatedStyle, ref } = useAnimateLogic();
  const { detach } = useSheetContext();

  return (
    <Frame
      ref={ref}
      style={composeStyles(
        sheetStyles.content,
        sheetStyles.padding,
        detach && sheetStyles.detach
      )}
      animatedStyle={animatedStyle}
    >
      {children}
    </Frame>
  );
});

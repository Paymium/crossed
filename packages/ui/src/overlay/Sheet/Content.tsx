/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, CrossedMethods } from '@crossed/styled';
import { styles } from './styles';
import ActionSheet, { ActionSheetProps, ActionSheetRef } from '@crossed/sheet';
import { useSheetContext } from './context';
import { composeRefs } from '@crossed/core';
import { forwardRef, memo, RefAttributes } from 'react';

export type ContentProps = Omit<
  ActionSheetProps,
  'containerStyle' | 'indicatorStyle'
> & {
  containerStyle?: CrossedMethods<any>;
  indicatorStyle?: CrossedMethods<any>;
  padded?: boolean;
};
export const Content = memo<ContentProps & RefAttributes<ActionSheetRef>>(
  forwardRef<ActionSheetRef, ContentProps>(
    (
      { containerStyle, indicatorStyle, padded = true, ...props },
      parentRef
    ) => {
      const { actionSheetRef, ref } = useSheetContext();
      return (
        <ActionSheet
          gestureEnabled
          {...props}
          ref={composeRefs(parentRef, actionSheetRef, ref)}
          containerStyle={
            composeStyles(
              styles.box,
              padded && styles.containerPadded,
              padded && styles.container,
              containerStyle
            ).style().style
          }
          indicatorStyle={
            composeStyles(styles.indicator, indicatorStyle).style().style
          }
        />
      );
    }
  )
);

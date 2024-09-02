/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, Fragment } from 'react';
import { useSheetContext } from './context';
import { createStyles, isWeb } from '@crossed/styled';
import { Portal } from '@gorhom/portal';
import Animated from 'react-native-reanimated';
import { sheetContext } from './context';
import { RemoveScroll } from 'react-remove-scroll';
import { ScrollView, type SheetScrollViewProps } from './ScrollView';
import type { IRemoveScrollProps } from 'react-remove-scroll/dist/es5/types';
import type { ViewStyle } from 'react-native';
import { OverlayLogical, type OverlayProps } from './Overlay';

const styles = createStyles(() => ({
  maxHeight: {
    base: {
      maxHeight: '100%',
    },
  },
}));

export type FrameProps = SheetScrollViewProps & {
  padded?: boolean;
  overlayProps?: OverlayProps;
};

const RS = ({
  children,
  ...props
}: Omit<IRemoveScrollProps, 'style'> & { style?: ViewStyle }) =>
  isWeb ? (
    <RemoveScroll {...(props as any)} children={children} />
  ) : (
    <Fragment children={children} />
  );

export const Frame = forwardRef<Animated.ScrollView, FrameProps>(
  ({ children, padded = true, overlayProps, ...props }, ref) => {
    const sheetContextValue = useSheetContext();
    const { open } = sheetContextValue;

    return (
      <Portal>
        <sheetContext.Provider value={sheetContextValue}>
          <RS enabled={open} {...styles.maxHeight.style()}>
            <OverlayLogical {...overlayProps} />
            <ScrollView ref={ref} padded={padded} {...props}>
              {children}
            </ScrollView>
          </RS>
        </sheetContext.Provider>
      </Portal>
    );
  }
);

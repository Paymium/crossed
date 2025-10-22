/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles, CrossedMethods } from '@crossed/styled';
import { useFloatingContext } from './context';
import Animated, {
  AnimatedProps,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { Box } from '../../layout/Box';
import { ViewProps } from 'react-native';
import { memo } from 'react';

export const overlayStyles = createStyles(({ colors }) => ({
  root: {
    base: {
      position: 'absolute',
      backgroundColor: colors.background.overlay.default,
      opacity: 0.7,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
    web: { base: { position: 'fixed' } },
  },
}));

export type FloatingOverlayProps = {
  /**
   * Crossed style
   */
  style?: CrossedMethods<any>;

  /**
   * Animated style
   */
  animatedProps?: AnimatedProps<ViewProps>;
};
export const FloatingOverlay = memo(
  ({ style, animatedProps }: FloatingOverlayProps) => {
    const { open, onClose, closeOverlayPress } = useFloatingContext();

    return open ? (
      <Animated.View
        onPointerUp={closeOverlayPress ? onClose : undefined}
        entering={FadeIn}
        exiting={FadeOut}
        {...animatedProps}
        style={[
          { top: 0, bottom: 0, left: 0, right: 0, position: 'absolute' },
          animatedProps?.style,
        ]}
      >
        <Box style={composeStyles(overlayStyles.root, style)} />
      </Animated.View>
    ) : null;
  }
);
FloatingOverlay.displayName = 'Floating.Overlay';

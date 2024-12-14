/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, CrossedMethods } from '@crossed/styled';
import { useFloatingContext } from './context';
import Animated, {
  AnimatedProps,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { overlayStyles } from '../styles';
import { Box } from '../../layout/Box';
import { ViewProps } from 'react-native';
import { memo } from 'react';

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
      >
        <Box style={composeStyles(overlayStyles.root, style)} />
      </Animated.View>
    ) : null;
  }
);
FloatingOverlay.displayName = 'Floating.Overlay';

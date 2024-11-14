/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, CrossedMethods, inlineStyle } from '@crossed/styled';
import { FloatingTrigger, FloatingTriggerProps } from './Trigger';
import { useFloatingContext } from './context';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import { overlayStyles } from '../styles';
import { positionStyles } from '../../styles/position';
import { Box } from '../../layout/Box';
import { ViewProps } from 'react-native';
import { memo } from 'react';

export type FloatingOverlayProps = {
  style?: CrossedMethods<any>;
  animatedProps?: AnimatedProps<ViewProps>;
  triggerProps?: FloatingTriggerProps;
};
export const FloatingOverlay = memo(
  ({
    style: styleProps,
    animatedProps,
    triggerProps,
  }: FloatingOverlayProps) => {
    const { open, closeOverlayPress } = useFloatingContext();

    return open ? (
      <FloatingTrigger
        tabIndex={-1}
        disabled={!closeOverlayPress}
        {...triggerProps}
        style={composeStyles(
          positionStyles.absoluteFill,
          inlineStyle(() => ({ web: { base: { position: 'fixed' } } })),
          styleProps
        )}
      >
        <Animated.View {...animatedProps}>
          <Box style={overlayStyles.root} />
        </Animated.View>
      </FloatingTrigger>
    ) : null;
  }
);
FloatingOverlay.displayName = 'Floating.Overlay';

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, useEffect, useState } from 'react';
import { type View } from 'react-native';
import { useSheetContext } from './context';
import {
  createStyles,
  CrossedStyle,
  rnw,
} from '@crossed/styled';
import { Portal } from '@gorhom/portal';
import { Pressable, type PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { composeEventHandlers } from '@crossed/core';

const styles = createStyles(({ colors }) => ({
  box: {
    base: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: colors.black,
      zIndex: 10000,
    },
    variants: {},
  },
  pressable: { base: { height: '100%', width: '100%' } },
}));

export type OverlayProps = Omit<PressableProps, 'style'> & {
  style?: CrossedStyle;
};

export const OverlayLogical = forwardRef<View, OverlayProps>(
  ({ onPress: onPressProps, style: styleProps, ...props }, ref) => {
    const { open, dismissOnOverlayPress, onClose } = useSheetContext();
    const [interShow, setIternShow] = useState(false);

    useEffect(() => {
      if (open) {
        setIternShow(open);
        return () => {};
      }
      const time = setTimeout(() => setIternShow(false), 300);
      return () => clearTimeout(time);
    }, [open]);

    const style = useAnimatedStyle(
      () => ({
        opacity: withTiming(open ? 0.7 : 0),
        height: interShow ? '100%' : 0,
      }),
      [open, interShow]
    );

    return (
      <Animated.View
        ref={ref}
        style={[rnw(styles.box, styleProps || false).style, style]}
      >
        <Pressable
          disabled={!dismissOnOverlayPress}
          {...props}
          {...rnw(styles.pressable)}
          onPress={composeEventHandlers(
            (dismissOnOverlayPress && onClose) || undefined,
            onPressProps || undefined
          )}
        />
      </Animated.View>
    );
  }
);

export const Overlay = forwardRef<View, OverlayProps>((props, ref) => {
  return (
    <Portal>
      <OverlayLogical ref={ref} {...props} />
    </Portal>
  );
});

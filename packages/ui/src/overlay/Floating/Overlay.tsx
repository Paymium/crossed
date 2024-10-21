/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, CrossedMethods, inlineStyle } from '@crossed/styled';
import { PressableProps } from 'react-native';
import { FloatingTrigger } from './Trigger';
import { useFloatingContext } from './context';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { overlayStyles } from '../styles';
import { useEffect, useState } from 'react';
import { positionStyles } from '../../styles/position';

export type FloatingOverlayProps = {
  style?: CrossedMethods<any>;
};
export const FloatingOverlay = ({
  style: styleProps,
}: FloatingOverlayProps) => {
  const { wait, open, closeOverlayPress } = useFloatingContext();

  const [interShow, setIternShow] = useState(false);

  useEffect(() => {
    if (open) {
      setIternShow(open);
      return () => {};
    }
    const time = setTimeout(() => setIternShow(false), wait);
    return () => clearTimeout(time);
  }, [open, wait]);

  const style = useAnimatedStyle(
    () => ({
      opacity: withTiming(open ? 0.7 : 0),
    }),
    [open, interShow]
  );

  return open || interShow ? (
    <FloatingTrigger
      disabled={!closeOverlayPress}
      style={composeStyles(
        positionStyles.absoluteFill,
        inlineStyle(() => ({ web: { base: { position: 'fixed' } } })),
        styleProps
      )}
    >
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <Animated.View style={[overlayStyles.root.style().style, style]} />
      </Animated.View>
    </FloatingTrigger>
  ) : null;
};
FloatingOverlay.displayName = 'Floating.Overlay';

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useSheetContext } from './context';
import { sheetContext } from './context';
import { Floating, FloatingContentProps } from '../Floating';
import {
  forwardRef,
  Fragment,
  memo,
  PropsWithChildren,
  useCallback,
  useMemo,
  // useRef,
  useState,
} from 'react';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { View } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  //runOnJS,
  useSharedValue,
} from 'react-native-reanimated';
// import { useMaxHeight } from './useMaxHeight';
// import { useFloatingContext } from '../Floating/context';
import { useGesture } from './useGesture';

export type FrameProps = FloatingContentProps;

export const Frame = memo(
  forwardRef<View, FrameProps>(
    ({ children, style, animatedStyle, ...props }: FrameProps, ref) => {
      const sheetContextValue = useSheetContext();
      const { portal } = sheetContextValue;
      const P = portal ? Floating.Portal : Fragment;

      const height = useSharedValue(0);
      const isMove = useSharedValue(false);
      const initialHeight = useSharedValue(0);
      const scroll = useSharedValue(0);
      const [scrollEnabled, setScrollEnabled] = useState(false);

      const native = Gesture.Native();
      const { gesturePan /*, styleAnimated*/ } = useGesture({
        isMove,
        height,
        scroll,
        initialHeight,
        setScrollEnabled,
        scrollEnabled,
      });

      const Provider = useCallback(
        ({ children: c }: PropsWithChildren) => {
          return (
            <sheetContext.Provider value={sheetContextValue}>
              {c}
            </sheetContext.Provider>
          );
        },
        [sheetContextValue]
      );

      const portalProps = useMemo(() => {
        return portal ? { Provider } : {};
      }, [Provider, portal]);

      return (
        <P {...portalProps}>
          <Floating.Overlay
            animatedProps={{ entering: FadeIn, exiting: FadeOut }}
          />
          <GestureDetector gesture={Gesture.Simultaneous(gesturePan, native)}>
            <Floating.Content
              ref={ref}
              animatedStyle={[animatedStyle]}
              style={composeStyles(
                inlineStyle(() => ({ base: { zIndex: 1 } })),
                style
              )}
              {...props}
            >
              {children}
            </Floating.Content>
          </GestureDetector>
        </P>
      );
    }
  )
);

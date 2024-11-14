/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useEffect, useRef } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { View } from 'react-native';
import { useFloatingContext } from '../Floating/context';
import { useMaxHeight } from './useMaxHeight';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { useSheetContext } from './context';

export const useAnimateLogic = () => {
  const { full, translateY } = useSheetContext();
  const { open } = useFloatingContext();
  const ref = useRef<View>();
  const maxHeight = useMaxHeight();

  const animatedStyle = useAnimatedStyle(() => {
    const style: ViewProps['style'] = {
      transform: [{ translateY: translateY.value }],
      maxHeight,
    };

    if (full) {
      style.height = maxHeight;
    }
    return style;
  }, [translateY, maxHeight]);

  useEffect(() => {
    const time = setTimeout(() => {
      ref.current?.measure((x, y, width, height) => {
        if (translateY.value === null) {
          translateY.value = withTiming(height);
          setTimeout(() => {
            if (open) translateY.value = withTiming(0);
            else translateY.value = withTiming(height);
          }, 300);
        } else {
          if (open) translateY.value = withTiming(0);
          else translateY.value = withTiming(height);
        }
      });
    }, 100);
    return () => clearTimeout(time);
  }, [open]);
  return { ref, animatedStyle };
};

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React, { useCallback } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { Handle } from './components/Handle';
import type { BottomSheetAnimations } from './core/hooks';

export interface BottomSheetContentProps {
  animations: BottomSheetAnimations;
  gesture: any;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  indicatorStyle?: ViewStyle;
  CustomHeaderComponent?: React.ReactNode;
  gestureEnabled: boolean;
  closable: boolean;
  elevation: number;
}

export const BottomSheetContent: React.FC<BottomSheetContentProps> = ({
  animations,
  gesture,
  children,
  containerStyle,
  indicatorStyle,
  CustomHeaderComponent,
  gestureEnabled,
  closable,
  elevation,
}) => {
  const handleLayout = useCallback(
    (event: any) => {
      const { height } = event.nativeEvent.layout;
      animations.sheetHeight.value = height;
    },
    [animations]
  );

  const renderHandle = () => {
    if (!gestureEnabled || !closable) {
      return null;
    }
     if (CustomHeaderComponent) {
      return <>{CustomHeaderComponent}</>;
    }
    return <Handle style={indicatorStyle} />;
  };

  const sheetAnimatedStyle = {
    transform: [{ translateY: animations.translateY }],
  };

  const AnimatedView = Animated.View as React.ComponentType<any>;

  return (
    <GestureDetector gesture={gesture}>
      <AnimatedView
        style={[
          styles.container,
          {
            elevation: elevation,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: elevation,
          },
          containerStyle,
          sheetAnimatedStyle,
        ]}
        onLayout={handleLayout}
      >
        {renderHandle()}
        <View style={styles.content}>{children}</View>
      </AnimatedView>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
});

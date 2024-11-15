/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { PropsWithChildren, ReactNode } from 'react';
import Animated, { AnimatedProps, FadeIn } from 'react-native-reanimated';
import { ViewProps } from 'react-native';
import { composeStyles, createStyles, CrossedMethods } from '@crossed/styled';

const styles = createStyles(() => ({
  stickyFooter: {
    base: { position: 'absolute', right: 0, left: 0, bottom: 0 },
  },
  paddingRightDyn: (paddingRight: number) => ({ paddingRight }),
}));

export type LayoutProps = PropsWithChildren<{
  footer: ReactNode;
  showFooter: boolean;
  stickyFooter: boolean;
  style?: CrossedMethods<any>;
  paddingRight?: number;
  animatedStyle?: AnimatedProps<ViewProps>['style'];
}>;

export const Layout = ({
  footer,
  showFooter,
  stickyFooter,
  style,
  children,
  paddingRight,
  animatedStyle,
  ...rest
}: LayoutProps) => {
  return (
    <Animated.View
      {...rest}
      style={[composeStyles(style).rnw().style, animatedStyle]}
    >
      {children}
      {stickyFooter && showFooter && (
        <Animated.View
          entering={FadeIn.duration(0)}
          style={
            composeStyles(
              styles.stickyFooter,
              styles.paddingRightDyn(paddingRight)
            ).style().style
          }
          testID="stickyFooter"
        >
          {footer}
        </Animated.View>
      )}
    </Animated.View>
  );
};

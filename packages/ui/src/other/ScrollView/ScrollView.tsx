/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { Layout, LayoutProps } from './Layout';
import { Title } from './Title';
import { Footer } from './Footer';
import { Body } from './Body';
import { forwardRef, PropsWithChildren } from 'react';
import { useLogic } from './useLogic';
import Animated, { AnimatedScrollViewProps } from 'react-native-reanimated';

type Base = {
  /**
   * Set to true for sticky header
   */
  stickyHeader?: boolean;
  /**
   * Set to true for sticky footer
   */
  stickyFooter?: boolean;
};
export type ScrollViewProps = PropsWithChildren<
  Omit<
    AnimatedScrollViewProps,
    | 'data'
    | 'renderItem'
    | 'ListHeaderComponent'
    | 'ListFooterComponent'
    | 'stickyHeaderIndices'
  > &
    Base & {
      containerProps?: Omit<
        LayoutProps,
        'footer' | 'showFooter' | 'paddingRight' | 'stickyFooter'
      >;
    }
>;

export const ScrollView = withStaticProperties(
  forwardRef<Animated.ScrollView, ScrollViewProps>((props, ref) => {
    const {
      stickyHeader,
      stickyFooter,
      containerProps,
      style,
      children,
      ...rest
    } = props;
    const {
      title,
      footer,
      body,
      onLayout,
      onContentSizeChange,
      showFooter,
      paddingRight,
    } = useLogic(props);

    return (
      <Layout
        footer={footer}
        showFooter={showFooter}
        paddingRight={paddingRight}
        stickyFooter={stickyFooter}
        {...containerProps}
      >
        <Animated.ScrollView
          ref={ref}
          stickyHeaderIndices={stickyHeader && title ? [0] : undefined}
          {...rest}
          onLayout={onLayout}
          onContentSizeChange={onContentSizeChange}
          style={[style]}
        >
          {title}
          {body}
          {footer}
        </Animated.ScrollView>
      </Layout>
    );
  }),
  {
    Title,
    Footer,
    Body,
  }
);

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Layout, LayoutProps } from './utils/Layout';
import { Title } from './utils/Title';
import { Footer } from './utils/Footer';
import { forwardRef, memo, PropsWithChildren, ReactNode, useId } from 'react';
import { useLogic } from './utils/useLogic';
import Animated, { FlatListPropsWithLayout } from 'react-native-reanimated';
import { composeStyles, CrossedMethods } from '@crossed/styled';

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
export type FlatListProps<T> = PropsWithChildren<
  Omit<
    FlatListPropsWithLayout<T>,
    | 'ListHeaderComponent'
    | 'ListFooterComponent'
    | 'stickyHeaderIndices'
    | 'style'
  > &
    Base & {
      containerProps?: Omit<
        LayoutProps,
        'footer' | 'showFooter' | 'paddingRight' | 'stickyFooter'
      >;
      title?: ReactNode;
      footer?: ReactNode;
      style?: CrossedMethods<any>;
      animatedStyle?: FlatListPropsWithLayout<T>['style'];
    }
>;

export const FlatList = memo(
  forwardRef<Animated.FlatList<any>, FlatListProps<any>>((props, ref) => {
    const {
      stickyHeader,
      stickyFooter,
      containerProps,
      style,
      animatedStyle,
      children,
      title: titleProps,
      footer: footerProps,
      ...rest
    } = props;
    const id = useId();
    const {
      title,
      footer,
      onLayout,
      onContentSizeChange,
      showFooter,
      paddingRight,
      renderFooter,
    } = useLogic({
      ...props,
      children: [
        <Title key={`${id}-title`}>{titleProps}</Title>,
        <Footer key={`${id}-footer`}>{footerProps}</Footer>,
      ],
    });

    return (
      <Layout
        footer={footer}
        showFooter={showFooter}
        paddingRight={paddingRight}
        stickyFooter={stickyFooter}
        {...containerProps}
      >
        <Animated.FlatList
          ref={ref}
          stickyHeaderIndices={stickyHeader && title ? [0] : undefined}
          ListHeaderComponent={title ? () => title : undefined}
          ListFooterComponent={footer ? renderFooter : undefined}
          {...rest}
          onLayout={onLayout}
          onContentSizeChange={onContentSizeChange}
          style={[composeStyles(style).style().style, animatedStyle]}
        />
      </Layout>
    );
  })
);

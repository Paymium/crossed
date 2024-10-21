/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import {
  Children,
  forwardRef,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Animated, {
  AnimatedProps,
  FadeIn,
  FlatListPropsWithLayout,
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import { FlatList, ViewProps } from 'react-native';
import { Box } from '../layout/Box';
import { composeStyles, createStyles, inlineStyle } from '@crossed/styled';

const styles = createStyles(() => ({
  stickyFooter: {
    base: { position: 'absolute', right: 0, left: 0, bottom: 0 },
  },
  paddingRightDyn: (paddingRight: number) => ({ paddingRight }),
}));

const Title = ({ children }: PropsWithChildren) => {
  return children;
};
Title.displayName = 'ScrollView.Title';

const Footer = ({ children }: PropsWithChildren) => {
  return children;
};
Footer.displayName = 'ScrollView.Footer';

const Body = ({ children }: PropsWithChildren) => {
  return children;
};
Body.displayName = 'ScrollView.Body';

export type ScrollViewProps<ItemT> = PropsWithChildren<
  Omit<
    FlatListPropsWithLayout<ItemT>,
    | 'data'
    | 'renderItem'
    | 'ListHeaderComponent'
    | 'ListFooterComponent'
    | 'stickyHeaderIndices'
  > & {
    /**
     * Set to true for sticky header
     */
    stickyHeader?: boolean;
    /**
     * Set to true for sticky footer
     */
    stickyFooter?: boolean;
    /**
     * Props of container, see Animated.View
     */
    containerProps?: AnimatedProps<ViewProps>;
  }
>;
const Root = forwardRef<FlatList<any>, ScrollViewProps<any>>(
  (
    { stickyHeader, stickyFooter, children, containerProps, style, ...props },
    ref
  ) => {
    const layoutShared = useSharedValue(0);
    const contentLayoutShared = useSharedValue(0);
    const [showFooter, setShowFooter] = useState(false);
    const [paddingRight, setPaddingRight] = useState(0);

    useAnimatedReaction(
      () => layoutShared.value - contentLayoutShared.value,
      (current, previous) => {
        if (current !== previous) {
          runOnJS(setPaddingRight)(current);
        }
      },
      [layoutShared, contentLayoutShared, setPaddingRight]
    );

    // get title childr by type (should be direct children)
    const title = useMemo(() => {
      if (!children) return null;
      return Children.toArray(children).find(
        (e) => typeof e === 'object' && 'type' in e && e.type === Title
      );
    }, [children]);

    // get body children by type (should be direct children)
    const body = useMemo(() => {
      if (!children || typeof children === 'number') return null;
      return Children.toArray(children).find(
        (e) => typeof e === 'object' && 'type' in e && e.type === Body
      );
    }, [children]);

    // get footer child by type (should be direct children)
    const footer = useMemo(() => {
      if (!children || typeof children === 'number') return null;
      return Children.toArray(children).find(
        (e) => typeof e === 'object' && 'type' in e && e.type === Footer
      );
    }, [children]);

    // item render in FlatList
    const renderItem = useCallback(({ item }) => {
      return item;
    }, []);

    // timeout for show footer when sticky
    useEffect(() => {
      if (stickyFooter && !showFooter && footer) {
        const time = setTimeout(() => setShowFooter(true), 300);
        return () => clearTimeout(time);
      }
      return () => {};
    }, [stickyFooter, setShowFooter, showFooter, footer]);

    // Foter render in Flatlist, apply opacity 0 for keep layout of Box
    const renderFooter = useCallback(
      () => (
        <Box
          style={composeStyles(
            stickyFooter &&
              inlineStyle(() => ({
                base: {
                  opacity: 0,
                },
              }))
          )}
        >
          {footer}
        </Box>
      ),
      [stickyFooter, footer]
    );
    const data = useMemo(() => {
      if ((body as any)?.props?.children) {
        const c = (body as any)?.props?.children;
        if (Array.isArray(c)) return c;
        else return [c];
      }
      return [];
    }, [body]);

    const onLayout = useCallback(
      (e) => {
        const {
          nativeEvent: { layout },
        } = e;
        layoutShared.value = layout.width;
        if (typeof props.onLayout === 'function') props.onLayout(e);
        else props.onLayout?.value(e);
      },
      [layoutShared, props.onLayout]
    );
    const onContentSizeChange = useCallback(
      (w, h) => {
        contentLayoutShared.value = w;
        if (typeof props.onContentSizeChange === 'function')
          props.onContentSizeChange(w, h);
        else props.onContentSizeChange?.value(w, h);
      },
      [contentLayoutShared, props.onContentSizeChange]
    );

    return (
      <Animated.View {...containerProps}>
        <Animated.FlatList
          ref={ref}
          data={data}
          renderItem={renderItem}
          stickyHeaderIndices={stickyHeader && title ? [0] : undefined}
          ListHeaderComponent={title ? () => title : undefined}
          ListFooterComponent={footer ? renderFooter : undefined}
          {...props}
          onLayout={onLayout}
          onContentSizeChange={onContentSizeChange}
          style={[style]}
        />
        {stickyFooter && showFooter && (
          <Animated.View
            entering={FadeIn}
            style={
              composeStyles(
                styles.stickyFooter,
                styles.paddingRightDyn(paddingRight)
              ).style().style
            }
          >
            {footer}
          </Animated.View>
        )}
      </Animated.View>
    );
  }
);
Root.displayName = 'ScrollView';

export const ScrollView = withStaticProperties(Root, { Title, Footer, Body });

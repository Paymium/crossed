/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  Children,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  AnimatedScrollViewProps,
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import { Box } from '../../layout/Box';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { Title } from './Title';
import { Footer } from './Footer';
import { Body } from './Body';

type UseLogicParam = PropsWithChildren<
  {
    stickyFooter?: boolean;
  } & Pick<AnimatedScrollViewProps, 'onLayout' | 'onContentSizeChange'>
>;

export const useLogic = ({
  children,
  stickyFooter,
  ...props
}: UseLogicParam) => {
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

  // get footer child by type (should be direct children)
  const footer = useMemo(() => {
    if (!children || typeof children === 'number') return null;
    return Children.toArray(children).find(
      (e) => typeof e === 'object' && 'type' in e && e.type === Footer
    );
  }, [children]);
  const body = useMemo(() => {
    if (!children || typeof children === 'number') return null;
    return Children.toArray(children).find(
      (e) => typeof e === 'object' && 'type' in e && e.type === Body
    );
  }, [children]);

  // timeout for show footer when sticky
  useEffect(() => {
    if (stickyFooter && !showFooter && footer) {
      const time = setTimeout(() => setShowFooter(true), 0);
      return () => clearTimeout(time);
    }
    return () => {};
  }, [stickyFooter, setShowFooter, showFooter, footer]);

  // Footer render in Flatlist, apply opacity 0 for keep layout of Box
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

  return {
    paddingRight,
    title,
    body,
    renderFooter,
    onLayout,
    onContentSizeChange,
    footer,
    showFooter,
  };
};

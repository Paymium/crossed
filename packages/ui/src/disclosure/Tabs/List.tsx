/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ScrollViewProps } from 'react-native';
import { useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import {
  composeStyles,
  createStyles,
  inlineStyle,
  isTouchable,
} from '@crossed/styled';
import { XBox } from '../../layout/XBox';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Children,
  ComponentProps,
  isValidElement,
  PropsWithChildren,
} from 'react';
import { heightStyles } from './styles';
import { TabsContext } from './context';
import { Select } from '../../forms';

const styles = createStyles(() => ({
  default: { base: { zIndex: 1 } },
}));

const containerVariantStyle = createStyles(({ space, colors, radius }) => ({
  brand: { base: {} },
  brandGray: { base: {} },
  underline: { base: {} },
  border: {
    base: {
      padding: space.xs,
      backgroundColor: colors.background.brand.secondary.default,
      borderRadius: radius.full,
    },
  },
  minimal: {
    base: {
      backgroundColor: colors.background.brand.secondary.default,
      borderRadius: radius.full,
    },
  },
}));
type Items = ComponentProps<typeof Select>['items'];

export const createList = (useTabsContext: () => TabsContext) => {
  const SelectTab = ({ children }: PropsWithChildren) => {
    const { setValue, value } = useTabsContext();
    const items = Children.toArray(children).reduce<Items>((acc, cur) => {
      if (isValidElement(cur) && 'value' in (cur as any).props) {
        const { value, children } = cur.props as any;
        acc.push({ value, label: children } as any);
      }
      return acc;
    }, []);
    return <Select value={value} items={items as any} onChange={setValue} />;
  };

  return ({ children, ...props }: Omit<ScrollViewProps, 'style'>) => {
    const {
      listTabRef,
      variant,
      scroll,
      shouldShow,
      setShow,
      widthLayout,
      size,
      fullWidth,
    } = useTabsContext();

    const widthContent = useSharedValue(0);
    useAnimatedReaction(
      () => {
        return widthLayout.value;
      },
      (currentValue, previousValue) => {
        if (currentValue !== previousValue && !isTouchable) {
          setShow(currentValue < widthContent.value);
        }
      },
      [widthLayout, widthContent, setShow]
    );

    return (
      <XBox
        alignItems={'stretch'}
        justifyContent="between"
        style={composeStyles(
          styles.default,
          heightStyles[size],
          !shouldShow && containerVariantStyle[variant]
        )}
      >
        {shouldShow && <SelectTab>{children}</SelectTab>}
        <ScrollView
          space="xs"
          role="tablist"
          ref={listTabRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={({ nativeEvent }) => {
            scroll.value = nativeEvent.contentOffset.x;
          }}
          onContentSizeChange={(width) => {
            widthContent.value = width - (shouldShow ? 60 : 0);
          }}
          onLayout={({ nativeEvent: { layout } }) => {
            widthLayout.value = layout.width;
          }}
          stickyHeaderIndices={shouldShow ? [0] : []}
          {...props}
          contentContainerStyle={
            composeStyles(
              fullWidth && inlineStyle(() => ({ base: { flex: 1 } })),
              shouldShow && inlineStyle(() => ({ base: { opacity: 0 } })),
              inlineStyle(() => ({ base: { alignItems: 'center' } }))
            ).rnw().style
          }
          {...composeStyles(
            shouldShow &&
              inlineStyle(() => ({
                base: {
                  flex: 1,
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 30,
                },
              }))
          ).rnw()}
        >
          {children}
        </ScrollView>
      </XBox>
    );
  };
};

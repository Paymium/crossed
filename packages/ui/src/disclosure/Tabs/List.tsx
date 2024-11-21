/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ScrollViewProps } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SharedValue,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import {
  composeStyles,
  createStyles,
  inlineStyle,
  isTouchable,
} from '@crossed/styled';
import { XBox } from '../../layout/XBox';
import { ScrollView } from 'react-native-gesture-handler';
import { Box } from '../../layout/Box';
import { Button, ButtonProps, ButtonTextProps } from '../../buttons/Button';
import { useState } from 'react';
import {
  heightStyles,
  linearGradientRounded,
  linearGradientUnderline,
} from './styles';
import { ChevronLeft, ChevronRight } from '@crossed/unicons';
import { TabsContext } from './context';

const styles = createStyles(() => ({
  default: { base: { zIndex: 1 } },
}));
const ButtonScroll = ({
  children,
  style,
  ...rest
}: Omit<ButtonProps, 'children'> & Pick<ButtonTextProps, 'children'>) => {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={style}
      {...composeStyles(
        inlineStyle(() => ({
          base: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            zIndex: 100,
          },
        })),
        style
      ).style()}
    >
      <Button
        variant="tertiary"
        style={composeStyles(
          inlineStyle(() => ({
            base: { paddingHorizontal: 0, height: '100%', width: 30 },
          })),
          rest.disabled && inlineStyle(() => ({ base: { opacity: 0.5 } }))
        )}
        {...rest}
      >
        <Button.Icon
          style={inlineStyle(({ colors }) => ({
            'base': { color: colors.text.secondary, flexShrink: 0 },
            ':hover': { color: colors.text.primary },
          }))}
        >
          {children}
        </Button.Icon>
      </Button>
    </Animated.View>
  );
};

export const createList = (useTabsContext: () => TabsContext) => {
  const PrevButton = ({
    widthLayout,
  }: {
    widthLayout: SharedValue<number>;
  }) => {
    const { listTabRef, scroll, variant } = useTabsContext();
    const [disabled, setDisabled] = useState(false);

    useAnimatedReaction(
      () => {
        return scroll.value;
      },
      (currentValue, previousValue) => {
        if (currentValue !== previousValue) {
          setDisabled(currentValue === 0);
        }
      },
      [widthLayout, scroll]
    );

    const style =
      variant === 'rounded' ? linearGradientRounded : linearGradientUnderline;

    return (
      <ButtonScroll
        variant="tertiary"
        disabled={disabled}
        testID="toLeft"
        aria-label="Slide to left"
        style={style.prev}
        onPress={() => {
          listTabRef.current?.scrollTo({
            x:
              scroll.value >= widthLayout.value
                ? scroll.value - widthLayout.value
                : 0,
          });
        }}
      >
        <ChevronLeft />
      </ButtonScroll>
    );
  };
  const NextButton = ({
    widthLayout,
    widthContent,
  }: {
    widthLayout: SharedValue<number>;
    widthContent: SharedValue<number>;
  }) => {
    const { listTabRef, scroll, variant } = useTabsContext();
    const [disabled, setDisabled] = useState(false);

    useAnimatedReaction(
      () => {
        return scroll.value;
      },
      (currentValue, previousValue) => {
        if (currentValue !== previousValue) {
          setDisabled(currentValue + widthLayout.value >= widthContent.value);
        }
      },
      [widthLayout, scroll, widthContent]
    );

    const style =
      variant === 'rounded' ? linearGradientRounded : linearGradientUnderline;

    return (
      <ButtonScroll
        variant="tertiary"
        disabled={disabled}
        style={style.next}
        testID="toRight"
        aria-label="Slide to right"
        onPress={() => {
          scroll.value <= widthLayout.value
            ? listTabRef.current?.scrollTo({
                x: scroll.value + widthLayout.value,
              })
            : listTabRef.current?.scrollToEnd();
        }}
      >
        <ChevronRight />
      </ButtonScroll>
    );
  };
  return ({ children, ...props }: Omit<ScrollViewProps, 'style'>) => {
    const { listTabRef, scroll, shouldShow, setShow, widthLayout, size } =
      useTabsContext();

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
        justifyContent="between"
        style={composeStyles(styles.default, heightStyles[size])}
      >
        {shouldShow && <PrevButton widthLayout={widthLayout} />}
        {shouldShow && (
          <NextButton widthLayout={widthLayout} widthContent={widthContent} />
        )}
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
              inlineStyle(() => ({ base: { alignItems: 'center' } }))
            ).rnw().style
          }
          {...composeStyles(
            shouldShow &&
              inlineStyle(() => ({
                base: {
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
          {shouldShow && (
            <Box style={inlineStyle(() => ({ base: { width: 30 } }))} />
          )}
          {children}
          {shouldShow && (
            <Box style={inlineStyle(() => ({ base: { width: 30 } }))} />
          )}
        </ScrollView>
      </XBox>
    );
  };
};

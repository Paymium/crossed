/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import {
  type UseUncontrolledInput,
  composeEventHandlers,
  createScope,
  useUncontrolled,
  withStaticProperties,
} from '@crossed/core';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import {
  Button,
  type ButtonProps,
  type ButtonTextProps,
} from '../forms/Button';
import { YBox, type YBoxProps } from '../layout/YBox';
import {
  composeStyles,
  createStyles,
  CrossedMethods,
  inlineStyle,
  isTouchable,
} from '@crossed/styled';
import { Pressable, PressableProps, ScrollViewProps, View } from 'react-native';
import { Box } from '../layout/Box';
import { useInteraction } from '@crossed/styled';
import { Card, CardProps } from '../display/Card';
import Animated, {
  FadeIn,
  FadeOut,
  SharedValue,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { ChevronRight, ChevronLeft } from '@crossed/unicons';
import { XBox } from '../layout/XBox';

const indicatorUnderlineStyles = createStyles(({ colors }) => ({
  active: { base: { borderBottomColor: colors.border.brand } },
  default: {
    base: {
      borderBottomWidth: 4,
      height: 4,
      borderBottomColor: 'transparent',
      borderRadius: 4,
      position: 'absolute',
      bottom: 0,
    },
  },
}));

const linearGradientRounded = createStyles(({ colors }) => ({
  prev: {
    base: {
      left: 0,
      background: `linear-gradient(to right, ${colors.background.primary} 70%, transparent)`,
    },
  },
  next: {
    base: {
      right: 0,
      background: `linear-gradient(to left, ${colors.background.primary} 70%, transparent)`,
    },
  },
}));
const linearGradientUnderline = createStyles(({ colors }) => ({
  prev: {
    base: {
      left: 0,
      background: `linear-gradient(to right, ${colors.background.secondary} 70%, transparent)`,
    },
  },
  next: {
    base: {
      right: 0,
      background: `linear-gradient(to left, ${colors.background.secondary} 70%, transparent)`,
    },
  },
}));

const indicatorRoundedStyles = createStyles(({ colors }) => ({
  active: { base: { backgroundColor: colors.background.secondary } },
  default: {
    base: {
      height: 44,
      backgroundColor: 'transparent',
      borderRadius: 24,
      position: 'absolute',
    },
  },
}));

const indicatorDynamicStyles = createStyles(() => ({
  dyn: (left: SharedValue<number>, width: SharedValue<number>) =>
    ({ width, transform: [{ translateX: left }] }) as any,
}));

const tabTitleStyles = createStyles(({ colors }) => ({
  default: { base: { color: colors.text.secondary } },
  hover: { base: { color: colors.text.primary } },
  active: { base: { color: colors.text.brand } },
}));

const triggerStyles = createStyles(({ space }) => ({
  disabled: {
    base: { opacity: 0.5, pointerEvents: 'none' },
    web: { base: { cursor: 'not-allowed' } },
  },
  trigger: {
    base: {
      height: 44,
      paddingHorizontal: space.xs,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
}));

const focusStyles = createStyles(({ colors }) => ({
  rounded: {
    web: {
      ':focus-visible': {
        outlineColor: colors.border.brand,
        outlineOffset: '4px',
      },
    },
  },
  underline: {
    web: {
      ':focus-visible': {
        outlineColor: colors.border.brand,
        outlineOffset: '4px',
      },
    },
  },
}));

type TabsContext = {
  value: string | number;
  setValue: (_value: string | number) => void;
  id: string;
  variant?: 'underline' | 'rounded';
  listTabRef: React.MutableRefObject<ScrollView>;
  indicator: { left: SharedValue<number>; width: SharedValue<number> };
  scroll: SharedValue<number>;
  shouldShow: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  widthLayout: SharedValue<number>;
};
export const createTabs = () => {
  const [TabsProvider, useTabsContext] = createScope<TabsContext>(
    {} as TabsContext
  );
  const [TriggerProvider, useTriggerContext] = createScope<{
    disabled?: boolean;
    hover?: boolean;
    selected?: boolean;
  }>({});

  const TabsRoot = ({
    children,
    value: valueProps,
    defaultValue,
    finalValue,
    onChange,
    variant = 'rounded',
    ...props
  }: PropsWithChildren<
    Partial<Pick<TabsContext, 'variant'>> &
      UseUncontrolledInput<TabsContext['value']> &
      YBoxProps
  >) => {
    const [value, setValue] = useUncontrolled<TabsContext['value']>({
      value: valueProps,
      defaultValue,
      finalValue,
      onChange,
    });
    const listTabRef = useRef<ScrollView>();
    const left = useSharedValue(0);
    const width = useSharedValue(0);
    const scroll = useSharedValue(0);
    const widthLayout = useSharedValue(0);
    const id = useId();

    const [shouldShow, setShow] = useState(false);

    return (
      <TabsProvider
        value={value}
        variant={variant}
        setValue={setValue}
        id={id}
        indicator={{ left, width }}
        listTabRef={listTabRef}
        scroll={scroll}
        setShow={setShow}
        shouldShow={shouldShow}
        widthLayout={widthLayout}
      >
        <YBox space="sm" {...props}>
          {children}
        </YBox>
      </TabsProvider>
    );
  };

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
        onPress={() => {
          listTabRef.current?.scrollTo({
            x:
              scroll.value >= widthLayout.value
                ? scroll.value - widthLayout.value
                : 0,
          });
        }}
        style={style.prev}
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
        onPress={() => {
          scroll.value <= widthLayout.value
            ? listTabRef.current?.scrollTo({
                x: scroll.value + widthLayout.value,
              })
            : listTabRef.current?.scrollToEnd();
        }}
        style={
          style.next
          //   inlineStyle(({ colors }) => ({
          //   base: { right: 0 },
          //   web: {
          //     base: {
          //       background: `linear-gradient(to left, ${colors.background.hover} 70%, transparent)`,
          //     },
          //   },
        }
      >
        <ChevronRight />
      </ButtonScroll>
    );
  };

  const List = ({ children, ...props }: Omit<ScrollViewProps, 'style'>) => {
    const { listTabRef, scroll, shouldShow, setShow, widthLayout } =
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
        style={inlineStyle(() => ({
          base: { zIndex: 1, height: 54 },
        }))}
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

  const Panels = ({ children }: PropsWithChildren) => children;

  const TabImpl = withStaticProperties(
    ({
      value: valueProps,
      children,
      disabled,
      style,
      ...props
    }: Pick<TabsContext, 'value'> &
      Omit<PressableProps, 'style'> &
      PropsWithChildren<{
        style?: CrossedMethods<any>;
      }>) => {
      const {
        setValue,
        value,
        id,
        variant,
        listTabRef,
        indicator,
        scroll,
        shouldShow,
        widthLayout,
      } = useTabsContext();

      const selected = valueProps === value;

      const { state, props: interaction } = useInteraction(props);

      const measure = () => {
        if (listTabRef.current) {
          ref.current?.measureLayout(
            listTabRef.current as any,
            (left: number, _top: number, width: number) => {
              const offset = shouldShow ? 30 : 0;
              const positionLeft = left + scroll.value;
              indicator.left.value = withTiming(positionLeft);
              indicator.width.value = withTiming(width);
              if (
                widthLayout.value + scroll.value <
                positionLeft + width + offset
              ) {
                listTabRef.current?.scrollTo({
                  x: positionLeft + width - widthLayout.value + offset,
                });
              } else if (
                positionLeft <= offset ||
                positionLeft < scroll.value
              ) {
                listTabRef.current?.scrollTo({
                  x: positionLeft - offset,
                });
              }
            }
          );
        }
      };

      const onPress = useCallback(
        composeEventHandlers(() => {
          setValue(valueProps);
          measure();
        }, props.onPress),
        [props.onPress, setValue]
      );

      useEffect(() => {
        if (shouldShow && selected) {
          measure();
        }
      }, [shouldShow]);

      const onLayout = useCallback(
        composeEventHandlers(({ nativeEvent: { layout } }) => {
          if (selected) {
            indicator.left.value = layout.x + scroll.value;
            indicator.width.value = layout.width;
          }
        }, props.onLayout),
        [props.onLayout, setValue, selected, shouldShow]
      );

      const ref = useRef<View>();

      return (
        <TriggerProvider
          {...state}
          disabled={disabled}
          selected={selected}
          hover={selected || state.hover}
        >
          <Pressable
            role="tab"
            ref={ref}
            disabled={disabled}
            aria-selected={selected.toString()}
            aria-control={`${id}-panel-${valueProps}`}
            id={`${id}-tab-${valueProps}`}
            {...props}
            {...composeStyles(
              triggerStyles.trigger,
              focusStyles[variant],
              disabled && triggerStyles.disabled,
              style
            ).rnw({
              ...state,
              hover: selected || state.hover,
            })}
            {...interaction}
            onPress={onPress}
            onLayout={onLayout}
          >
            {(e) => (typeof children === 'function' ? children(e) : children)}
          </Pressable>
        </TriggerProvider>
      );
    },
    {
      Text: ({ style, ...props }: ButtonTextProps) => {
        const state = useTriggerContext();
        return (
          <Button.Text
            style={composeStyles(
              tabTitleStyles.default,
              state.selected && tabTitleStyles.active,
              !state.selected &&
                !state.disabled &&
                state.hover &&
                tabTitleStyles.hover,
              style
            )}
            {...state}
            {...props}
          />
        );
      },
    }
  );
  const Panel = ({
    value: valueProps,
    style,
    ...props
  }: CardProps & { value: string | number }) => {
    const { value, id, variant } = useTabsContext();
    return valueProps === value ? (
      <Card
        id={`${id}-panel-${valueProps}`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${valueProps}`}
        {...props}
        style={composeStyles(
          variant === 'underline' &&
            inlineStyle(() => ({
              base: {
                backgroundColor: 'transparent',
                borderWidth: 0,
                padding: 0,
              },
            })),
          style
        )}
      />
    ) : null;
  };

  const Indicator = ({ style }: { style: CrossedMethods<any> }) => {
    const { variant, indicator } = useTabsContext();
    const indicatorStyle =
      variant === 'rounded' ? indicatorRoundedStyles : indicatorUnderlineStyles;
    return (
      <Animated.View
        {...composeStyles(
          indicatorStyle.default,
          indicatorStyle.active,
          indicatorDynamicStyles.dyn(indicator.left, indicator.width),
          style
        ).style()}
      />
    );
  };

  return withStaticProperties(TabsRoot, {
    List,
    Panels,
    Tab: TabImpl,
    Panel,
    Indicator,
  });
};

const Tabs = createTabs();

const {
  List: TabList,
  Panels: TabPanels,
  Tab,
  Panel: TabPanel,
  Indicator: TabIndicator,
} = Tabs;
const { Text: TabText } = Tab;

export { Tabs, TabList, TabPanels, Tab, TabText, TabPanel, TabIndicator };

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeEventHandlers, withStaticProperties } from '@crossed/core';
import { TabsContext, TriggerContext } from './context';
import { Pressable, PressableProps } from 'react-native';
import {
  ComponentProps,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  composeStyles,
  CrossedMethods,
  isWeb,
  useInteraction,
} from '@crossed/styled';
import { withTiming } from 'react-native-reanimated';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import {
  tabTitleBorderStyles,
  tabTitleBrandGrayStyles,
  tabTitleBrandStyles,
  tabTitleMinimalStyles,
  tabTitleUnderlineStyles,
  triggerStyles,
  triggerVariantStyles,
} from './styles';
import { Text as TextCrossed } from '../../typography/Text';
import { match } from 'ts-pattern';
import { alignSelfStyle, growStyles, justifyContentStyle } from '../../styles';
import { useMedia } from '../../useMedia';

export type TabsTabProps = Pick<TabsContext, 'value'> &
  Omit<PressableProps, 'style'> &
  PropsWithChildren<{
    style?: CrossedMethods<any>;
  }>;
export const createTab = ({
  useTriggerContext,
  useTabsContext,
  TriggerProvider,
}: {
  TriggerProvider: (_p: PropsWithChildren<TriggerContext>) => ReactNode;
  useTriggerContext: () => TriggerContext;
  useTabsContext: () => TabsContext;
}) => {
  const TabImpl = ({
    value: valueProps,
    children,
    disabled,
    style,
    ...props
  }: TabsTabProps) => {
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
      size,
      fullWidth,
    } = useTabsContext();
    const media = useMedia();

    const selected = valueProps === value;

    const { state, props: interaction } = useInteraction(props);

    const measure = () => {
      if (listTabRef.current) {
        ref.current?.measureLayout(
          listTabRef.current as any,
          (left: number, _top: number, width: number) => {
            const offset = shouldShow ? 30 : 0;
            const positionLeft = isWeb
              ? variant === 'border'
                ? left - 4 + scroll.value
                : left + scroll.value
              : left;
            indicator.left.value = withTiming(positionLeft);
            indicator.width.value = withTiming(width);
            if (
              widthLayout.value + scroll.value <
              positionLeft + width + offset
            ) {
              listTabRef.current?.scrollTo({
                x: positionLeft + width - widthLayout.value + offset,
              });
            } else if (positionLeft <= offset || positionLeft < scroll.value) {
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

    // when screen change, recalculate position if tab is selected
    useEffect(() => {
      selected && measure();
    }, [...Object.values(media), selected]);

    const onLayout = useCallback(
      composeEventHandlers(({ nativeEvent: { layout } }) => {
        if (selected) {
          indicator.left.value =
            layout.x + scroll.value - (variant === 'border' ? 4 : 0);
          indicator.width.value = layout.width;
        }
      }, props.onLayout),
      [props.onLayout, setValue, selected, shouldShow, variant]
    );

    const ref = useRef<View>(null);

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
          aria-selected={selected}
          aria-control={`${id}-panel-${valueProps}`}
          id={`${id}-tab-${valueProps}`}
          {...props}
          {...composeStyles(
            fullWidth && growStyles.on,
            fullWidth && justifyContentStyle.center,
            alignSelfStyle.stretch,
            triggerStyles.trigger,
            triggerStyles[size],
            triggerVariantStyles[variant],
            disabled && triggerStyles.disabled,
            style
          ).rnw({ ...state, disabled })}
          {...interaction}
          onPress={onPress}
          onLayout={onLayout}
        >
          {(e) => (typeof children === 'function' ? children(e) : children)}
        </Pressable>
      </TriggerProvider>
    );
  };

  const Text = ({ style, ...props }: ComponentProps<typeof TextCrossed>) => {
    const { size, variant } = useTabsContext();
    const { disabled, hover, selected, pressed } = useTriggerContext();
    const styles = match(variant)
      .with('minimal', () => tabTitleMinimalStyles)
      .with('border', () => tabTitleBorderStyles)
      .with('underline', () => tabTitleUnderlineStyles)
      .with('brand', () => tabTitleBrandStyles)
      .with('brandGray', () => tabTitleBrandGrayStyles)
      .exhaustive();
    return (
      <TextCrossed
        fontWeight={'semibold'}
        style={composeStyles(
          styles.default,
          selected && styles.selected,
          pressed && styles.active,
          !selected && !disabled && hover && styles.hover,
          style
        )}
        fontSize={size}
        {...props}
      />
    );
  };
  return withStaticProperties(TabImpl, { Text });
};

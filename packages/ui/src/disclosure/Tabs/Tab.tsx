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
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { composeStyles, CrossedMethods, useInteraction } from '@crossed/styled';
import { withTiming } from 'react-native-reanimated';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import { focusStyles, tabTitleStyles, triggerStyles } from './styles';
import { Button, ButtonTextProps } from '../../buttons/Button';

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
            triggerStyles[size],
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
  };

  const Text = ({ style, ...props }: ButtonTextProps) => {
    const { size } = useTabsContext();
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
        size={size === 'sm' ? 'sm' : 'md'}
        {...state}
        {...props}
      />
    );
  };
  return withStaticProperties(TabImpl, { Text });
};

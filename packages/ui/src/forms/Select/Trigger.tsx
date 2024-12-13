/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  composeEventHandlers,
  composeRefs,
  withStaticProperties,
} from '@crossed/core';
import { memo, useCallback, useRef } from 'react';
import { Button, ButtonProps, CloseButton } from '../../buttons';
import { Pressable, TextInput, View } from 'react-native';
import { useSelectProvider } from './context';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { ChevronDown } from '@crossed/unicons';
import { useSelect } from './styles';
import { form } from '../../styles/form';
import { VisibilityHidden } from '@crossed/primitive';
import { XBox, YBox } from '../../layout';
import { FormControl, FormLabel } from '../Form';
import { Text } from '../../typography';

export const SelectTrigger = withStaticProperties(
  memo<ButtonProps>(({ children, ...props }: ButtonProps) => {
    const pressableRef = useRef<View>(null);
    const {
      setOpen,
      open,
      triggerLayout,
      sheet,
      // hover,
      // focus,
      searchable,
      id,
      onBlur,
      onFocus,
      setValue,
      value,
      refs,
      label,
      description,
      extra,
      clearable,
      error,
    } = useSelectProvider();
    const onPress = useCallback(() => {
      if (sheet.current) {
        sheet.current.open();
        setOpen(!open);
      } else {
        pressableRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
          triggerLayout.current = {
            left: pageX,
            top: pageY,
            width,
            height,
            pageX,
            pageY,
          } as any;
          setOpen(!open);
        });
      }
    }, [open, setOpen, sheet, triggerLayout]);
    const showClear = !!(clearable && value);

    const handleClear = useCallback(() => setValue(''), [setValue]);

    const states = {
      // hover,
      'focus': open,
      'focus-visible': open,
      // 'active': props.active,
    };
    // const [, setTransition] = useTransition();

    const handleRender = useCallback(
      (e) => (
        <>
          <VisibilityHidden hide>
            <TextInput
              id={id}
              focusable={false}
              value={Array.isArray(value) ? value.join(', ') : value}
            />
          </VisibilityHidden>
          {typeof children === 'function' ? children(e) : children}
          <ChevronDown
            {...useSelect.icon.style()}
            color={form.placeholder.style().style.color}
          />
        </>
      ),
      [children, searchable, open]
    );

    return (
      <YBox space="xxs">
        {!!(label || description || extra) && (
          <XBox alignItems="center" space="xxs">
            {!!label && <FormLabel {...states}>{label}</FormLabel>}
            {!!description && (
              <Text style={form.labelDescription}>{description}</Text>
            )}
            {!!extra && (
              <Text style={form.labelExtra} textAlign="right">
                {extra}
              </Text>
            )}
          </XBox>
        )}
        <XBox>
          <FormControl>
            <Pressable
              role="button"
              onLayout={({ nativeEvent: { layout } }) => {
                triggerLayout.current = layout;
              }}
              {...props}
              ref={composeRefs(pressableRef, refs.setReference as any)}
              onFocus={composeEventHandlers(props.onFocus, onFocus)}
              onBlur={composeEventHandlers(props.onBlur, onBlur)}
              style={({ pressed }) => {
                return composeStyles(
                  form.input,
                  inlineStyle(() => ({ base: { flex: 1 } })),
                  error && form.inputError,
                  useSelect.trigger,
                  props.style
                ).rnw({
                  // ...states,
                  active: pressed,
                }).style;
              }}
              onPress={composeEventHandlers(props.onPress, onPress)}
            >
              {handleRender}
            </Pressable>
          </FormControl>
          {showClear && (
            <XBox
              style={composeStyles(
                form.elementRight,
                inlineStyle(({ space }) => ({
                  base: { marginRight: space.md },
                }))
              )}
            >
              <CloseButton onPress={handleClear} />
            </XBox>
          )}
        </XBox>
        {!!error && <Text color="error">{error.toString()}</Text>}
      </YBox>
    );
  }),
  { Text: Button.Text }
);
SelectTrigger.displayName = 'Select.Trigger';

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import {
  ComponentProps,
  forwardRef,
  memo,
  RefAttributes,
  useCallback,
  useId,
} from 'react';
import { composeStyles, inlineStyle, useTheme } from '@crossed/styled';
import { ChevronDown } from '@crossed/unicons';
import { form } from '../../styles/form';
import { VisibilityHidden } from '../../other/VisibilityHidden';
import { CloseButton } from '../../buttons/CloseButton';
import { Button } from '../../buttons/Button';
import { XBox } from '../../layout/XBox';
import { Text } from '../../typography/Text';
import { FormControl } from '../../forms/Form';
import { useSelectConfig, useSelectValue } from './context';
import { useSelect } from './styles';
import { TextInput, View } from 'react-native';
import { Floating } from '../../overlay/Floating';

type ButtonProps = ComponentProps<typeof Button>;

const ClearButton = memo(() => {
  const { value, setValue } = useSelectValue();
  const showClear = !!value;
  const handleClear = useCallback(() => setValue(''), [setValue]);
  return showClear ? (
    <XBox
      style={composeStyles(
        form.elementRight,
        inlineStyle(({ space }) => ({
          base: { marginRight: space.xl },
        }))
      )}
    >
      <CloseButton onPress={handleClear} />
    </XBox>
  ) : null;
});

const Value = () => {
  const { value, items, renderValue } = useSelectValue();
  const { multiple } = useSelectConfig();
  const id = useId();

  const tmp = !value ? [] : Array.isArray(value) ? value : [value];
  const toRender = tmp && tmp.length > 3 ? tmp.slice(0, 3) : tmp;
  const labelByValue = items.reduce((acc, i) => {
    if ('title' in i) {
      return {
        ...acc,
        ...i.data.reduce((acc2, d) => ({ ...acc2, [`${d.value}`]: d }), {}),
      };
    }
    return { ...acc, [`${i.value}`]: i };
  }, {});
  return (
    <>
      <VisibilityHidden hide>
        <TextInput
          // id={id}
          focusable={false}
          value={`${Array.isArray(value) ? value.join(', ') : value}`}
        />
      </VisibilityHidden>
      <XBox style={inlineStyle(() => ({ base: { gap: 5, flexShrink: 1 } }))}>
        {renderValue
          ? renderValue(value as any)
          : toRender.map((e, i) => (
              <Text
                ellipsizeMode={'tail'}
                numberOfLines={1}
                key={`${id}-${e}`}
                style={composeStyles(
                  useSelect.value,
                  multiple &&
                    inlineStyle(({ colors, space }) => ({
                      base: {
                        backgroundColor: colors.info.light,
                        padding: space.xs,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: colors.info.primary,
                        color: colors.info.dark,
                      },
                    }))
                  // style
                )}
              >
                {i === 2
                  ? `...+${tmp.length - i}`
                  : (labelByValue as any)[`${e}`]?.label}
              </Text>
            ))}
      </XBox>
    </>
  );
};

export const SelectTrigger = withStaticProperties(
  memo<ButtonProps & RefAttributes<View>>(
    forwardRef(({ children, ...props }, ref) => {
      const { clearable } = useSelectConfig();
      useTheme();
      return (
        <XBox>
          <FormControl>
            <Floating.Trigger
              {...props}
              style={composeStyles(
                !children && form.input,
                !children && useSelect.trigger,
                props.disabled && form.disabled,
                // error && form.inputError,
                props.style
              )}
              ref={ref}
            >
              {children ?? (
                <>
                  <Value />
                  <ChevronDown
                    {...useSelect.icon.style()}
                    color={form.placeholder.style().style.color}
                  />
                </>
              )}
            </Floating.Trigger>
          </FormControl>
          {clearable && <ClearButton />}
        </XBox>
      );
    })
  ),
  { Text: Button.Text }
);
SelectTrigger.displayName = 'Select.Trigger';

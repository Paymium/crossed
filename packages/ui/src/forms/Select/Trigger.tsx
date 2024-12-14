/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { forwardRef, memo, RefAttributes, useCallback, useId } from 'react';
import { Button, ButtonProps, CloseButton } from '../../buttons';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { ChevronDown } from '@crossed/unicons';
import { form } from '../../styles/form';
import { XBox } from '../../layout';
import { FormControl } from '../Form';
import { Text } from '../../typography';
import { useSelectConfig, useSelectValue } from './context';
import { Floating } from '../../overlay/Floating';
import { useSelect } from './styles';
import { VisibilityHidden } from '@crossed/primitive';
import { TextInput, View } from 'react-native';

const ClearButton = memo(() => {
  const { value, setValue } = useSelectValue();
  const showClear = !!value;
  const handleClear = useCallback(() => setValue(''), [setValue]);
  return showClear ? (
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
  ) : null;
});

const Value = () => {
  const { value, items } = useSelectValue();
  const { multiple } = useSelectConfig();
  const id = useId();

  const tmp = !value ? [] : Array.isArray(value) ? value : [value];
  const toRender = tmp && tmp.length > 3 ? tmp.slice(0, 3) : tmp;
  const labelByValue = items.reduce(
    (acc, i) => ({ ...acc, [`${i.value}`]: i }),
    {}
  );

  return (
    <>
      <VisibilityHidden hide>
        <TextInput
          // id={id}
          focusable={false}
          value={`${Array.isArray(value) ? value.join(', ') : value}`}
        />
      </VisibilityHidden>
      <XBox style={inlineStyle(() => ({ base: { gap: 5 } }))}>
        {toRender.map((e, i) => (
          <Text
            key={`${id}-${e}`}
            style={composeStyles(
              useSelect.value,
              multiple &&
                inlineStyle(({ colors, space }) => ({
                  base: {
                    backgroundColor: colors.info.light,
                    padding: space.xxs,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: colors.info.primary,
                    color: colors.info.dark,
                  },
                }))
              // style
            )}
          >
            {i === 2 ? `...+${tmp.length - i}` : labelByValue[`${e}`]?.label}
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
      return (
        <XBox>
          <FormControl>
            <Floating.Trigger
              style={composeStyles(
                form.input,
                inlineStyle(() => ({ base: { flex: 1 } })),
                // error && form.inputError,
                useSelect.trigger,
                props.style
              )}
              ref={ref}
            >
              <Value />
              <ChevronDown
                {...useSelect.icon.style()}
                color={form.placeholder.style().style.color}
              />
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

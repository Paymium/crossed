/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createInput } from '@crossed/primitive';
import { TextInput, type TextInputProps } from 'react-native';
import { YBox, type YBoxProps } from '../layout/YBox';
import { XBox } from '../layout/XBox';
import { forwardRef } from 'react';
import { createStyles } from '@crossed/styled';
import { form, type FormInput } from '../styles/form';
import { useInteraction } from '@crossed/styled/plugins';

const useInput = createStyles(() => ({
  element: {
    base: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}));

const Addon = YBox;
const Element = (props: YBoxProps) => {
  return <YBox {...props} {...useInput.element.rnw()} />;
};
const Group = XBox;

const InputRoot = forwardRef(
  (
    {
      error,
      disabled,
      ...props
    }: Omit<TextInputProps, 'editable'> &
      Omit<FormInput, 'variants'> &
      Pick<FormInput['variants'], 'error'>,
    ref: any
  ) => {
    const { state, props: propsInteraction } = useInteraction(props);
    const { color } = form.placeholder.style().style;
    return (
      <TextInput
        ref={ref}
        placeholderTextColor={color}
        cursorColor={color}
        editable={!disabled}
        {...props}
        {...propsInteraction}
        {...form.input.rnw({
          ...state,
          disabled,
          variants: { error },
        })}
      />
    );
  }
);

const Input = createInput({
  Addon,
  Element,
  Group,
  Input: InputRoot,
});

export { Input };

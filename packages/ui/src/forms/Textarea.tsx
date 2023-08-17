import { withStaticProperties, type GetProps } from '@crossed/core';
import { Input, InputRootProps } from './Input';
import type { ReactNode } from 'react';

type TextareaRootProps = InputRootProps;
type TextAreaPropsSimple = Omit<TextareaRootProps, 'children'> & {
  children?: never;
};
type TextAreaPropsAdvance = Omit<
  TextareaRootProps,
  'label' | 'iconAfter' | 'icon'
> & { label?: never; iconAfter?: never; icon?: never };

const TextareaRoot = ({
  children,
  label,
  size,
  color,
  variant,
  value,
  onChangeValue,
}: TextAreaPropsSimple | TextAreaPropsAdvance) => {
  return (
    <Input
      size={size}
      color={color}
      variant={variant}
      value={value}
      onChangeValue={onChangeValue}
    >
      {children ??
        [
          label && <TextareaLabel key="TextareaLabel">{label}</TextareaLabel>,
          <TextareaInput key="TextareaInput" />,
        ].filter(Boolean)}
    </Input>
  );
};
const TextareaLabel: (props: GetProps<typeof Input.Label>) => ReactNode =
  Input.Label;
const TextareaInput = (props: Omit<GetProps<typeof Input.Input>, 'value'>) => {
  return (
    <Input.Content>
      <Input.Input multiline textAlignVertical="top" {...props} />
    </Input.Content>
  );
};

export const Textarea = withStaticProperties(TextareaRoot, {
  Label: TextareaLabel,
  Input: TextareaInput,
});

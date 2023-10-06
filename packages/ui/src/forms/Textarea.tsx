'use client';
import { withStaticProperties, type GetProps } from '@crossed/core';
import { Input, InputRootProps } from './Input';
import type { ReactElement } from 'react';

type TextareaRootProps = InputRootProps;

function TextareaRoot(props: Omit<TextareaRootProps, 'children'>): ReactElement;
function TextareaRoot(
  props: Omit<TextareaRootProps, 'label' | 'iconAfter' | 'icon'>
): ReactElement;
function TextareaRoot({
  children,
  label,
  size,
  color,
  variant,
  value,
  onChangeValue,
}: TextareaRootProps) {
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
          label && (
            <TextareaLabel key="TextareaLabel" aria-label={label}>
              {label}
            </TextareaLabel>
          ),
          <TextareaInput key="TextareaInput" />,
        ].filter(Boolean)}
    </Input>
  );
}
const TextareaLabel = Input.Label;
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

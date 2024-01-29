import { withStaticProperties } from '@crossed/core';
import { createLabel } from './createLabel';
import { createRoot } from './createRoot';
import { createInputInput } from './createInput';
import type { ComponentType } from 'react';
import type { CreateRootProps } from './createRoot';
import type { CreateLabelProps } from './createLabel';
import type { CreateInputInputProps } from './createInput';

export const createInput = <
  RootProps extends Record<string, any>,
  InputProps extends Record<string, any>,
  LabelProps extends Record<string, any>
>({
  Root,
  Input,
  Label,
}: {
  Root: ComponentType<RootProps & CreateRootProps>;
  Input: ComponentType<InputProps & CreateInputInputProps>;
  Label: ComponentType<LabelProps & CreateLabelProps>;
}) => {
  const newRoot = createRoot(Root);
  const newLabel = createLabel(Label);
  const newInput = createInputInput(Input);
  newLabel.id = 'label.label';
  newInput.id = 'label.input';

  return withStaticProperties(newRoot, { Input: newInput, Label: newLabel });
};

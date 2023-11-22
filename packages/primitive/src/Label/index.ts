import type { ComponentType } from 'react';
import { createLabelMain } from './Label';
import { createLabelText } from './LabelText';
import { LabelInput } from './LabelInput';
import { withStaticProperties } from '@crossed/core';
export { useContext as useLabelContext } from './context';

export const createLabel = <
  LabelProps extends Record<string, any>,
  TextProps extends Record<string, any>
>(components: {
  Root: ComponentType<LabelProps>;
  Text: ComponentType<TextProps>;
}) => {
  const { Root, Text } = components;
  const Label = createLabelMain(Root);
  const LabelText = createLabelText(Text);

  Label.displayName = 'Label';
  LabelText.displayName = 'Label.Text';
  LabelInput.displayName = 'Label.Input';

  return withStaticProperties(Label, {
    Text: LabelText,
    Input: LabelInput,
  } as const);
};

import { withStaticProperties } from '@crossed/core';
import type { ComponentType } from 'react';
import { createButtonMain } from './Button';
import { createButtonText } from './ButtonText';
import { createButtonElement } from './ButtonElement';
import type { TextProps as NTextProps } from 'react-native';
import { createButtonGroup } from './ButtonGroup';
export { useContext as useButtonContext } from './context';
export { useContextGroup as useButtonGroupContext } from './contextGroup';
export { useButtonGroupCollection } from './contextCollection';

export const createButton = <
  GroupProps extends Record<string, any>,
  ButtonProps extends Record<string, any>,
  TextProps extends NTextProps,
  ElementProps extends Record<string, any>
>(components: {
  Root: ComponentType<ButtonProps>;
  Group: ComponentType<GroupProps>;
  Text: ComponentType<TextProps>;
  Element: ComponentType<ElementProps>;
}) => {
  const { Root, Group, Text, Element } = components;
  const ButtonGroup = createButtonGroup(Group);
  const Button = createButtonMain(Root);
  const ButtonText = createButtonText(Text);
  const ButtonElement = createButtonElement(Element);

  Button.displayName = 'Button';
  ButtonText.displayName = 'ButtonText';
  ButtonGroup.displayName = 'ButtonGroup';
  ButtonElement.displayName = 'ButtonElement';

  return withStaticProperties(Button, {
    Group: ButtonGroup,
    Text: ButtonText,
    Element: ButtonElement,
  });
};

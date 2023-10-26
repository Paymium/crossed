import { withStaticProperties } from '@crossed/core';
import type { ComponentType } from 'react';
import { createButtonMain } from './Button';
import { createButtonText } from './ButtonText';
import { createButtonIcon } from './ButtonIcon';
import type { TextProps as NTextProps } from 'react-native';
import { createButtonGroup } from './ButtonGroup';
export { useContext as useButtonContext } from './context';

export const createButton = <
  GroupProps extends Record<string, any>,
  ButtonProps extends Record<string, any>,
  TextProps extends NTextProps,
  IconProps extends Record<string, any>
>(components: {
  Root: ComponentType<ButtonProps>;
  Group: ComponentType<GroupProps>;
  Text: ComponentType<TextProps>;
  Icon: ComponentType<IconProps>;
}) => {
  const { Root, Group, Text, Icon } = components;
  const ButtonGroup = createButtonGroup(Group);
  const Button = createButtonMain(Root);
  const ButtonText = createButtonText(Text);
  const ButtonIcon = createButtonIcon(Icon);

  Button.displayName = 'Button';
  ButtonText.displayName = 'ButtonText';
  ButtonIcon.displayName = 'ButtonIcon';
  ButtonGroup.displayName = 'ButtonGroup';

  return withStaticProperties(Button, {
    Group: ButtonGroup,
    Text: ButtonText,
    Icon: ButtonIcon,
  });
};

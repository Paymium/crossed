import { withStaticProperties } from '@crossed/core';
import type { ComponentType } from 'react';
import { createIcon } from './InputIcon';
import { createInput as createInputInput } from './InputInput';

export const createInput = <
  GroupProps extends Record<string, any>,
  IconProps extends Record<string, any>,
  InputProps extends Record<string, any>
>(components: {
  Group: ComponentType<GroupProps>;
  Icon: ComponentType<IconProps>;
  Input: ComponentType<InputProps>;
}) => {
  const { Group, Icon, Input } = components;

  const InputGroup = Group;
  const InputInput = createInputInput(Input);
  const InputIcon = createIcon(Icon);

  InputInput.displayName = 'Input';
  InputGroup.displayName = 'Input.Group';
  InputIcon.displayName = 'Input.Icon';

  return withStaticProperties(InputInput, {
    Group: InputGroup,
    Icon: InputIcon,
  });
};

import { withStaticProperties } from '@crossed/core';
import type { ComponentType } from 'react';
import { createInput as createInputInput } from './InputInput';
import { createInputGroup } from './InputGroup';
import { createInputElement } from './InputElement';
export { useInputContext } from './context';

export const createInput = <
  GroupProps extends Record<string, any>,
  IconProps extends Record<string, any>,
  ElementProps extends Record<string, any>,
  InputProps extends Record<string, any>
>(components: {
  Group: ComponentType<GroupProps>;
  Addon: ComponentType<IconProps>;
  Element: ComponentType<ElementProps>;
  Input: ComponentType<InputProps>;
}) => {
  const { Group, Element, Addon, Input } = components;

  const InputGroup = createInputGroup(Group);
  const InputInput = createInputInput(Input, Group);
  const InputElement = createInputElement(Element);
  const InputAddon = Addon;

  InputInput.displayName = 'Input';
  InputGroup.displayName = 'Input.Group';
  InputElement.displayName = 'Input.Element';
  InputAddon.displayName = 'Input.Addon';

  return withStaticProperties(InputInput, {
    Group: InputGroup,
    Addon: InputAddon,
    Element: InputElement,
  });
};

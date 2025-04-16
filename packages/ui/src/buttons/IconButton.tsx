/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Pressable, PressableProps } from 'react-native';
import {
  composeStyles,
  inlineStyle,
  CrossedMethods,
  useTheme,
  Registry,
} from '@crossed/styled';
import { cloneElement, isValidElement, memo, useCallback } from 'react';

export interface IconButtonProps extends Omit<PressableProps, 'style'> {
  /**
   * Crossed style
   */
  style?: CrossedMethods<any>;
}

export const iconButtonStyles = inlineStyle(({ components: { Action } }) => ({
  'base': {
    borderRadius: 50,
    backgroundColor: Action.icon.default.background,
    borderColor: Action.icon.default.border,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  ':hover': {
    backgroundColor: Action.icon.hover.background,
    borderColor: Action.icon.hover.border,
  },
  ':active': {
    backgroundColor: Action.icon.active.background,
    borderColor: Action.icon.active.border,
    outlineColor: Action.icon.focus.border,
  },
  ':disabled': { opacity: 0.5 },
  'web': {
    ':focus-visible': {
      backgroundColor: Action.icon.focus.background,
      outlineColor: Action.icon.focus.border,
    },
  },
}));

export const IconButton = memo<IconButtonProps>(
  ({ children, style, ...props }) => {
    const { components } = useTheme();
    const getStyle = useCallback(
      ({
        hovered,
        pressed,
        focused,
      }: {
        hovered?: boolean;
        pressed?: boolean;
        focused?: boolean;
      }) => {
        return composeStyles(iconButtonStyles, style).style({
          hover: hovered,
          focus: focused,
          active: pressed,
          disabled: !!props.disabled,
        }).style;
      },
      [props.disabled, Registry.themeName, style]
    );
    const child = useCallback(
      (e: any) => {
        const tmpChild =
          typeof children === 'function' ? children(e) : children;

        if (isValidElement(tmpChild)) {
          return cloneElement(tmpChild, {
            size: 16,
            color: components.Action.icon.default.color,
          } as any);
        }
        return tmpChild;
      },
      [children]
    );
    return (
      <Pressable role="button" {...props} style={getStyle}>
        {child}
      </Pressable>
    );
  }
);

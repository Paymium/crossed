/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { X } from '@crossed/icons';
import { buttonSizeStyles, buttonOutlineStyle } from './Button/styles';
import { Pressable } from 'react-native';
import { ComponentProps, useCallback } from 'react';
import { composeStyles, CrossedMethods, inlineStyle } from '@crossed/styled';

type CloseButtonProps = Omit<ComponentProps<typeof Pressable>, 'style'> & {
  style?: CrossedMethods<any>;

  size?: Exclude<keyof typeof buttonSizeStyles, 'xl'>;
};

const styles = inlineStyle(({ radius }) => ({
  'base': { borderRadius: radius.md },
  ':hover': {},
}));

export const CloseButton = ({
  style,
  size = 'md',
  ...props
}: CloseButtonProps) => {
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
      return composeStyles(
        styles,
        buttonOutlineStyle.default,
        buttonOutlineStyle.primary,
        buttonSizeStyles[size],
        style
      ).style({
        hover: hovered,
        focus: focused,
        active: pressed,
        disabled: !!props.disabled,
      }).style;
    },
    [props.disabled, style]
  );
  return (
    <Pressable role="button" aria-label="Close" {...props} style={getStyle}>
      {({ hovered, pressed }: { pressed?: boolean; hovered?: boolean }) => (
        <X
          size={size === 'lg' ? 24 : 20}
          color={
            hovered
              ? 'foreground.brand.secondary.hover'
              : pressed
                ? 'foreground.brand.secondary.default'
                : 'foreground.brand.secondary.default'
          }
        />
      )}
    </Pressable>
  );
};

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  composeStyles,
  createStyles,
  type CrossedMethods,
} from '@crossed/styled';
import { X } from '@crossed/unicons';
import { Pressable, type PressableProps } from 'react-native';

const styles = createStyles((t) => ({
  pressable: {
    base: {
      padding: t.space.xs,
    },
  },
  icon: {
    // 'base': {color: t.colors.neutral[600] },
    // ':disabled': { color: t.colors.neutral[80] },
  },
}));

export const CloseButton = ({
  style,
  disabled,
  ...props
}: Omit<PressableProps, 'children' | 'style'> & {
  style?: CrossedMethods<any>;
}) => {
  const { color } = styles.icon.style({ disabled }).style;
  return (
    <Pressable
      role="button"
      aria-label="Close"
      {...props}
      disabled={disabled}
      style={({ pressed, hovered }: { pressed?: boolean; hovered?: boolean }) =>
        composeStyles(styles.pressable, style).rnw({
          active: pressed,
          hover: hovered,
        }).style
      }
    >
      <X color={color} size={16} />
    </Pressable>
  );
};

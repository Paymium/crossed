/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';
import { X } from '@crossed/unicons';
import { Pressable, type PressableProps } from 'react-native';

const styles = createStyles((t) => ({
  pressable: {
    base: {
      padding: t.space.xs,
    },
  },
  icon: {
    'base': { color: t.colors.neutral[600] },
    ':disabled': { color: t.colors.neutral.hight },
  },
}));

export const CloseButton = ({
  style,
  disabled,
  ...props
}: Omit<PressableProps, 'children'>) => {
  const { color } = styles.icon.style({ disabled }).style;
  return (
    <Pressable
      aria-label="Close"
      {...props}
      disabled={disabled}
      style={({ pressed }) => [
        styles.pressable.rnw({
          active: pressed,
        }).style,
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
    >
      <X color={color} size={16} />
    </Pressable>
  );
};

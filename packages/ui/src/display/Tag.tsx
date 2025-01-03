/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text, type TextProps } from '../typography/Text';
import { composeStyles, createStyles } from '@crossed/styled';
import { forwardRef } from 'react';

const styles = createStyles(({ space, components }) => ({
  default: {
    base: {
      flex: 0,
      flexShrink: 1,
      textAlign: 'center',
      padding: space.xs,
      borderRadius: space.xs,
      backgroundColor: components.Tag.default.background,
      color: components.Tag.default.text,
    },
  },
  green: {
    base: {
      backgroundColor: components.Tag.green.background,
      color: components.Tag.green.text,
    },
  },
  red: {
    base: {
      backgroundColor: components.Tag.red.background,
      color: components.Tag.red.text,
    },
  },
}));

type TagProps = TextProps & { variant?: keyof typeof styles };

const Tag = forwardRef(
  ({ style, variant = 'default', ...props }: TagProps, ref: any) => {
    return (
      <Text
        ref={ref}
        {...props}
        style={composeStyles(styles.default, styles[variant], style)}
      />
    );
  }
);

export { Tag, type TagProps };

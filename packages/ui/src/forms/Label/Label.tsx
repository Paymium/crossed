/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withReactive } from '@crossed/styled';
import { Text } from '../../typography/Text';
import type { LabelComponent } from './types';
import { styles } from './styles';

export const Label: LabelComponent = withReactive(
  ({
    htmlFor: _u,
    disabled,
    size = 'md',
    weight = 'lg',
    className,
    style,
    ...props
  }) => {
    return (
      <Text
        {...props}
        {...styles().rnw({
          ...props,
          style: style as any,
          className,
          variants: { size, weight },
        })}
      />
    );
  }
);

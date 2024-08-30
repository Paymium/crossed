/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { LabelComponent } from './types';
import { styles } from './styles';

export const Label: LabelComponent = ({
  disabled,
  weight = 'lg',
  size = 'md',
  className,
  style,
  ...props
}) => {
  return (
    <label
      {...props}
      style={style}
      {...(styles().className({
        ...props,
        className,
        disabled,
        variants: { size, weight },
      }) as any)}
    />
  );
};

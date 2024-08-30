/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { LabelComponent } from './types';
import { className } from '@crossed/styled';
import { form } from '../../styles/form';

export const Label: LabelComponent = ({
  disabled,
  weight: _weight = 'lg',
  size: _size = 'md',
  // className,
  style,
  ...props
}) => {
  return (
    <label
      {...props}
      {...className(form.label, style)}
      //   .className({
      //   ...props,
      //   className,
      //   disabled,
      //   variants: { size, weight },
      // }) as any)}
    />
  );
};

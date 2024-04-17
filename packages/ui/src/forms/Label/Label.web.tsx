/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { form } from '../../styles/form';
import type { LabelComponent } from './types';

export const Label: LabelComponent = ({ disabled, ...props }) => {
  return (
    <label
      {...props}
      {...(form.label.className({ ...props, disabled }) as any)}
    />
  );
};

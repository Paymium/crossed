/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo } from 'react';
import { XBox } from '../../layout/XBox';
import { FormField } from '../../forms/Form';

export type SelectLabelProps = {
  label?: string;
};
export const SelectLabel = memo<SelectLabelProps>(({ label }) => {
  return label ? (
    <XBox alignItems="center" space="xxs">
      {!!label && <FormField.Label>{label}</FormField.Label>}
    </XBox>
  ) : null;
});

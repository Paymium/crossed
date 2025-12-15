/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo } from 'react';
import { form } from '../../styles/form';
import { XBox } from '../../layout/XBox';
import { Text } from '../../typography/Text';
import { FormLabel } from '../../forms/Form';

export type SelectLabelProps = {
  label?: string;
  description?: string;
  extra?: string;
};
export const SelectLabel = memo<SelectLabelProps>(
  ({ label, description, extra }) => {
    return label || description || extra ? (
      <XBox alignItems="center" space="xs">
        {!!label && <FormLabel>{label}</FormLabel>}
        {!!description && (
          <Text style={form.labelDescription}>{description}</Text>
        )}
        {!!extra && (
          <Text style={form.labelExtra} textAlign="right">
            {extra}
          </Text>
        )}
      </XBox>
    ) : null;
  }
);

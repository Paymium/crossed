/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withReactive } from '@crossed/styled';
import { Text } from '../../typography/Text';
import { form } from '../../styles/form';
import type { LabelComponent } from './types';

export const Label: LabelComponent = withReactive(
  ({ htmlFor: _u, disabled, ...props }) => {
    return <Text {...props} {...form.label.rnw({ ...props, disabled })} />;
  }
);

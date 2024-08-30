/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, withReactive } from '@crossed/styled';
import { Text } from '../../typography/Text';
import type { LabelComponent } from './types';
import { form } from '../../styles/form';

export const Label: LabelComponent = withReactive(
  ({ htmlFor: _u, disabled, style, ...props }) => {
    return <Text {...props} style={composeStyles(form.label, style)} />;
  }
);

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text } from '../../typography';
import { withDefaultProps } from '@crossed/core';

export const Title = withDefaultProps(Text, {
  fontSize: 'md',
  fontWeight: 'semibold',
});
Title.displayName = 'Card.Title';

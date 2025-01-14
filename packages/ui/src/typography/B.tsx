/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text } from './Text';
import { withDefaultProps } from '@crossed/core';
import 'react';

export const B = withDefaultProps(Text, { weight: 'h1' });

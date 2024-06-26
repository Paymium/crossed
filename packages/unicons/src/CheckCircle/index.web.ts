/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { CheckCircle as Base } from './CheckCircle';

export const CheckCircle = withDefaultProps(Base, { Svg: 'svg', Path: 'path' });

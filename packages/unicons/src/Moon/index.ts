/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { Moon as Base } from './Moon';
import { Path, Svg, Circle } from 'react-native-svg';

export const Moon = withDefaultProps(Base, { Svg, Path, Circle });

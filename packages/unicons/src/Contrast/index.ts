/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { Contrast as Base } from './Contrast';
import { Path, Svg, Circle } from 'react-native-svg';

export const Contrast = withDefaultProps(Base, { Svg, Path, Circle });

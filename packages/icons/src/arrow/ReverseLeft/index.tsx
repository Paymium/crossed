/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { ReverseLeft as Base } from './ReverseLeft';
import { Path, Svg } from 'react-native-svg';

export const ReverseLeft = withDefaultProps(Base, { Svg, Path });

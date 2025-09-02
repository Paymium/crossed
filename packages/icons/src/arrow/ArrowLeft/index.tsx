/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { ArrowLeft as Base } from './ArrowLeft';
import { Path, Svg } from 'react-native-svg';

export const ArrowLeft = withDefaultProps(Base, { Svg, Path });

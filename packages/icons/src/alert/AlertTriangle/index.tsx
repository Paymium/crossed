/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { AlertTriangle as Base } from './AlertTriangle';
import { Path, Svg } from 'react-native-svg';

export const AlertTriangle = withDefaultProps(Base, { Svg, Path });

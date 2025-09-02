/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { ChevronRightDouble as Base } from './ChevronRightDouble';
import { Path, Svg } from 'react-native-svg';

export const ChevronRightDouble = withDefaultProps(Base, { Svg, Path });

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { ChevronDown as Base } from './ChevronDown';
import { Path, Svg } from 'react-native-svg';

export const ChevronDown = withDefaultProps(Base, { Svg, Path });

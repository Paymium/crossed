/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { ChevronSelectorVertical as Base } from './ChevronSelectorVertical';
import { Path, Svg } from 'react-native-svg';

export const ChevronSelectorVertical = withDefaultProps(Base, { Svg, Path });

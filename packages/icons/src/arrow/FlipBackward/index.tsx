/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { FlipBackward as Base } from './FlipBackward';
import { Path, Svg } from 'react-native-svg';

export const FlipBackward = withDefaultProps(Base, { Svg, Path });

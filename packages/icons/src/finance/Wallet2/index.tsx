/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { Wallet2 as Base } from './Wallet2';
import { Path, Svg } from 'react-native-svg';

export const Wallet2 = withDefaultProps(Base, { Svg, Path });

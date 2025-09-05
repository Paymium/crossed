/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { Announcement1 as Base } from './Announcement1';
import { Path, Svg } from 'react-native-svg';

export const Announcement1 = withDefaultProps(Base, { Svg, Path });

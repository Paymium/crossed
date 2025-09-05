/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { SearchLg as Base } from './SearchLg';
import { Path, Svg } from 'react-native-svg';

export const SearchLg = withDefaultProps(Base, { Svg, Path });

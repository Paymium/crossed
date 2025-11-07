/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { FilePdf as Base } from './FilePdf';
import { Path, Svg, Rect } from 'react-native-svg';

export const FilePdf = withDefaultProps(Base, { Svg, Path, Rect });

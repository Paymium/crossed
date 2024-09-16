/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { CrossedMethods } from '@crossed/styled';
import type { ComponentType } from 'react';
import type { TextProps } from 'react-native';

export type LabelProps = Omit<TextProps, 'style'> & {
  style?: CrossedMethods<any>;
  htmlFor?: string;
};
export type LabelComponent = ComponentType<LabelProps>;

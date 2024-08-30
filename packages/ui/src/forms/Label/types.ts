/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ComponentType } from 'react';
import type { TextProps } from 'react-native';
import type { Size, Weight } from '../../styles/typography';

export type LabelProps = TextProps &
  Size['variants'] &
  Weight['variants'] & {
    htmlFor?: string;
    disabled?: boolean;
    className?: string;
  };
export type LabelComponent = ComponentType<LabelProps>;

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ComponentType } from 'react';
import type { TextProps } from '../../typography/Text';

export type LabelProps = TextProps & { htmlFor?: string; disabled?: boolean };
export type LabelComponent = ComponentType<LabelProps>;

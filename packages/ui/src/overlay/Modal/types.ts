/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ComponentProps } from 'react';
import { FocusOn } from 'react-focus-on';
import { CrossedMethods } from '@crossed/styled';

export type FocusProps = ComponentProps<typeof FocusOn> & {
  style?: CrossedMethods<any>;
};
export type SafeAreaInsets = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

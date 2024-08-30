/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { View } from 'react-native';
import type { FocusComponent, AccordionUseFocus } from './types';

export const Focus: FocusComponent = View;

export const useFocus: AccordionUseFocus = () => {
  return { onKeyDown: () => {} };
};

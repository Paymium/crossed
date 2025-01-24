/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createContext } from 'react';
import { SharedValue } from 'react-native-reanimated';

export type LocalContext = {
  disabled?: boolean;
  sharedValue?: SharedValue<boolean>;
  duration: number;
  height: SharedValue<number>;
  width: SharedValue<number>;
};

export const localContext = createContext<LocalContext>({} as LocalContext);

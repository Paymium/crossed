/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Platform, StatusBar } from 'react-native';

export function getDeviceHeight(
  statusBarTranslucent: boolean | undefined,
  heightProps: number
): number {
  if (Platform.OS === 'ios') return heightProps;

  const currentStatusbarHeight = StatusBar.currentHeight || 0;
  const height = heightProps + currentStatusbarHeight - 3;
  if (!statusBarTranslucent) {
    return height - currentStatusbarHeight;
  }
  return height;
}

export const getElevation = (elevation: number) => {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0.3 * elevation, height: 0.5 * elevation },
    shadowOpacity: 0.2,
    shadowRadius: 0.7 * elevation,
  };
};

export const SUPPORTED_ORIENTATIONS: (
  | 'portrait'
  | 'portrait-upside-down'
  | 'landscape'
  | 'landscape-left'
  | 'landscape-right'
)[] = [
  'portrait',
  'portrait-upside-down',
  'landscape',
  'landscape-left',
  'landscape-right',
];

export const waitAsync = (ms: number): Promise<null> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });

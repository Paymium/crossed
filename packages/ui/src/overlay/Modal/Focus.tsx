/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { FocusProps } from './types';
import { View, ViewProps } from 'react-native';

export const Focus = ({ children, style, ...props }: FocusProps) => {
  return (
    <View {...style.rnw()} {...(props as ViewProps)}>
      {children}
    </View>
  );
};

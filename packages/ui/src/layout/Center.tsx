/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles } from '@crossed/styled';
import { YBox, type YBoxProps } from './YBox';

export const useCenter = createStyles(() => ({
  root: {
    base: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}));
export const Center = ({ style, ...props }: YBoxProps) => {
  return <YBox {...props} style={composeStyles(useCenter.root, style)} />;
};

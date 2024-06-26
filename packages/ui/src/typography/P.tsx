/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text, type TextProps } from './Text';
import { createStyles } from '@crossed/styled';

const useP = createStyles(() => ({
  root: {
    base: {
      alignSelf: 'stretch',
    },
  },
}));

export const P = (props: TextProps) => {
  // @ts-expect-error role not defined in typed
  return <Text role="paragraph" {...props} {...useP.root.rnw(props)} />;
};

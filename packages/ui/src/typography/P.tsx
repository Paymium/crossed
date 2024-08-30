/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text, type TextProps } from './Text';
import { composeStyles, createStyles } from '@crossed/styled';

const useP = createStyles(() => ({
  root: {
    base: {
      alignSelf: 'stretch',
    },
  },
}));

export const P = (props: TextProps) => {
  return (
    <Text
      // @ts-expect-error role not defined in typed
      role="paragraph"
      {...props}
      style={composeStyles(useP.root, props.style)}
    />
  );
};

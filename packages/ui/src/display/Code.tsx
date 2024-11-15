/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';
import { Text, type TextProps } from '../typography/Text';

const useCode = createStyles((t) => ({
  root: {
    base: {
      // backgroundColor: t.colors.neutral[500],
      paddingVertical: t.space.xs,
      paddingHorizontal: t.space.md,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 4,
    },
  },
}));

type CodeProps = TextProps;

const Code = (props: CodeProps) => {
  return <Text {...props} style={useCode.root} />;
};

export { Code, type CodeProps };

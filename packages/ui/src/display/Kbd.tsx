/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';
import { Text, type TextProps } from '../typography/Text';

const useKbd = createStyles((t) => ({
  root: {
    base: {
      backgroundColor: t.colors.neutral[500],
      paddingVertical: 1,
      paddingHorizontal: t.space.xxs,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 4,
      alignSelf: 'flex-start',
    },
  },
}));

type KbdProps = TextProps;

const Kbd = (props: KbdProps) => {
  return <Text {...props} {...useKbd.root.rnw()} />;
};

export { Kbd, type KbdProps };

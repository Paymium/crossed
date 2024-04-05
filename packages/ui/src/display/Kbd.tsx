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
      backgroundColor: t.colors.neutral,
      paddingVertical: 1,
      paddingHorizontal: t.space.xs,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 4,
    },
  },
}));

type KbdProps = TextProps;

const Kbd = (props: KbdProps) => {
  const { root } = useKbd();
  return <Text {...props} {...root} />;
};

export { Kbd, type KbdProps };

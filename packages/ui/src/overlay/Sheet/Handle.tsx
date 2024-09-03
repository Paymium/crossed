/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useSheetContext } from './context';
import { createStyles, CrossedStyle, rnw } from '@crossed/styled';
import { Box } from '../../layout/Box';
import { Pressable, PressableProps } from 'react-native';

const styles = createStyles(({ colors }) => ({
  handle: {
    base: {
      width: 54,
      height: 5,
      backgroundColor: colors.primary[20],
      alignSelf: 'center',
      borderRadius: 14,
    },
    variants: {},
  },
  pressable: { base: { justifyContent: 'center', height: 40 }, variants: {} },
}));

export type HandleProps = Omit<PressableProps, 'style'> & {
  style?: CrossedStyle;
};

export const Handle = ({ style, ...props }: HandleProps) => {
  const { hideHandle } = useSheetContext();

  return !hideHandle ? (
    <Pressable {...props} {...rnw(styles.pressable, style)}>
      <Box style={styles.handle} />
    </Pressable>
  ) : null;
};

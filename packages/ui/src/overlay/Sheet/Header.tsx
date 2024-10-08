/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles } from '@crossed/styled';
import { Box, BoxProps } from '../../layout/Box';
import { Trigger } from './Trigger';
import { CloseButton } from '../../other/CloseButton';
import { Adapt } from '../../other/Adapt';

const styles = createStyles(() => ({
  header: {
    base: { width: '100%', flexDirection: 'row', alignItems: 'center' },
    // media: {
    //   xs: { flexDirection: 'column-reverse', alignItems: 'flex-end' },
    //   md: { flexDirection: 'row' },
    // },
  },
}));
export const SheetHeader = ({ children, style, ...props }: BoxProps) => {
  return (
    <Box {...props} style={composeStyles(styles.header, style)}>
      {children}
      <Adapt size="sm">
        <Trigger asChild>
          <CloseButton />
        </Trigger>
      </Adapt>
    </Box>
  );
};
SheetHeader.displayName = 'Sheet.Header';

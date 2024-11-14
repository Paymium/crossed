/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles, inlineStyle } from '@crossed/styled';
import { Box, type BoxProps } from '../../layout/Box';
import { CloseButton } from '../../other/CloseButton';
import { Floating } from '../Floating';
import { useContext } from 'react';
import { localContext } from './context';

const styles = createStyles(() => ({
  header: {
    media: {
      xs: { flexDirection: 'column-reverse', alignItems: 'flex-start' },
      md: { flexDirection: 'row' },
    },
  },
}));

export const ModalHeader = ({ children, style, ...props }: BoxProps) => {
  const { showSheet } = useContext(localContext);

  return (
    <Box {...props} style={composeStyles(styles.header, style)}>
      <Box style={inlineStyle(() => ({ base: { flex: 1 } }))}>{children}</Box>
      {showSheet ? null : (
        <Floating.Trigger asChild>
          <CloseButton
            style={composeStyles(
              children
                ? inlineStyle(() => ({
                    base: { position: 'absolute', right: 0 },
                  }))
                : inlineStyle(() => ({
                    base: { alignSelf: 'flex-end' },
                  }))
            )}
          />
        </Floating.Trigger>
      )}
    </Box>
  );
};
ModalHeader.displayName = 'Modal.Header';

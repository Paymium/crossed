/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles, inlineStyle } from '@crossed/styled';
import { Box, type BoxProps } from '../../layout/Box';
import { CloseButton } from '../../buttons/CloseButton';
import { useContext } from 'react';
import { localContext } from './context';
import { ModalTrigger } from './Trigger';
import { useFloatingContext } from '../Floating';

const styles = createStyles(() => ({
  header: {
    media: {
      xs: { flexDirection: 'column-reverse', alignItems: 'flex-start' },
      md: { flexDirection: 'row' },
    },
  },
}));

export const ModalHeader = ({ children, style, ...props }: BoxProps) => {
  const { showSheet, closable } = useContext(localContext);

  const isClosable =
    typeof closable === 'boolean' ? closable : closable.closeOverlayPress;

  return (
    <Box {...props} style={composeStyles(styles.header, style)}>
      <Box
        style={inlineStyle(() => ({ base: { flexGrow: 1, flexShrink: 1 } }))}
      >
        {children}
      </Box>
      {showSheet || !isClosable ? null : (
        <ModalTrigger asChild>
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
        </ModalTrigger>
      )}
    </Box>
  );
};
ModalHeader.displayName = 'Modal.Header';

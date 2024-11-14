/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles } from '@crossed/styled';
import { Box, BoxProps } from '../../layout/Box';
import { useContext } from 'react';
import { localContext } from './context';

const styles = createStyles(() => ({ body: { base: {} } }));

export const ModalBody = (props: BoxProps) => {
  const { idRef } = useContext(localContext);
  return (
    <Box
      id={`${idRef}-description`}
      {...props}
      {...composeStyles(styles.body).rnw()}
    />
  );
};
ModalBody.displayName = 'Modal.Body';

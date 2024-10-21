/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles } from '@crossed/styled';
import { Box, BoxProps } from '../../layout/Box';

const styles = createStyles(() => ({ body: { base: {} } }));

export const ModalBody = (props: BoxProps) => (
  <Box {...props} {...composeStyles(styles.body).rnw()} />
);
ModalBody.displayName = 'Modal.Body';

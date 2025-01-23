/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles } from '@crossed/styled';
import { Text } from '../../typography';
import { Box } from '../../layout';
import { styles } from './styles';
import { PropsWithChildren, useContext } from 'react';
import { localContext } from './context';

export const Label = ({ children }: PropsWithChildren) => {
  const { sharedValue, disabled } = useContext(localContext);
  return (
    <Box
      style={composeStyles(
        disabled && styles.disabledOff,
        disabled && sharedValue.value && styles.disabledOn
      )}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </Box>
  );
};

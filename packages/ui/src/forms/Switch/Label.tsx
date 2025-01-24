/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles } from '@crossed/styled';
import { Text, TextProps } from '../../typography';
import { styles } from './styles';
import { PropsWithChildren, useContext } from 'react';
import { localContext } from './context';

type LabelProps = PropsWithChildren<TextProps>;

export const SwitchLabel = ({ children, id, ...props }: LabelProps) => {
  const { sharedValue, disabled } = useContext(localContext);
  return typeof children === 'string' ? (
    <Text
      id={id}
      {...props}
      style={composeStyles(
        disabled && styles.disabledOff,
        disabled && sharedValue.value && styles.disabledOn,
        props.style
      )}
    >
      {children}
    </Text>
  ) : (
    children
  );
};

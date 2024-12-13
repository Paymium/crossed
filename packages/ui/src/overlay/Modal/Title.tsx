/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useContext } from 'react';
import { Text, TextProps } from '../../typography/Text';
import { localContext } from './context';

export const ModalTitle = (props: TextProps) => {
  const { idRef } = useContext(localContext);
  return <Text size="h6" weight="h6" id={`${idRef}-title`} {...props} />;
};
ModalTitle.displayName = 'Modal.Title';

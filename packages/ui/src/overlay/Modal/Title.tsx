/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text, TextProps } from '../../typography/Text';

export const ModalTitle = (props: TextProps) => {
  return <Text size="h6" weight="h6" {...props} />;
};
ModalTitle.displayName = 'Modal.Title';

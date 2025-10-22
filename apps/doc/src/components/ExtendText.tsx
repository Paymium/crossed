/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Anchor, Text, XBox } from '@crossed/ui';
import LinkTo from '@storybook/addon-links/react';

export const ExtendText = () => {
  return (
    <XBox>
      <Text>Extend </Text>
      <LinkTo kind={'crossed-ui-typography-text'} story={'docs'}>
        <Anchor children={'Text'} />
      </LinkTo>
    </XBox>
  );
};

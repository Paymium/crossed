/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import '@/style.config';
import { XBox } from '@crossed/ui';
import { createStyles } from '@crossed/styled';

const styles = createStyles(() => ({
  root: {
    base: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      paddingVertical: 15,
    },
  },
}));

export default () => {
  return <XBox {...styles.root.rnw()} />;
};

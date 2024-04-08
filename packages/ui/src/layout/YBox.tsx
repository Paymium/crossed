/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { createStyles } from '@crossed/styled';
import { Box, type BoxProps } from './Box';
import { forwardRef } from 'react';

const useYBox = createStyles(
  () =>
    ({
      root: {
        base: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          maxWidth: '100%',
        },
      },
    } as const)
);

export type YBoxProps = BoxProps;

export const YBox = forwardRef((props: YBoxProps, ref: any) => {
  return <Box ref={ref} {...props} {...useYBox.root.rnw(props)} />;
});

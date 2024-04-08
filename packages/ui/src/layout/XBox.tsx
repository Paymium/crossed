/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';
import { Box, type BoxProps } from './Box';
import { forwardRef } from 'react';

export const useXBox = createStyles(
  () =>
    ({
      root: {
        base: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%',
          flexBasis: 'auto',
        },
      },
    } as const)
);

export type XBoxProps = BoxProps;

export const XBox = forwardRef(({ center, ...props }: XBoxProps, ref: any) => {
  return (
    <Box
      ref={ref}
      {...props}
      {...useXBox.root.rnw({ ...props, variants: { center } })}
    />
  );
});

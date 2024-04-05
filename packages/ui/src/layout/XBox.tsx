/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { createStyles, type ExtractForProps } from '@crossed/styled';
import { Box, type BoxProps } from './Box';

export const useXBox = createStyles(() => ({
  root: {
    base: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
      flexBasis: 'auto',
    },
    variants: {
      center: { true: { base: { alignItems: 'center' } } },
    },
  },
}));

type Variant = ExtractForProps<typeof useXBox.root>;

export type XBoxProps = BoxProps & Variant['variants'];

export const XBox = ({ center, className, style, ...props }: XBoxProps) => {
  console.log(style)
  return (
    <Box
      {...props}
      {...useXBox.root.style({ className, style, variants: { center } })}
    />
  );
};

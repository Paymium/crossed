/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles, type ExtractForProps } from '@crossed/styled';
import { Box, type BoxProps } from './Box';
import { forwardRef } from 'react';
import type { GetProps } from '@crossed/core';

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
        variants: {
          justifyContent: {
            start: { base: { justifyContent: 'flex-start' } },
            end: { base: { justifyContent: 'flex-end' } },
            between: { base: { justifyContent: 'space-between' } },
            around: { base: { justifyContent: 'space-around' } },
            evenly: { base: { justifyContent: 'space-evenly' } },
          },
          alignItems: {
            'center': { base: { alignItems: 'center' } },
            'baseline': { base: { alignItems: 'baseline' } },
            'flex-end': { base: { alignItems: 'flex-end' } },
            'flex-start': { base: { alignItems: 'flex-start' } },
            'stretch': { base: { alignItems: 'stretch' } },
          },
        },
      },
    } as const)
);

type Variant = ExtractForProps<typeof useXBox.root>;

type XBoxPropsTmp = BoxProps & Variant['variants'];

export const XBox = forwardRef(
  ({ justifyContent, alignItems, ...props }: XBoxPropsTmp, ref: any) => {
    return (
      <Box
        ref={ref}
        {...props}
        {...useXBox.root.rnw({
          ...props,
          variants: { justifyContent, alignItems },
        })}
      />
    );
  }
);

export type XBoxProps = GetProps<typeof XBox>;

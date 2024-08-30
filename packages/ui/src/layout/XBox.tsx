/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles } from '@crossed/styled';
import { Box, type BoxProps } from './Box';
import { forwardRef } from 'react';
import type { GetProps } from '@crossed/core';
import { justifyContentStyle } from '../styles/justifyContent';
import { alignItemsStyle } from '../styles/alignItems';

export const useXBox = createStyles(
  () =>
    ({
      root: {
        base: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          flexBasis: 'auto',
        },
      },
    }) as const
);

type XBoxPropsTmp = BoxProps & {
  justifyContent?: keyof typeof justifyContentStyle;
  alignItems?: keyof typeof alignItemsStyle;
};

export const XBox = forwardRef(
  ({ justifyContent, alignItems, style, ...props }: XBoxPropsTmp, ref: any) => {
    return (
      <Box
        ref={ref}
        {...props}
        style={composeStyles(
          useXBox.root,
          justifyContentStyle[justifyContent],
          alignItemsStyle[alignItems],
          style
        )}
      />
    );
  }
);

export type XBoxProps = GetProps<typeof XBox>;

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { styled } from '@crossed/styled';
import type { GetProps } from '@crossed/core';
import { Box } from './Box';

export const XBox = styled(Box, () => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  width: '100%',
  flexBasis: 'auto',
  variants: {
    center: { true: { alignItems: 'center' } },
  },
}));

export type XBoxProps = GetProps<typeof XBox>;

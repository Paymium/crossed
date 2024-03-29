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

export const YBox = styled(Box, () => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  maxWidth: '100%',
}));

export type YBoxProps = GetProps<typeof YBox>;

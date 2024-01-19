/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import '@/types/unistyles';
import { XBox } from '@crossed/ui';
import { styled } from '@crossed/styled';

const Container = styled(XBox, {
  flex: 1,
  width: '100%',
  justifyContent: 'center',
  paddingVertical: 15,
});

export default Container;

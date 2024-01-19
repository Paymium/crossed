/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import React, { memo } from 'react';
import { RemoveScroll as RS } from 'react-remove-scroll';

export type RemoveScrollProps = React.ComponentProps<typeof RS>;

export const RemoveScroll = memo((props?: RemoveScrollProps) => {
  if (!props?.children) return null;
  return <RS {...props} />;
});

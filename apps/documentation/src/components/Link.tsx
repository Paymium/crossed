/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { Anchor, AnchorProps } from '@crossed/ui';
import LinkNext, { LinkProps as LinkNextProps } from 'next/link';
import { forwardRef } from 'react';

export const Link = forwardRef<any, LinkProps & { target?: '_blank' }>(
  function Link({ children, ...props }, ref) {
    return (
      <Anchor ref={ref} {...(props as any)} asChild>
        <LinkNext {...(props as any)}>{children}</LinkNext>
      </Anchor>
    );
  }
);

export type LinkProps = AnchorProps & LinkNextProps;

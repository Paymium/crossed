/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { Anchor, AnchorProps } from '@crossed/ui';
import LinkNext, { LinkProps as LinkNextProps } from 'next/link';

export const Link = function Link({
  children,
  ...props
}: LinkProps & { target?: '_blank' }) {
  return (
    <Anchor {...(props as any)} asChild>
      <LinkNext {...(props as any)}>{children}</LinkNext>
    </Anchor>
  );
};

export type LinkProps = AnchorProps & LinkNextProps;

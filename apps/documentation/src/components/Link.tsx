'use client';

import { Anchor, AnchorProps } from '@crossed/ui';
import LinkNext, { LinkProps as LinkNextProps } from 'next/link';

export const Link = (props: LinkProps) => {
  const {
    href,
    as,
    replace,
    scroll,
    shallow,
    passHref: _passHref,
    prefetch,
    locale,
    legacyBehavior: _legacyBehavior,
    onMouseEnter,
    onTouchStart,
    onClick,
    ...other
  } = props;
  return (
    <LinkNext
      {...{
        href,
        as,
        replace,
        scroll,
        shallow,
        passHref: true,
        prefetch,
        locale,
        legacyBehavior: true,
        onMouseEnter,
        onTouchStart,
        onClick,
      }}
    >
      <Anchor {...(other as any)} href={href} />
    </LinkNext>
  );
};

export type LinkProps = AnchorProps & LinkNextProps;

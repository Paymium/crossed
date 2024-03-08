/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import '@/style.config';
import { withStyle } from '@crossed/styled';
import { ChangeTheme } from './ChangeTheme';
import { Box } from '@crossed/ui';
import { Logo } from './Logo';
import { GetProps } from '@crossed/core';
import { usePathname } from 'next/navigation';
import { ChangeLang } from './ChangeLang';
import { forwardRef, memo } from 'react';
import LinkNext from 'next/link';

const navLinks: { href: string; title: string; activeFor: RegExp }[] = [
  {
    href: '/styled/introduction',
    activeFor: /\/styled/g,
    title: 'styled()',
  },
  {
    href: '/primitive/introduction',
    activeFor: /\/primitive/g,
    title: 'primitive',
  },
  {
    href: '/ui/introduction',
    activeFor: /\/ui/g,
    title: 'ui',
  },
  {
    href: '/router/introduction',
    activeFor: /\/router/g,
    title: 'router',
  },
];

export const NavBar = memo(() => {
  const pathname = usePathname();
  return (
    <Nav role="navigation">
      <El>
        <LinkLogo href="/" size="lg">
          <Logo />
          Crossed
        </LinkLogo>
      </El>
      <El>
        {navLinks.map(({ href, title, activeFor }) => (
          <LinkNav
            href={href}
            key={href}
            active={Boolean(pathname.match(activeFor))}
          >
            {title}
          </LinkNav>
        ))}
        <ChangeLang />
        <ChangeTheme />
      </El>
    </Nav>
  );
});

const LinkNav = withStyle<GetProps<typeof LinkNext>>(
  forwardRef(({ style, active: _a, ...props }: any, ref) => (
    <LinkNext {...props} ref={ref} />
  )),
  ({ theme: t }) => ({
    'base': {
      fontFamily: t.fontFamily,
      color: t.utils.shadeColor(t.colors.default, -90),
      transitionProperty: 'all',
      transitionDuration: '170ms',
    },
    'variants': {
      active: {
        true: { base: { color: t.colors.default } },
        false: {},
      },
    },
    ':active': {
      color: t.colors.default,
    },
    ':hover': {
      textDecorationLine: 'none',
      color: t.colors.default,
    },
  }),
  { native: false }
  // { name: 'LinkNav' }
);

const LinkLogo = withStyle(LinkNav, ({ theme }) => ({
  base: { alignItems: 'center', gap: theme.space.sm, display: 'flex' },
}));

const Nav = withStyle(
  (props) => <Box {...props} />,
  ({ theme: t }) => ({
    base: {
      backgroundColor: t.colors.backgroundStrong,
      padding: 15,
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: t.colors.neutral,
      alignItems: 'center',
    },
  })
);

const El = withStyle(Box, ({ theme: t }) => ({
  base: {
    alignItems: 'center',
    gap: t.space.sm,
    display: 'flex',
    flexDirection: 'row',
  },
}));

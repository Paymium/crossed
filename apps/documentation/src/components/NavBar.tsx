/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { Registry } from '@crossed/styled/registry';
import theme from '../../style.config';

Registry.setTheme(theme);

import '@/types/unistyles';
import { withStyle } from '@crossed/styled';
import { ChangeTheme } from './ChangeTheme';
import { Box, XBox } from '@crossed/ui';
import { Logo } from './Logo';
import { withDefaultProps } from '@crossed/core';
import { usePathname } from 'next/navigation';
import { ChangeLang } from './ChangeLang';
import { memo } from 'react';
import { Link } from './Link';
import LinkNext, { LinkProps as LinkNextProps } from 'next/link';

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

const LinkNav = withDefaultProps(
  withStyle(
    LinkNext,
    (t) => ({
      'base': {
        color: t.colors.default,
        // 'color': t.utils.shadeColor(
        //   t.colors.default,
        //   UnistylesRuntime.themeName === 'dark' ? -90 : 90
        // ),
        variants: {
          active: { true: { color: t.colors.default }, false: {} },
        },
      },
      ':hover': {
        textDecorationLine: 'none',
        color: t.colors.default,
      },
      ':active': {
        color: t.colors.default,
      },
    }),
    { native: false }
    // { name: 'LinkNav' }
  ),
  { size: 'md' }
);

const LinkLogo = withStyle(LinkNav, (theme) => ({
  base: { alignItems: 'center', gap: theme.space.sm, display: 'flex' },
}));

const Nav = withStyle(Box, (t) => ({
  base: {
    backgroundColor: t.colors.backgroundStrong,
    padding: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: t.colors.neutral,
    alignItems: 'center',
  },
}));

const El = withStyle(Box, (t) => ({
  base: {
    alignItems: 'center',
    gap: t.space.sm,
    display: 'flex',
    flexDirection: 'row',
  },
}));

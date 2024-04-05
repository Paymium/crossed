/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import '@/style.config';
import { ChangeTheme } from './ChangeTheme';
import { Box, XBox } from '@crossed/ui';
import { Logo } from './Logo';
import { usePathname } from 'next/navigation';
import { ChangeLang } from './ChangeLang';
import { forwardRef, memo } from 'react';
import LinkNext from 'next/link';
import { createStyles } from '@crossed/styled';

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

const useStyles = createStyles((t) => ({
  linkNav: {
    'base': {
      fontFamily: t.fontFamily,
      color: t.colors.default,
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
  },
  linkLogo: {
    base: { alignItems: 'center', gap: t.space.sm, display: 'flex' },
  },
  nav: {
    base: {
      backgroundColor: t.colors.backgroundStrong,
      padding: t.space.lg,
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: t.colors.neutral,
      alignItems: 'center',
    },
  },
  el: {
    base: {
      alignItems: 'center',
      gap: t.space.sm,
      display: 'flex',
      flexDirection: 'row',
    },
  },
}));

const LinkNav = forwardRef(({ style, active: _a, ...props }: any, ref) => {
  return (
    <LinkNext
      {...props}
      ref={ref}
      {...useStyles.linkNav.className({ style, active: _a })}
    />
  );
});

const LinkLogo = forwardRef((props: any, ref) => {
  return <LinkNav {...props} ref={ref} {...useStyles.linkLogo.style(props)} />;
});

const Nav = forwardRef((props: any, ref) => {
  return <XBox {...props} ref={ref} {...useStyles.nav.style(props)} />;
});

const El = forwardRef((props: any, ref) => {
  return <Box {...props} ref={ref} {...useStyles.el.style(props)} />;
});

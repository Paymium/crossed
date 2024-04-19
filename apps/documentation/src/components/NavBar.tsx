/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import '@/style.config';
import { ChangeTheme } from './ChangeTheme';
import { Box, Text, XBox } from '@crossed/ui';
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
          <Logo size={32} />
          <Text size="xl" weight="semibold">
            Crossed
          </Text>
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
      fontFamily: t.font.family,
      color: t.font.color,
      transitionProperty: 'all',
      transitionDuration: '170ms',
    },
    'variants': {
      active: {
        true: { base: { color: t.font.color } },
        false: {},
      },
    },
    ':active': {
      color: t.font.color,
    },
    ':hover': {
      textDecorationLine: 'none',
      color: t.font.color,
    },
  },
  linkLogo: {
    base: { alignItems: 'center', gap: t.space.xxs, display: 'flex' },
  },
  nav: {
    base: {
      backgroundColor: t.colors.neutral['100'],
      padding: t.space.xxs,
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: t.colors.neutral.hight,
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
  return <LinkNav {...props} ref={ref} {...useStyles.linkLogo.rnw(props)} />;
});

const Nav = forwardRef((props: any, ref) => {
  return <XBox {...props} ref={ref} {...useStyles.nav.rnw(props)} />;
});

const El = forwardRef((props: any, ref) => {
  return <Box {...props} ref={ref} {...useStyles.el.rnw(props)} />;
});

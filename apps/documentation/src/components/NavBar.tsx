/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import '@/types/unistyles';
import {
  UnistylesRuntime,
  createStyleSheet,
  styled,
  useStyles,
} from '@crossed/styled';
import { ChangeTheme } from './ChangeTheme';
import { XBox } from '@crossed/ui';
import { Logo } from './Logo';
import { withDefaultProps } from '@crossed/core';
import { usePathname } from 'next/navigation';
import { ChangeLang } from './ChangeLang';
import { memo } from 'react';
import { Link } from './Link';

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
  const { styles } = useStyles(styleSheet);
  const pathname = usePathname();
  return (
    <Nav role="navigation">
      <XBox style={styles.element}>
        <LinkNav href="/" style={styles.logo} size="lg">
          <Logo />
          Crossed
        </LinkNav>
      </XBox>
      <XBox style={styles.element}>
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
      </XBox>
    </Nav>
  );
});

const LinkNav = withDefaultProps(
  styled(
    Link,
    (t) => ({
      'color': t.utils.shadeColor(
        t.colors.default,
        UnistylesRuntime.themeName === 'dark' ? -90 : 90
      ),
      'hover:': {
        textDecorationLine: 'none',
        color: t.colors.default,
      },
      'active:': {
        color: t.colors.default,
      },
      // 'variants': {
      //   active: { true: { color: t.colors.default }, false: {} },
      // },
    }),
    { name: 'LinkNav' }
  ),
  { size: 'md' }
);

const Nav = styled(XBox, (t) => ({
  backgroundColor: t.colors.backgroundStrong,
  padding: 15,
  justifyContent: 'space-between',
  borderBottomWidth: 1,
  borderColor: t.colors.neutral,
  alignItems: 'center',
}));

const styleSheet = createStyleSheet((theme) => ({
  element: {
    width: 'auto',
    alignItems: 'center',
    gap: theme.space.md,
  },
  logo: {
    alignItems: 'center',
    gap: theme.space.sm,
    display: 'flex',
  },
}));

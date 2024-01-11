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
import { Link } from './Link';
import { Logo } from './Logo';
import { withDefaultProps } from '@crossed/core';
import { usePathname } from 'next/navigation';
import { ChangeLang } from './ChangeLang';

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

export const NavBar = () => {
  const { styles } = useStyles(styleSheet);
  const pathname = usePathname();
  return (
    <XBox style={styles.nav} role="navigation">
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
            hovered={Boolean(pathname.match(activeFor))}
          >
            {title}
          </LinkNav>
        ))}
        <ChangeLang />
        <ChangeTheme />
      </XBox>
    </XBox>
  );
};

const LinkNav = withDefaultProps(
  styled(
    Link,
    (t) => ({
      'color': t.utils.shadeColor(
        t.colors.textColor,
        UnistylesRuntime.themeName === 'dark' ? -90 : 90
      ),
      'hover:': {
        textDecorationLine: 'none',
        color: t.colors.textColor,
      },
    })
  ),
  { size: 'md' }
);

const styleSheet = createStyleSheet((theme) => ({
  nav: {
    backgroundColor: theme.colors.backgroundStrong,
    padding: 15,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    variants: {
      brand: {
        0: {},
      } as unknown as { 0: {} },
    },
  },
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

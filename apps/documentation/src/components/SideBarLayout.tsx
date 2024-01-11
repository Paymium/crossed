'use client';
import '@/types/unistyles';
import { MenuList, XBox, YBox } from '@crossed/ui';
import { PropsWithChildren } from 'react';
import { createStyleSheet, mq, styled, useStyles } from '@crossed/styled';
import { usePathname, useRouter } from 'next/navigation';
import { withDefaultProps } from '@crossed/core';
import { useTranslation } from 'react-i18next';

const Menu = withDefaultProps(
  styled(MenuList, () => ({
    paddingHorizontal: 20,
    alignSelf: 'baseline',
    display: { xs: 'none', sm: 'none', md: 'flex' },
  })),
  { space: 'xs', size: 'xs' }
);
const Container = styled(XBox, {
  width: '100%',
  justifyContent: 'center',
  paddingVertical: 15,
  minHeight: '95%',
  maxWidth: {
    [mq.only.width(undefined, 'md')]: '100%',
    [mq.only.width('md', 'lg')]: 768,
    [mq.only.width('lg', 'xl')]: 900,
    [mq.only.width('xl')]: 1200,
  },
});
const Center = styled(YBox, (t) => ({
  flex: 1,
  borderLeftWidth: 1,
  borderColor: t.colors.borderColor,
  minHeight: '100%',
}));

const Li = withDefaultProps(
  styled(YBox, (t) => ({
    alignItems: 'stretch',
    variants: {
      label: {
        true: {
          marginTop: t.space.xl,
          borderBottomWidth: 1,
          borderColor: t.colors.borderColor,
        },
        false: {},
      },
    },
  })),
  { role: 'listitem' }
);

type Nav = { href?: string; title: string };

export function SideBarLayout({
  children,
  menus,
}: PropsWithChildren<{ menus: Nav[] }>) {
  const { styles } = useStyles(styleSheet);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Container>
      <Menu style={{ position: 'sticky', top: '75px' } as any}>
        {menus.map(({ href, title }) => {
          return (
            <Li
              key={href || title}
              label={Boolean(!href).toString() as 'true' | 'false'}
            >
              {href ? (
                <MenuList.Item
                  role="link"
                  href={`/crossed${href}`}
                  hovered={href === pathname}
                  onPress={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.push(href);
                  }}
                  style={styles.leftItem}
                >
                  <MenuList.Title
                    weight={href === pathname ? 'semibold' : undefined}
                  >
                    {t(title)}
                  </MenuList.Title>
                </MenuList.Item>
              ) : (
                <MenuList.Label textAlign="right" weight="semibold">
                  {t(title)}
                </MenuList.Label>
              )}
            </Li>
          );
        })}
      </Menu>

      <Center>{children}</Center>
    </Container>
  );
}

const styleSheet = createStyleSheet((t) => ({
  leftItem: { justifyContent: 'flex-end' },
}));

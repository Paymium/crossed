/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import '@/types/unistyles';
import { MenuList, XBox, YBox } from '@crossed/ui';
import { PropsWithChildren } from 'react';
import { withStyle } from '@crossed/styled';
import mq from '@crossed/styled/mq';
import { usePathname, useRouter } from 'next/navigation';
import { withDefaultProps } from '@crossed/core';
import { useTranslation } from 'react-i18next';

const Menu = withDefaultProps(
  withStyle(MenuList, () => ({
    base: {
      paddingHorizontal: 20,
      alignSelf: 'baseline',
      display: { xs: 'none', sm: 'none', md: 'flex' },
    },
  })),
  { space: 'xs', size: 'xs' }
);
const Container = withStyle(XBox, {
  base: {
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 15,
    minHeight: '95%',
    [mq.width(undefined, 'md')]: { maxWidth: '100%' },
    [mq.width('md', 'lg')]: { maxWidth: 768 },
    [mq.width('lg', 'xl')]: { maxWidth: 900 },
    [mq.width('xl')]: { maxWidth: 1200 },
  },
});
const Center = withStyle(YBox, (t) => ({
  base: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: t.colors.neutral,
    minHeight: '100%',
  },
}));

const Li = withDefaultProps(
  withStyle(YBox, (t) => ({
    base: {
      alignItems: 'stretch',
      variants: {
        label: {
          true: {
            marginTop: t.space.xl,
            borderBottomWidth: 1,
            borderColor: t.colors.neutral,
          },
          false: {},
        },
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
                  style={{ justifyContent: 'flex-end' }}
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

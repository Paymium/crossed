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
import { usePathname, useRouter } from 'next/navigation';
import { withDefaultProps } from '@crossed/core';
import { useTranslation } from 'react-i18next';

const Menu = withStyle(
  withDefaultProps(MenuList, { space: 'xs', size: 'xs' }),
  () => ({
    base: {
      paddingHorizontal: 20,
      alignSelf: 'baseline',
      display: 'flex',
    },
    media: {
      md: { display: 'none' },
    },
  })
);
const Container = withStyle(XBox, () => ({
  base: {
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 15,
    minHeight: '95%',
  },
  media: {
    xs: { maxWidth: '100%' },
    md: { maxWidth: 768 },
    lg: { maxWidth: 900 },
    xl: { maxWidth: 1200 },
  },
}));
const Center = withStyle(YBox, ({ theme: t }) => ({
  base: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: t.colors.neutral,
    minHeight: '100%',
  },
}));

const Li = withStyle(
  withDefaultProps(YBox, { role: 'listitem' }),
  ({ theme: t }) => ({
    base: {
      alignItems: 'stretch',
    },
    variants: {
      label: {
        true: {
          base: {
            marginTop: t.space.xl,
            borderBottomWidth: 1,
            borderColor: t.colors.neutral,
          },
        },
        false: {},
      },
    },
  })
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
                  // hovered={href === pathname}
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

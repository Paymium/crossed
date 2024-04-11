/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import '@/style.config';
import { MenuList, XBox, YBox, YBoxProps } from '@crossed/ui';
import { PropsWithChildren } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { createStyles } from '@crossed/styled';
import { menuStyle } from './menuSide.style';

const styles = createStyles(
  (t) =>
    ({
      root: {
        base: {
          paddingHorizontal: 20,
          alignSelf: 'baseline',
          display: 'none',
        },
        media: {
          md: { display: 'flex' },
        },
      },
      container: {
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
      },
      center: {
        base: {
          flex: 1,
          borderLeftWidth: 0,
          borderColor: t.colors.neutral.default,
          minHeight: '100%',
        },
        media: {
          md: { borderLeftWidth: 1 },
        },
      },
      li: {
        base: {
          alignItems: 'stretch',
        },
        variants: {
          label: {
            true: {
              base: {
                marginTop: t.space.xl,
                borderBottomWidth: 1,
                borderStyle: 'solid',
                borderColor: t.colors.neutral.default,
              },
            },
            false: {},
          },
        },
      },
      item: { base: { justifyContent: 'flex-end' } },
    } as const)
);

const Li = ({ label, ...props }: YBoxProps & { label?: boolean }) => (
  <YBox
    role="listitem"
    {...props}
    {...styles.li.rnw({ variants: { label } })}
  />
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
    <XBox {...styles.container.rnw()}>
      <MenuList
        space="xs"
        style={[styles.root.rnw().style, { position: 'sticky', top: '75px' }]}
      >
        {menus.map(({ href, title }) => {
          return (
            <Li key={href || title} label={!href}>
              {href ? (
                <MenuList.Item
                  role="link"
                  href={`/crossed${href}`}
                  onPress={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.push(href);
                  }}
                  style={[
                    menuStyle.item.rnw({
                      hover: href === pathname,
                    }).style,
                    styles.item.rnw().style,
                  ]}
                >
                  <MenuList.Title
                    {...menuStyle.itemText.rnw({ hover: href === pathname })}
                    weight={href === pathname ? 'semibold' : undefined}
                  >
                    {t(title)}
                  </MenuList.Title>
                </MenuList.Item>
              ) : (
                <MenuList.Label
                  hover={false}
                  textAlign="right"
                  weight="semibold"
                >
                  {t(title)}
                </MenuList.Label>
              )}
            </Li>
          );
        })}
      </MenuList>

      <YBox {...styles.center.rnw()}>{children}</YBox>
    </XBox>
  );
}

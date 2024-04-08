/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { MenuList, XBox, YBox } from '@crossed/ui';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { createStyles } from '@crossed/styled';

const styles = createStyles(
  (t) =>
    ({
      container: { base: { minHeight: '100%' } },
      center: {
        base: {
          flex: 1,
          width: '100%',
          borderColor: t.colors.neutral,
        },
        variants: {
          bordered: {
            true: {
              media: {
                xl: { borderRightWidth: 1 },
              },
            },
            false: { base: { borderRightWidth: 0 } },
          },
        },
        media: {
          xs: { paddingHorizontal: t.space.md },
          lg: { paddingHorizontal: t.space[100] },
        },
      },
      menuList: {
        base: {
          paddingHorizontal: 20,
          alignSelf: 'baseline',
          display: 'none',
        },
        media: {
          xl: { display: 'flex' },
        },
      },
      menuLabel: {
        base: { fontSize: t.fontSize.lg },
      },
      li: { base: { alignItems: 'stretch' } },
    } as const)
);

type Nav = {
  href: string;
  title: string;
};

export const TOCLayout = ({
  children,
  links = [],
}: PropsWithChildren<{ links?: Nav[] }>) => {
  const searchParams = useSearchParams();
  const [hash, setHash] = useState(undefined);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    window.location.hash !== hash && setHash(window.location.hash);
  }, [searchParams]);

  return useMemo(() => {
    return (
      <XBox {...styles.container.rnw()}>
        <YBox
          {...styles.center.rnw({
            variants: {
              bordered: (links.length !== 0).toString() as 'true' | 'false',
            },
          })}
        >
          {children}
        </YBox>

        <MenuList
          {...styles.menuList.rnw({
            style: { position: 'sticky', top: '75px' },
          })}
          space="xs"
          size="xs"
        >
          {links.length > 0 && (
            <MenuList.Label {...styles.menuLabel.rnw()} weight="bold">
              {t('On this page')}
            </MenuList.Label>
          )}
          {links.map(({ href, title }) => {
            return (
              <YBox role="listitem" key={href || title} {...styles.li.rnw()}>
                <MenuList.Item
                  variant="ghost"
                  size="xs"
                  role="link"
                  href={`${pathname}${href}`}
                  // hover={href === hash}
                  onPress={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.push(href);
                  }}
                  style={{ justifyContent: 'flex-start' }}
                >
                  <MenuList.Title
                    weight={href === hash ? 'semibold' : undefined}
                  >
                    {t(title)}
                  </MenuList.Title>
                </MenuList.Item>
              </YBox>
            );
          })}
        </MenuList>
      </XBox>
    );
  }, [children, links, hash, t]);
};

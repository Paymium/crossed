/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import '@/style.config';
import { Box, MenuList, XBox, YBox } from '@crossed/ui';
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { createStyles } from '@crossed/styled';
import { menuStyle } from './menuSide.style';
import { useUncontrolled } from '@crossed/core';

const styles = createStyles(
  (t) =>
    ({
      container: { base: { minHeight: '100%', flex: 1, flexDirection: 'row' } },
      center: {
        base: {
          flex: 1,
          borderColor: t.colors.neutral.bright,
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: t.colors.neutral.low,
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
      },
      menuList: {
        base: {
          paddingHorizontal: t.space.sm,
          alignSelf: 'baseline',
          height: '100%',
          borderWidth: 1,
          borderTopWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: 0,
          borderLeftWidth: 1,
          borderColor: t.colors.neutral.bright,
          borderStyle: 'solid',
        },
        media: {
          xs: { display: 'none' },
          xl: { display: 'flex' },
        },
      },
      menuLabel: {
        base: { fontSize: t.font.fontSize.md },
      },
      li: { base: { alignItems: 'stretch' } },
      position: {
        base: {
          marginHorizontal: 'auto',
          paddingVertical: t.space.xs,
          paddingHorizontal: t.space.xs,
        },
        media: {
          xs: { width: '100%' },
          xl: { maxWidth: 920 },
        },
      },
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
  const { t } = useTranslation();

  useEffect(() => {
    window.location.hash !== hash && setHash(window.location.hash);
  }, [searchParams]);

  return useMemo(() => {
    return (
      <XBox {...styles.container.rnw()}>
        <YBox {...styles.center.rnw()}>
          <Box {...styles.position.rnw()}>{children}</Box>
        </YBox>

        {links.length > 0 && (
          <MenuList {...styles.menuList.rnw()}>
            <MenuList.Label {...styles.menuLabel.rnw()} weight="bold">
              {t('On this page')}
            </MenuList.Label>
            {links.map(({ href, title }) => {
              return (
                <YBox role="listitem" key={href || title} {...styles.li.rnw()}>
                  <Item hash={hash} href={href} title={title} />
                </YBox>
              );
            })}
          </MenuList>
        )}
      </XBox>
    );
  }, [children, links, hash, t]);
};

const Item = ({
  hash,
  href,
  title,
}: {
  hash: string;
  href: string;
  title: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const [, setTransition] = useTransition();
  const [hover, setHover] = useUncontrolled({
    defaultValue: false,
  });
  const onHoverIn = useCallback(() => {
    setTransition(() => {
      setHover(true);
    });
  }, [setHover]);
  const onHoverOut = useCallback(() => {
    setTransition(() => {
      setHover(false);
    });
  }, [setHover]);
  return (
    <MenuList.Item
      onHoverOut={onHoverOut}
      onHoverIn={onHoverIn}
      {...menuStyle.item.rnw()}
      hover={href === hash || hover}
      role="link"
      href={`${pathname}${href}`}
      onPress={(e) => {
        e.stopPropagation();
        e.preventDefault();
        router.push(href);
      }}
    >
      <MenuList.Title
        {...menuStyle.itemText.rnw()}
        weight={href === hash ? 'semibold' : undefined}
      >
        {t(title)}
      </MenuList.Title>
    </MenuList.Item>
  );
};

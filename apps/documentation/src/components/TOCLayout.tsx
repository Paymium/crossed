/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import '@/style.config';
import { MenuList, XBox, YBox } from '@crossed/ui';
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
      container: { base: { minHeight: '100%' } },
      center: {
        base: {
          flex: 1,
          width: '100%',
          borderColor: t.colors.neutral.default,
          flexDirection: 'column',
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
          height: 'auto',
          borderLeftWidth: 1,
          borderColor: t.colors.neutral.default,
          borderStyle: 'solid',
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
  const { t } = useTranslation();

  useEffect(() => {
    window.location.hash !== hash && setHash(window.location.hash);
  }, [searchParams]);

  return useMemo(() => {
    return (
      <XBox {...styles.container.rnw()}>
        <YBox {...styles.center.rnw()}>{children}</YBox>

        <MenuList
          style={[
            styles.menuList.rnw().style,
            { position: 'sticky', top: '75px' },
          ]}
          space="xs"
        >
          {links.length > 0 && (
            <MenuList.Label {...styles.menuLabel.rnw()} weight="bold">
              {t('On this page')}
            </MenuList.Label>
          )}
          {links.map(({ href, title }) => {
            return (
              <YBox role="listitem" key={href || title} {...styles.li.rnw()}>
                <Item hash={hash} href={href} title={title} />
              </YBox>
            );
          })}
        </MenuList>
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
      {...menuStyle.item.rnw({ hover: href === hash || hover })}
      role="link"
      href={`${pathname}${href}`}
      onPress={(e) => {
        e.stopPropagation();
        e.preventDefault();
        router.push(href);
      }}
    >
      <MenuList.Title
        {...menuStyle.itemText.rnw({ hover: href === hash || hover })}
        weight={href === hash ? 'semibold' : undefined}
      >
        {t(title)}
      </MenuList.Title>
    </MenuList.Item>
  );
};

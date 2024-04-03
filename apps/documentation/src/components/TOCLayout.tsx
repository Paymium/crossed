/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { MenuList, XBox, YBox } from '@crossed/ui';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { withStyle } from '@crossed/styled';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { withDefaultProps } from '@crossed/core';
import { useTranslation } from 'react-i18next';

const Container = withStyle(XBox, () => ({ base: { minHeight: '100%' } }));

const Center = withStyle(YBox, (t) => ({
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
}));

const Menu = withStyle(
  withDefaultProps(MenuList, { space: 'xs', size: 'xs' }),
  () => ({
    base: {
      paddingHorizontal: 20,
      alignSelf: 'baseline',
      display: 'none',
    },
    media: {
      xl: { display: 'flex' },
    },
  })
);

const Label = withStyle(MenuList.Label, (t) => ({
  base: { fontSize: t.fontSize.lg },
}));

const Li = withStyle(withDefaultProps(YBox, { role: 'listitem' }), () => ({
  base: { alignItems: 'stretch' },
}));

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
      <Container>
        <Center bordered={(links.length !== 0).toString() as 'true' | 'false'}>
          {children}
        </Center>

        <Menu style={{ position: 'sticky', top: '75px' } as any}>
          {links.length > 0 && <Label weight="bold">{t('On this page')}</Label>}
          {links.map(({ href, title }) => {
            return (
              <Li key={href || title}>
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
              </Li>
            );
          })}
        </Menu>
      </Container>
    );
  }, [children, links, hash, t]);
};

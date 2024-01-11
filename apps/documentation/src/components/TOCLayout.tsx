'use client';
import { MenuList, XBox, YBox } from '@crossed/ui';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { createStyleSheet, mq, styled, useStyles } from '@crossed/styled';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { withDefaultProps } from '@crossed/core';
import { Trans, useTranslation } from 'react-i18next';

const Container = styled(XBox, { minHeight: '100%' });

const Center = styled(YBox, (t) => ({
  flex: 1,
  width: '100%',
  borderColor: t.colors.borderColor,
  paddingHorizontal: {
    [mq.only.width('xs', 'lg')]: t.space.md,
    [mq.only.width('lg')]: t.space[100],
  },
  variants: {
    bordered: {
      true: {
        borderRightWidth: {
          [mq.only.width(undefined, 'xl')]: 0,
          [mq.only.width('xl')]: 1,
        },
      },
      false: { borderRightWidth: 0 },
    },
  },
}));

const Menu = withDefaultProps(
  styled(MenuList, (t) => ({
    paddingHorizontal: 20,
    alignSelf: 'baseline',
    display: {
      [mq.only.width(undefined, 'xl')]: 'none',
      [mq.only.width('xl')]: 'flex',
    },
  })),
  { space: 'xs', size: 'xs' }
);

const Label = styled(MenuList.Label, (t) => ({ fontSize: t.fontSize.lg }));

const Li = withDefaultProps(styled(YBox, { alignItems: 'stretch' }), {
  role: 'listitem',
});

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
  const { styles } = useStyles(styleSheet);
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
                  role="link"
                  href={`${pathname}${href}`}
                  hovered={href === hash}
                  onPress={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.push(href);
                  }}
                  style={styles.rightItem}
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

const styleSheet = createStyleSheet((t) => ({
  rightItem: { justifyContent: 'flex-start' },
}));

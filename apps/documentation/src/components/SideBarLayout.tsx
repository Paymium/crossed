/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import '@/style.config';
import {
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  MenuList,
  Text,
  XBox,
  YBox,
  YBoxProps,
} from '@crossed/ui';
import { PropsWithChildren, useCallback, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { composeStyles, createStyles } from '@crossed/styled';
import { menuStyle } from './menuSide.style';
import { useUncontrolled } from '@crossed/core';
import { ScrollView } from './ScrollView';

const styles = createStyles(
  (t) =>
    ({
      root: {
        base: {
          alignSelf: 'flex-start',
          flexGrow: 0,
          flexShrink: 0,
          height: '100%',
          width: 170,
          backgroundColor: t.colors.background.primary,
        },
        media: { xs: { display: 'none' }, md: { display: 'flex' } },
      },
      container: { base: { height: '100%' } },
      center: {
        base: {
          flex: 1,
          borderLeftWidth: 0,
          borderColor: t.colors.border.secondary,
          minHeight: '100%',
          flexGrow: 1,
          flexShrink: 1,
        },
        media: { md: { borderLeftWidth: 1 } },
      },
      li: { base: { alignItems: 'stretch' } },
      item: { base: { justifyContent: 'flex-end' } },
      accordionTrigger: { base: { padding: t.space.xxs } },
    }) as const
);

const Li = ({ label, style, ...props }: YBoxProps & { label?: boolean }) => (
  <YBox role="listitem" {...props} style={composeStyles(styles.li, style)} />
);

type Nav =
  | { href: string; title: string; menus?: never }
  | { title: string; menus?: never; href?: never }
  | {
      title: string;
      menus: { href: string; title: string; menus?: never }[];
      href?: never;
    };

export function SideBarLayout({
  children,
  menus,
}: PropsWithChildren<{ menus: Nav[] }>) {
  return (
    <XBox style={styles.container}>
      <ScrollView {...styles.root.rnw()}>
        <MenuList>
          <Accordion defaultValues={[]} allowMultiple>
            {menus.map((item) => {
              const { href, title, menus } = item;
              return (
                <Li key={href || title} label={!href || Boolean(menus)}>
                  <Item {...item} />
                </Li>
              );
            })}
          </Accordion>
        </MenuList>
      </ScrollView>

      <YBox style={styles.center}>{children}</YBox>
    </XBox>
  );
}

const Item = ({ href, title, menus }: Nav) => {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const [, setTransition] = useTransition();
  const [hover, setHover] = useUncontrolled({ defaultValue: false });
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

  const style = useCallback(
    ({ pressed }) =>
      composeStyles(menuStyle.item, styles.item).rnw({
        active: pressed,
      }).style,
    []
  );

  if (menus) {
    return (
      <AccordionItem value={title}>
        <AccordionTrigger {...styles.accordionTrigger.rnw()}>
          <Text>{title}</Text>
          <AccordionIcon />
        </AccordionTrigger>
        <AccordionPanel>
          {menus.map((item) => {
            const { href, title } = item;
            return (
              <Li key={href || title} label={!href || Boolean(item.menus)}>
                <Item {...item} />
              </Li>
            );
          })}
        </AccordionPanel>
      </AccordionItem>
    );
  }
  return href ? (
    <MenuList.Item
      role="link"
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      href={`/crossed${href}`}
      onPress={(e) => {
        e.stopPropagation();
        e.preventDefault();
        router.push(href);
      }}
      hover={href === pathname || hover}
      style={style}
    >
      <MenuList.Title
        {...menuStyle.itemText.rnw()}
        weight={hover ? 'lg' : 'md'}
      >
        {t(title)}
      </MenuList.Title>
    </MenuList.Item>
  ) : (
    <MenuList.Label hover={false} textAlign="right" weight="lg">
      {t(title)}
    </MenuList.Label>
  );
};

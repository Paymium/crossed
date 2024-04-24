/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { withStaticProperties } from '@crossed/core';
import { Text, type TextProps } from '../typography/Text';
import { Button, type ButtonProps } from '../forms/Button';
import { createStyles, type ExtractForProps } from '@crossed/styled';
import { createContext, useContext } from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from '@crossed/unicons';
import { Box } from '../layout/Box';
import { YBox, type YBoxProps } from '../layout/YBox';
import { match } from 'ts-pattern';

const bannerStyles = createStyles(
  (t) =>
    ({
      description: { base: { color: t.colors.neutral[600], flex: 1 } },
      title: {
        base: { fontWeight: '600' },
        variants: {
          status: {
            error: { base: { color: t.colors.error.satured } },
            success: { base: { color: t.colors.success.satured } },
            warning: { base: { color: t.colors.warning.satured } },
            info: { base: { color: t.colors.info.satured } },
          },
        },
      },
      containerTitle: { base: { flexDirection: 'row', alignItems: 'center' } },
      containerIcon: {
        base: { borderRadius: 32, width: 32, height: 32 },
        variants: {
          status: {
            error: { base: { backgroundColor: t.colors.error.low } },
            success: { base: { backgroundColor: t.colors.success.low } },
            warning: { base: { backgroundColor: t.colors.warning.low } },
            info: { base: { backgroundColor: t.colors.info.low } },
          },
        },
      },
      container: {
        base: {
          padding: t.space.xs,
          paddingVertical: t.space.xs,
          paddingHorizontal: t.space.sm,
          borderRadius: 8,
          alignItems: 'center',
          borderWidth: 1,
          borderStyle: 'solid',
        },
        variants: {
          status: {
            error: { base: { borderColor: t.colors.error.bright } },
            success: { base: { borderColor: t.colors.success.bright } },
            warning: { base: { borderColor: t.colors.warning.bright } },
            info: { base: { borderColor: t.colors.info.bright } },
          },
        },
        media: { md: { flexDirection: 'row' } },
      },
    }) as const
);

type Variant = ExtractForProps<typeof bannerStyles.container>;

type ContainerProps = YBoxProps & Variant['variants'];

const bannerContext = createContext<Pick<ContainerProps, 'status'>>({});

const Container = ({ status = 'info', children, ...props }: ContainerProps) => {
  return (
    <bannerContext.Provider value={{ status }}>
      <YBox
        space="xs"
        role="banner"
        {...props}
        {...bannerStyles.container.rnw({ variants: { status } })}
      >
        {children}
      </YBox>
    </bannerContext.Provider>
  );
};

const Icon = () => {
  const { status } = useContext(bannerContext);
  const { color } = bannerStyles.title.style({
    variants: { status },
  }).style;
  const Comp = match(status)
    .with('error', () => XCircle)
    .with('info', () => Info)
    .with('success', () => CheckCircle)
    .with('warning', () => AlertTriangle)
    .exhaustive();
  return (
    <Box center {...bannerStyles.containerIcon.rnw({ variants: { status } })}>
      <Comp color={color} size={16} />
    </Box>
  );
};

const Title = (props: TextProps) => {
  const { status } = useContext(bannerContext);
  return (
    <Box space="sm" {...bannerStyles.containerTitle.rnw()}>
      <Icon />
      <Text
        weight="lg"
        numberOfLines={1}
        // ellipsizeMode='middle'
        // lineBreakMode='middle'
        // lineBreakStrategyIOS='standard'
        {...props}
        {...bannerStyles.title.rnw({ variants: { status } })}
      />
    </Box>
  );
};
const Description = (props: TextProps) => {
  return <Text {...props} {...bannerStyles.description.rnw()} />;
};

const Action = (props: ButtonProps) => {
  return <Button variant="tertiary" size={false} {...props} />;
};

const Banner = withStaticProperties(Container, {
  Icon,
  Title,
  Description,
  Action,
});

const {
  Icon: BannerIcon,
  Title: BannerTitle,
  Description: BannerDescription,
  Action: BannerAction,
} = Banner;

export { Banner, BannerIcon, BannerTitle, BannerDescription, BannerAction };

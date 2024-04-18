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
      action: { base: {} },
      description: { base: { color: '#5D607C', flex: 1 } },
      title: {
        base: { fontWeight: '600' },
        variants: {
          status: {
            error: { base: { color: '#A21A1A' } },
            success: { base: { color: '#188551' } },
            warning: { base: { color: '#AD5C23' } },
            info: { base: { color: '#285F9B' } },
          },
        },
      },
      containerTitle: { base: { flexDirection: 'row', alignItems: 'center' } },
      containerIcon: {
        base: { borderRadius: 32, width: 32, height: 32 },
        variants: {
          status: {
            error: { base: { backgroundColor: '#FEC4C4' } },
            success: { base: { backgroundColor: '#DCF6E9' } },
            warning: { base: { backgroundColor: '#FFE0CA' } },
            info: { base: { backgroundColor: '#D1E7FF' } },
          },
        },
      },
      container: {
        base: {
          paddingVertical: t.space.xs,
          paddingHorizontal: t.space.sm,
          borderRadius: 8,
          alignItems: 'center',
          borderWidth: 1,
          borderStyle: 'solid',
        },
        variants: {
          status: {
            error: { base: { borderColor: '#EF4444' } },
            success: { base: { borderColor: '#3ABB7D' } },
            warning: { base: { borderColor: '#F97316' } },
            info: { base: { borderColor: '#93C5FD' } },
          },
        },
        media: { md: { flexDirection: 'row' } },
      },
    } as const)
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
        weight="semibold"
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
  return (
    <Button
      variant="tertiary"
      size={false}
      {...props}
      {...bannerStyles.action.rnw()}
    />
  );
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

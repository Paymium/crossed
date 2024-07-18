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
import { composeStyles, createStyles } from '@crossed/styled';
import { createContext, useContext } from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from '@crossed/unicons';
import { Box } from '../layout/Box';
import { YBox, type YBoxProps } from '../layout/YBox';
import { match } from 'ts-pattern';
import { useMedia } from '../useMedia';

const bannerStyles = createStyles(
  (t) =>
    ({
      description: {
        base: { flex: 1 },
        variants: {
          status: {
            error: { base: { color: t.components.Banner.error.subtitle } },
            success: { base: { color: t.components.Banner.success.subtitle } },
            warning: { base: { color: t.components.Banner.warning.subtitle } },
            info: { base: { color: t.components.Banner.info.subtitle } },
          },
        },
      },
      title: {
        base: { fontWeight: '600' },
        variants: {
          status: {
            error: { base: { color: t.components.Banner.error.title } },
            success: { base: { color: t.components.Banner.success.title } },
            warning: { base: { color: t.components.Banner.warning.title } },
            info: { base: { color: t.components.Banner.info.title } },
          },
        },
      },
      icon: {
        base: { fontWeight: '600' },
        variants: {
          status: {
            error: { base: { color: t.components.Banner.error.icon } },
            success: { base: { color: t.components.Banner.success.icon } },
            warning: { base: { color: t.components.Banner.warning.icon } },
            info: { base: { color: t.components.Banner.info.icon } },
          },
        },
      },
      containerTitle: {
        base: { flexDirection: 'row', alignItems: 'center' },
      },
      containerIcon: {
        base: { borderRadius: 32, width: 32, height: 32 },
        variants: {},
      },
      action: {
        media: { xs: { alignSelf: 'flex-end' }, md: { alignSelf: 'auto' } },
      },
      container: {
        base: {
          padding: t.space.xs,
          borderRadius: 8,
          borderWidth: 1,
          borderStyle: 'solid',
        },
        variants: {},
        media: {
          xs: {
            paddingVertical: t.space.xxs,
            paddingHorizontal: t.space.xs,
          },
          md: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: t.space.xs,
            paddingHorizontal: t.space.sm,
          },
        },
      },
    }) as const
);

const containerStyles = createStyles((t) => ({
  error: {
    base: {
      borderColor: t.components.Banner.error.border,
      backgroundColor: t.components.Banner.error.background,
    },
  },
  success: {
    base: {
      borderColor: t.components.Banner.success.border,
      backgroundColor: t.components.Banner.success.background,
    },
  },
  warning: {
    base: {
      borderColor: t.components.Banner.warning.border,
      backgroundColor: t.components.Banner.warning.background,
    },
  },
  info: {
    base: {
      borderColor: t.components.Banner.info.border,
      backgroundColor: t.components.Banner.info.background,
    },
  },
}));
const containerIconStyles = createStyles((t) => ({
  error: {
    base: {
      backgroundColor: t.components.Banner.error.backgroundIcon,
    },
  },
  success: {
    base: {
      backgroundColor: t.components.Banner.success.backgroundIcon,
    },
  },
  warning: {
    base: {
      backgroundColor: t.components.Banner.warning.backgroundIcon,
    },
  },
  info: {
    base: {
      backgroundColor: t.components.Banner.info.backgroundIcon,
    },
  },
}));

export type BannerProps = YBoxProps & { status?: keyof typeof containerStyles };

const bannerContext = createContext<Pick<BannerProps, 'status'>>({});

const Container = ({
  status = 'info',
  children,
  style,
  ...props
}: BannerProps) => {
  const { md } = useMedia();
  return (
    <bannerContext.Provider value={{ status }}>
      <YBox
        space={!md ? 'xs' : 'xxs'}
        role="banner"
        {...props}
        style={composeStyles(
          bannerStyles.container,
          containerStyles[status],
          style
        )}
      >
        {children}
      </YBox>
    </bannerContext.Provider>
  );
};

const Icon = () => {
  const { status } = useContext(bannerContext);
  const { color } = bannerStyles.icon.style({
    variants: { status },
  }).style;
  const Comp = match(status)
    .with('error', () => XCircle)
    .with('info', () => Info)
    .with('success', () => CheckCircle)
    .with('warning', () => AlertTriangle)
    .exhaustive();
  return (
    <Box
      center
      style={composeStyles(
        bannerStyles.containerIcon,
        containerIconStyles[status]
      )}
    >
      <Comp color={color} size={16} />
    </Box>
  );
};

const Title = ({ style, className, ...props }: TextProps) => {
  const { status } = useContext(bannerContext);
  return (
    <Text
      weight="lg"
      {...props}
      {...bannerStyles.title.rnw({ style, className, variants: { status } })}
    />
  );
};
const Description = (props: TextProps) => {
  const { status } = useContext(bannerContext);
  return (
    <Text
      {...props}
      {...bannerStyles.description.rnw({ ...props, variants: { status } })}
    />
  );
};

const Action = (props: ButtonProps) => {
  return (
    <Button
      variant="tertiary"
      size={false}
      {...props}
      {...bannerStyles.action.rnw(props)}
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

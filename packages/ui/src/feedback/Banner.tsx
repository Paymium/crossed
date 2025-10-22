/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { Text, type TextProps } from '../typography/Text';
import {
  composeStyles,
  createStyles,
  CrossedMethods,
  inlineStyle,
} from '@crossed/styled';
import {
  cloneElement,
  ComponentProps,
  createContext,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  useContext,
} from 'react';
import { Box } from '../layout/Box';
import { YBox, type YBoxProps } from '../layout/YBox';
import { CloseButton } from '../buttons';
import { Adapt } from '../other';
import { XBox } from '../layout';
import {
  alignItemsStyle,
  flexDirectionResponsiveStyles,
  growStyles,
  justifyContentStyle,
} from '../styles';

const bannerStyles = createStyles(
  (t) =>
    ({
      container: {
        base: {
          padding: t.space.md,
          borderStyle: 'solid',
        },
        variants: {},
        media: {
          xs: {
            paddingVertical: t.space.xs,
            paddingHorizontal: t.space.md,
          },
          md: {
            paddingVertical: t.space.md,
            paddingHorizontal: t.space.lg,
          },
        },
      },
    }) as const
);

const containerIconStyle = createStyles(({ colors, radius, space }) => ({
  root: {
    base: { borderRadius: radius.lg, borderWidth: 1, padding: space.lg },
  },
  default: {
    base: {
      borderColor: colors.border.primary.default,
      backgroundColor: colors.background.primary.default,
    },
  },
  brand: {
    base: {
      borderColor: colors.border.secondary.alt,
      backgroundColor: colors.background.brand.solid.default,
    },
  },
}));

const containerVariantStyles = createStyles(({ colors }) => ({
  default: {
    base: {
      borderBottomWidth: 1,
      borderColor: colors.border.primary.default,
      backgroundColor: colors.background.secondary.subtle,
    },
  },
  brand: {
    base: {
      borderColor: colors.border.brand.alt,
      backgroundColor: colors.background.brand.section.subtle,
    },
  },
}));

const containerFloatingStyles = createStyles(({ colors, radius }) => ({
  base: {
    base: { borderRadius: radius.xl, borderWidth: 1 },
  },
  default: {
    base: {
      borderColor: colors.border.secondary.alt,
      backgroundColor: colors.background.secondary.subtle,
    },
  },
  brand: {
    base: {
      borderColor: colors.border.brand.alt,
      backgroundColor: colors.background.brand.section.subtle,
    },
  },
}));

export type BannerProps = YBoxProps & {
  variant?: keyof typeof containerVariantStyles;
  floating?: boolean;
  containerStyle?: CrossedMethods<any>;
};

export const bannerContext = createContext<
  Pick<BannerProps, 'variant' | 'floating'>
>({});

const Container = ({
  variant = 'default',
  children,
  style,
  floating,
  containerStyle,
  ...props
}: BannerProps) => {
  return (
    <bannerContext.Provider value={{ variant, floating }}>
      <YBox
        role="banner"
        style={composeStyles(
          growStyles.on,
          alignItemsStyle.mdCenter,
          bannerStyles.container,
          flexDirectionResponsiveStyles.mdRow,
          floating && containerFloatingStyles.base,
          !floating && justifyContentStyle.center,
          floating
            ? containerFloatingStyles[variant]
            : containerVariantStyles[variant],
          style
        )}
      >
        <YBox
          space={'lg'}
          {...props}
          style={composeStyles(
            growStyles.on,
            alignItemsStyle.mdCenter,
            flexDirectionResponsiveStyles.mdRow,
            !floating &&
              inlineStyle(() => ({
                base: { maxWidth: 1280 },
              })),
            containerStyle
          )}
        >
          {children}
        </YBox>
      </YBox>
    </bannerContext.Provider>
  );
};
Container.displayName = 'Banner';

const BannerIcon = ({
  style,
  children,
}: PropsWithChildren<{
  /**
   * Style of container Box
   */
  style?: CrossedMethods<any>;
}>) => {
  const { variant } = useContext(bannerContext);
  return (
    <Box
      center
      style={composeStyles(
        containerIconStyle.root,
        containerIconStyle[variant],
        style
      )}
    >
      {isValidElement(children)
        ? cloneElement(children, {
            size: 24,
            color:
              variant === 'default'
                ? 'foreground.secondary.default'
                : 'primary.base.white',
            ...(children as any).props,
          })
        : children}
    </Box>
  );
};
BannerIcon.displayName = 'Banner.Icon';

const BannerTitle = ({ style, ...props }: TextProps) => {
  const { variant } = useContext(bannerContext);
  return (
    <Text
      color={variant === 'default' ? 'secondary' : 'primaryBrand'}
      fontWeight={'semibold'}
      {...props}
    />
  );
};
BannerTitle.displayName = 'Banner.Title';

const BannerDescription = (props: TextProps) => {
  const { variant } = useContext(bannerContext);
  return (
    <Text
      color={variant === 'default' ? 'tertiary' : 'tertiaryBrand'}
      {...props}
    />
  );
};
BannerDescription.displayName = 'Banner.Description';

const BannerPreset = ({
  title,
  description,
  icon,
  actions,
  onClose,
  ...props
}: ComponentProps<typeof Banner> & {
  title?: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  onClose?: () => void | Promise<void>;
}) => {
  return (
    <Banner {...props}>
      <XBox justifyContent={'between'}>
        {!!icon && <Banner.Icon>{icon}</Banner.Icon>}
        {!!onClose && <Adapt size={'md'} fallback={<CloseButton />} />}
      </XBox>
      <YBox style={growStyles.on}>
        {!!title && <Banner.Title>{title}</Banner.Title>}
        {!!description && (
          <Banner.Description>{description}</Banner.Description>
        )}
      </YBox>
      {!!actions && (
        <YBox style={flexDirectionResponsiveStyles.mdRow} space={'lg'}>
          {actions}
        </YBox>
      )}
      {!!onClose && (
        <Adapt size={'md'} fallback={null}>
          <CloseButton />
        </Adapt>
      )}
    </Banner>
  );
};
BannerPreset.displayName = 'BannerPreset';

const Banner = withStaticProperties(Container, {
  Icon: BannerIcon,
  Title: BannerTitle,
  Description: BannerDescription,
  Preset: BannerPreset,
});

export { Banner, BannerIcon, BannerTitle, BannerDescription };

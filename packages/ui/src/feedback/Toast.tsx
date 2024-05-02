/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { withStaticProperties } from '@crossed/core';
import { Text, type TextProps } from '../typography/Text';
import { createStyles, type ExtractForProps } from '@crossed/styled';
import { createContext, useContext } from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from '@crossed/unicons';
import { Box } from '../layout/Box';
import { YBox, type YBoxProps } from '../layout/YBox';
import { match } from 'ts-pattern';
import { useMedia } from '../useMedia';
import { XBox } from '../layout/XBox';
import { CloseButton } from '../other/CloseButton';

const toastStyles = createStyles(
  (t) =>
    ({
      description: {
        base: { flex: 1, color: t.colors.text.secondary, flexShrink: 1 },
      },
      title: {
        base: { fontWeight: '600', color: t.colors.text.primary },
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
        variants: {
          status: {
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
          },
        },
      },
      containerChildren: { base: { flex: 1 } },
      closeButton: {
        base: { paddingTop: 0, paddingRight: 0 },
      },
      container: {
        base: {
          padding: t.space.xs,
          borderRadius: 8,
          borderWidth: 0,
          borderStyle: 'solid',
        },
        web: {
          base: {
            boxShadow: '0px 1px 4px 0px #00000026',
          },
        },
        variants: {
          status: {
            error: {
              base: {
                borderColor: t.components.Banner.error.border,
                backgroundColor: t.components.Banner.error.background,
              },
            },
            success: {
              'base': {
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
          },
        },
      },
    }) as const
);

type Variant = ExtractForProps<typeof toastStyles.container>;

type ContainerProps = YBoxProps & Variant['variants'] & { closable?: boolean };

const toastContext = createContext<Pick<ContainerProps, 'status'>>({});

const Container = ({
  status = 'info',
  children,
  closable = false,
  ...props
}: ContainerProps) => {
  const { md } = useMedia();
  return (
    <toastContext.Provider value={{ status }}>
      <XBox
        space={!md ? 'xs' : 'xxs'}
        {...props}
        {...toastStyles.container.rnw({ variants: { status } })}
      >
        <Icon />
        <YBox {...toastStyles.containerChildren.rnw()}>{children}</YBox>
        {closable && <CloseButton {...toastStyles.closeButton.rnw()} />}
      </XBox>
    </toastContext.Provider>
  );
};

const Icon = () => {
  const { status } = useContext(toastContext);
  const { color } = toastStyles.icon.style({
    variants: { status },
  }).style;
  const Comp = match(status)
    .with('error', () => XCircle)
    .with('info', () => Info)
    .with('success', () => CheckCircle)
    .with('warning', () => AlertTriangle)
    .exhaustive();
  return (
    <Box center {...toastStyles.containerIcon.rnw({ variants: { status } })}>
      <Comp color={color} size={16} />
    </Box>
  );
};

const Title = (props: TextProps) => {
  return (
    <Box space="sm" {...toastStyles.containerTitle.rnw()}>
      <Text
        weight="lg"
        numberOfLines={1}
        {...props}
        {...toastStyles.title.rnw(props)}
      />
    </Box>
  );
};
const Description = (props: TextProps) => {
  return (
    <Text
      role="alert"
      {...props}
      {...toastStyles.description.rnw({ ...props })}
    />
  );
};

const Toast = withStaticProperties(Container, {
  Icon,
  Title,
  Description,
});

const {
  Icon: ToastIcon,
  Title: ToastTitle,
  Description: ToastDescription,
} = Toast;

export { Toast, ToastIcon, ToastTitle, ToastDescription };

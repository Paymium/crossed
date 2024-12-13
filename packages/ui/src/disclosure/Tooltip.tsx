/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  ComponentProps,
  memo,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react';
import { Floating, Sheet } from '../overlay';
import { withStaticProperties } from '@crossed/core';
import {
  composeStyles,
  createStyles,
  inlineStyle,
  isWeb,
} from '@crossed/styled';
import { Adapt } from '../other';
import { useFloatingContext } from '../overlay/Floating/context';
import { Box } from '../layout';
import { Text, TextProps } from '../typography/Text';

type RootProps = ComponentProps<typeof Floating>;
export const Root = memo(({ children, ...props }: RootProps) => {
  return (
    <Floating
      triggerStrategy={isWeb ? 'onPointerEnter' : 'onPress'}
      removeScroll={false}
      portal={false}
      visibilityHidden
      {...props}
    >
      <Box>{children}</Box>
    </Floating>
  );
});

export const Trigger = memo(({ children }: PropsWithChildren) => {
  return <Floating.Trigger>{children}</Floating.Trigger>;
});

export const Content = memo(({ children }: PropsWithChildren) => {
  return (
    <>
      {isWeb ? (
        <Adapt fallback={<ContentNative children={children} />}>
          <ContentWeb children={children} />
        </Adapt>
      ) : (
        <ContentNative children={children} />
      )}
    </>
  );
});

const positionStyles = createStyles(() => ({
  top: { base: { bottom: '100%' } },
  left: { base: { right: '100%' } },
  bottom: { base: { top: '100%' } },
  right: { base: { right: '100%' } },
}));
const tooltipStyles = inlineStyle(({ colors, space }) => ({
  base: {
    backgroundColor: colors.text.primary,
    borderRadius: 16,
    paddingVertical: space.xs,
    paddingHorizontal: space.sm,
  },
}));

const ContentWeb = memo<PropsWithChildren>(({ children }) => {
  return (
    <Floating.Portal
      style={composeStyles(
        inlineStyle(() => ({
          base: { bottom: 'auto', right: undefined },
        })),
        tooltipStyles,
        positionStyles.bottom
      )}
    >
      <Floating.Content>{children}</Floating.Content>
    </Floating.Portal>
  );
});

const ContentNative = ({ children }: PropsWithChildren) => {
  const { open, onClose } = useFloatingContext();
  const refSheet = useRef(null);
  useEffect(() => {
    if (open) {
      refSheet.current?.show();
    } else {
      refSheet.current?.hide();
    }
  }, [open]);
  return (
    <Sheet ref={refSheet as any}>
      <Sheet.Content onClose={onClose} children={children} />
    </Sheet>
  );
};

const TooltipText = (props: TextProps) => {
  return <Text color={'invert'} {...props} />;
};

export const Tooltip = withStaticProperties(Root, {
  Trigger,
  Content,
  Text: TooltipText,
});

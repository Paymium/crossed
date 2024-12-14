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
  CrossedMethods,
  inlineStyle,
  isWeb,
} from '@crossed/styled';
import { Adapt } from '../other';
import { useFloatingContext } from '../overlay/Floating/context';
import { Box } from '../layout';
import { Text, TextProps } from '../typography/Text';

const zIndexBox = inlineStyle(() => ({ base: { zIndex: 1 } }));
type RootProps = ComponentProps<typeof Floating> & {
  style?: CrossedMethods<any>;
};
export const Root = memo(({ children, style, ...props }: RootProps) => {
  return (
    <Floating
      triggerStrategy={isWeb ? 'onPointerEnter' : 'onPress'}
      removeScroll={false}
      portal={false}
      visibilityHidden
      {...props}
    >
      <Box style={composeStyles(zIndexBox, style)}>{children}</Box>
    </Floating>
  );
});
Root.displayName = 'Tooltip.Root';

export const Trigger = memo<ComponentProps<typeof Floating.Trigger>>(
  (props) => {
    return <Floating.Trigger {...props} />;
  }
);
Trigger.displayName = 'Tooltip.Trigger';

export const Content = memo(
  ({ children, style }: PropsWithChildren<{ style?: CrossedMethods<any> }>) => {
    return (
      <>
        {isWeb ? (
          <Adapt fallback={<ContentNative children={children} style={style} />}>
            <ContentWeb children={children} style={style} />
          </Adapt>
        ) : (
          <ContentNative children={children} style={style} />
        )}
      </>
    );
  }
);
Content.displayName = 'Tooltip.Content';

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

const ContentWeb = memo<PropsWithChildren<{ style?: CrossedMethods<any> }>>(
  ({ children, style }) => {
    return (
      <Floating.Portal>
        <Floating.Content
          style={composeStyles(
            inlineStyle(() => ({
              base: { bottom: 'auto', right: undefined },
            })),
            tooltipStyles,
            positionStyles.bottom,
            style
          )}
        >
          {children}
        </Floating.Content>
      </Floating.Portal>
    );
  }
);
ContentWeb.displayName = 'Tooltip.ContentWeb';

const ContentNative = ({
  children,
}: PropsWithChildren<{ style?: CrossedMethods<any> }>) => {
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
ContentNative.displayName = 'Tooltip.ContentNative';

const TooltipText = (props: TextProps) => {
  return <Text color={'invert'} {...props} />;
};
TooltipText.displayName = 'Tooltip.Text';

export const Tooltip = withStaticProperties(Root, {
  Trigger,
  Content,
  Text: TooltipText,
});

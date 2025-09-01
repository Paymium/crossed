/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  ComponentProps,
  forwardRef,
  memo,
  PropsWithChildren,
  RefAttributes,
  useEffect,
  useRef,
} from 'react';
import { Adapt } from '../other/Adapt';
import { Text, TextProps } from '../typography/Text';
import { Sheet } from './Sheet/index';
import { composeRefs, createScope, withStaticProperties } from '@crossed/core';
import {
  composeStyles,
  createStyles,
  CrossedMethods,
  inlineStyle,
  isWeb,
} from '@crossed/styled';
import { ActionSheetRef } from '@crossed/sheet';
import { View } from 'react-native';
import { Floating, useFloatingContext } from './Floating';
import { autoUpdate, offset, Placement, useFloating } from '@floating-ui/react';
import { flip } from '@floating-ui/dom';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { useMedia } from '../useMedia';
import { Box } from '../layout';

const useFloatinCompat = isWeb
  ? (placement?: Placement) =>
      useFloating({
        placement: placement,
        middleware: [flip({ crossAxis: true }), offset(10)],
        whileElementsMounted: autoUpdate,
      })
  : () => ({
      refs: {},
      floatingStyles: {},
    });

const stylesDyn = createStyles(() => ({ dyn: (e: any) => e }));
type FloatingUiContext = Pick<
  ReturnType<typeof useFloating>,
  'refs' | 'floatingStyles'
>;
const [FloatingUiProvider, useFloatingUi] = createScope<FloatingUiContext>(
  {} as FloatingUiContext
);

type RootProps = ComponentProps<typeof Floating> & { placement?: Placement };
export const Root = memo(
  ({ children, placement, triggerStrategy, ...props }: RootProps) => {
    const { refs, floatingStyles } = useFloatinCompat(placement);
    const { md } = useMedia();

    return (
      <Floating
        triggerStrategy={
          !md && triggerStrategy === 'onPointerEnter'
            ? 'onPress'
            : triggerStrategy
        }
        removeScroll={false}
        {...props}
      >
        <FloatingUiProvider refs={refs as any} floatingStyles={floatingStyles}>
          {children}
        </FloatingUiProvider>
      </Floating>
    );
  }
);
Root.displayName = 'Tooltip.Root';

type TriggerProps = ComponentProps<typeof Floating.Trigger>;
export const Trigger = memo<TriggerProps & RefAttributes<View>>(
  forwardRef<View, TriggerProps>((props, ref) => {
    const { refs } = useFloatingUi();
    return (
      <Floating.Trigger
        {...props}
        ref={composeRefs(ref, refs.setReference as any)}
      />
    );
  })
);
Trigger.displayName = 'Tooltip.Trigger';

type ContentProps = PropsWithChildren<{ style?: CrossedMethods<any> }>;
export const Content = memo<ContentProps & RefAttributes<View>>(
  forwardRef<View, ContentProps>(({ children, style }, ref) => {
    return (
      <>
        {isWeb ? (
          <Adapt fallback={<ContentNative children={children} style={style} />}>
            <ContentWeb ref={ref} children={children} style={style} />
          </Adapt>
        ) : (
          <ContentNative children={children} style={style} />
        )}
      </>
    );
  })
);
Content.displayName = 'Tooltip.Content';

const tooltipStyles = inlineStyle(({ space }) => ({
  base: {
    // backgroundColor: colors.text.primary,
    borderRadius: 16,
    paddingVertical: space.xs,
    paddingHorizontal: space.sm,
    maxWidth: 276,
  },
  web: { base: { width: 'max-content' as any } },
}));

type ContentWebProps = PropsWithChildren<{ style?: CrossedMethods<any> }>;
const ContentWeb = memo<ContentWebProps & RefAttributes<View>>(
  forwardRef<View, ContentWebProps>(({ children, style }, ref) => {
    const { refs, floatingStyles } = useFloatingUi();

    return (
      <Floating.Portal>
        <Floating.Content
          entering={FadeIn}
          exiting={FadeOut}
          style={inlineStyle(() => ({
            base: { position: 'absolute' },
          }))}
        >
          <Box
            ref={composeRefs(ref, refs.setFloating as any)}
            style={composeStyles(
              tooltipStyles,
              stylesDyn.dyn(floatingStyles),
              style
            )}
          >
            {children}
          </Box>
        </Floating.Content>
      </Floating.Portal>
    );
  })
);
ContentWeb.displayName = 'Tooltip.ContentWeb';

const ContentNative = ({
  children,
}: PropsWithChildren<{ style?: CrossedMethods<any> }>) => {
  const { open, onClose } = useFloatingContext();
  const refSheet = useRef<ActionSheetRef>(null);
  useEffect(() => {
    if (open) {
      refSheet.current?.show();
    } else {
      refSheet.current?.hide();
    }
  }, [open]);
  return (
    <Sheet ref={refSheet as any}>
      <Sheet.Content onClose={onClose}>
        <Sheet.Padded>{children}</Sheet.Padded>
      </Sheet.Content>
    </Sheet>
  );
};
ContentNative.displayName = 'Tooltip.ContentNative';

const TooltipText = (props: TextProps) => {
  return <Text {...props} style={composeStyles(props.style)} />;
};
TooltipText.displayName = 'Tooltip.Text';

export const Tooltip = withStaticProperties(Root, {
  Trigger,
  Content,
  Text: TooltipText,
});

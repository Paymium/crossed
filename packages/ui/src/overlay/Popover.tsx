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

export type PopoverConfigContext = {
  showSheet?: boolean;
};

export const [PopoverConfigProvider, usePopoverConfig] =
  createScope<PopoverConfigContext>({} as PopoverConfigContext);

const useFloatinCompat = isWeb
  ? (placement: Placement, offSetValue: number) =>
      useFloating({
        placement: placement,
        middleware: [flip({ crossAxis: true }), offset(offSetValue)],
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

type RootProps = ComponentProps<typeof Floating> & {
  placement?: Placement;
  offsetValue?: number;
};
export const Root = memo(
  ({
    children,
    placement = 'bottom-end',
    triggerStrategy = 'onPress',
    offsetValue = 10,
    ...props
  }: RootProps) => {
    const { refs, floatingStyles } = useFloatinCompat(placement, offsetValue);
    const { md } = useMedia();

    return (
      <PopoverConfigProvider showSheet={!isWeb || !md}>
        <Floating
          triggerStrategy={
            !md && triggerStrategy === 'onPointerEnter'
              ? 'onPress'
              : triggerStrategy
          }
          removeScroll={false}
          {...props}
        >
          <FloatingUiProvider
            refs={refs as any}
            floatingStyles={floatingStyles}
          >
            {children}
          </FloatingUiProvider>
        </Floating>
      </PopoverConfigProvider>
    );
  }
);

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

type ContentProps = PropsWithChildren<{ style?: CrossedMethods<any> }>;
export const Content = memo<ContentProps & RefAttributes<View>>(
  forwardRef<View, ContentProps>(({ children, style }, ref) => {
    const { showSheet } = usePopoverConfig();
    return showSheet ? (
      <ContentNative children={children} style={style} />
    ) : (
      <ContentWeb ref={ref} children={children} style={style} />
    );
  })
);

type ContentWebProps = PropsWithChildren<{ style?: CrossedMethods<any> }>;
const ContentWeb = memo<ContentWebProps & RefAttributes<View>>(
  forwardRef<View, ContentWebProps>(({ children, style }, ref) => {
    const { refs, floatingStyles } = useFloatingUi();

    return (
      <Floating.Portal>
        <Floating.Content
          entering={FadeIn}
          exiting={FadeOut}
          ref={composeRefs(ref, refs.setFloating as any)}
          style={composeStyles(
            inlineStyle(() => ({
              base: { position: 'absolute' },
            })),
            stylesDyn.dyn(floatingStyles),
            style
          )}
        >
          {children}
        </Floating.Content>
      </Floating.Portal>
    );
  })
);

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

export const Popover = withStaticProperties(Root, {
  Trigger,
  Content,
});

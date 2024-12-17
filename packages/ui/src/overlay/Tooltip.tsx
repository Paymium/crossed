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
import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react';

const useFloatinCompat = isWeb
  ? () =>
      useFloating({
        placement: 'bottom-start',
        middleware: [shift({ crossAxis: true }), offset(8)],
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

type RootProps = ComponentProps<typeof Floating>;
export const Root = memo(({ children, ...props }: RootProps) => {
  const { refs, floatingStyles } = useFloatinCompat();
  return (
    <Floating
      triggerStrategy={isWeb ? 'onPointerEnter' : 'onPress'}
      removeScroll={false}
      {...props}
    >
      <FloatingUiProvider refs={refs as any} floatingStyles={floatingStyles}>
        {children}
      </FloatingUiProvider>
    </Floating>
  );
});
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

type ContentWebProps = PropsWithChildren<{ style?: CrossedMethods<any> }>;
const ContentWeb = memo<ContentWebProps & RefAttributes<View>>(
  forwardRef<View, ContentWebProps>(({ children, style }, ref) => {
    const { refs, floatingStyles } = useFloatingUi();
    return (
      <Floating.Portal>
        <Floating.VisibilityHidden
          ref={composeRefs(ref, refs.setFloating as any)}
          style={composeStyles(
            inlineStyle(() => ({
              base: { bottom: 'auto', right: undefined },
            })),
            tooltipStyles,
            positionStyles.bottom,
            stylesDyn.dyn(floatingStyles),
            style
          )}
        >
          {children}
        </Floating.VisibilityHidden>
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

// const useFloatinCompat = isWeb
//   ? () =>
//     useFloating({
//       placement: "bottom-start",
//       middleware: [shift({ crossAxis: true }), offset(8)],
//       whileElementsMounted: autoUpdate,
//     })
//   : () => ({
//     refs: {},
//     floatingStyles: {},
//   });
// export const Tooltip = withStaticProperties(
//   ({
//      children,
//      content,
//      contentStyle,
//      triggerProps,
//      ...props
//    }: RootProps & {
//     content: ReactNode;
//     contentStyle?: ContentProps["style"];
//     triggerProps?: TriggerProps;
//   }) => {
//     const { refs, floatingStyles } = useFloatinCompat() as any;
//     return (
//       <TooltipOri {...props}>
//         <TooltipOri.Trigger ref={refs.setReference as any} {...triggerProps}>
//           {children}
//         </TooltipOri.Trigger>
//         <TooltipOri.Content
//           ref={refs.setFloating as any}
//           style={composeStyles(contentStyle, styles.dynamic(floatingStyles))}
//         >
//           {content}
//         </TooltipOri.Content>
//       </TooltipOri>
//     );
//   },
//   { Text: TooltipText }
// );

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

// 'use client';
// import { composeRefs, createScope } from '@crossed/core';
// import { GetProps, merge } from '@crossed/styled';
// import { styled } from '@crossed/styled';
// import {
//   HtmlHTMLAttributes,
//   PropsWithChildren,
//   ReactNode,
//   forwardRef,
// } from 'react';
// import { Pressable } from 'react-native';
// import { Portal, PortalProvider } from '@gorhom/portal';
// import {
//   autoUpdate,
//   flip,
//   offset,
//   shift,
//   useClick,
//   useDismiss,
//   useFloating,
//   useInteractions,
//   useRole,
// } from '@floating-ui/react';
// import { ButtonFrame } from '../Button';
// import { createSelect, useSelectContext } from '@crossed/primitive';
// import { YBox, YBoxProps } from '../../layout/YBox';
// import { Box, BoxProps } from '../../layout/Box';

import {
  type UseUncontrolledInput,
  composeEventHandlers,
  createScope,
  useUncontrolled,
  withStaticProperties,
} from '@crossed/core';
import { withStyle } from '@crossed/styled';
import {
  useCallback,
  memo,
  type ReactNode,
  useRef,
  Children,
  isValidElement,
  type MutableRefObject,
} from 'react';
import { Button, type ButtonProps } from '../Button';
import { XBox, type XBoxProps } from '../../layout/XBox';
import {
  type MenuItemProps,
  MenuList,
  type MenuListProps,
} from '../../display/MenuList';
import { Portal } from '@gorhom/portal';
import type { LayoutRectangle } from 'react-native';

// // type InputProps = GetProps<typeof Input>;

// // type ProviderContext = {
// //   setOpen: Dispatch<SetStateAction<boolean>>;
// //   open: boolean;
// //   setValue: (prama: any) => void;
// //   size: InputProps['size'];
// //   variant: InputProps['variant'];
// //   color: InputProps['color'];
// //   value: string;
// //   placeholder?: string;
// // };

// // const [Provider, useContext] = createScope<ProviderContext>(
// //   {} as ProviderContext
// // );

// // type FloatingProvider = ReturnType<typeof useFloating> &
// //   ReturnType<typeof useInteractions>;

// // const [FloatingProvider, useFloatingProvider] = createScope<FloatingProvider>(
// //   {} as FloatingProvider
// // );

// // const SelectTrigger = memo(
// //   forwardRef((props: GetProps<typeof Input.Content>, ref) => {
// //     const { setOpen, open } = useContext();
// //     const { getReferenceProps, refs } = useFloatingProvider();
// //     const { keyboardProps } = useKeyboard({
// //       onKeyDown: (e) => {
// //         e.preventDefault();
// //         (e.code === 'ArrowUp' || e.code === 'ArrowDown') && setOpen(true);
// //       },
// //     });

// //     return (
// //       <Input.Content
// //         {...(keyboardProps as any)}
// //         className="cursor-pointer"
// //         states={{ isFocus: open }}
// //         ref={composeRefs(refs.setReference, ref)}
// //         {...getReferenceProps()}
// //         {...props}
// //         onPress={composeEventHandlers(() => {
// //           setOpen((e) => !e);
// //         }, props?.onPress)}
// //       />
// //     );
// //   })
// // );

// // const SelectLabel = Input.Label;
// // const SelectIcon = Input.Icon;

// // const SelectInput = memo((props: GetProps<typeof Input.Input>) => {
// //   const { placeholder } = useContext();
// //   return (
// //     <Input.Input
// //       editable={false}
// //       selectTextOnFocus={false}
// //       selection={{ start: 0, end: 0 }}
// //       {...props}
// //       placeholder={placeholder}
// //       className={cx('cursor-pointer', props.className)}
// //     />
// //   );
// // });

// // const SelectContent = memo(({ children, ...props }: GetProps<typeof Box>) => {
// //   const context = useContext();
// //   const { setOpen, open, variant, size, color } = context;
// //   const { focusWithinProps } = useFocusWithin({
// //     onFocusWithinChange: setOpen,
// //   });
// //   const {
// //     context: contextFloating,
// //     refs,
// //     floatingStyles,
// //     getFloatingProps,
// //   } = useFloatingProvider();

// //   return !open ? null : (
// //     <FloatingFocusManager context={contextFloating} modal={false}>
// //       <Portal>
// //         <Provider {...context}>
// //           <View
// //             ref={refs.setFloating}
// //             style={{ ...floatingStyles, zIndex: 30 }}
// //             {...getFloatingProps()}
// //           >
// //             <Box
// //               {...(focusWithinProps as any)}
// //               {...props}
// //               className={cx(
// //                 InputContentFrame.styles({ variant, size, color }).className,
// //                 'flex-col z-30',
// //                 props.className
// //               )}
// //             >
// //               <FocusScope restoreFocus autoFocus>
// //                 {children}
// //               </FocusScope>
// //             </Box>
// //           </View>
// //         </Provider>
// //       </Portal>
// //     </FloatingFocusManager>
// //   );
// // });

// // const SelectOption = memo(
// //   ({ value: valueProps, label }: { value: string; label: string }) => {
// //     const focusManager = useFocusManager();
// //     const { setOpen, setValue, size, variant, color, value } = useContext();

// //     const { keyboardProps } = useKeyboard({
// //       onKeyDown: (e) => {
// //         e.preventDefault();
// //         switch (e.key) {
// //           case 'Escape':
// //             setOpen(false);
// //             break;
// //           case 'ArrowDown':
// //             focusManager.focusNext({ wrap: true });
// //             break;
// //           case 'ArrowUp':
// //             focusManager.focusPrevious({ wrap: true });
// //             break;
// //           case 'Enter':
// //             setOpen(false);
// //             setValue(label);
// //             break;
// //         }
// //       },
// //     });

// //     return (
// //       <Input
// //         value={label}
// //         size={size}
// //         variant={valueProps === value ? 'filled' : variant}
// //         color={valueProps === value ? 'blue' : color}
// //       >
// //         <VisuallyHidden>
// //           <Input.Label className="hidden">{label}</Input.Label>
// //         </VisuallyHidden>
// //         <Input.Content
// //           {...(keyboardProps as any)}
// //           className="border-0 ring-0 focus:dark:bg-neutral-600 focus-visible:!ring-offset-transparent focus-visible:!ring-transparent focus-visible:shadow-none"
// //           onPress={() => {
// //             setOpen(false);
// //             setValue(label);
// //           }}
// //         >
// //           <Input.Input
// //             className="cursor-pointer"
// //             editable={false}
// //             // tabIndex={-1}
// //             aria-disabled
// //           />
// //         </Input.Content>
// //       </Input>
// //     );
// //   }
// // );

// // type SelectProps<V extends string = string> = {
// //   size?: InputProps['size'];
// //   variant?: InputProps['variant'];
// //   color?: InputProps['color'];
// //   value?: V;
// //   defaultValue?: V;
// //   onChangeValue?: (value: V) => void;
// //   open?: boolean;

// //   placeholder?: string;
// //   items?: { value: string; label: string }[];
// //   label?: string;
// // };

// // function SelectRoot(
// //   params: Omit<PropsWithChildren<SelectProps>, 'children'>
// // ): ReactNode;
// // function SelectRoot(
// //   params: Omit<PropsWithChildren<SelectProps>, 'items'>
// // ): ReactNode;
// // function SelectRoot({
// //   size = 'md',
// //   variant = 'outlined',
// //   color = 'neutral',
// //   children,
// //   open: openProps = false,
// //   items,
// //   label,
// //   value: valueProps,
// //   defaultValue,
// //   onChangeValue,
// //   placeholder,
// // }: PropsWithChildren<SelectProps>) {
// //   const [open, setOpen] = useState(openProps);

// //   const [value, setValue] = useUncontrolled({
// //     value: valueProps,
// //     defaultValue,
// //     finalValue: '',
// //     onChange: onChangeValue,
// //   });

// //   const floating = useFloating({
// //     open: open,
// //     onOpenChange: setOpen,
// //     middleware: [offset(10), flip(), shift()],
// //     whileElementsMounted: autoUpdate,
// //   });

// //   const { context } = floating;

// //   const click = useClick(context);
// //   const dismiss = useDismiss(context);
// //   const role = useRole(context);

// //   const interactions = useInteractions([click, dismiss, role]);

// //   return (
// //     <Provider
// //       setOpen={setOpen}
// //       open={open}
// //       setValue={setValue}
// //       size={size}
// //       variant={variant}
// //       color={color}
// //       value={value}
// //       placeholder={placeholder}
// //     >
// //       <FloatingProvider {...floating} {...interactions}>
// //         <Input size={size} variant={variant} color={color} value={value}>
// //           {children ??
// //             [
// //               label && <SelectLabel key={'Select.Label'}>{label}</SelectLabel>,
// //               <SelectTrigger key="Select.Trigger">
// //                 <SelectInput />
// //                 <SelectIcon>
// //                   <UilAngleDown />
// //                 </SelectIcon>
// //               </SelectTrigger>,
// //               <SelectContent key="Select.Content">
// //                 {items?.map(({ value: v, label: l }) => (
// //                   <SelectOption key={v} value={v} label={l} />
// //                 ))}
// //               </SelectContent>,
// //             ].filter(Boolean)}
// //         </Input>
// //       </FloatingProvider>
// //     </Provider>
// //   );
// // }

// const SelectTriggerFrame = styled(Pressable, {
//   extends: ButtonFrame.styles,
//   className: ['cursor-pointer'],
//   props: { role: 'button' },
// });

// type FloatingProvider = ReturnType<typeof useFloating> &
//   ReturnType<typeof useInteractions>;

// const [FloatingProvider, useFloatingProvider] = createScope<FloatingProvider>(
//   {} as FloatingProvider
// );

// const SelectLabel = forwardRef((props: BoxProps, ref: any) => {
//   return (
//     <Box
//       {...props}
//       ref={ref}
//       className="text-neutral-500 px-2 py-1 font-semibold"
//     />
//   );
// });

// const SelectContent = (props: HtmlHTMLAttributes<HTMLDivElement>) => {
//   const { refs, floatingStyles, getFloatingProps } = useFloatingProvider();

//   return (
//     <div
//       ref={refs.setFloating}
//       {...getFloatingProps()}
//       {...props}
//       style={{ ...props.style, ...floatingStyles, zIndex: 30, minWidth: 200 }}
//       className={merge(
//         'flex flex-col p-1 border bg-neutral-900 border-neutral-800 rounded-md w-auto',
//         props.className
//       )}
//     />
//   );
// };

// const SelectItem = styled(Pressable, {
//   extends: ButtonFrame.styles,
//   className: ['cursor-pointer border-0'],
//   props: { role: 'button' },
// });

// type SelectTriggerProps = GetProps<typeof SelectTriggerFrame>;

// const SelectTrigger = forwardRef((props: SelectTriggerProps, ref: any) => {
//   const { getReferenceProps, refs } = useFloatingProvider();
//   return (
//     <SelectTriggerFrame
//       ref={composeRefs(refs.setReference, ref)}
//       {...(getReferenceProps() as any)}
//       {...(props as any)}
//     />
//   );
// });

// type SelectPropsBase = YBoxProps & {
//   size?: any;
//   color?: any;
//   variant?: any;
// };

// const Select = createSelect({
//   Root: forwardRef(({ children, ...props }: SelectPropsBase, ref: any) => {
//     const { open, setOpen } = useSelectContext();
//     const floating = useFloating({
//       open: open,
//       onOpenChange: setOpen,
//       middleware: [offset(10), flip(), shift()],
//       whileElementsMounted: autoUpdate,
//     });

//     const { context } = floating;

//     const click = useClick(context);
//     const dismiss = useDismiss(context);
//     const role = useRole(context);

//     const interactions = useInteractions([click, dismiss, role]);
//     return (
//       <FloatingProvider {...floating} {...interactions}>
//         <PortalProvider>
//           <YBox
//             {...props}
//             className={merge(props.className, 'flex flex-col')}
//             ref={ref}
//           >
//             {children}
//           </YBox>
//         </PortalProvider>
//       </FloatingProvider>
//     );
//   }),
//   Trigger: SelectTrigger,
//   Portal: ({ children }: PropsWithChildren) => {
//     const context = useFloatingProvider();
//     return (
//       <Portal>
//         <FloatingProvider {...context}>{children}</FloatingProvider>
//       </Portal>
//     );
//   },
//   Content: SelectContent,
//   Item: SelectItem,
//   Label: SelectLabel,
//   Divider: forwardRef((props: HtmlHTMLAttributes<HTMLDivElement>, ref: any) => {
//     return (
//       <div {...props} ref={ref} className="border-t border-neutral-800 my-1" />
//     );
//   }),
// });

// // const {
// //   Divider: SelectDivider,
// //   Label: SelectLabel,
// //   Trigger: SelectRigger,
// //   Portal: SelectPortal,
// //   Content: SelectContent,
// //   Item: SelectItem,
// // } = Select;

// type SelectPropsWithChildren = GetProps<typeof Select> & {
//   items?: never;
//   label?: never;
//   children?: ReactNode;
// };
// type SelectPropsWithOutChildren = GetProps<typeof Select> & {
//   items?: { value: string; label: string }[];
//   label?: string;
//   children?: never;
// };

// const SelectCompact = forwardRef(
//   (
//     {
//       label,
//       items,
//       children,
//       ...props
//     }: SelectPropsWithChildren | SelectPropsWithOutChildren,
//     ref
//   ) => {
//     const { value } = props;
//     return (
//       <Select {...props} ref={ref}>
//         {children ??
//           [
//             label && <Select.Label key={'Select.Label'}>{label}</Select.Label>,
//             <Select.Trigger key="Select.Trigger" aria-label={label || 'Select'}>
//               {value}
//             </Select.Trigger>,
//             <Select.Content key="Select.Content">
//               {items?.map(({ value: v, label: l }) => (
//                 <Select.Item key={v} value={v} aria-label={l}>
//                   {l}
//                 </Select.Item>
//               ))}
//             </Select.Content>,
//           ].filter(Boolean)}
//       </Select>
//     );
//   }
// );

// export {
//   // SelectDivider,
//   // SelectLabel,
//   // SelectRigger,
//   // SelectPortal,
//   // SelectContent,
//   // SelectItem,
//   SelectCompact,
//   Select,
// };

// const Select = withStaticProperties(SelectRoot, {
//   Label: SelectLabel,
//   Trigger: SelectTrigger,
//   Input: SelectInput,
//   Icon: SelectIcon,
//   Content: Content,
//   Option: Option,
// });

const findChild = (
  children: ReactNode | ReactNode[] | ((_args: any) => ReactNode),
  value: string | number
): ReactNode | undefined => {
  if (!children) {
    return undefined;
  }
  return typeof children === 'function'
    ? undefined
    : Children.toArray(children).reduce<ReactNode | undefined>((acc, e) => {
        if (acc || !isValidElement(e)) {
          return acc;
        }
        if (e.type && (e.type as any)?.id === 'Select.Option') {
          if (e.props?.value === value) {
            acc = e.props.children;
          }
          return acc;
        } else {
          acc = findChild(e?.props?.children, value);
        }
        return acc;
      }, undefined);
};

const SelectRoot = withStyle(
  memo(
    <V extends string | number>({
      value: valueProps,
      defaultValue,
      finalValue,
      onChange,
      variant,
      children,
      ...props
    }: UseUncontrolledInput<V> & XBoxProps & Pick<ButtonProps, 'variant'>) => {
      const renderValue = useRef<ReactNode>();
      const triggerLayout = useRef<LayoutRectangle | undefined>();
      const [value, setValue] = useUncontrolled<string | number>({
        value: valueProps,
        defaultValue,
        finalValue,
        onChange,
      });
      const [open, setOpen] = useUncontrolled<boolean>({
        defaultValue: false,
      });
      renderValue.current = findChild(children, value) || 'rien trouvé';
      return (
        <SelectProvider
          value={value}
          setValue={setValue}
          open={open}
          setOpen={setOpen}
          renderValue={renderValue}
          variant={variant}
          triggerLayout={triggerLayout}
        >
          <XBox {...props}>{children}</XBox>
        </SelectProvider>
      );
    }
  ),
  {
    base: {
      position: 'relative',
      width: 'auto',
    },
  }
);

// @ts-expect-error because id not exists in type
SelectRoot.id = 'Select';
SelectRoot.displayName = 'Select';

const Trigger = withStaticProperties(
  memo((props: ButtonProps) => {
    const { setOpen, open, variant, triggerLayout } = useSelectProvider();
    const onPress = useCallback(
      composeEventHandlers(() => {
        setOpen(!open);
      }, props.onPress),
      [props.onPress, open]
    );
    return (
      <Button
        variant={variant}
        onLayout={({ nativeEvent: { layout } }: any) => {
          triggerLayout.current = layout;
        }}
        {...props}
        onPress={onPress}
      />
    );
  }),
  { Text: Button.Text }
);

const Content = withStyle(
  (props: Partial<MenuListProps>) => {
    const all = useSelectProvider();
    const { top, height, left } = (all.triggerLayout.current as any) || {
      top: 0,
      height: 0,
      left: 0,
    };
    return (
      <Portal>
        <SelectProvider {...all}>
          {all.open ? (
            <>
              <MenuList
                {...props}
                style={[
                  ...(Array.isArray(props.style) ? props.style : [props.style]),
                  {
                    top: top + height,
                    left,
                    position: 'absolute',
                  },
                ]}
              />
            </>
          ) : null}
        </SelectProvider>
      </Portal>
    );
  },
  {
    theme: (t) => ({
      base: {
        position: 'absolute',
        // top: 15 + 40,
        // left: 1253,
        maxWidth: 'auto',
        padding: t.space.xs,
        zIndex: 100,
        backgroundColor: t.colors.neutral,
        borderRadius: 4,
      },
    }),
  }
);

// @ts-expect-error because id not exist in type
Content.id = 'Select.Content';
Content.displayName = 'Select.Content';

const Option = ({
  value,
  ...props
}: MenuItemProps & { value: string | number }) => {
  const { setOpen, setValue, value: valueGlobal } = useSelectProvider();
  return (
    <MenuList.Item
      active={value === valueGlobal}
      {...props}
      onPress={composeEventHandlers(() => {
        setOpen(false);
        setValue(value);
      }, props.onPress)}
    />
  );
};

Option.id = 'Select.Option';
Option.displayName = 'Select.Option';

const Value = () => {
  const { renderValue } = useSelectProvider();
  return renderValue.current || '';
};

Value.id = 'Select.Value';
Value.displayName = 'Select.Value';

type Context = {
  open: boolean;
  setOpen: (_p: boolean) => void;
  value: string | number;
  setValue: (_p: string | number) => void;
  renderValue: MutableRefObject<ReactNode>;
  variant?: ButtonProps['variant'];
  triggerLayout: MutableRefObject<LayoutRectangle | undefined>;
};
const [SelectProvider, useSelectProvider] = createScope<Context>({} as Context);

const Select = withStaticProperties(SelectRoot, {
  Option,
  Content,
  Trigger,
  Value,
});

const {
  Option: SelectOption,
  Content: SelectContent,
  Value: SelectValue,
} = Select;

export { Select, SelectOption, SelectContent, SelectValue };

'use client';
import { composeRefs, createScope } from '@crossed/core';
import { GetProps, merge } from '@crossed/styled';
import { styled } from '@crossed/styled/styled';
import {
  HtmlHTMLAttributes,
  PropsWithChildren,
  ReactNode,
  forwardRef,
} from 'react';
import { TextInput } from 'react-native';
import { Portal, PortalProvider } from '@gorhom/portal';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { ButtonFrame } from '../Button';
import { createSelect, useSelectContext } from '@crossed/primitive';
import { YBox, YBoxProps } from '../../layout/YBox';
import { Box, BoxProps } from '../../layout/Box';

// type InputProps = GetProps<typeof Input>;

// type ProviderContext = {
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   open: boolean;
//   setValue: (prama: any) => void;
//   size: InputProps['size'];
//   variant: InputProps['variant'];
//   color: InputProps['color'];
//   value: string;
//   placeholder?: string;
// };

// const [Provider, useContext] = createScope<ProviderContext>(
//   {} as ProviderContext
// );

// type FloatingProvider = ReturnType<typeof useFloating> &
//   ReturnType<typeof useInteractions>;

// const [FloatingProvider, useFloatingProvider] = createScope<FloatingProvider>(
//   {} as FloatingProvider
// );

// const SelectTrigger = memo(
//   forwardRef((props: GetProps<typeof Input.Content>, ref) => {
//     const { setOpen, open } = useContext();
//     const { getReferenceProps, refs } = useFloatingProvider();
//     const { keyboardProps } = useKeyboard({
//       onKeyDown: (e) => {
//         e.preventDefault();
//         (e.code === 'ArrowUp' || e.code === 'ArrowDown') && setOpen(true);
//       },
//     });

//     return (
//       <Input.Content
//         {...(keyboardProps as any)}
//         className="cursor-pointer"
//         states={{ isFocus: open }}
//         ref={composeRefs(refs.setReference, ref)}
//         {...getReferenceProps()}
//         {...props}
//         onPress={composeEventHandlers(() => {
//           setOpen((e) => !e);
//         }, props?.onPress)}
//       />
//     );
//   })
// );

// const SelectLabel = Input.Label;
// const SelectIcon = Input.Icon;

// const SelectInput = memo((props: GetProps<typeof Input.Input>) => {
//   const { placeholder } = useContext();
//   return (
//     <Input.Input
//       editable={false}
//       selectTextOnFocus={false}
//       selection={{ start: 0, end: 0 }}
//       {...props}
//       placeholder={placeholder}
//       className={cx('cursor-pointer', props.className)}
//     />
//   );
// });

// const SelectContent = memo(({ children, ...props }: GetProps<typeof Box>) => {
//   const context = useContext();
//   const { setOpen, open, variant, size, color } = context;
//   const { focusWithinProps } = useFocusWithin({
//     onFocusWithinChange: setOpen,
//   });
//   const {
//     context: contextFloating,
//     refs,
//     floatingStyles,
//     getFloatingProps,
//   } = useFloatingProvider();

//   return !open ? null : (
//     <FloatingFocusManager context={contextFloating} modal={false}>
//       <Portal>
//         <Provider {...context}>
//           <View
//             ref={refs.setFloating}
//             style={{ ...floatingStyles, zIndex: 30 }}
//             {...getFloatingProps()}
//           >
//             <Box
//               {...(focusWithinProps as any)}
//               {...props}
//               className={cx(
//                 InputContentFrame.styles({ variant, size, color }).className,
//                 'flex-col z-30',
//                 props.className
//               )}
//             >
//               <FocusScope restoreFocus autoFocus>
//                 {children}
//               </FocusScope>
//             </Box>
//           </View>
//         </Provider>
//       </Portal>
//     </FloatingFocusManager>
//   );
// });

// const SelectOption = memo(
//   ({ value: valueProps, label }: { value: string; label: string }) => {
//     const focusManager = useFocusManager();
//     const { setOpen, setValue, size, variant, color, value } = useContext();

//     const { keyboardProps } = useKeyboard({
//       onKeyDown: (e) => {
//         e.preventDefault();
//         switch (e.key) {
//           case 'Escape':
//             setOpen(false);
//             break;
//           case 'ArrowDown':
//             focusManager.focusNext({ wrap: true });
//             break;
//           case 'ArrowUp':
//             focusManager.focusPrevious({ wrap: true });
//             break;
//           case 'Enter':
//             setOpen(false);
//             setValue(label);
//             break;
//         }
//       },
//     });

//     return (
//       <Input
//         value={label}
//         size={size}
//         variant={valueProps === value ? 'filled' : variant}
//         color={valueProps === value ? 'blue' : color}
//       >
//         <VisuallyHidden>
//           <Input.Label className="hidden">{label}</Input.Label>
//         </VisuallyHidden>
//         <Input.Content
//           {...(keyboardProps as any)}
//           className="border-0 ring-0 focus:dark:bg-neutral-600 focus-visible:!ring-offset-transparent focus-visible:!ring-transparent focus-visible:shadow-none"
//           onPress={() => {
//             setOpen(false);
//             setValue(label);
//           }}
//         >
//           <Input.Input
//             className="cursor-pointer"
//             editable={false}
//             // tabIndex={-1}
//             aria-disabled
//           />
//         </Input.Content>
//       </Input>
//     );
//   }
// );

// type SelectProps<V extends string = string> = {
//   size?: InputProps['size'];
//   variant?: InputProps['variant'];
//   color?: InputProps['color'];
//   value?: V;
//   defaultValue?: V;
//   onChangeValue?: (value: V) => void;
//   open?: boolean;

//   placeholder?: string;
//   items?: { value: string; label: string }[];
//   label?: string;
// };

// function SelectRoot(
//   params: Omit<PropsWithChildren<SelectProps>, 'children'>
// ): ReactNode;
// function SelectRoot(
//   params: Omit<PropsWithChildren<SelectProps>, 'items'>
// ): ReactNode;
// function SelectRoot({
//   size = 'md',
//   variant = 'outlined',
//   color = 'neutral',
//   children,
//   open: openProps = false,
//   items,
//   label,
//   value: valueProps,
//   defaultValue,
//   onChangeValue,
//   placeholder,
// }: PropsWithChildren<SelectProps>) {
//   const [open, setOpen] = useState(openProps);

//   const [value, setValue] = useUncontrolled({
//     value: valueProps,
//     defaultValue,
//     finalValue: '',
//     onChange: onChangeValue,
//   });

//   const floating = useFloating({
//     open: open,
//     onOpenChange: setOpen,
//     middleware: [offset(10), flip(), shift()],
//     whileElementsMounted: autoUpdate,
//   });

//   const { context } = floating;

//   const click = useClick(context);
//   const dismiss = useDismiss(context);
//   const role = useRole(context);

//   const interactions = useInteractions([click, dismiss, role]);

//   return (
//     <Provider
//       setOpen={setOpen}
//       open={open}
//       setValue={setValue}
//       size={size}
//       variant={variant}
//       color={color}
//       value={value}
//       placeholder={placeholder}
//     >
//       <FloatingProvider {...floating} {...interactions}>
//         <Input size={size} variant={variant} color={color} value={value}>
//           {children ??
//             [
//               label && <SelectLabel key={'Select.Label'}>{label}</SelectLabel>,
//               <SelectTrigger key="Select.Trigger">
//                 <SelectInput />
//                 <SelectIcon>
//                   <UilAngleDown />
//                 </SelectIcon>
//               </SelectTrigger>,
//               <SelectContent key="Select.Content">
//                 {items?.map(({ value: v, label: l }) => (
//                   <SelectOption key={v} value={v} label={l} />
//                 ))}
//               </SelectContent>,
//             ].filter(Boolean)}
//         </Input>
//       </FloatingProvider>
//     </Provider>
//   );
// }

const RootFrame = styled(TextInput, {
  extends: ButtonFrame.styles,
  props: { editable: false },
  className: ['cursor-pointer'],
});

type FloatingProvider = ReturnType<typeof useFloating> &
  ReturnType<typeof useInteractions>;

const [FloatingProvider, useFloatingProvider] = createScope<FloatingProvider>(
  {} as FloatingProvider
);

const SelectLabel = forwardRef((props: BoxProps, ref: any) => {
  return (
    <Box
      {...props}
      ref={ref}
      className="text-neutral-500 px-2 py-1 font-semibold"
    />
  );
});

const SelectContent = (props: HtmlHTMLAttributes<HTMLDivElement>) => {
  const { refs, floatingStyles, getFloatingProps } = useFloatingProvider();

  return (
    <div
      ref={refs.setFloating}
      {...getFloatingProps()}
      {...props}
      style={{ ...props.style, ...floatingStyles, zIndex: 30, minWidth: 200 }}
      className={merge(
        'flex flex-col p-1 border bg-neutral-900 border-neutral-800 rounded-md w-auto',
        props.className
      )}
    />
  );
};

const SelectItem = forwardRef(
  (
    props: HtmlHTMLAttributes<HTMLButtonElement> & {
      value: string;
      label: string;
    },
    ref: any
  ) => {
    // const { value } = useSelectContext();
    return (
      <button
        {...props}
        ref={ref}
        className={merge(
          'text-left rounded px-2 py-1 hover:bg-neutral-800',
          // props.disabled && 'opacity-50',
          props.className
        )}
      />
    );
  }
);

type SelectTriggerProps = GetProps<typeof RootFrame>;

const SelectTrigger = forwardRef((props: SelectTriggerProps, ref: any) => {
  const { getReferenceProps, refs } = useFloatingProvider();
  return (
    <RootFrame
      ref={composeRefs(refs.setReference, ref)}
      {...(getReferenceProps() as any)}
      {...(props as any)}
    />
  );
});

type SelectPropsBase = YBoxProps & {
  size?: any;
  color?: any;
  variant?: any;
};
type SelectPropsWithChildren = SelectPropsBase & {
  items?: never;
  label?: never;
  children?: ReactNode;
};
type SelectPropsWithOutChildren = SelectPropsBase & {
  items?: { value: string; label: string }[];
  label?: string;
  children?: never;
};

const Select = createSelect({
  Root: ({
    children,
    label,
    items,
    ...props
  }: SelectPropsWithChildren | SelectPropsWithOutChildren) => {
    const { open, setOpen } = useSelectContext();
    const floating = useFloating({
      open: open,
      onOpenChange: setOpen,
      middleware: [offset(10), flip(), shift()],
      whileElementsMounted: autoUpdate,
    });

    const { context } = floating;

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const interactions = useInteractions([click, dismiss, role]);
    return (
      <FloatingProvider {...floating} {...interactions}>
        <PortalProvider>
          <YBox {...props} className={merge(props.className, 'flex flex-col')}>
            {children ??
              [
                label && (
                  <SelectLabel key={'Select.Label'}>{label}</SelectLabel>
                ),
                <SelectTrigger key="Select.Trigger" />,
                <SelectContent key="Select.Content">
                  {items?.map(({ value: v, label: l }) => (
                    <SelectItem key={v} value={v} label={l} />
                  ))}
                </SelectContent>,
              ].filter(Boolean)}
          </YBox>
        </PortalProvider>
      </FloatingProvider>
    );
  },
  Trigger: SelectTrigger,
  Portal: ({ children }: PropsWithChildren) => {
    const context = useFloatingProvider();
    return (
      <Portal>
        <FloatingProvider {...context}>{children}</FloatingProvider>
      </Portal>
    );
  },
  Content: SelectContent,
  Item: SelectItem,
  Label: SelectLabel,
  Divider: forwardRef((props: HtmlHTMLAttributes<HTMLDivElement>, ref: any) => {
    return (
      <div {...props} ref={ref} className="border-t border-neutral-800 my-1" />
    );
  }),
});

// const {
//   Divider: SelectDivider,
//   Label: SelectLabel,
//   Trigger: SelectRigger,
//   Portal: SelectPortal,
//   Content: SelectContent,
//   Item: SelectItem,
// } = Select;

export {
  // SelectDivider,
  // SelectLabel,
  // SelectRigger,
  // SelectPortal,
  // SelectContent,
  // SelectItem,
  Select,
};

// export const Select = withStaticProperties(SelectRoot, {
//   Label: SelectLabel,
//   Trigger: SelectTrigger,
//   Input: SelectInput,
//   Icon: SelectIcon,
//   Content: SelectContent,
//   Option: SelectOption,
// });

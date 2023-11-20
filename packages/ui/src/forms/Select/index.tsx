'use client';
import { composeRefs, createScope } from '@crossed/core';
import { GetProps, merge } from '@crossed/styled';
import { styled } from '@crossed/styled';
import {
  HtmlHTMLAttributes,
  PropsWithChildren,
  ReactNode,
  forwardRef,
} from 'react';
import { Pressable } from 'react-native';
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

const SelectTriggerFrame = styled(Pressable, {
  extends: ButtonFrame.styles,
  className: ['cursor-pointer'],
  props: { role: 'button' },
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

const SelectItem = styled(Pressable, {
  extends: ButtonFrame.styles,
  className: ['cursor-pointer border-0'],
  props: { role: 'button' },
});

type SelectTriggerProps = GetProps<typeof SelectTriggerFrame>;

const SelectTrigger = forwardRef((props: SelectTriggerProps, ref: any) => {
  const { getReferenceProps, refs } = useFloatingProvider();
  return (
    <SelectTriggerFrame
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

const Select = createSelect({
  Root: forwardRef(({ children, ...props }: SelectPropsBase, ref: any) => {
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
          <YBox
            {...props}
            className={merge(props.className, 'flex flex-col')}
            ref={ref}
          >
            {children}
          </YBox>
        </PortalProvider>
      </FloatingProvider>
    );
  }),
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

type SelectPropsWithChildren = GetProps<typeof Select> & {
  items?: never;
  label?: never;
  children?: ReactNode;
};
type SelectPropsWithOutChildren = GetProps<typeof Select> & {
  items?: { value: string; label: string }[];
  label?: string;
  children?: never;
};

const SelectCompact = forwardRef(
  (
    {
      label,
      items,
      children,
      ...props
    }: SelectPropsWithChildren | SelectPropsWithOutChildren,
    ref
  ) => {
    const { value } = props;
    return (
      <Select {...props} ref={ref}>
        {children ??
          [
            label && <Select.Label key={'Select.Label'}>{label}</Select.Label>,
            <Select.Trigger key="Select.Trigger" aria-label={label || 'Select'}>
              {value}
            </Select.Trigger>,
            <Select.Content key="Select.Content">
              {items?.map(({ value: v, label: l }) => (
                <Select.Item key={v} value={v} aria-label={l}>
                  {l}
                </Select.Item>
              ))}
            </Select.Content>,
          ].filter(Boolean)}
      </Select>
    );
  }
);

export {
  // SelectDivider,
  // SelectLabel,
  // SelectRigger,
  // SelectPortal,
  // SelectContent,
  // SelectItem,
  SelectCompact,
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

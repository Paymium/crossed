import {
  composeEventHandlers,
  composeRefs,
  createScope,
  cx,
  useUncontrolled,
  withStaticProperties,
} from '@mergeui/core';
import {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  forwardRef,
  memo,
  useState,
} from 'react';
import { Input, InputContentFrame } from './Input';
import type { GetProps } from '../types';
import {
  FocusScope,
  useFocusManager,
  useFocusWithin,
  useKeyboard,
} from 'react-aria';
import { Box } from '../layout/Box';
import { UilAngleDown } from '@mergeui/unicons';
import { Portal } from '@gorhom/portal';
import {
  FloatingFocusManager,
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

type InputProps = GetProps<typeof Input>;

type ProviderContext = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  setValue: (prama: any) => void;
  size: InputProps['size'];
  variant: InputProps['variant'];
  color: InputProps['color'];
  value: string;
  placeholder?: string;
};

const [Provider, useContext] = createScope<ProviderContext>(
  {} as ProviderContext
);

type FloatingProvider = ReturnType<typeof useFloating> &
  ReturnType<typeof useInteractions>;

const [FloatingProvider, useFloatingProvider] = createScope<FloatingProvider>(
  {} as FloatingProvider
);

const SelectTrigger = memo(
  forwardRef((props: GetProps<typeof Input.Content>, ref) => {
    const { setOpen, open } = useContext();
    const { getReferenceProps, refs } = useFloatingProvider();
    const { keyboardProps } = useKeyboard({
      onKeyDown: (e) => {
        e.preventDefault();
        (e.code === 'ArrowUp' || e.code === 'ArrowDown') && setOpen(true);
      },
    });
    return (
      <Input.Content
        {...(keyboardProps as any)}
        className="cursor-pointer"
        states={{ isFocus: open }}
        ref={composeRefs(refs.setReference, ref)}
        {...getReferenceProps()}
        {...props}
        onPress={composeEventHandlers(() => {
          setOpen((e) => !e);
        }, props?.onPress)}
      />
    );
  })
);

const SelectLabel = Input.Label;
const SelectIcon = Input.Icon;

const SelectInput = memo((props: GetProps<typeof Input.Input>) => {
  const { placeholder } = useContext();
  return (
    <Input.Input
      editable={false}
      selectTextOnFocus={false}
      selection={{ start: 0, end: 0 }}
      {...props}
      placeholder={placeholder}
      className={cx('cursor-pointer', props.className)}
    />
  );
});

const SelectContent = memo(({ children, ...props }: GetProps<typeof Box>) => {
  const context = useContext();
  const { setOpen, open, variant, size, color } = context;
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setOpen,
  });
  const {
    context: contextFloating,
    refs,
    floatingStyles,
    getFloatingProps,
  } = useFloatingProvider();

  return !open ? null : (
    <FloatingFocusManager context={contextFloating} modal={false}>
      <Portal>
        <Provider {...context}>
          <Box
            ref={refs.setFloating}
            style={{ ...floatingStyles, zIndex: 30 }}
            {...getFloatingProps()}
          >
            <Box
              {...(focusWithinProps as any)}
              {...props}
              className={cx(
                InputContentFrame.styles({ variant, size, color }),
                'flex-col z-30',
                props.className
              )}
            >
              <FocusScope restoreFocus autoFocus>
                {children}
              </FocusScope>
            </Box>
          </Box>
        </Provider>
      </Portal>
    </FloatingFocusManager>
  );
});

const SelectOption = memo(
  ({ value: valueProps, label }: { value: string; label: string }) => {
    const focusManager = useFocusManager();
    const { setOpen, setValue, size, variant, color, value } = useContext();

    const { keyboardProps } = useKeyboard({
      onKeyDown: (e) => {
        e.preventDefault();
        switch (e.key) {
          case 'Escape':
            setOpen(false);
            break;
          case 'ArrowDown':
            focusManager.focusNext({ wrap: true });
            break;
          case 'ArrowUp':
            focusManager.focusPrevious({ wrap: true });
            break;
          case 'Enter':
            setOpen(false);
            setValue(label);
            break;
        }
      },
    });

    return (
      <Input
        value={label}
        size={size}
        variant={valueProps === value ? 'filled' : variant}
        color={valueProps === value ? 'blue' : color}
      >
        <Input.Label className="hidden">{label}</Input.Label>
        <Input.Content
          {...(keyboardProps as any)}
          className="border-0 ring-0 focus:dark:bg-zinc-600 focus-visible:!ring-offset-transparent focus-visible:!ring-transparent focus-visible:shadow-none"
          onPress={() => {
            setOpen(false);
            setValue(label);
          }}
        >
          <Input.Input
            className="cursor-pointer"
            editable={false}
            focusable={false}
            // tabIndex={-1}
            aria-disabled
          />
        </Input.Content>
      </Input>
    );
  }
);

type SelectProps<V extends string = string> = {
  size?: InputProps['size'];
  variant?: InputProps['variant'];
  color?: InputProps['color'];
  value?: V;
  defaultValue?: V;
  onChangeValue?: (value: V) => void;
  open?: boolean;

  placeholder?: string;
  items?: { value: string; label: string }[];
  label?: string;
};

function SelectRoot(
  params: Omit<PropsWithChildren<SelectProps>, 'children'>
): ReactNode;
function SelectRoot(
  params: Omit<PropsWithChildren<SelectProps>, 'items'>
): ReactNode;
function SelectRoot({
  size = 'md',
  variant = 'outlined',
  color = 'zinc',
  children,
  open: openProps = false,
  items,
  label,
  value: valueProps,
  defaultValue,
  onChangeValue,
  placeholder,
}: PropsWithChildren<SelectProps>) {
  const [open, setOpen] = useState(openProps);

  const [value, setValue] = useUncontrolled({
    value: valueProps,
    defaultValue,
    finalValue: '',
    onChange: onChangeValue,
  });

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
    <Provider
      setOpen={setOpen}
      open={open}
      setValue={setValue}
      size={size}
      variant={variant}
      color={color}
      value={value}
      placeholder={placeholder}
    >
      <FloatingProvider {...floating} {...interactions}>
        <Input size={size} variant={variant} color={color} value={value}>
          {children ??
            [
              label && <SelectLabel key={'Select.Label'}>{label}</SelectLabel>,
              <SelectTrigger key="Select.Trigger">
                <SelectInput />
                <SelectIcon>
                  <UilAngleDown />
                </SelectIcon>
              </SelectTrigger>,
              <SelectContent key="Select.Content">
                {items?.map(({ value: v, label: l }) => (
                  <SelectOption key={v} value={v} label={l} />
                ))}
              </SelectContent>,
            ].filter(Boolean)}
        </Input>
      </FloatingProvider>
    </Provider>
  );
}

export const Select = withStaticProperties(SelectRoot, {
  Label: SelectLabel,
  Trigger: SelectTrigger,
  Input: SelectInput,
  Icon: SelectIcon,
  Content: SelectContent,
  Option: SelectOption,
});

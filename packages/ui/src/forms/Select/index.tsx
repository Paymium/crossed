/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  type UseUncontrolledInput,
  composeEventHandlers,
  useUncontrolled,
  withStaticProperties,
} from '@crossed/core';
import {
  useCallback,
  memo,
  type ReactNode,
  useRef,
  Children,
  isValidElement,
  type PropsWithChildren,
} from 'react';
import { Button, type ButtonProps } from '../Button';
import { type MenuItemProps, MenuList } from '../../display/MenuList';
import { Pressable, View, type LayoutRectangle } from 'react-native';
import { form } from '../../styles/form';
import { useSelectProvider } from './context';
import { Provider } from './Provider';
import type { BottomSheetMethods } from '@devvie/bottom-sheet';
import { useSelect } from './styles';
import { ContentImpl } from './ContentImpl';
import { useFocusScope } from 'react-focus-lock';

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

const SelectRoot = memo(
  <V extends string | number>({
    value: valueProps,
    defaultValue,
    finalValue,
    onChange,
    variant,
    children,
    adapt = true,
  }: PropsWithChildren<
    UseUncontrolledInput<V> &
      Partial<Pick<ButtonProps, 'variant'>> & { adapt?: boolean }
  >) => {
    const bottomSheetModalRef = useRef<BottomSheetMethods>(null);
    const renderValue = useRef<ReactNode>();
    const triggerLayout = useRef<LayoutRectangle | undefined>();
    const [value, setValue] = useUncontrolled<string | number>({
      value: valueProps,
      defaultValue,
      finalValue,
      onChange: (e) => {
        onChange?.(e as any);
        bottomSheetModalRef.current?.close();
      },
    });
    const [open, setOpen] = useUncontrolled<boolean>({
      defaultValue: false,
    });
    renderValue.current = findChild(children, value) || 'rien trouvé';
    return (
      <Provider
        value={value}
        setValue={setValue}
        open={open}
        setOpen={setOpen}
        renderValue={renderValue}
        variant={variant}
        triggerLayout={triggerLayout}
        sheet={bottomSheetModalRef}
        adapt={adapt}
      >
        {children}
      </Provider>
    );
  }
);

// @ts-expect-error because id not exists in type
SelectRoot.id = 'Select';
SelectRoot.displayName = 'Select';

const Trigger = withStaticProperties(
  memo((props: ButtonProps) => {
    const pressableRef = useRef<View>(null);
    const { setOpen, open, variant, triggerLayout, sheet } =
      useSelectProvider();
    const onPress = useCallback(
      composeEventHandlers(() => {
        if (sheet.current) {
          sheet.current.open();
          setOpen(!open);
        } else {
          pressableRef.current?.measure(
            (_x, _y, width, height, pageX, pageY) => {
              triggerLayout.current = {
                left: pageX,
                top: pageY,
                width,
                height,
                pageX,
                pageY,
              } as any;
              setOpen(!open);
            }
          );
        }
      }, props.onPress),
      [props.onPress, open]
    );
    return (
      <Pressable
        ref={pressableRef}
        variant={variant}
        onLayout={({ nativeEvent: { layout } }: any) => {
          triggerLayout.current = layout;
        }}
        {...props}
        style={({ pressed }) =>
          form.input.rnw({
            ...props,
            active: props.active ?? (pressed || open),
          }).style
        }
        onPress={onPress}
      />
    );
  }),
  { Text: Button.Text }
);

const Option = ({
  value,
  ...props
}: MenuItemProps & { value: string | number }) => {
  const { setOpen, setValue, value: valueGlobal } = useSelectProvider();
  const { focusNext, focusPrev } = useFocusScope();
  return (
    <MenuList.Item
      {...{
        onKeyDown: (e) => {
          if (e.code === 'ArrowDown') {
            focusNext();
          } else if (e.code === 'ArrowUp') {
            focusPrev();
          } else if (e.code === 'Tab') {
            setOpen(false);
          }
        },
      }}
      active={value === valueGlobal}
      {...props}
      style={({ pressed }) => useSelect.options.rnw({ active: pressed }).style}
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

const Select = withStaticProperties(SelectRoot, {
  Option,
  Content: ContentImpl,
  Trigger,
  Value,
});

const {
  Option: SelectOption,
  Content: SelectContent,
  Value: SelectValue,
} = Select;

export { Select, SelectOption, SelectContent, SelectValue };

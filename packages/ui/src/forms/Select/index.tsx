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
  composeRefs,
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
import { Pressable, TextInput, View, type LayoutRectangle } from 'react-native';
import { form } from '../../styles/form';
import { useSelectProvider } from './context';
import { Provider } from './Provider';
import type { BottomSheetMethods } from '@devvie/bottom-sheet';
import { useSelect } from './styles';
import { ContentImpl } from './ContentImpl';
import { Text } from '../../typography/Text';
import { VisibilityHidden } from '@crossed/primitive';
import { useFocusScope } from './Focus';
import { ChevronDown } from '@crossed/unicons/ChevronDown';
import { composeStyles } from '@crossed/styled';
import { useFloating } from './useFloating';

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
  <V extends string>({
    value: valueProps,
    defaultValue,
    finalValue,
    onChange,
    variant,
    children,
    adapt = true,
    onFocus,
    onBlur,
    id,
    hover,
    focus,
  }: PropsWithChildren<
    UseUncontrolledInput<V> &
      Partial<
        Pick<
          ButtonProps,
          'variant' | 'onFocus' | 'onBlur' | 'id' | 'hover' | 'focus'
        >
      > & {
        adapt?: boolean;
      }
  >) => {
    const { refs, floatingStyles } = useFloating();
    const bottomSheetModalRef = useRef<BottomSheetMethods>(null);
    const renderValue = useRef<ReactNode>();
    const triggerLayout = useRef<LayoutRectangle | undefined>();
    const [value, setValue] = useUncontrolled<V>({
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
    renderValue.current = findChild(children, value) || '';
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
        onFocus={onFocus}
        onBlur={onBlur}
        id={id}
        hover={hover}
        focus={focus}
        refs={refs}
        floatingStyles={floatingStyles}
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
  memo(({ children, ...props }: ButtonProps) => {
    const pressableRef = useRef<View>(null);
    const {
      setOpen,
      open,
      triggerLayout,
      sheet,
      hover,
      focus,
      id,
      onBlur,
      onFocus,
      value,
      refs,
    } = useSelectProvider();
    const onPressIn = useCallback(() => {
      if (sheet.current) {
        sheet.current.open();
        setOpen(!open);
      } else {
        pressableRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
          triggerLayout.current = {
            left: pageX,
            top: pageY,
            width,
            height,
            pageX,
            pageY,
          } as any;
          setOpen(!open);
        });
      }
    }, [open, setOpen, sheet, triggerLayout]);
    const inputRender = (
      <VisibilityHidden hide>
        <TextInput id={id} focusable={false} value={value} />
      </VisibilityHidden>
    );

    return (
      <Pressable
        role="button"
        onLayout={({ nativeEvent: { layout } }) => {
          triggerLayout.current = layout;
        }}
        {...props}
        ref={composeRefs(pressableRef, refs.setReference as any)}
        onFocus={composeEventHandlers(props.onFocus, onFocus)}
        onBlur={composeEventHandlers(props.onBlur, onBlur)}
        style={({ pressed }) => {
          return composeStyles(form.input, useSelect.trigger).rnw({
            ...props,
            hover,
            'focus': focus ?? open,
            'focus-visible': focus ?? open,
            'active': props.active ?? pressed,
          }).style;
        }}
        onPressIn={composeEventHandlers(props.onPressIn, onPressIn)}
      >
        {typeof children === 'function' ? (
          (e) => (
            <>
              {inputRender}
              {children(e)}
              <ChevronDown {...useSelect.icon.style()} />
            </>
          )
        ) : (
          <>
            {inputRender}
            {children}
            <ChevronDown {...useSelect.icon.style()} />
          </>
        )}
      </Pressable>
    );
  }),
  { Text: Button.Text }
);

const Option = ({ value, ...props }: MenuItemProps & { value: string }) => {
  const { setOpen, setValue, value: valueGlobal } = useSelectProvider();
  const focusProps = useFocusScope();
  return (
    <MenuList.Item
      active={value === valueGlobal}
      {...props}
      {...focusProps}
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
  return <Text {...useSelect.value.rnw()}>{renderValue.current}</Text>;
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

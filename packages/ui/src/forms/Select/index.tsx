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
import { useSelectProvider, type Context } from './context';
import { Provider } from './Provider';
import type { BottomSheetMethods } from '@devvie/bottom-sheet';
import { useSelect } from './styles';
import { ContentImpl } from './ContentImpl';
import { Text } from '../../typography/Text';
import { VisibilityHidden } from '@crossed/primitive';
import { useFocusScope } from './Focus';
import { ChevronDown } from '@crossed/unicons';
import { composeStyles } from '@crossed/styled';
import { useFloating } from './useFloating';
import { FormControl, FormField, FormLabel } from '../Form';
import { XBox } from '../../layout/XBox';
import { YBox } from '../../layout/YBox';
import { CloseButton } from '../../other/CloseButton';

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

type SelectProps = PropsWithChildren<
  UseUncontrolledInput<string> &
    Partial<Pick<ButtonProps, 'variant' | 'onFocus' | 'onBlur' | 'id'>> & {
      adapt?: boolean;
    } & Partial<
      Pick<Context, 'label' | 'description' | 'extra' | 'clearable' | 'error'>
    >
>;

const SelectRoot = memo(
  ({
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
    // hover,
    // focus,
    label,
    description,
    extra,
    clearable,
    error,
  }: SelectProps) => {
    const { refs, floatingStyles } = useFloating();
    const bottomSheetModalRef = useRef<BottomSheetMethods>(null);
    const renderValue = useRef<ReactNode>();
    const triggerLayout = useRef<LayoutRectangle | undefined>();
    const [value, setValue] = useUncontrolled<string>({
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
        // hover={hover}
        // focus={focus}
        refs={refs}
        floatingStyles={floatingStyles}
        label={label}
        description={description}
        extra={extra}
        clearable={clearable}
        error={error}
      >
        <FormField>{children}</FormField>
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
      // hover,
      // focus,
      id,
      onBlur,
      onFocus,
      value,
      refs,
      label,
      description,
      extra,
      clearable,
      error,
    } = useSelectProvider();
    const onPress = useCallback(() => {
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
    const showClear = clearable && value;

    const states = {
      // hover,
      'focus': open,
      'focus-visible': open,
      // 'active': props.active,
    };

    return (
      <YBox space="xxs">
        {(label || description || extra) && (
          <XBox alignItems="center" space="xxs">
            {label && <FormLabel {...states}>{label}</FormLabel>}
            {description && (
              <Text style={form.labelDescription}>{description}</Text>
            )}
            {extra && (
              <Text style={form.labelExtra} textAlign="right">
                {extra}
              </Text>
            )}
          </XBox>
        )}
        <XBox>
          <FormControl>
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
                return composeStyles(
                  form.input,
                  error && form.inputError,
                  useSelect.trigger,
                  props.style
                ).rnw({
                  // ...states,
                  active: pressed,
                }).style;
              }}
              onPress={composeEventHandlers(props.onPress, onPress)}
            >
              {typeof children === 'function' ? (
                (e) => (
                  <>
                    {inputRender}
                    {children(e)}
                    <ChevronDown
                      {...useSelect.icon.style()}
                      color={form.placeholder.style().style.color}
                    />
                  </>
                )
              ) : (
                <>
                  {inputRender}
                  {children}
                  <ChevronDown
                    {...useSelect.icon.style()}
                    color={form.placeholder.style().style.color}
                  />
                </>
              )}
            </Pressable>
          </FormControl>
          {showClear && (
            <XBox style={form.elementRight}>
              <CloseButton />
            </XBox>
          )}
        </XBox>
        {error && <Text color="error">{error.toString()}</Text>}
      </YBox>
    );
  }),
  { Text: Button.Text }
);

const Option = ({ value, ...props }: MenuItemProps & { value: string }) => {
  const { setOpen, setValue } = useSelectProvider();
  const focusProps = useFocusScope();
  return (
    <MenuList.Item
      // active={value === valueGlobal}
      {...props}
      {...focusProps}
      style={useSelect.options}
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
  return <Text style={useSelect.value}>{renderValue.current}</Text>;
};

Value.id = 'Select.Value';
Value.displayName = 'Select.Value';

const Select = /*#__PURE__*/ withStaticProperties(SelectRoot, {
  Option,
  Content: ContentImpl,
  Trigger,
  Value,
});

const {
  Option: /*#__PURE__*/ SelectOption,
  Content: /*#__PURE__*/ SelectContent,
  Value: /*#__PURE__*/ SelectValue,
} = Select;

export { Select, SelectOption, SelectContent, SelectValue };

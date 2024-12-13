/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  type UseUncontrolledInput,
  useUncontrolled,
  withStaticProperties,
} from '@crossed/core';
import {
  memo,
  type ReactNode,
  useRef,
  Children,
  isValidElement,
  type PropsWithChildren,
  useId,
} from 'react';
import { type ButtonProps } from '../../buttons/Button';
import { MenuList } from '../../display/MenuList';
import { type LayoutRectangle } from 'react-native';
import { useSelectProvider, type Context, Value } from './context';
import { Provider } from './Provider';
import type { BottomSheetMethods } from '@devvie/bottom-sheet';
import { useSelect } from './styles';
import { SelectContent } from './ContentImpl';
import { Text, TextProps } from '../../typography/Text';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { useFloating } from './useFloating';
import { FormField } from '../Form';
import { XBox } from '../../layout/XBox';
import { SelectTrigger } from './Trigger';
import { SelectOption } from './Option';

const findChild = (
  children: ReactNode | ReactNode[] | ((_args: any) => ReactNode),
  value: Value
): ReactNode[] | undefined => {
  if (!children) {
    return undefined;
  }
  return typeof children === 'function'
    ? undefined
    : Children.toArray(children)
        .reduce<ReactNode[]>((acc, e) => {
          if (!isValidElement(e)) return acc;
          if (e.type && (e.type as any)?.displayName === 'Select.Option') {
            if (
              (Array.isArray(value) && value.includes(e.props?.value)) ||
              e.props?.value === value
            ) {
              acc.push(e.props.children);
            }
            return acc;
          } else {
            acc = findChild(e?.props?.children, value) || [];
          }
          return acc;
        }, [])
        .filter(Boolean);
};

type SelectProps = PropsWithChildren<
  UseUncontrolledInput<Value> &
    Partial<Pick<ButtonProps, 'variant' | 'onFocus' | 'onBlur' | 'id'>> &
    Partial<
      Pick<
        Context,
        | 'label'
        | 'description'
        | 'extra'
        | 'clearable'
        | 'error'
        | 'multiple'
        | 'searchable'
      >
    > & {
      adapt?: boolean;
    }
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
    searchable,
    id,
    multiple,
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
    const [value, setValue] = useUncontrolled<Value>({
      value: valueProps,
      defaultValue: defaultValue ?? (multiple ? [] : ''),
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
        searchable={searchable}
        // hover={hover}
        // focus={focus}
        refs={refs}
        floatingStyles={floatingStyles}
        label={label}
        description={description}
        extra={extra}
        clearable={clearable}
        error={error}
        multiple={multiple}
      >
        <FormField>{children}</FormField>
      </Provider>
    );
  }
);

// @ts-expect-error because id not exists in type
SelectRoot.id = 'Select';
SelectRoot.displayName = 'Select';

const SelectOptionText = (props: TextProps) => {
  return <MenuList.Title {...props} />;
};
SelectOptionText.displayName = 'Select.Option.Text';

const SelectValue = ({ style, ...props }: Omit<TextProps, 'children'>) => {
  const { renderValue, multiple } = useSelectProvider();
  const id = useId();
  const tmp = Array.isArray(renderValue.current)
    ? renderValue.current
    : [renderValue.current];
  const toRender = tmp.length > 4 ? tmp.slice(0, 4) : tmp;

  return (
    <XBox style={inlineStyle(() => ({ base: { gap: 5 } }))}>
      {toRender.map((e, i) => (
        <Text
          key={`${id}-${e}`}
          {...props}
          style={composeStyles(
            useSelect.value,
            multiple &&
              inlineStyle(({ colors, space }) => ({
                base: {
                  backgroundColor: colors.info.light,
                  padding: space.xxs,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: colors.info.primary,
                  color: colors.info.dark,
                },
              })),
            style
          )}
        >
          {i === 3 ? '...' : e}
        </Text>
      ))}
    </XBox>
  );
};
SelectValue.id = 'Select.Value';
SelectValue.displayName = 'Select.Value';

const Select = /*#__PURE__*/ withStaticProperties(SelectRoot, {
  Option: withStaticProperties(SelectOption, { Text: SelectOptionText }),
  Content: SelectContent,
  Trigger: SelectTrigger,
  Value: SelectValue,
});

export { Select, SelectOption, SelectContent, SelectValue };

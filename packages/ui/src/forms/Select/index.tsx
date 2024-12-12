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
  useId,
  useEffect,
  useTransition,
} from 'react';
import { Button, type ButtonProps } from '../../buttons/Button';
import { type MenuListItemProps, MenuList } from '../../display/MenuList';
import { Pressable, TextInput, View, type LayoutRectangle } from 'react-native';
import { form } from '../../styles/form';
import { useSelectProvider, type Context, Value } from './context';
import { Provider } from './Provider';
import type { BottomSheetMethods } from '@devvie/bottom-sheet';
import { useSelect } from './styles';
import { SelectContent } from './ContentImpl';
import { Text, TextProps } from '../../typography/Text';
import { VisibilityHidden } from '@crossed/primitive';
import { useFocusScope } from './Focus';
import { Check, ChevronDown } from '@crossed/unicons';
import { composeStyles, inlineStyle, useTheme } from '@crossed/styled';
import { useFloating } from './useFloating';
import { FormControl, FormField, FormLabel } from '../Form';
import { XBox } from '../../layout/XBox';
import { YBox } from '../../layout/YBox';
import { CloseButton } from '../../buttons/CloseButton';
import { Box, Center } from '../../layout';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';

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

const SelectTrigger = withStaticProperties(
  memo<ButtonProps>(({ children, ...props }: ButtonProps) => {
    const pressableRef = useRef<View>(null);
    const {
      setOpen,
      open,
      triggerLayout,
      sheet,
      // hover,
      // focus,
      searchable,
      id,
      onBlur,
      onFocus,
      setValue,
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
    const showClear = clearable && value;

    const handleClear = useCallback(() => setValue(''), [setValue]);
    const inputRef = useRef<TextInput>();

    useEffect(() => {
      if (!open) {
        inputRef.current?.blur();
      }
    }, [open]);

    const states = {
      // hover,
      'focus': open,
      'focus-visible': open,
      // 'active': props.active,
    };
    const [, setTransition] = useTransition();

    const handleRender = useCallback(
      (e) =>
        searchable && open ? (
          <Input
            autoFocus
            style={inlineStyle(() => ({ base: { flexGrow: 1 } }))}
            ref={inputRef}
            onBlur={() => {
              setTimeout(() => setOpen(false), 200);
            }}
            elementRight={
              <ChevronDown
                {...useSelect.icon.style()}
                color={form.placeholder.style().style.color}
              />
            }
          />
        ) : (
          <>
            <VisibilityHidden hide>
              <TextInput
                id={id}
                focusable={false}
                value={Array.isArray(value) ? value.join(', ') : value}
              />
            </VisibilityHidden>
            {typeof children === 'function' ? children(e) : children}
            <ChevronDown
              {...useSelect.icon.style()}
              color={form.placeholder.style().style.color}
            />
          </>
        ),
      [children, searchable, open]
    );

    return (
      <YBox space="xxs">
        {!!(label || description || extra) && (
          <XBox alignItems="center" space="xxs">
            {!!label && <FormLabel {...states}>{label}</FormLabel>}
            {!!description && (
              <Text style={form.labelDescription}>{description}</Text>
            )}
            {!!extra && (
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
                  (!searchable || (searchable && !open)) && form.input,
                  inlineStyle(() => ({ base: { flex: 1 } })),
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
              {handleRender}
            </Pressable>
          </FormControl>
          {showClear && (
            <XBox
              style={composeStyles(
                form.elementRight,
                inlineStyle(({ space }) => ({
                  base: { marginRight: space.md },
                }))
              )}
            >
              <CloseButton onPress={handleClear} />
            </XBox>
          )}
        </XBox>
        {!!error && <Text color="error">{error.toString()}</Text>}
      </YBox>
    );
  }),
  { Text: Button.Text }
);
SelectTrigger.displayName = 'Select.Trigger';

type SelectOptionProps = MenuListItemProps & { value: string };
const SelectOption = ({ value, children, ...props }: SelectOptionProps) => {
  const {
    setOpen,
    setValue,
    value: valueGlobal,
    multiple,
  } = useSelectProvider();
  const focusProps = useFocusScope();
  const { colors } = useTheme();
  const handleRender = useCallback(
    (e) => {
      const checked =
        value === valueGlobal ||
        (Array.isArray(valueGlobal) && valueGlobal.includes(value));
      return (
        <XBox space={'xxs'}>
          {multiple && <Checkbox checked={checked} onChecked={onPress} />}
          {typeof children === 'function' ? children(e) : children}
        </XBox>
      );
    },
    [colors, children, multiple, valueGlobal, value]
  );
  const onPress = useCallback(() => {
    if (!multiple) setOpen(false);
    if (multiple && Array.isArray(valueGlobal)) {
      setValue(
        valueGlobal.includes(value)
          ? valueGlobal.filter((t) => t !== value)
          : [...valueGlobal, value]
      );
      return;
    }
    setValue(value);
  }, [setOpen, setValue, valueGlobal, multiple, value]);
  return (
    <MenuList.Item
      {...props}
      {...focusProps}
      style={composeStyles(
        useSelect.options,
        value === valueGlobal &&
          inlineStyle(({ colors }) => ({
            base: { backgroundColor: colors.background.active },
            ':hover': { backgroundColor: colors.background.active },
          }))
      )}
      onPress={composeEventHandlers(onPress, props.onPress)}
    >
      {handleRender}
    </MenuList.Item>
  );
};
SelectOption.displayName = 'Select.Option';

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

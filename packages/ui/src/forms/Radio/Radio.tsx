/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  createScope,
  useUncontrolled,
  withStaticProperties,
} from '@crossed/core';
import { composeStyles, CrossedMethods, inlineStyle } from '@crossed/styled';
import {
  forwardRef,
  memo,
  RefAttributes,
  useCallback,
  useTransition,
  type PropsWithChildren,
  useId,
  ComponentProps,
} from 'react';
import { Pressable, PressableProps, View, ViewProps } from 'react-native';
import { Text } from '../../typography/Text';
import { alignSelfStyle, form } from '../../styles';
import { XBox, YBox } from '../../layout';
import { pressableStyles, rootStyles, thumbStyles } from './styles';

type RadioContext = { checked: boolean; id: string };
const [RadioProvider, useRadioContext] = createScope<RadioContext>({
  checked: false,
} as RadioContext);

type RadioGroupContext = {
  value?: string;
  setValue: (_v: string) => void;
  disabled?: boolean;
};
const [RadioGroupProvider, useRadioGroupContext] =
  createScope<RadioGroupContext>({} as RadioGroupContext);

type RadioStateInteraction = {
  active: boolean;
  hover: boolean;
  disabled: boolean;
};
const [RadioInteractionProvider, useStateInteraction] =
  createScope<RadioStateInteraction>({
    active: false,
    hover: false,
    disabled: false,
  });

type RadioThumbProps = Omit<ViewProps, 'style'> & {
  style?: CrossedMethods<any>;
};
const RadioThumb = memo<RadioThumbProps & RefAttributes<View>>(
  forwardRef((props, ref) => {
    const { active, hover, disabled } = useStateInteraction();
    const { checked, id } = useRadioContext();
    return (
      <View
        ref={ref}
        role={'radio'}
        aria-checked={checked}
        aria-labelledby={id}
        {...props}
        {...composeStyles(
          rootStyles.default,
          alignSelfStyle.center,
          hover && rootStyles.hover,
          active && rootStyles.active,
          checked && rootStyles.checked,
          checked && active && rootStyles.checkedActive,
          disabled && rootStyles.disabled,
          props.style
        ).rnw()}
      >
        <View
          {...composeStyles(
            thumbStyles.default,
            checked && thumbStyles.checked,
            disabled && checked && thumbStyles.checkedDisabled
          ).rnw()}
        />
      </View>
    );
  })
);

type RadioItemProps = PropsWithChildren<
  Omit<PressableProps, 'style' | 'children'> & {
    /**
     * value of radio
     */
    value: string;

    disabled?: boolean;
    style?: CrossedMethods<any>;
  }
>;

type RadioItemPresetProps = Omit<RadioItemProps, 'children'> & {
  noThumb?: boolean;
  label?: string;
  helperText?: string;
};

export const RadioItem = ({
  children,
  disabled,
  style,
  value,
  id: idProps,
  ...props
}: RadioItemProps) => {
  const localId = useId();
  const id = idProps ?? localId;
  const [, setTransition] = useTransition();
  const { setValue, value: valueContext } = useRadioGroupContext();

  const handlePress = useCallback(
    (e) => {
      props.onPress?.(e);
      setTransition(() => {
        setValue(value);
      });
    },
    [setValue, value, setTransition, props.onPress]
  );

  return (
    <RadioProvider checked={valueContext === value} id={id}>
      <Pressable
        // @ts-expect-error error react-native react-native-web
        accessibilityRole={'label'}
        {...props}
        onPress={disabled ? undefined : handlePress}
        disabled={disabled}
        style={({
          pressed,
          hovered,
          focused,
        }: {
          pressed: boolean;
          hovered?: boolean;
          focused?: boolean;
        }) =>
          composeStyles(pressableStyles.pressable, style).rnw({
            active: pressed,
            hover: hovered,
            focus: focused,
          }).style
        }
      >
        {({ hovered, pressed }: { hovered?: boolean; pressed: boolean }) => (
          <RadioInteractionProvider
            hover={hovered}
            active={pressed}
            disabled={disabled}
          >
            {children}
          </RadioInteractionProvider>
        )}
      </Pressable>
    </RadioProvider>
  );
};
RadioItem.displayName = 'RadioItem';

const RadioLabel = (props: ComponentProps<typeof Text>) => {
  return (
    <Text
      fontSize={'sm'}
      {...props}
      style={composeStyles(form.label, props.style)}
    />
  );
};
RadioLabel.displayName = 'RadioLabel';
const RadioHelper = (props: ComponentProps<typeof Text>) => {
  return <Text fontSize={'sm'} color={'tertiary'} {...props} />;
};
RadioHelper.displayName = 'RadioHelper';

const RadioItemPreset = ({
  noThumb,
  label,
  helperText,
  id: idProps,
  ...props
}: RadioItemPresetProps) => {
  const localId = useId();
  const id = idProps ?? localId;
  return (
    <RadioItem {...props} id={id}>
      <YBox>
        <XBox space={'md'}>
          {!noThumb && <RadioThumb />}
          {!!label && <RadioLabel id={id}>{label}</RadioLabel>}
        </XBox>
        {!!helperText && (
          <XBox style={inlineStyle(() => ({ base: { paddingLeft: 24 } }))}>
            <RadioHelper>{helperText}</RadioHelper>
          </XBox>
        )}
      </YBox>
    </RadioItem>
  );
};

type RadioRoot = PropsWithChildren<{
  defaultValue?: string;
  value?: string;
  onValueChange?: (_v: string) => void;
  disabled?: boolean;
}>;

const RadioRoot = ({
  children,
  defaultValue,
  value: valueProps,
  onValueChange,
  disabled,
}: RadioRoot) => {
  const [value, setValue] = useUncontrolled({
    defaultValue: defaultValue,
    value: valueProps,
    onChange: onValueChange,
  });
  return (
    <RadioGroupProvider value={value} setValue={setValue} disabled={disabled}>
      {children}
    </RadioGroupProvider>
  );
};

export const Radio = withStaticProperties(RadioRoot, {
  Item: RadioItem,
  ItemPreset: RadioItemPreset,
  Thumb: RadioThumb,
  Label: RadioLabel,
  HelperText: RadioHelper,
});

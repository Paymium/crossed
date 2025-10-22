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
import { Check } from '@crossed/icons';
import {
  ComponentProps,
  forwardRef,
  memo,
  RefAttributes,
  useCallback,
  useId,
  useTransition,
} from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import { Implementation } from './Implementation';
import { Text } from '../../typography/Text';
import type { CheckboxComponent, CheckboxPresetProps } from './type';
import { alignSelfStyle, form } from '../../styles';
import { XBox, YBox } from '../../layout';
import { checkboxStyles } from './styles';

type CheckboxContext = { checked: boolean; id: string };
const [CheckboxProvider, useCheckboxContext] = createScope<CheckboxContext>({
  checked: false,
} as CheckboxContext);
type CheckboxStateInteraction = {
  active: boolean;
  hover: boolean;
  focus: boolean;
  disabled: boolean;
};
const [CheckboxInteractionProvider, useStateInteraction] =
  createScope<CheckboxStateInteraction>({
    active: false,
    hover: false,
    focus: false,
    disabled: false,
  });

type CheckboxThumbProps = Omit<ViewProps, 'style'> & {
  style?: CrossedMethods<any>;
};
const CheckboxThumb = memo<CheckboxThumbProps & RefAttributes<View>>(
  forwardRef((props, ref) => {
    const { checked, id } = useCheckboxContext();
    const { disabled, hover, active } = useStateInteraction();

    return (
      <View
        ref={ref}
        role={'checkbox'}
        aria-checked={checked}
        aria-labelledby={id}
        {...props}
        {...composeStyles(
          checkboxStyles.root,
          alignSelfStyle.center,
          checked && checkboxStyles.checked,
          disabled && checkboxStyles.disabled,
          !disabled && hover && checkboxStyles.hover,
          !disabled && active && checkboxStyles.active,
          props.style
        ).rnw()}
      >
        {checked && <Check size={15} color="primary.base.white" />}
      </View>
    );
  })
);
CheckboxThumb.displayName = 'Checkbox.Thumb';
type CheckboxLabelProps = ComponentProps<typeof Text>;
const CheckboxLabel = (props: CheckboxLabelProps) => {
  return (
    <Text
      fontSize={'sm'}
      {...props}
      style={composeStyles(form.label, props.style)}
    />
  );
};
CheckboxLabel.displayName = 'Checkbox.Label';
const CheckboxHelper = (props: ComponentProps<typeof Text>) => {
  return <Text fontSize={'sm'} color={'tertiary'} {...props} />;
};
CheckboxHelper.displayName = 'Checkbox.Helper';

const CheckboxRoot: CheckboxComponent = ({
  checked: checkedProps,
  defaultChecked = false,
  onChecked,
  children,
  disabled,
  style,
  ...props
}) => {
  const id = useId();
  const [checked, setChecked] = useUncontrolled({
    defaultValue: defaultChecked,
    value: checkedProps,
    onChange: onChecked,
  });
  const [, setTransition] = useTransition();

  const handlePress = useCallback(
    (e) => {
      props.onPress?.(e);
      setTransition(() => {
        setChecked(!checked);
      });
    },
    [setChecked, checked, setTransition, props.onPress]
  );

  const renderCallback = useCallback(
    ({
      pressed,
      focused,
      hovered,
    }: {
      pressed?: boolean;
      focused?: boolean;
      hovered?: boolean;
    }) => (
      <CheckboxInteractionProvider
        focus={focused}
        active={pressed}
        hover={hovered}
        disabled={disabled}
      >
        <Implementation checked={checked} setChecked={setChecked} />
        {children}
      </CheckboxInteractionProvider>
    ),
    [children, checked, setChecked, id, disabled, children]
  );

  return (
    <CheckboxProvider checked={checked} id={id}>
      <Pressable
        {...props}
        accessibilityRole={'label' as any}
        onPress={handlePress}
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
          composeStyles(checkboxStyles.pressable, style).rnw({
            active: pressed,
            hover: hovered,
            focus: focused,
          }).style
        }
      >
        {renderCallback}
      </Pressable>
    </CheckboxProvider>
  );
};
CheckboxRoot.displayName = 'Checkbox';

const CheckboxPreset = ({
  label,
  helperText,
  ...props
}: CheckboxPresetProps) => {
  return (
    <CheckboxRoot {...props}>
      <YBox>
        <XBox space={'md'}>
          <CheckboxThumb />
          {!!label && <CheckboxLabel>{label}</CheckboxLabel>}
        </XBox>

        {helperText && (
          <XBox style={inlineStyle(() => ({ base: { paddingLeft: 24 } }))}>
            <CheckboxHelper>{helperText}</CheckboxHelper>
          </XBox>
        )}
      </YBox>
    </CheckboxRoot>
  );
};
CheckboxPreset.displayName = 'Checkbox.Preset';

export const Checkbox = withStaticProperties(CheckboxRoot, {
  Thumb: CheckboxThumb,
  Label: CheckboxLabel,
  HelperText: CheckboxHelper,
  Preset: CheckboxPreset,
});

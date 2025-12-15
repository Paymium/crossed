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
import { composeStyles, createStyles, CrossedMethods } from '@crossed/styled';
import { Check } from '@crossed/unicons';
import {
  forwardRef,
  memo,
  RefAttributes,
  useCallback,
  useTransition,
} from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import { Implementation } from './Implementation';
import { Text } from '../../typography/Text';
import type { CheckboxComponent } from './type';

const checkboxStyles = createStyles((t) => ({
  pressable: {
    base: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      gap: t.space.xl,
    },
  },
  hover: { base: { borderColor: t.colors.border.tertiary } },
  disabled: {
    base: {
      backgroundColor: t.colors.primary['10'],
      borderColor: t.colors.primary['10'],
    },
  },
  active: {
    base: { borderColor: t.colors.border.tertiary },
    'web': {
      base: {
        transition: 'all 0.1s ease',
        boxShadow: `0px 0px 0px 2px ${t.colors.border.secondary}`,
      },
    },
  },
  root: {
    'base': {
      width: 16,
      height: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: t.colors.border.secondary,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
  },
  checked: {
    'base': {
      borderColor: t.colors.primary.primary,
      backgroundColor: t.colors.primary.primary,
    },
  },
  checkedActive: {
    base: {
      borderColor: t.colors.primary.primary,
      backgroundColor: t.colors.primary.primary,
    },
  },
}));

type CheckboxContext = { checked: boolean };
const [CheckboxProvider, useCheckboxContext] = createScope<CheckboxContext>({
  checked: false,
});
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
    const { checked } = useCheckboxContext();
    const { disabled, hover, active } = useStateInteraction();

    return (
      <View
        ref={ref}
        {...props}
        {...composeStyles(
          checkboxStyles.root,
          checked && checkboxStyles.checked,
          checked && !disabled && active && checkboxStyles.checkedActive,
          disabled && checkboxStyles.disabled,
          !disabled && hover && checkboxStyles.hover,
          !disabled && active && checkboxStyles.active,
          props.style
        ).rnw()}
      >
        {checked && <Check size={15} color="white" />}
      </View>
    );
  })
);
CheckboxThumb.displayName = 'Checkbox.Thumb';

const CheckboxRoot: CheckboxComponent = ({
  children,
  checked: checkedProps,
  defaultChecked = false,
  onChecked,
  noThumb,
  disabled,
  style,
  ...props
}) => {
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
        {!noThumb && <CheckboxThumb />}
        {typeof children === 'string' ? <Text>{children}</Text> : children}
      </CheckboxInteractionProvider>
    ),
    [children, checked, setChecked]
  );

  return (
    <CheckboxProvider checked={checked}>
      <Pressable
        {...props}
        role={'checkbox'}
        aria-checked={checked}
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

export const Checkbox = withStaticProperties(CheckboxRoot, {
  Thumb: CheckboxThumb,
});

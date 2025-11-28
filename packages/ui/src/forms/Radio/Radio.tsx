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
import {
  forwardRef,
  memo,
  RefAttributes,
  useCallback,
  useTransition,
  type PropsWithChildren,
} from 'react';
import { Pressable, PressableProps, View, ViewProps } from 'react-native';
import { Text } from '../../typography/Text';

const rootStyles = createStyles((t) => ({
  default: {
    base: {
      width: 16,
      height: 16,
      borderRadius: 44,
      borderWidth: 1,
      borderColor: t.colors.border.secondary,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: t.colors.background.secondary,
    },
  },
  hover: { base: { borderColor: t.colors.border.tertiary } },
  active: {
    base: { borderColor: t.colors.border.tertiary },
    web: {
      base: {
        transition: 'all 0.1s ease',
        boxShadow: `0px 0px 0px 2px ${t.colors.border.secondary}`,
      },
    },
  },
  disabled: {
    base: {
      backgroundColor: t.colors.primary['10'],
      borderColor: t.colors.primary['10'],
    },
  },
  checked: { base: { borderColor: t.colors.primary.primary } },
  checkedActive: { base: { borderColor: t.colors.primary.primary } },
}));

const pressableStyles = createStyles(({ space }) => ({
  pressable: {
    base: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      gap: space.md,
    },
  },
}));

const thumbStyles = createStyles((t) => ({
  default: {
    base: {
      width: 10,
      height: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'transparent',
      backgroundColor: 'transparent',
    },
  },
  checked: {
    base: {
      backgroundColor: t.colors.primary.primary,
      borderColor: t.colors.primary.primary,
    },
  },
  checkedActive: {
    base: {
      backgroundColor: t.colors.primary['1'],
      borderColor: t.colors.primary['1'],
    },
  },
  checkedDisabled: {
    base: {
      backgroundColor: t.colors.neutral['70'],
      borderColor: t.colors.neutral['70'],
    },
  },
}));

type RadioContext = { checked: boolean };
const [RadioProvider, useRadioContext] = createScope<RadioContext>({
  checked: false,
});

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
    const { checked } = useRadioContext();
    return (
      <View
        ref={ref}
        {...props}
        {...composeStyles(
          rootStyles.default,
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

type RadioRootProps = Omit<PressableProps, 'style' | 'children'> &
  PropsWithChildren<{
    /**
     * if true, radio is checked
     */
    checked?: boolean;

    /**
     * default checked value
     */
    defaultChecked?: boolean;

    /**
     * Call when checked value change
     */
    onChecked?: (_c: boolean) => void;

    disabled?: boolean;
    noThumb?: boolean;
    style?: CrossedMethods<any>;
  }>;
export const RadioRoot = ({
  children,
  disabled,
  checked: checkedProps,
  defaultChecked = false,
  onChecked,
  noThumb,
  style,
  ...props
}: RadioRootProps) => {
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

  return (
    <RadioProvider checked={checked}>
      <Pressable
        role={'radio'}
        aria-checked={checked}
        {...props}
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
            {!noThumb && <RadioThumb />}
            {typeof children === 'string' ? <Text>{children}</Text> : children}
          </RadioInteractionProvider>
        )}
      </Pressable>
    </RadioProvider>
  );
};
RadioRoot.displayName = 'Radio';

export const Radio = withStaticProperties(RadioRoot, { Thumb: RadioThumb });

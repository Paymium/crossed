/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import {
  type UseUncontrolledInput,
  composeEventHandlers,
  createScope,
  useUncontrolled,
  withStaticProperties,
} from '@crossed/core';
import { useCallback, type PropsWithChildren } from 'react';
import {
  Button,
  type ButtonProps,
  type ButtonTextProps,
} from '../forms/Button';
import { XBox, type XBoxProps } from '../layout/XBox';
import { YBox, type YBoxProps } from '../layout/YBox';
import { composeStyles, createStyles } from '@crossed/styled';
import { Pressable } from 'react-native';
import { Box } from '../layout/Box';
import { useInteraction } from '@crossed/styled';

const useStyles = createStyles((t) => ({
  list: {
    base: {
      // paddingBottom: t.space.xs,
    },
  },
  trigger: {
    base: {
      height: 44,
      paddingHorizontal: t.space.xs,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    variants: {
      disabled: {
        true: {
          base: {
            pointerEvents: 'none',
          },
        },
      },
    },
    // variants: {
    //   underline: {
    //     true: {
    //       'base': {
    //         borderRadius: 0,
    //         borderBottomWidth: 4,
    //         borderBottomColor: 'transparent',
    //       },
    //       ':active': {
    //         borderRadius: 0,
    //         borderBottomColor: t.colors.brand.bright,
    //       },
    //       ':hover': {
    //         borderRadius: 0,
    //         borderBottomColor: t.colors.brand.bright,
    //       },
    //     },
    //   },
    // },
  },
  indicatorActive: { base: { backgroundColor: t.colors.background.active } },
  indicator: {
    base: {
      height: 4,
      backgroundColor: 'transparent',
      borderRadius: 4,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    variants: {
      disabled: {
        true: {
          base: {
            backgroundColor: 'transparent',
            pointerEvents: 'none',
          },
        },
      },
    },
  },
  underline: {
    'base': { color: t.colors.neutral['600'] },
    ':hover': {
      // color: t.colors.brand.bright,
    },
  },
  disabled: {
    base: {
      // color: t.colors.neutral.low,
      pointerEvents: 'none',
    },
  },
  triggerText: {
    variants: {
      underline: {
        true: {
          'base': { color: t.colors.neutral['600'] },
          ':hover': {
            // color: t.colors.brand.bright,
          },
        },
      },
      disabled: {
        true: {
          base: {
            // color: t.colors.neutral.low,
            pointerEvents: 'none',
          },
        },
      },
    },
  },
}));

type TabsContext = Pick<ButtonProps, 'variant'> & {
  value: string | number;
  setValue: (_value: string | number) => void;
};
export const createTabs = () => {
  const [TabsProvider, useTabsContext] = createScope<TabsContext>(
    {} as TabsContext
  );
  const [TriggerProvider, useTriggerContext] = createScope<{
    disabled?: boolean;
    hover?: boolean;
  }>({});

  const TabsRoot = ({
    children,
    value: valueProps,
    defaultValue,
    finalValue,
    onChange,
    variant = undefined,
    ...props
  }: PropsWithChildren<
    Partial<Pick<TabsContext, 'variant'>> &
      UseUncontrolledInput<TabsContext['value']> &
      YBoxProps
  >) => {
    const [value, setValue] = useUncontrolled<TabsContext['value']>({
      value: valueProps,
      defaultValue,
      finalValue,
      onChange,
    });

    return (
      <TabsProvider value={value} variant={variant} setValue={setValue}>
        <YBox space="md" {...props}>
          {children}
        </YBox>
      </TabsProvider>
    );
  };

  const List = ({ style, ...props }: XBoxProps) => {
    return (
      <XBox
        space="xs"
        {...props}
        style={composeStyles(useStyles.list, style)}
      />
    );
  };

  const Panels = ({ children }: PropsWithChildren) => {
    return children;
  };

  const TabImpl = withStaticProperties(
    ({
      value: valueProps,
      children,
      disabled,
      ...props
    }: ButtonProps & Pick<TabsContext, 'value'>) => {
      const { setValue, value } = useTabsContext();

      const { state, props: interaction } = useInteraction(props);

      const onPress = useCallback(
        composeEventHandlers(() => {
          setValue(valueProps);
        }, props.onPress),
        [props.onPress, setValue]
      );

      return (
        <TriggerProvider
          {...state}
          disabled={disabled}
          hover={valueProps === value || state.hover}
        >
          <Pressable
            role="button"
            disabled={disabled}
            {...props}
            {...useStyles.trigger.rnw({
              ...state,
              hover: valueProps === value || state.hover,
              variants: { disabled },
            })}
            {...interaction}
            onPress={onPress}
          >
            {typeof children === 'function' ? (
              (e) => (
                <>
                  {children(e)}
                  <Box
                    style={composeStyles(
                      useStyles.indicator,
                      valueProps === value && useStyles.indicatorActive
                    )}
                    // {...useStyles.indicator.rnw({
                    //   hover: valueProps === value,
                    //   variants: { disabled },
                    // })}
                  />
                </>
              )
            ) : (
              <>
                {children}
                <Box
                  style={composeStyles(
                    useStyles.indicator,
                    valueProps === value && useStyles.indicatorActive
                  )}
                  // {...useStyles.indicator.rnw({
                  //   hover: valueProps === value,
                  //   variants: { disabled },
                  // })}
                />
              </>
            )}
          </Pressable>
        </TriggerProvider>
      );
    },
    {
      Text: (props: ButtonTextProps) => {
        const state = useTriggerContext();
        return (
          <Button.Text
            style={composeStyles(
              useStyles.triggerText,
              useStyles.underline,
              state.disabled && useStyles.disabled
            )}
            {...state}
            {...props}
          />
        );
      },
    }
  );
  const Panel = ({
    value: valueProps,
    children,
  }: PropsWithChildren<{ value: string | number }>) => {
    const { value } = useTabsContext();
    return valueProps === value ? children : null;
  };

  return withStaticProperties(TabsRoot, {
    List,
    Panels,
    Tab: TabImpl,
    Panel,
  });
};

const Tabs = createTabs();

const { List: TabList, Panels: TabPanels, Tab, Panel: TabPanel } = Tabs;
const { Text: TabText } = Tab;

export { Tabs, TabList, TabPanels, Tab, TabText, TabPanel };

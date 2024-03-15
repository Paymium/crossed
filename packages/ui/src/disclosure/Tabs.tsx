/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import {
  UseUncontrolledInput,
  composeEventHandlers,
  createScope,
  useUncontrolled,
  withDefaultProps,
  withStaticProperties,
} from '@crossed/core';
import { useCallback, type PropsWithChildren } from 'react';
import { Button, type ButtonProps } from '../forms/Button';
import { XBox } from '../layout/XBox';
import { withStyle } from '@crossed/styled';
import { YBox, YBoxProps } from '../layout/YBox';

type TabsContext = Pick<ButtonProps, 'variant' | 'size'> & {
  value: string | number;
  setValue: (_value: string | number) => void;
};
export const createTabs = () => {
  const [TabsProvider, useTabsContext] = createScope<TabsContext>(
    {} as TabsContext
  );

  const TabsRoot = ({
    children,
    value: valueProps,
    defaultValue,
    finalValue,
    onChange,
    variant = 'ghost',
    size = 'sm',
    ...props
  }: PropsWithChildren<
    Pick<TabsContext, 'variant' | 'size'> &
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
      <TabsProvider
        size={size}
        value={value}
        variant={variant}
        setValue={setValue}
      >
        <YBox space="md" {...props}>
          {children}
        </YBox>
      </TabsProvider>
    );
  };

  const List = withStyle(
    withDefaultProps(XBox, { space: 'xs' }),
    ({ theme: t }) => ({
      base: {
        borderBottomWidth: 1,
        borderColor: t.colors.neutral,
        paddingBottom: t.space.xs,
      },
    })
  );

  const Panels = ({ children }: PropsWithChildren) => {
    return children;
  };
  const TabImpl = withStaticProperties(
    ({
      value: valueProps,
      ...props
    }: ButtonProps & Pick<TabsContext, 'value'>) => {
      const { variant, setValue, size, value } = useTabsContext();

      const onPress = useCallback(
        composeEventHandlers(() => {
          setValue(valueProps);
        }, props.onPress),
        [props.onPress, setValue]
      );

      return (
        <Button
          variant={variant}
          size={size}
          active={valueProps === value}
          {...props}
          onPress={onPress}
        />
      );
    },
    { Text: Button.Text }
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

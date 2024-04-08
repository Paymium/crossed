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
import { Button, type ButtonProps } from '../forms/Button';
import { XBox, type XBoxProps } from '../layout/XBox';
import { YBox, type YBoxProps } from '../layout/YBox';
import { createStyles } from '@crossed/styled';

const useStyles = createStyles((t) => ({
  list: {
    base: {
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: t.colors.neutral,
      paddingBottom: t.space.xs,
    },
  },
}));

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
    Partial<Pick<TabsContext, 'variant' | 'size'>> &
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

  const List = (props: XBoxProps) => {
    return <XBox space="xs" {...props} {...useStyles.list.rnw()} />;
  };

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

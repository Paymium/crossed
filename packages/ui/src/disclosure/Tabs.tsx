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
import { styled } from '@crossed/styled';
import { YBox, YBoxProps } from '../layout/YBox';

type TabsContext = Pick<ButtonProps, 'variant' | 'size'> & {
  value: string | number;
  setValue: (_value: string | number) => void;
};

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

const List = withDefaultProps(
  styled(XBox, (t) => ({
    borderBottomWidth: 1,
    borderColor: t.colors.borderColor,
    paddingBottom: t.space.xs,
  })),
  { space: 'xs' }
);

const Panels = ({ children }: PropsWithChildren) => {
  return children;
};
const TabImpl = withStaticProperties(
  ({
    value: valueProps,
    ...props
  }: ButtonProps & Pick<TabsContext, 'value'>) => {
    const { variant, setValue, size } = useTabsContext();

    const onPress = useCallback(
      composeEventHandlers(() => {
        setValue(valueProps);
      }, props.onPress),
      [props.onPress, setValue]
    );

    return (
      <Button variant={variant} size={size} {...props} onPress={onPress} />
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

const Tabs = withStaticProperties(TabsRoot, {
  List,
  Panels,
  Tab: TabImpl,
  Panel,
});

const { List: TabList, Panels: TabPanels, Tab, Panel: TabPanel } = Tabs;

export { Tabs, TabList, TabPanels, Tab, TabPanel };

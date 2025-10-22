/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, PropsWithChildren } from 'react';
import { type TabsContext } from './context';
import { UseUncontrolledInput } from '@crossed/core';
import { YBox, YBoxProps } from '../../layout/YBox';
import { useTabs } from './useTabs';

export type RootProps = PropsWithChildren<
  Partial<Pick<TabsContext, 'variant' | 'size' | 'fullWidth'>> &
    UseUncontrolledInput<TabsContext['value']> &
    YBoxProps
>;
export const createRoot = (TabsProvider): ComponentType<RootProps> => {
  const Root = ({
    children,
    value: valueProps,
    defaultValue,
    finalValue,
    onChange,
    variant = 'minimal',
    fullWidth,
    size = 'sm',
    ...props
  }: RootProps) => {
    const tabsInstance = useTabs({
      value: valueProps,
      defaultValue,
      finalValue,
      onChange,
    });

    return (
      <TabsProvider
        {...tabsInstance}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
      >
        <YBox space="sm" {...props}>
          {children}
        </YBox>
      </TabsProvider>
    );
  };
  Root.displayName = 'TabsRoot';
  return Root;
};

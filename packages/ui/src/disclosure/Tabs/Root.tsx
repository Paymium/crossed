/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { PropsWithChildren } from 'react';
import { type TabsContext } from './context';
import { UseUncontrolledInput } from '@crossed/core';
import { YBox, YBoxProps } from '../../layout/YBox';
import { useTabs } from './useTabs';

export const createRoot =
  (TabsProvider) =>
  ({
    children,
    value: valueProps,
    defaultValue,
    finalValue,
    onChange,
    variant,
    ...props
  }: PropsWithChildren<
    Partial<Pick<TabsContext, 'variant'>> &
      UseUncontrolledInput<TabsContext['value']> &
      YBoxProps
  >) => {
    const tabsInstance = useTabs({
      value: valueProps,
      defaultValue,
      finalValue,
      onChange,
    });

    return (
      <TabsProvider {...tabsInstance} variant={variant}>
        <YBox space="sm" {...props}>
          {children}
        </YBox>
      </TabsProvider>
    );
  };

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { PropsWithChildren, useMemo } from 'react';
import { type TabsContext } from './context';
import { UseUncontrolledInput } from '@crossed/core';
import { YBox, YBoxProps } from '../../layout/YBox';
import { useTabs } from './useTabs';
import { useMedia } from '../../useMedia';

export const createRoot =
  (TabsProvider) =>
  ({
    children,
    value: valueProps,
    defaultValue,
    finalValue,
    onChange,
    variant = 'rounded',
    size,
    ...props
  }: PropsWithChildren<
    Partial<Pick<TabsContext, 'variant' | 'size'>> &
      UseUncontrolledInput<TabsContext['value']> &
      YBoxProps
  >) => {
    const tabsInstance = useTabs({
      value: valueProps,
      defaultValue,
      finalValue,
      onChange,
    });
    const { md, lg } = useMedia();
    const tmpSize = useMemo(() => {
      if (typeof size !== 'undefined') return size;
      if (lg) return 'lg';
      if (md) return 'md';
      return 'sm';
    }, [lg, size, md]);

    return (
      <TabsProvider {...tabsInstance} variant={variant} size={tmpSize}>
        <YBox space="lg" {...props}>
          {children}
        </YBox>
      </TabsProvider>
    );
  };

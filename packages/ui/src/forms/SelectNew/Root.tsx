/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  Children,
  isValidElement,
  PropsWithChildren,
  useId,
  useMemo,
  useRef,
} from 'react';
import { LayoutRectangle, SelectProvider } from './context';
import { useUncontrolled } from '@crossed/core';
import { Floating } from '../../overlay/Floating';
import { useSharedValue } from 'react-native-reanimated';
import { Sheet } from '../../overlay/Sheet';
import { useMedia } from '../../useMedia';
import { View } from 'react-native';
import { SelectOption } from './Option';

export type SelectProps = PropsWithChildren<{
  adapt?: boolean;
  label?: string;
  onChange?: (_value: string) => void;
  defaultValue?: string;
  value?: string;
}>;
export const SelectRoot = ({
  children,
  onChange,
  value: valueProps,
  defaultValue,
  adapt = true,
}: SelectProps) => {
  const { md } = useMedia();
  const id = useId();
  const showSheet = adapt && !md;
  const triggerRef = useRef<View>();
  const contentRef = useRef<View>();

  const layout = useSharedValue<LayoutRectangle>({} as LayoutRectangle);
  const [value, setValue] = useUncontrolled({
    defaultValue,
    onChange,
    value: valueProps,
  });

  const selectedValueRef = useMemo(() => {
    const search = (selectValueChildren: any) => {
      return Children.toArray(selectValueChildren).reduce((acc, child) => {
        if (acc) return acc;
        if (child && isValidElement(child)) {
          if (child.type === SelectOption && child.props.value === value) {
            return child.props.children;
          }
          if (child.props?.children) {
            return search(child.props.children);
          }
        }
        return acc;
      }, null);
    };
    return search(children);
  }, [value, children]);

  return (
    <Sheet stickyHeader>
      <Floating wait={300} removeScroll={false} visibilityHidden>
        <SelectProvider
          value={value}
          setValue={setValue}
          layout={layout}
          refs={{ trigger: triggerRef, content: contentRef }}
          showSheet={showSheet}
          id={id}
          selectedValueRef={selectedValueRef}
        >
          {children}
        </SelectProvider>
      </Floating>
    </Sheet>
  );
};

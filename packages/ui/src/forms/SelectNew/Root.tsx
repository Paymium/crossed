import { PropsWithChildren, useRef, useState } from 'react';
import { LayoutRectangle, SelectAriaProvider, SelectProvider } from './context';
import { useUncontrolled } from '@crossed/core';
import { Floating } from '../../overlay/Floating';
import { useSharedValue } from 'react-native-reanimated';
import { useFloating } from './useFloating';
import { Sheet } from '../../overlay/Sheet';
import { useMedia } from '../../useMedia';

export type SelectProps = PropsWithChildren<{ adapt?: boolean }>;
export const SelectRoot = ({
  children,
  onChange,
  value: valueProps,
  defaultValue,
  adapt = true,
}) => {
  const { md } = useMedia();
  const showSheet = adapt && !md;
  const { refs, floatingStyles, ...other } = useFloating();

  const layout = useSharedValue<LayoutRectangle>({} as LayoutRectangle);
  const [value, setValue] = useUncontrolled({
    defaultValue,
    onChange,
    value: valueProps,
  });
  return (
    <Sheet stickyHeader>
      <Floating wait={0}>
        <SelectProvider
          value={value}
          setValue={setValue}
          layout={layout}
          refs={refs}
          floatingStyles={floatingStyles}
          showSheet={showSheet}
        >
          {children}
        </SelectProvider>
      </Floating>
    </Sheet>
  );
};

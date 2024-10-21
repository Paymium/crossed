import { createScope } from '@crossed/core';
import { UseFloatingReturn } from '@floating-ui/react';
import { SelectAria } from '@react-aria/select';
import { LayoutRectangle as RNLayoutRectangle } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
export type LayoutRectangle = RNLayoutRectangle & {
  top?: number;
  left: number;
};
export type SelectContext = {
  value: string;
  setValue: (_p: string) => void;
  layout: SharedValue<LayoutRectangle>;
  refs: UseFloatingReturn['refs'];
  floatingStyles: UseFloatingReturn['floatingStyles'];
  showSheet?: boolean;
};
export const [SelectProvider, useSelectContext] = createScope<SelectContext>(
  {} as SelectContext
);

export const [SelectAriaProvider, useSelectAriaContext] = createScope<SelectAria<object>>(
  {} as SelectAria<object>
);

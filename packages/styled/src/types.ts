import type { ReactComponentWithRef } from '@crossed/core';
import type { ComponentType, ForwardRefExoticComponent } from 'react';
// import type { UnistylesTheme } from 'react-native-unistyles/lib/typescript/src/types';
import type { UnistylesValues } from 'react-native-unistyles/lib/typescript/src/types/stylesheet';

import type { UnistylesTheme } from 'react-native-unistyles/lib/typescript/src/types';

export { UnistylesValues, UnistylesTheme };
export type UnistylesValuesExtends = Omit<UnistylesValues, 'variants'> &
  StateUnistylesValues &
  Variants;

export type ExtraStyle<P> = {
  extraStyle: (
    props: P,
    state: { hover: boolean; active: boolean; focus: boolean }
  ) => Omit<UnistylesValues, 'variants'>;
};
type Variants = {
  variants?: {
    [variantName: string]: {
      [variant: string]: Omit<UnistylesValuesExtends, 'variants'>;
    };
  };
};

// export type ExtractVariantNames<T> = T extends (...args: any) => infer R
//   ? ExtractVariantKeys<R>
//   : ExtractVariantKeys<T>;
export type ExtractVariant<T> = T extends (...args: any) => infer R
  ? R extends { variants: infer V }
    ? { [key in keyof V]?: ExtractSubVariantKeys<V[key]> }
    : {}
  : T extends { variants: infer V }
  ? { [key in keyof V]?: ExtractSubVariantKeys<V[key]> }
  : {};
type ExtractSubVariantKeys<T> = T extends object
  ? keyof Omit<T, 'default'> | undefined
  : never;

export type State =
  // | 'checked'
  // | 'readOnly'
  // | 'required'
  // | 'invalid'
  | 'focus'
  // | 'focusVisible'
  | 'hover'
  // | 'pressed'
  | 'active';
// | 'loading'
// | 'disabled';

type StateUnistylesValues = {
  [key in State as `${key}:`]?: UnistylesValues;
};

export type ExtractUnistylesValues = {
  [key in State]: UnistylesValues;
};

export type ComponentLocal<P extends Record<string, any>> =
  | ComponentType<P>
  | ForwardRefExoticComponent<P>
  | ReactComponentWithRef<P, any>
  | (new (props: P) => any);

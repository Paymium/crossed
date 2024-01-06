import type { ReactComponentWithRef } from '@crossed/core';
import type { ComponentType, ForwardRefExoticComponent } from 'react';
// import type { UnistylesTheme } from 'react-native-unistyles/lib/typescript/src/types';
import type { UnistylesValues } from 'react-native-unistyles/lib/typescript/src/types/stylesheet';

import type { UnistylesTheme } from 'react-native-unistyles/lib/typescript/src/types';

export { UnistylesValues, UnistylesTheme };
export type UnistylesValuesExtends = UnistylesValues & {
  // name?: keyof UnistylesTheme['components'];
  animationDuration?: number;
  animationKeys?: (keyof Omit<UnistylesValues, 'variants'>)[];
} & StateUnistylesValues;

export type State =
  | 'checked'
  | 'readOnly'
  | 'required'
  | 'invalid'
  | 'focus'
  | 'focusVisible'
  | 'hover'
  | 'pressed'
  | 'active'
  | 'loading'
  | 'disabled';

type StateUnistylesValues = {
  [key in State as `${key}:`]: UnistylesValues;
};

export type ExtractUnistylesValues = {
  [key in State]: UnistylesValues;
};

export type ComponentLocal<P extends Record<string, any>> =
  | ComponentType<P>
  | ForwardRefExoticComponent<P>
  | ReactComponentWithRef<P, any>
  | (new (props: P) => any);

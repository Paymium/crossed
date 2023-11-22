import { createScope } from '@crossed/core';
import type { MutableRefObject } from 'react';
import type { View } from 'react-native';

export type ContextLabel = {
  id?: string;
  inputRef?: MutableRefObject<View | undefined>;
};
export const [Provider, useContext] = createScope<ContextLabel>({
  id: undefined,
  inputRef: undefined,
});

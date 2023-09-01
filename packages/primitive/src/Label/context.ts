import { createScope } from '@crossed/core';
import type { MutableRefObject } from 'react';
import type { View } from 'react-native';

export const [Provider, useContext] = createScope<{
  id?: string;
  inputRef?: MutableRefObject<View | undefined>;
}>({
  id: undefined,
  inputRef: undefined,
});

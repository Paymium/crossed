import { createScope } from '@crossed/core';
import type { MutableRefObject } from 'react';

export type StyleRef = {
  style?: any;
  className?: any;
};

export type ContextInput = {
  style: MutableRefObject<StyleRef>;
  setStyle: (style: StyleRef) => void;
};

export const [InputProvider, useInputContext] = createScope<ContextInput>(
  {} as ContextInput
);

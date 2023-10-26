import { States, createScope } from '@crossed/core';
import type { MutableRefObject } from 'react';

export type StyleRef = {
  style?: any;
  className?: any;
};

export type ContextInput = {
  states: States;
  setStates: (style: Partial<States>) => void;
  inputRef: MutableRefObject<any>;
};

export const [InputProvider, useInputContext] = createScope<ContextInput>(
  null as unknown as ContextInput
);

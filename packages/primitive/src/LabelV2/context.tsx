import { createScope } from '@crossed/core';

export type ContextLabel = {
  id: string;
};

export const [Provider, useContext] = createScope<ContextLabel>(
  {} as ContextLabel
);

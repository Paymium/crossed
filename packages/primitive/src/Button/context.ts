import { createScope } from '@crossed/core';

export type ContextButton = {
  id: string;
};

export const [Provider, useContext] = createScope<ContextButton>(
  {} as ContextButton
);

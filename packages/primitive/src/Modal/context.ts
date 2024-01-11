import { createScope } from '@crossed/core';

export type ContextModal = {
  open: boolean;
  setOpen: (_value: boolean) => void;
  id: string;
};

export const [Provider, useContext] = createScope<ContextModal>(
  {} as ContextModal
);

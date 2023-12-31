import type * as CLSX from 'clsx';

export type ClassPropKey = 'class' | 'className';

export type ClassValue = CLSX.ClassValue;
export type ClassArray = CLSX.ClassArray;

export type ClassProp =
  | {
      class: ClassValue;
      className?: never;
    }
  | { class?: never; className: ClassValue }
  | { class?: never; className?: never };

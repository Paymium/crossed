import { PropsWithChildren, cloneElement, forwardRef } from 'react';
import { useContext } from './context';
import { composeRefs } from '@crossed/core';

export const LabelInput = forwardRef<any, PropsWithChildren>(
  ({ children }, ref) => {
    const { id, inputRef } = useContext();
    return cloneElement(children as any, {
      id,
      ref: composeRefs(inputRef, ref),
    });
  }
);

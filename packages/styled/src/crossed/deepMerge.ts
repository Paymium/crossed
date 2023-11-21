import { twMerge } from 'tailwind-merge';
import type { Base, PropsExtends } from '@crossed/core';

export const deepMerge = <P>(one?: Base<P>, two?: Base<P>): Base<P> => {
  const merge = twMerge(one?.className, two?.className);
  const tmp = {
    ...one,
    ...two,
  };
  if (merge) {
    tmp.className = merge.split(' ');
  }

  if (one?.props || two?.props) {
    tmp.props = { ...one?.props, ...two?.props } as PropsExtends<P>;
    if ((one?.props as any)?.style || (two?.props as any)?.style) {
      (tmp.props as any).style = {
        ...(one?.props as any)?.style,
        ...(two?.props as any)?.style,
      };
    }
  }
  return tmp;
};

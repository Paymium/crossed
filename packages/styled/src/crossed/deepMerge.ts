import { twMerge } from 'tailwind-merge';
import type { Base, PropsExtends, Theme } from './types';

export const deepMerge = <P>(
  one?: Base<P> & Theme<P>,
  two?: Base<P> & Theme<P>
): Base<P> & Theme<P> => {
  const merge = twMerge(one?.className, two?.className);
  const tmp = {
    ...one,
    ...two,
  };
  if (merge) {
    tmp.className = merge.split(' ');
  }

  if (one?.[':dark'] || two?.[':dark']) {
    tmp[':dark'] = deepMerge(one?.[':dark'], two?.[':dark']);
  }
  if (one?.[':light'] || two?.[':light']) {
    tmp[':light'] = deepMerge(one?.[':light'], two?.[':light']);
  }

  if (one?.props || two?.props) {
    tmp.props = { ...one?.props, ...two?.props } as PropsExtends<P>;
  }
  return tmp;
};

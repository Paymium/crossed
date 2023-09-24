import { deepMerge } from './deepMerge';
import type { BaseWithState } from './types';

export const merge = <P>(
  one: BaseWithState<P>,
  two: BaseWithState<P>
): BaseWithState<P> => {
  const acc: BaseWithState<P> = deepMerge(one, two);
  if (two[':active']) {
    acc[':active'] = deepMerge(one[':active'], two[':active']);
  }
  if (two[':disabled']) {
    acc[':disabled'] = deepMerge(one[':disabled'], two[':disabled']);
  }
  if (two[':focus']) {
    acc[':focus'] = deepMerge(one[':focus'], two[':focus']);
  }
  if (two[':hover']) {
    acc[':hover'] = deepMerge(one[':hover'], two[':hover']);
  }
  if (two[':dark']) {
    acc[':dark'] = deepMerge(one[':dark'], two[':dark']);
  }
  if (two[':light']) {
    acc[':light'] = deepMerge(one[':light'], two[':light']);
  }

  return acc;
};

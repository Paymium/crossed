import { deepMerge } from './deepMerge';
import type { BaseWithState } from '@crossed/core';

export const merge = <P>(
  one: BaseWithState<P>,
  two: BaseWithState<P>
): BaseWithState<P> => {
  const acc: BaseWithState<P> = deepMerge(one, two);
  // if (two[':active']) {
  acc[':active'] = deepMerge(one[':active'], two[':active']);
  // }
  // if (two[':disabled']) {
  acc[':disabled'] = deepMerge(one[':disabled'], two[':disabled']);
  // }
  // if (two[':focus']) {
  acc[':focus'] = deepMerge(one[':focus'], two[':focus']);
  // }

  acc[':hover'] = deepMerge(one[':hover'], two[':hover']);

  acc[':dark'] = deepMerge(
    one[':dark'],
    two[':dark'] || (two.className ? { className: two.className } : undefined)
  );
  acc[':light'] = deepMerge(
    one[':light'],
    two[':light'] || (two.className ? { className: two.className } : undefined)
  );

  return acc;
};

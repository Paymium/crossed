/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

const breakpoints = {
  md: 900,
};

export const mq = {
  width: (
    min: number | keyof typeof breakpoints,
    max?: number | keyof typeof breakpoints
  ) => {
    let minTmp;
    let maxTmp;
    if (typeof min === 'string' && breakpoints[min]) {
      minTmp = breakpoints[min];
    } else if (typeof min === 'number') {
      minTmp = min;
    }
    if (typeof max === 'string' && breakpoints[max]) {
      maxTmp = breakpoints[max];
    } else if (typeof max === 'number') {
      maxTmp = max;
    }
    if (!minTmp && minTmp !== 0) {
      throw new Error('min not number and not correspond to breakpoints');
    }
    if (max && !maxTmp) {
      throw new Error('max not number and not correspond to breakpoints');
    }
    return `@media (min-width: ${minTmp}px) ${
      !max ? '' : `and (max-width: ${maxTmp}px)`
    }`;
  },
} as const;

export default mq;

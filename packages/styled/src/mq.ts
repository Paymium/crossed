/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const mq = {
  width: (
    min: number | keyof typeof breakpoints,
    max?: number | keyof typeof breakpoints
  ) => {
    let minTmp;
    let maxTmp;
    if (
      typeof min === 'string' &&
      (breakpoints[min] || breakpoints[min] === 0)
    ) {
      minTmp = breakpoints[min];
    } else if (typeof min === 'number') {
      minTmp = min;
    }
    if (
      typeof max === 'string' &&
      (breakpoints[max] || breakpoints[max] === 0)
    ) {
      maxTmp = breakpoints[max];
    } else if (typeof max === 'number') {
      maxTmp = max;
    }
    if (!minTmp && minTmp !== undefined && minTmp !== 0) {
      throw new Error(
        `min not number and not correspond to breakpoints "${minTmp}"`
      );
    }
    if (max && !maxTmp && maxTmp !== 0) {
      throw new Error(
        `max not number and not correspond to breakpoints "${maxTmp}"`
      );
    }
    return `@media (min-width: ${minTmp || 0}px) ${
      !max ? '' : `and (max-width: ${maxTmp}px)`
    }`;
  },
} as const;

export default mq;

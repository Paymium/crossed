/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export const parse = (
  params: Record<string, any>
  // media?: string,
  // pseudo?: string
): { className: string; style: Record<string, any> } => {
  const style = Object.entries(params).reduce<{
    base: Record<string, any>;
    active?: Record<string, any>;
    hover?: Record<string, any>;
    focus?: Record<string, any>;
  }>(
    (acc, [key, value]) => {
      if (typeof value === 'object') {
        if (key === 'base') {
          acc.base = value;
        } else if (key === ':active') {
          acc.active = value;
        } else if (key === ':hover') {
          acc.hover = value;
        } else if (key === ':focus') {
          acc.focus = value;
        }
      } else {
        acc.base[key] = value;
      }
      return acc;
    },
    { base: {} }
  );
  return {
    className: '',
    style,
  };
};

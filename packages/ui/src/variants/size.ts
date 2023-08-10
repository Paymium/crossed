import type { BaseWithState } from '@mergeui/core';

export const sizeVariants = {
  xs: { className: ['px-2', 'py-1'] },
  sm: { className: ['px-2', 'py-1.5'] },
  md: { className: ['px-3', 'py-2'] },
  lg: { className: ['px-4', 'py-3'] },
  xl: { className: ['px-5', 'py-4'] },
} satisfies Record<string, BaseWithState<any>>;

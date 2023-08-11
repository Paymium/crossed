import type { BaseWithState } from '@mergeui/core';

export const spaceVariants = {
  xs: { className: ['gap-1'] },
  sm: { className: ['gap-3'] },
  md: { className: ['gap-5'] },
  lg: { className: ['gap-7'] },
  xl: { className: ['gap-9'] },
} satisfies Record<string, BaseWithState<any>>;

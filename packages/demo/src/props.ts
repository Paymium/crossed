import type { colorVariants, sizeVariants, spaceVariants } from '@crossed/ui';

export type Props = {
  size: keyof typeof sizeVariants;
  color: keyof typeof colorVariants;
  weight: string;
  variant: string;
  space: keyof typeof spaceVariants;
};

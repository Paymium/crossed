import { Text } from '@mergeui/ui';
import React from 'react';
import type { Props } from './props';

export const TextDemo = ({ variant, weight }: Props) => {
  return (
    <Text variant={"link"} weight={weight as any}>
      Link
    </Text>
  );
};

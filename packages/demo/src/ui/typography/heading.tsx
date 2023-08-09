import { Heading, YBox } from '@mergeui/ui';
import React from 'react';
import type { Props } from '../../props';

export const HeadingDemo = ({ variant, weight }: Props) => {
  return (
    <YBox space="md">
      <Heading order={1}>Heading 1</Heading>
      <Heading order={2}>Heading 2</Heading>
      <Heading order={3}>Heading 3</Heading>
      <Heading order={4}>Heading 4</Heading>
      <Heading order={5}>Heading 5</Heading>
      <Heading order={6}>Heading 6</Heading>
    </YBox>
  );
};

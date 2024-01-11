import { Text } from './Text';
import { styled } from '@crossed/styled';
import type { GetProps } from '@crossed/core';

export const I = styled(Text, {
  fontStyle: 'italic',
});

export type IProps = GetProps<typeof I>;

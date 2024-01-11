import { forwardRef } from 'react';
import { Text, type TextProps } from './Text';
import { styled } from '@crossed/styled';

export const I = styled(Text, {
  fontStyle: "italic",
});

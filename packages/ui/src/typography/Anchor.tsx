import { styled } from '@crossed/styled';
import { Text, TextProps } from './Text';
import type { GetProps } from '@crossed/core';
import { forwardRef } from 'react';

export const Anchor = styled(
  forwardRef((props: Omit<TextProps, 'role'>, ref: any) => (
    <Text weight="medium" {...props} role="link" ref={ref} />
  )),
  (t) => ({
    'color': t.colors.linkColor,
    'textDecorationLine': 'none',
    'cursor': 'pointer',
    'hover:': {
      textDecorationLine: 'underline',
      color: t.utils.shadeColor(t.colors.linkColor, 45),
    },
  })
);

export type AnchorProps = GetProps<typeof Anchor>;

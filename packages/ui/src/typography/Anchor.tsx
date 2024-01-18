import { styled } from '@crossed/styled';
import { Text } from './Text';
import type { GetProps } from '@crossed/core';
import { withDefaultProps } from '@crossed/core';

export const Anchor = withDefaultProps(
  styled(
    Text,
    (t) => ({
      'fontFamily': t.fontFamily,
      'color': t.colors.linkColor,
      'textDecorationLine': 'none',
      'cursor': 'pointer',
      'hover:': {
        textDecorationLine: 'underline',
        color: t.utils.shadeColor(t.colors.linkColor, 45),
      },
    }),
    { name: 'Anchor' }
  ),
  { weight: 'medium', role: 'link' }
);

export type AnchorProps = GetProps<typeof Anchor>;

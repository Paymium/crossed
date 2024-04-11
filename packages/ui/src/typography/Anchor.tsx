/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';
import { Text, type TextProps } from './Text';
import { forwardRef } from 'react';

export const useAnchor = createStyles((t) => ({
  anchor: {
    'base': {
      fontFamily: t.fontFamily,
      textDecorationLine: 'none',
      cursor: 'pointer',
    },
    ':hover': {
      textDecorationLine: 'underline',
      color: t.colors.link,
    },
  },
}));

export type AnchorProps = TextProps;
export const Anchor = forwardRef((props: AnchorProps, ref: any) => {
  return (
    <Text
      ref={ref}
      color="link"
      weight="medium"
      role="link"
      {...props}
      {...useAnchor.anchor.rnw(props)}
    />
  );
});

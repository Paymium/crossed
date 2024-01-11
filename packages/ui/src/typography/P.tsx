import { forwardRef } from 'react';
import { Text, type TextProps } from './Text';
import { styled } from '@crossed/styled';

export const P = styled(
  forwardRef((props: Omit<TextProps, 'role'>, ref) => (
    <Text
      // @ts-expect-error paragraph is not in role type
      role="paragraph"
      {...props}
      ref={ref}
    />
  )),
  (t) => ({
    alignSelf: 'stretch',
    marginBottom: t.space.md,
  })
);

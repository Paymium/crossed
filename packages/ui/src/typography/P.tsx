import { forwardRef } from 'react';
import { Text, type TextProps } from './Text';
import { styled } from '@crossed/styled';

export const P = styled(
  forwardRef((props: Omit<TextProps, 'role'>, ref) => (
    <Text
      // @ts-expect-error
      role="paragraph"
      {...props}
      ref={ref}
    />
  )),
  (t) => ({
    alignSelf: 'stretch',
    marginVertical: t.space.lg,
  })
);

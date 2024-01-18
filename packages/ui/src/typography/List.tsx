import { styled, withDefaultProps } from '@crossed/styled';
import { Text, TextProps } from './Text';
import { forwardRef, memo } from 'react';
import { XBox, XBoxProps } from '../layout/XBox';
import { YBox } from '../layout/YBox';

export const Ul = styled(withDefaultProps(YBox, { role: 'list' }), (t) => ({
  marginTop: t.space.xl,
}));

export const Li = styled(
  memo(
    forwardRef(({ children, ...props }: Omit<XBoxProps, 'role'>, ref: any) => (
      <XBox {...props} ref={ref} role="listitem">
        <Disc />
        {children as any}
      </XBox>
    ))
  ),
  (t) => ({ gap: t.space.md, marginBottom: t.space.md })
);

export const Disc = styled(
  memo(
    forwardRef((props: Omit<TextProps, 'children'>, ref: any) => (
      <Text {...props} ref={ref}>
        {'\u2B24' + ' '}
      </Text>
    ))
  ),
  { fontSize: 9 }
);

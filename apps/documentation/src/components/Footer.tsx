'use client';

import { Text, XBox, YBox } from '@crossed/ui';
import { Link } from './Link';
import { styled } from '@crossed/styled';
import { withDefaultProps } from '@crossed/core';

const Container = styled(YBox, (t) => ({
  backgroundColor: t.colors.backgroundStrong,
  padding: 15,
  justifyContent: 'center',
  borderTopWidth: 1,
  borderColor: t.colors.borderColor,
  alignItems: 'center',
}));

const Row = withDefaultProps(
  styled(XBox, {
    justifyContent: 'center',
    alignItems: 'center',
  }),
  { space: 'sm' }
);

export const Footer = () => {
  return (
    <Container space="xs">
      <Row>
        <Text size="xs">Copyright © {new Date().getFullYear()}</Text>
        <Link
          href="https://paymium.com"
          hrefAttrs={{
            target: '_blank',
          }}
        >
          Paymium
        </Link>
      </Row>
      <Text size="xxs">Made with crossed ecosystem</Text>
    </Container>
  );
};

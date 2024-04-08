/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text } from './Text';
import { XBox, type XBoxProps } from '../layout/XBox';
import { YBox, type YBoxProps } from '../layout/YBox';
import { createStyles } from '@crossed/styled';

const useList = createStyles((t) => ({
  ul: { base: { marginTop: t.space.xl } },
  li: { base: { gap: t.space.md, marginBottom: t.space.md } },
  disc: { base: { fontSize: 9 } },
}));

export type UlProps = YBoxProps;
export const Ul = (props: UlProps) => {
  return <YBox role="list" {...props} {...useList.ul.style()} />;
};

export type LiProps = XBoxProps;
export const Li = ({
  children,
  active,
  hover,
  focus,
  style,
  className,
  ...props
}: LiProps) => {
  return (
    <XBox
      {...props}
      {...useList.li.rnw({ active, hover, focus, style, className })}
      role="listitem"
    >
      <Text {...useList.disc.style()}>{'\u2B24'} </Text>
      {children as any}
    </XBox>
  );
};

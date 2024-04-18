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
  ul: { base: { gap: t.space.xxs } },
  li: { base: { gap: t.space.xxs } },
  disc: { base: { fontSize: 9 } },
}));

export type UlProps = YBoxProps;
export const Ul = (props: UlProps) => {
  return <YBox role="list" {...props} {...useList.ul.rnw()} />;
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
      <Text {...useList.disc.rnw()}>{'\u2B24'} </Text>
      {children as any}
    </XBox>
  );
};

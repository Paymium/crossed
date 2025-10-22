/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text } from './Text';
import { XBox } from '../layout/XBox';
import { YBox, type YBoxProps } from '../layout/YBox';
import { composeStyles, createStyles } from '@crossed/styled';
import { withStaticProperties } from '@crossed/core';
import { alignItemsStyle } from '../styles';
import { ComponentProps, ReactNode } from 'react';

const useList = createStyles((t) => ({
  ul: { base: { gap: t.space.xs } },
  li: { base: { gap: t.space.xs } },
  disc: { base: { fontSize: 9 } },
}));

export type UlProps = YBoxProps;
const Ul = ({ style, ...props }: UlProps) => {
  return (
    <YBox role="list" {...props} style={composeStyles(useList.ul, style)} />
  );
};
Ul.displayName = 'ListRoot';

export type LiProps = ComponentProps<typeof XBox> & {
  /**
   * Change misc
   */
  misc?: ReactNode;
};
const Li = ({
  children,
  style,
  misc = <Text style={useList.disc}>{'\u2B24'} </Text>,
  ...props
}: LiProps) => {
  return (
    <XBox
      {...props}
      style={composeStyles(alignItemsStyle['center'], useList.li, style)}
      role="listitem"
    >
      {misc}
      {children as any}
    </XBox>
  );
};
Li.displayName = 'List.List';

export const List = withStaticProperties(Ul, { Li });

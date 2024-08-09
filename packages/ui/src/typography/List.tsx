/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text } from './Text';
import { XBox, type XBoxProps } from '../layout/XBox';
import { YBox, type YBoxProps } from '../layout/YBox';
import { composeStyles, createStyles } from '@crossed/styled';

const useList = createStyles((t) => ({
  ul: { base: { gap: t.space.xxs } },
  li: { base: { gap: t.space.xxs } },
  disc: { base: { fontSize: 9 } },
}));

export type UlProps = YBoxProps;
export const Ul = ({ style, ...props }: UlProps) => {
  return (
    <YBox role="list" {...props} style={composeStyles(useList.ul, style)} />
  );
};

export type LiProps = XBoxProps;
export const Li = ({ children, style, ...props }: LiProps) => {
  return (
    <XBox {...props} style={composeStyles(useList.li, style)} role="listitem">
      <Text style={useList.disc}>{'\u2B24'} </Text>
      {children as any}
    </XBox>
  );
};

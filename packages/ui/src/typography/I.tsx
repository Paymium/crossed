/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text, type TextProps } from './Text';
import { composeStyles, createStyles } from '@crossed/styled';

const useItalic = createStyles(() => ({
  root: {
    base: {
      fontStyle: 'italic',
    },
  },
}));

export type IProps = TextProps;
export const I = (props: IProps) => {
  return <Text {...props} style={composeStyles(useItalic.root, props.style)} />;
};

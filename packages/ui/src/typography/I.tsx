/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text, type TextProps } from './Text';
import { createStyles } from '@crossed/styled';

const useItalic = createStyles(() => ({
  root: {
    base: {
      fontStyle: 'italic',
    },
  },
}));

export type IProps = TextProps;
export const I = (props: IProps) => {
  const { root } = useItalic();
  return <Text {...props} {...root} />;
};

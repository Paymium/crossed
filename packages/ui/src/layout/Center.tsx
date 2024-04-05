/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';
import { YBox, type YBoxProps } from './YBox';

export const useCenter = createStyles(() => ({
  root: {
    base: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}));
export const Center = (props: YBoxProps) => {
  const { root } = useCenter();
  return (
    <YBox
      {...props}
      {...root}
      className={`${props.className} ${root.className}`}
      style={{ ...root.style, ...props.style }}
    />
  );
};

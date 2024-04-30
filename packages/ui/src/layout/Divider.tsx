/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { View, type ViewProps } from 'react-native';
import { createStyles, type ExtractForProps } from '@crossed/styled';

export const useDivider = createStyles(
  () =>
    ({
      divider: {
        base: {
          borderWidth: 0,
          borderStyle: 'solid',
          // borderColor: t.colors.neutral[500],
        },
        variants: {
          direction: {
            vertical: {
              base: {
                borderLeftWidth: 1,
                height: '100%',
              },
            },
            horizontal: {
              base: {
                borderTopWidth: 1,
                width: '100%',
              },
            },
          },
        },
      },
    }) as const
);

type Variant = ExtractForProps<typeof useDivider.divider>;

export type DividerProps = ViewProps & Variant['variants'];

export const Divider = ({ direction, ...props }: DividerProps) => {
  return (
    <View
      role="separator"
      {...props}
      {...useDivider.divider.rnw({
        variants: { direction: direction ?? 'horizontal' },
      })}
    />
  );
};

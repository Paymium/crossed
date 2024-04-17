/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { View, type ViewProps } from 'react-native';
import { createStyles, type ExtractForProps } from '@crossed/styled';
import { forwardRef } from 'react';

const styleBox = createStyles(
  (t) =>
    ({
      root: {
        base: { display: 'flex' },
        web: { base: { boxSizing: 'border-box' } },
        variants: {
          space: {
            xs: { base: { gap: t.space.xs } },
            sm: { base: { gap: t.space.sm } },
            md: { base: { gap: t.space.md } },
            lg: { base: { gap: t.space.lg } },
            xl: { base: { gap: t.space.xl } },
          },
          center: {
            true: { base: { alignItems: 'center', justifyContent: 'center' } },
          },
        },
      },
    } as const)
);

type Variant = ExtractForProps<typeof styleBox.root>;

export type BoxProps = Pick<Variant['variants'], 'center' | 'space'> &
  Omit<Variant, 'variants'> &
  ViewProps;

export const Box = forwardRef<View, BoxProps>(
  (
    { style, className, space, center, active, hover, focus, ...props },
    ref
  ) => (
    <View
      ref={ref}
      {...props}
      style={[
        styleBox.root.rnw({
          // style,
          className,
          active,
          hover,
          focus,
          variants: { space, center },
        }).style,
        style,
      ]}
    />
  )
);

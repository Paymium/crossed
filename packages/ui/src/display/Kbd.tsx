/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStyle } from '@crossed/styled';
import { Text } from '../typography/Text';
import type { GetProps } from '@crossed/core';

const Kbd = withStyle(Text, ({ theme: t }) => ({
  base: {
    backgroundColor: t.colors.neutral,
    paddingVertical: 1,
    paddingHorizontal: t.space.xs,
    borderWidth: 1,
    // borderColor: t.utils.shadeColor(
    //   t.colors.neutral,
    //   (UnistylesRuntime.themeName === 'dark' ? 1 : -1) * 50
    // ),
    borderRadius: 4,
  },
}));
type KbdProps = GetProps<typeof Kbd>;

export { Kbd, type KbdProps };

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { cloneElement, isValidElement, PropsWithChildren } from 'react';
import { useContext } from './context';
import { useTheme } from '@crossed/styled';

export const BadgeIcon = ({ children }: PropsWithChildren) => {
  const { variant } = useContext();
  const { colors } = useTheme();
  const colorVariant = colors.utility[variant]['700'];
  const color =
    typeof colorVariant === 'string' ? colorVariant : colorVariant.default;
  return isValidElement(children)
    ? cloneElement(children, { color, size: 16 } as any)
    : null;
};

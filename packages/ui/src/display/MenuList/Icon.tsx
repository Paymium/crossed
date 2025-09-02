/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { cloneElement, isValidElement, PropsWithChildren } from 'react';
import { useTheme } from '@crossed/styled';

export const MenuListIcon = ({ children }: PropsWithChildren) => {
  const { colors } = useTheme();
  return isValidElement(children)
    ? cloneElement(children, { color: colors.foreground.quaternary.default })
    : children;
};

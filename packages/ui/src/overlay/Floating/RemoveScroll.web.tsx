/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ComponentProps } from 'react';
import { RemoveScroll as RS } from 'react-remove-scroll';
import { CrossedMethods } from '@crossed/styled';

export const RemoveScroll = ({
  style,
  ...props
}: Omit<ComponentProps<typeof RS>, 'className'> & {
  style?: CrossedMethods<any>;
}) => <RS {...(props as any)} {...style.className()} />;

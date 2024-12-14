/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentProps, forwardRef, memo } from 'react';
import { RemoveScroll as RS } from 'react-remove-scroll';
import { composeStyles, CrossedMethods } from '@crossed/styled';

export const RemoveScroll = memo(
  forwardRef<
    HTMLElement,
    Omit<ComponentProps<typeof RS>, 'className'> & {
      style?: CrossedMethods<any>;
    }
  >(({ style, ...props }, ref) => (
    <RS ref={ref} {...(props as any)} {...composeStyles(style).className()} />
  ))
);

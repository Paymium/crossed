/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { RemoveScroll as RS } from 'react-remove-scroll';
import type { ComponentProps } from 'react';
import { View } from 'react-native';
import { composeStyles, CrossedMethods } from '@crossed/styled';

export const RemoveScroll = ({
  style,
  ref,
  noIsolation,
  inert,
  allowPinchZoom,
  enabled,
  removeScrollBar,
  // @ts-expect-error RS error
  className,
  shards,
  as,
  gapMode,
  ...props
}: Omit<ComponentProps<typeof RS>, 'className'> & {
  style?: CrossedMethods<any>;
}) => <View {...(props as any)} {...composeStyles(style).style()} />;

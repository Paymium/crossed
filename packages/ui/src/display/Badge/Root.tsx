/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo } from 'react';
import { XBox } from '../../layout';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { BadgeProps } from './type';
import { Provider, useContextGroup } from './context';
import {
  badgeContentColor, badgePressableContentColor,
  badgeSizeRoundedStyle,
  badgeSizeStyle,
  badgeStyle,
} from './styles';

export const BadgeRoot = memo<BadgeProps>(
  ({
    children,
    style,
    variant = 'gray',
    size = 'md',
    pressable,
    rounded,
    ...props
  }) => {
    const groupContext = useContextGroup();
    const globalSize = groupContext?.size || size;
    const globalVariant = groupContext?.variant || variant;
    const globalRounded = groupContext?.rounded || rounded;
    const isGroup = Object.values(groupContext).length > 0;
    return (
      <Provider
        variant={globalVariant}
        size={globalSize}
        rounded={globalRounded}
      >
        <XBox
          pressable={pressable}
          alignItems={'center'}
          space={'xs'}
          {...props}
          style={composeStyles(
            badgeStyle.default,
            globalRounded && badgeStyle.rounded,
            globalRounded
              ? badgeSizeRoundedStyle[globalSize]
              : badgeSizeStyle[globalSize],
            badgeContentColor[globalVariant],
            isGroup &&
              inlineStyle(({ colors }) => ({
                base: { backgroundColor: colors.background.primary.default },
              })),
            pressable && badgePressableContentColor[globalVariant],
            style
          )}
        >
          {children}
        </XBox>
      </Provider>
    );
  }
);

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, withReactive } from '@crossed/styled';
import { cloneElement, forwardRef, isValidElement } from 'react';
import { Pressable, View } from 'react-native';
import { itemStyles } from './style';
import { MenuListItemProps } from './types';
import { useProviderContext } from './context';

export const MenuItem = withReactive<MenuListItemProps>(
  forwardRef<View, MenuListItemProps>(
    ({ asChild, style, children, ...props }: MenuListItemProps, ref) => {
      const { rounded } = useProviderContext();
      const styleCallback = ({ pressed, hovered }) =>
        composeStyles(
          itemStyles.item,
          rounded && itemStyles.rounded,
          style
        ).rnw({
          active: pressed,
          hover: hovered,
        }).style;
      return asChild && isValidElement(children) ? (
        cloneElement(children, {
          style: styleCallback,
          role: 'listitem',
        } as any)
      ) : (
        <Pressable role="listitem" {...props} style={styleCallback} ref={ref}>
          {children}
        </Pressable>
      );
    }
  )
);
MenuItem.displayName = 'MenuList.Item';

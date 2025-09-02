/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, memo, RefAttributes } from 'react';
import { View } from 'react-native';
import { YBox } from '../../layout';
import { composeStyles } from '@crossed/styled';
import { MenuListProps } from './types';
import { rootStyle } from './style';
import { Provider } from './context';

export const MenuRoot = memo<MenuListProps & RefAttributes<View>>(
  forwardRef<View, MenuListProps>(
    (
      {
        bordered = true,
        rounded = true,
        ...props
      }: MenuListProps,
      ref: any
    ) => {
      return (
        <Provider rounded={rounded}>
          <YBox
            role="list"
            {...props}
            style={composeStyles(
              rootStyle.default,
              bordered && rootStyle.border,
              rounded && rootStyle.rounded,
              props.style
            )}
            ref={ref}
          />
        </Provider>
      );
    }
  )
);
MenuRoot.displayName = 'MenuList';

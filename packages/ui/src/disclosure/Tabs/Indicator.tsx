/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, CrossedMethods } from '@crossed/styled';
import {
  heightStyles,
  indicatorDynamicStyles,
  indicatorRoundedStyles,
  indicatorUnderlineStyles,
} from './styles';
import Animated from 'react-native-reanimated';
import { TabsContext } from './context';

export const createIndicator = (useTabsContext: () => TabsContext) => {
  const Indicator = ({ style }: { style?: CrossedMethods<any> }) => {
    const { variant, indicator, size } = useTabsContext();
    const indicatorStyle =
      !variant || variant === 'rounded'
        ? indicatorRoundedStyles
        : indicatorUnderlineStyles;
    console.log('indicatorLeft', indicator.left.value);
    console.log('indicator.width', indicator.width.value);
    return (
      <Animated.View
        {...composeStyles(
          indicatorStyle.default,
          indicatorStyle.active,
          variant === 'rounded' && heightStyles[size],
          indicatorDynamicStyles.dyn(indicator.left, indicator.width),
          style
        ).style()}
      />
    );
  };
  return Indicator;
};

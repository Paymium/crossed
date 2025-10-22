/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, CrossedMethods } from '@crossed/styled';
import {
  indicatorBorderStyles,
  indicatorBrandGrayStyles,
  indicatorBrandStyles,
  indicatorDynamicStyles,
  indicatorMinimalStyles,
  indicatorUnderlineStyles,
} from './styles';
import Animated from 'react-native-reanimated';
import { TabsContext } from './context';
import { match } from 'ts-pattern';

type IndicatorProps = { style?: CrossedMethods<any> };
export const createIndicator = (useTabsContext: () => TabsContext) => {
  const Indicator = ({ style }: IndicatorProps) => {
    const { variant, indicator } = useTabsContext();
    const indicatorStyle = match(variant)
      .with('minimal', () => indicatorMinimalStyles)
      .with('border', () => indicatorBorderStyles)
      .with('underline', () => indicatorUnderlineStyles)
      .with('brand', () => indicatorBrandStyles)
      .with('brandGray', () => indicatorBrandGrayStyles)
      .exhaustive();
    return (
      <Animated.View
        style={[
          composeStyles(
            indicatorStyle.default,
            indicatorStyle.active,
            indicatorDynamicStyles.dyn(indicator.left, indicator.width),
            style
          ).style().style,
          { top: 0, bottom: 0 },
        ]}
      />
    );
  };
  return Indicator;
};

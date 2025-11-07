/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, CrossedMethods, useTheme } from '@crossed/styled';
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
import { shadowStyles } from '../../styles';

type IndicatorProps = { style?: CrossedMethods<any> };
export const createIndicator = (useTabsContext: () => TabsContext) => {
  const Indicator = ({ style }: IndicatorProps) => {
    const { variant, indicator } = useTabsContext();
    const indicatorStyle = match(variant)
      .with('minimal', () =>
        composeStyles(indicatorMinimalStyles.default, shadowStyles.xs)
      )
      .with('border', () =>
        composeStyles(indicatorBorderStyles.default, shadowStyles.sm)
      )
      .with('underline', () => indicatorUnderlineStyles.default)
      .with('brand', () => indicatorBrandStyles.default)
      .with('brandGray', () => indicatorBrandGrayStyles.default)
      .exhaustive();
    return (
      <Animated.View
        style={[
          { top: 0, bottom: 0 },
          composeStyles(
            indicatorStyle,
            indicatorDynamicStyles.dyn(indicator.left, indicator.width),
            style
          ).style().style,
        ]}
      />
    );
  };
  return Indicator;
};

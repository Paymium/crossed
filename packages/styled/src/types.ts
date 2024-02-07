/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

type NestedKeys = 'shadowOffset' | 'transform' | 'textShadowOffset';

export type CrossedstyleView = Omit<ViewStyle, NestedKeys>;
export type CrossedstyleText = Omit<TextStyle, NestedKeys>;
export type CrossedstyleImage = Omit<ImageStyle, NestedKeys>;

export type AllAvailableStyles = CrossedstyleView &
  CrossedstyleText &
  CrossedstyleImage;

export interface CrossedstyleTheme {}

export type AllAvailableKeys = keyof AllAvailableStyles;

export type CrossedstyleValues = {
  [propName in AllAvailableKeys]?: AllAvailableStyles[propName];
};

export type StyleSheet = {
  'base': CrossedstyleValues;
  ':hover'?: CrossedstyleValues;
  ':focus'?: CrossedstyleValues;
  ':active'?: CrossedstyleValues;
};

export type CreateStyleParams =
  | ((_theme: CrossedstyleTheme) => StyleSheet)
  | StyleSheet;

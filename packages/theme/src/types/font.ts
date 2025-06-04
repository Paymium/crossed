/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export type HeadlineNames = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type FontSizeAttributes = 'lineHeight' | 'fontSize';
export type TextNames = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type FamilyName = 'regular' | 'medium' | 'semibold' | 'bold';

export type HeadLineFontSize = Record<
  HeadlineNames,
  Record<FontSizeAttributes, number>
>;

export type TextFontSize = Record<
  TextNames,
  Record<FontSizeAttributes, number>
>;

export type FontFamily = Record<FamilyName, Record<'fontFamily', string>>;

export type Font = {
  headline: HeadLineFontSize;
  text: TextFontSize;
  family: FontFamily;
};

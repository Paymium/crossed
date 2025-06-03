/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export type DisplayNames = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type TextNames = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type FamilyName = 'regular' | 'medium' | 'semibold' | 'bold';

export type DysplayFont = {
  lineHeight: Record<DisplayNames, number>;
  fontSize: Record<DisplayNames, number>;
  color: string;
  family: Record<FamilyName, string>;
};

export type TextFont = {
  lineHeight: Record<TextNames, number>;
  fontSize: Record<TextNames, number>;
  color: string;
  family: Record<FamilyName, string>;
};

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleValues } from '@crossed/styled';

export type FontStyle = Required<
  Pick<CrossedstyleValues, 'fontWeight' | 'fontSize' | 'lineHeight'>
>;

////////////////////////
// heading
////////////////////////
export type HeadingName = 'md' | 'lg' | 'xl';
export type Headings = Record<HeadingName, FontStyle>;

////////////////////////
// text
////////////////////////
export type TextName =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'h6'
  | 'h5'
  | 'h4'
  | 'h3'
  | 'h2'
  | 'h1';
export type Texts = Record<TextName, FontStyle>;

export type Font = {
  lineHeight: Record<TextName, CrossedstyleValues['lineHeight']>;
  fontSize: Record<TextName, CrossedstyleValues['fontSize']>;
  fontWeight: Record<TextName, CrossedstyleValues['fontWeight']>;
  color: string;
  family: string;
  extraStyles?: CrossedstyleValues;
};

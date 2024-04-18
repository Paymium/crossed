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
export type TextName = 'sm' | 'md';
export type Texts = Record<TextName, FontStyle>;

export type Font = {
  heading: Headings;
  text: Texts;
  color: string;
  family: string;
};

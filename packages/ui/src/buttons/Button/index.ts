/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { ButtonText, ButtonTextProps } from './Text';
import { Box as ButtonElement } from '../../layout/Box';
import { ButtonIcon } from './Icon';
import { Button as Root } from './Button';
import { ButtonPreset } from './Preset';

export * from './styles';
export * from './types';

export const Button = withStaticProperties(Root, {
  Text: ButtonText,
  Element: ButtonElement,
  Icon: ButtonIcon,
  Preset: ButtonPreset,
});
export { ButtonText, ButtonElement, ButtonIcon };
export type { ButtonTextProps };

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { BadgeRoot } from './Root';
import { BadgeText } from './Text';
import { BadgeIcon } from './Icon';
import { BadgeGroup } from './Group';

export const Badge = withStaticProperties(BadgeRoot, {
  Text: BadgeText,
  Icon: BadgeIcon,
  Group: BadgeGroup,
});

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Divider as D } from '../../layout';
import { withDefaultProps } from '@crossed/core';

export const MenuDivider = withDefaultProps(D, { color: 'secondary' });
MenuDivider.displayName = 'MenuList.Divider';

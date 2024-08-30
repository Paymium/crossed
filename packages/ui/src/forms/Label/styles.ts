/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles } from '@crossed/styled';
import { form } from '../../styles/form';
import { typoStyles } from '../../styles';

export const styles = () =>
  composeStyles(typoStyles.size, typoStyles.weight, form.label);

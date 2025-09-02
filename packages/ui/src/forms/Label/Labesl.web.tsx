/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { LabelComponent } from './types';
import { composeStyles } from '@crossed/styled';
import { form } from '../../styles/form';

export const Label: LabelComponent = (props) => {
  const { disabled, focus, hover, style, ...other } = props as any;
  return <label {...other} {...composeStyles(form.label, style).className()} />;
};

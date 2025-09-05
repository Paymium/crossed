/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { YBox } from '../../layout';
import { composeStyles } from '@crossed/styled';
import { cardStyles } from './styles';

export const CardHeader = (props) => {
  return (
    <YBox {...props} style={composeStyles(cardStyles.padding, props.style)} />
  );
};

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentProps } from 'react';
import { Text } from '../../typography';

export const SwitchHelper = (props: ComponentProps<typeof Text>) => {
  return <Text color={'tertiary'} fontSize={'sm'} {...props} />;
};

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { X } from '@crossed/unicons';
import { IconButton, IconButtonProps } from './IconButton';

export const CloseButton = ({ style, disabled, ...props }: IconButtonProps) => {
  return (
    <IconButton role="button" aria-label="Close" {...props} disabled={disabled}>
      <X size={16} />
    </IconButton>
  );
};

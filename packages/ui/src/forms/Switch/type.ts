/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { PropsWithChildren } from 'react';
import { ButtonProps } from '../../buttons';

export type SwitchProps = PropsWithChildren<
  ButtonProps & {
    value?: boolean;
    onChange?: () => void;
    disabled?: boolean;
    defaultValue?: boolean;
  }
>;

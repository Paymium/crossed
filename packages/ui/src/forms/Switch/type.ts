/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { PropsWithChildren } from 'react';
import { XBoxProps } from '../../layout';

export type SwitchProps = PropsWithChildren<
  Pick<XBoxProps, 'style' | 'alignSelf' | 'alignItems' | 'center'> & {
    value?: boolean;
    onChange?: () => void;
    disabled?: boolean;
    defaultValue?: boolean;
  }
>;

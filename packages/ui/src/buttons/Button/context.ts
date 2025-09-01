/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createContext } from 'react';
import { ButtonProps } from './types';

export const buttonContext = createContext<
  Pick<ButtonProps, 'variant' | 'size' | 'disabled' | 'error'> & {
    state?: {
      active?: boolean;
      hover?: boolean;
    };
    textId: string;
    // eslint-disable-next-line no-unused-vars
    setTextId: (p: string) => void;
  }
>({} as any);
